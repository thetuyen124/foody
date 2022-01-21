#! /bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
WEBSERVICE_DIR=foody-web-service
WEBUI_DIR=foody-web-ui

sed -i 's|http://localhost:8080/|http://165.22.56.120:8080/|' $WEBUI_DIR/src/share/httpClient.js

cd $WEBSERVICE_DIR
mvn clean install -DskipTests
cd $SCRIPT_DIR

cd $WEBUI_DIR
npm run build
cd $SCRIPT_DIR

scp foody-web-service/target/foody-0.0.1-SNAPSHOT.jar root@165.22.56.120:/home/ubuntu/apis/backend.jar
scp -r foody-web-ui/build/* root@165.22.56.120:/home/ubuntu/frontend

ssh root@165.22.56.120 '
	sudo cp -r /home/ubuntu/frontend/* /var/www/datn/html/
	sudo systemctl restart nginx
	java -jar /home/ubuntu/apis/backend.jar
'
