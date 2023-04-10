FROM node:18-alpine as prod-static
WORKDIR /client
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json *.json *.js ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

# # Nginx to serve static files built
# FROM nginx:stable-alpine
# COPY --from=prod-static /client/build /usr/share/nginx/html
# # COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf