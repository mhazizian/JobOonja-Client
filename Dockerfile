# build environment
# FROM node:12.2.0-alpine as build
FROM node:8.1.4 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install

COPY . /app
RUN npm run build
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000