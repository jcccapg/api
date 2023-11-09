FROM node:lts-alpine

WORKDIR /usr/src
RUN apk update && apk add git
RUN git clone --branch Nicolas_Docker https://github.com/jcccapg/api.git /usr/src/api
WORKDIR /usr/src/api

ENV COUNTRY_INFO_API=https://restcountries.com/v3.1/name
ENV COUNTRY_NEWS_API=https://newsapi.org/v2/top-headlines
ENV COUNTRY_NEWS_KEY=038f5871db804fc0b3ea8ca78b2f63c8
ENV COUNTRY_WEATHER_API=https://api.openweathermap.org/data/2.5/weather
ENV COUNTRY_WEATHER_KEY=ccdd9c1858821e49a436098817aa308e

RUN npm install
EXPOSE 3000

RUN npm run build
CMD ["node", "dist/index.js"]