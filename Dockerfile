FROM node:10-alpine
RUN npm install -g vue-cli
WORKDIR /ChoiceMaker
ENV HOST 0.0.0.0
EXPOSE 3000