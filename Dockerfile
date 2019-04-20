#FROM node:10
FROM python:3.6.2-alpine3.6

ARG USERNAME="salih.ozdemir@volthread.com"
ARG PASSWORD="CaLlMe/*0312/*"
ARG IDENTITY_DOMAIN="idcs-8101a156373a44fa8233cd82905f0b42"
ARG PSM_USERNAME="salih.ozdemir@volthread.com"
ARG PSM_PASSWORD="CaLlMe/*0312/*"
ARG PSM_REGION="emea"
ARG PSM_OUTPUT="json"

### Oracle Cloud Configuration ###
WORKDIR "/oracle-cloud-psm-cli/"

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

RUN curl -X GET -u $USERNAME:$PASSWORD -H X-ID-TENANT-NAME:$IDENTITY_DOMAIN https://psm.europe.oraclecloud.com/paas/core/api/v1.1/cli/$IDENTITY_DOMAIN/client -o psmcli.zip && \
	pip3 install -U psmcli.zip

#RUN echo -e "$PSM_USERNAME\n$PSM_PASSWORD\n$PSM_PASSWORD\n$IDENTITY_DOMAIN\n$PSM_REGION\n$PSM_OUTPUT" | psm setup

COPY psm-setup-payload.json .
RUN psm setup -c psm-setup-payload.json

RUN apk add --update nodejs nodejs-npm
RUN apk add --update zip

RUN npm install -g @oracle/ojet-cli

RUN apk update && apk upgrade &&  apk add --no-cache bash git openssh

COPY build-app.sh .

CMD ["/bin/sh"]
### Oracle Cloud Configuration ###

#COPY jet-on-node /tmp/jet-on-node
#RUN cd /tmp/jet-on-node && npm install
#EXPOSE 4500
#RUN npm install -g nodemon
#RUN npm install -g @oracle/ojet-cli
#COPY startUpScript.sh /tmp
#COPY gitRefresh.sh /tmp
#CMD ["chmod", "+x",  "/tmp/startUpScript.sh"]
#RUN /bin/bash -c 'chmod +x /tmp/gitRefresh.sh'
#ENTRYPOINT ["sh", "/tmp/startUpScript.sh"]

