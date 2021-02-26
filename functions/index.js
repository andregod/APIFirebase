
const functions = require('firebase-functions');
admin = require('firebase-admin');
express = require('express');
cors = require('cors');
app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./ChaveAcesso.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projetotestefirebase-568fd.firebaseio.com"
});
const db = admin.firestore();


app.get('/', (req, res) => {
  return res.status(200).send('Bem-vindos á minha API em NodeJS! Feito por André Godinho, utilizando Postman e Firebase .');
});

 // create
  app.post('/api/create', (req, res) => {
    (async () => {
        try {
          await db.collection('paises').doc('/' + req.body.country + '/')
              .create({
                name: req.body.country,
                cases: req.body.cases,
                todayCases: req.body.todayCases,
                deaths: req.body.deaths,
                todayDeaths: req.body.todayDeaths,
                recovered: req.body.recovered,
                active: req.body.active,
                critical: req.body.critical,
                casesPerOneMillion: req.body.casesPerOneMillion,
                deathsPerOneMillion: req.body.deathsPerOneMillion,
                totalTests: req.body.totalTests,
                testsPerOneMillion: req.body.testsPerOneMillion
                });
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });   

// read item
app.get('/api/readPais/:pais_nome', (req, res) => {
  (async () => {
      try {
          const document = db.collection('paises').doc(req.params.pais_nome);
          let pais = await document.get();
          let response = pais.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });

// read all
app.get('/api/readAll', (req, res) => {
  (async () => {
      try {
          let query = db.collection('paises');
          let response = [];
          await query.get().then(querySnapshot => {
          let docs = querySnapshot.docs;
          for (let doc of docs) {
              const selectedItem = {
                country: doc.country,
                country: doc.data().name,
                todayCases: doc.data().todayCases,
                deaths: doc.data().deaths,
                todayDeaths: doc.data().todayDeaths,
                recovered: doc.data().recovered,
                active: doc.data().active,
                critical: doc.data().critical,
                casesPerOneMillion: doc.data().casesPerOneMillion,
                deathsPerOneMillion: doc.data().deathsPerOneMillion,
                totalTests: doc.data().totalTests,
                testsPerOneMillion: doc.data().testsPerOneMillion

              };
              response.push(selectedItem);
          }
          });
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });

// update
app.put('/api/update/:pais_nome', (req, res) => {
(async () => {
  try {
      const document = db.collection('paises').doc(req.params.pais_nome);
      await document.update({
        casos: req.body.cases,
        todayCases: req.body.todayCases,
        deaths: req.body.deaths,
        todayDeaths: req.body.todayDeaths,
        recovered: req.body.recovered,
        active: req.body.active,
        critical: req.body.critical,
        casesPerOneMillion: req.body.casesPerOneMillion,
        deathsPerOneMillion: req.body.deathsPerOneMillion,
        totalTests: req.body.totalTests,
        testsPerOneMillion: req.body.testsPerOneMillion
      });
      return res.status(200).send();
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
  })();
});

// delete
app.delete('/api/delete/:pais_nome', (req, res) => {
(async () => {
  try {
      const document = db.collection('paises').doc(req.params.pais_nome);
      await document.delete();
      return res.status(200).send();
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
  })();
});




exports.app = functions.https.onRequest(app);