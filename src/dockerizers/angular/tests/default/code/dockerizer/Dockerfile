# Use official node image as the base image
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use official nginx image as the base image
FROM nginx:latest
COPY --from=build /app/dist/angular-test/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]