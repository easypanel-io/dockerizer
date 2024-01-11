# Creating multi-stage build for production
FROM {{node_version}}{% if alpine %}-alpine{% endif %} AS build
{% if alpinePackages %}
RUN apk update && apk add --no-cache {{alpinePackages}} > /dev/null 2>&1
{% endif %}
ENV NODE_ENV={{node_env}}

WORKDIR /opt/
COPY package.json yarn.lock ./
{% if build_packages %}
RUN yarn global add {{build_packages}}
{% endif %}
RUN yarn config set network-timeout 600000 -g && yarn install --{{node_env}}
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN yarn build

# Creating final production image
FROM {{node_version}}{% if alpine %}-alpine{% endif %}
RUN apk add --no-cache {{production_packages}}
ENV NODE_ENV={{node_env}}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R {{user}}:{{user}} /opt/app
USER {{user}}
EXPOSE {{port}}
CMD ["yarn", "start"]