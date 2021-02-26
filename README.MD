# APIFirebase
This project was made for a Distributed Systems assignment in my Cybersecurity degree. It is a NodeJS API that utilizes Firebase in a localhost test environment with Postman. The tutorial for it is present at:


//Initialize in the folder functions

npm run serve

//Dependencies utilized

npm install express
npm install cors
npm install -g firebase-tools
npm install firebase-admin

// Postman commands

http://localhost:5001/projetotestefirebase-568fd/us-central1/app/api/create     - criar pais 

http://localhost:5001/projetotestefirebase-568fd/us-central1/app/     - helloworld

http://localhost:5001/projetotestefirebase-568fd/us-central1/app/api/readPais/:pais_nome   - name-based read

http://localhost:5001/projetotestefirebase-568fd/us-central1/app/api/readall  - read all

http://localhost:5001/projetotestefirebase-568fd/us-central1/app/api/update/:pais_nome  - update by name

http://localhost:5001/projetotestefirebase-568fd/us-central1/app/api/delete/:pais_nome  - delete by name
