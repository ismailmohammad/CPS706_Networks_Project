FROM node:18-alpine as prod-static
WORKDIR /client
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json *.json *.js ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build
RUN npm run start
EXPOSE 3000