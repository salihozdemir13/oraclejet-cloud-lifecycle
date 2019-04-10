#FROM python:3.6.2-alpine3.6
FROM salihozdemir/ojetdevops:latest

RUN apk add --update nodejs nodejs-npm

RUN npm install -g @oracle/ojet-cli

RUN apk update && apk upgrade &&  apk add --no-cache bash git openssh

COPY build-app.sh .

CMD ["/bin/sh"]