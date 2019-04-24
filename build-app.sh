git clone https://github.com/salihozdemir13/ORCLJetToCloudSampleAppByVolthread.git
cd ORCLJetToCloudSampleAppByVolthread

git pull
wait

npm install
wait

#ojet build  --release
ojet build
wait

cp -a ./web/. ./jet-on-node/public
wait

cd jet-on-node
wait

npm install
wait

zip -r voltranet-portal.zip .
wait

#cd /oracle-cloud-psm-cli/ORCLJetToCloudSampleAppByVolthread/jet-on-node
#psm accs push -n VoltranetPortal -r node -s hourly -d deployment.json -p voltranet-portal.zip