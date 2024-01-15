# Use official node image as the base image
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY /dockerizer/default.conf /etc/nginx/conf.d/default.conf

# Use official nginx image as the base image
FROM nginx:stable
COPY --from=build /app/dist/myApp/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]