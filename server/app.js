const express = require('express');
const fs = require('fs');
const OpenAI = require('openai');
const auth = require('./authentication.js');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;
// Importing the API and instantiating the client
const { default: Terra } = require("terra-api");
const { json } = require('stream/consumers');
const terra = new Terra(auth.DEV_ID, auth.API_KEY, auth.SECRET);
const reference_id = "helloHarvard";
const openai = new OpenAI({
  apiKey: auth.openai_key, // defaults to process.env["OPENAI_API_KEY"]
});

app.use(cors()); // Enable CORS for all routes or configure it as needed.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  getWidgetSession();
})

app.get('/addWearables', (req, res) => {
  getWidgetSession();
  getWidget();
})

app.get('/getProviders', (req, res) => {
  let output;
  terra.getProviders()
  .then((p) => {
    res.send(p);
  	console.log(p);
	})
})

app.get('/getUsers', (req, res)=> {
  terra
  .getUsers()
  .then((p) => {
  	console.log(p);
    res.send(p);
	})
})

app.get('/getUserData', (req, res) => {
  getAllInfo(reference_id);
  res.send(terra.getUser(reference_id));
})

app.post('/postData', (req, res) => {
    
})

app.get('/diagnosis', function(req, res) {
  // Get the users bioinformatics from Terra and set the bioinformatics to a string
  const bioninformatics = `heartrate = 156 BPM, sleep = 14 minutes`;

  // Create a prompt for open ai to explain the bioinformatic information
  const prompt = `Explain this information to me as if I were a doctor. Include priority on a scale of 0-5 (0 is a normal chart info, 5 is urgent and life threatening) and give detailed notes that might be helpful for me to diagnose the patient. ${bioninformatics}. Reformat the above message into  a json with the following format {priority: number, summary: string, detailedNotes: string, assessment: string, actionItems: string, followUp: string}`;

  // Generate and send back the diagnosis based on the prompt
  getDiagnosis(prompt).then((diagnosis)=> {
    res.send(diagnosis);
  });
});

async function getAllInfo (userId) {
  terra
  .getNutrition({
    userId: userId,
    startDate: new Date("2023-03-29"),
    endDate: new Date(),
    toWebhook: false,
  })
  terra
  .getActivity({
    userId: userId,
    startDate: new Date("2023-03-29"),
    endDate: new Date(),
    toWebhook: false,
  })

  .then((p) => {
    console.log(p);
    json.send(p);
  })
  .catch((e) => console.log(e.status, e.message));

}

async function getDiagnosis (prompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);

  return chatCompletion.choices;
}

async function getWidgetSession() {
  terra.generateWidgetSession({
    referenceID: "hackHarvarder",
    providers: ["CRONOMETER", "OURA"],
      authSuccessRedirectUrl: "http://localhost:3000/diagnosis",
      authFailureRedirectUrl: "http://localhost:3000/diagnosis",
      language: 'en'
  })
  .then((s) => {
    console.log(s);
  });

}

async function getWidget() {
  try {
    const response = await fetch(
      'https://api.tryterra.co/v2/auth/generateWidgetSession',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'dev-id': auth.DEV_ID,
          'content-type': 'application/json',
          'x-api-key': auth.API_KEY,
        },
        body: JSON.stringify({
          reference_id: "helloHarvard",
          providers:
            'GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR',
          language: 'en',
          auth_success_redirect_url: 'terraficapp://request',
          auth_failure_redirect_url: 'terraficapp://login',
        }),
      },
    );
    const json = await response.json();
    console.log(json.url);
  //   props.onSuccess(json.url);
  } catch (error) {
    console.error(error);
  }
}

function main () {
  terra.authUser();
}