FROM node:18-alpine as prod-static
WORKDIR /client
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json *.json *.js ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]