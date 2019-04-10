#git clone https://github.com/salihozdemir13/ORCLJetToCloudSampleAppByVolthread.git
#cd ORCLJetToCloudSampleAppByVolthread

#git pull
npm install
ojet build

# this line produced an error on uglifying one of the files
#ojet build  --release

cp -a ./web/. ./jet-on-node/public

cd jet-on-node

npm install

cd bin

node www

#zip -r webshop.zip .
#cd /oracle-cloud-psm-cli/webshop-portal-soaring-through-the-cloud-native-sequel/jet-on-node
#psm accs push -n SoaringWebshopPortal -r node -s hourly -d deployment.json -p webshop.zip