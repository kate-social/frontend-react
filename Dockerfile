FROM node:14.16.0-alpine3.12 as nodemodules
WORKDIR /modules
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM node:14.16.0-alpine3.12 as build
WORKDIR /build
COPY . .
COPY --from=nodemodules /modules/node_modules /build/node_modules
RUN npm run build

FROM nginx:1.18.0-alpine
WORKDIR /app
COPY --from=build /build/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]