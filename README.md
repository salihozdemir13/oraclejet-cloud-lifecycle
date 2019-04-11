## Oracle JET & Spring Boot in Oracle Cloud using SM CLI on Docker ( Early Access :) )

Lifecycle from Local to Cloud with Oracle JET and Spring Boot

Docker Repository URL: https://hub.docker.com/r/salihozdemir/ojet-devops-live

# Prerequisites

- Docker (version 18.09.4 in my case)
- Nodejs (v10.15.3)
- npm (v6.4.1)

# Get started (standalone)

If you want to test this project, download it on your machine and follow the steps below :

1 - if JET CLI is not installed on your machine

    npm install -g @oracle/ojet-cli

2 - go to the directory with the cd command and restore components with

    npm install (**)
    ojet restore

3 - start the server with the command

    ojet serve

4 - when the project is started, browser is launched automatically and you can navigate in the menus of the application.

# Get started (with Docker)

    docker run --name ojet-devops-live -p 3020:3000 -p 4510:4500 -e GITHUB_URL=https://github.com/salihozdemir13/ORCLJetToCloudSampleAppByVolthread -e APPLICATION_ROOT_DIRECTORY= -d salihozdemir/ojet-devops-live:0.1
    
    navigate to -> localhost:3020
