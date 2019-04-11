## Oracle JET & Spring Boot in Oracle Cloud using SM CLI on Docker

Lifecycle from Local to Cloud with Oracle JET and Spring Boot

# Prerequisites

. Docker

# Get started

docker run --name ojet-devops-live -p 3020:3000 -p 4510:4500 -e GITHUB_URL=https://github.com/salihozdemir13/ORCLJetToCloudSampleAppByVolthread -e APPLICATION_ROOT_DIRECTORY= -d salihozdemir/ojet-devops-live:0.1
