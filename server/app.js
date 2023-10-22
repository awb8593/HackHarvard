const express = require('express');
const fs = require('fs');
const OpenAI = require('openai');
const auth = require('./authentication.js');
const cors = require('cors');
const { MessagingResponse } = require('twilio').twiml;
const app = express();

// Add a global promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error here or log it
});


// Twilio credentials
const accountSid = auth.accountSid;
const authToken = auth.authToken;
const client = require('twilio')(accountSid, authToken);

  // // Twilio server setup
  // app.post('/sms', (req, res) => {
  //   const twiml = new MessagingResponse();
  
  //   twiml.message('The Robots are coming! Head for the hills!');
  
  //   res.type('text/xml').send(twiml.toString());
  // });


const port = process.env.PORT || 3000;
// Importing the API and instantiating the client
const { default: Terra } = require("terra-api");
const { json } = require('stream/consumers');
const { send } = require('process');
const terra = new Terra(auth.DEV_ID, auth.API_KEY, auth.SECRET);
const reference_id = "helloHarvard";
let userid = "";
const openai = new OpenAI({
  apiKey: auth.openai_key, // defaults to process.env["OPENAI_API_KEY"]
});

const allowedOrigins = ["http://localhost:4200"];
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  let all = getWidgetSession();
  console.log(all);
  terra
  .getUsers()
  .then((allUsers) => {
  	console.log(allUsers);
    res.send(allUsers);
    allUsers.users.forEach(element => {
      if (element.reference_id == reference_id) {
        userid = element.user_id;
      }
    });
	})
  res.send(all);
})

app.get('/addWearables', (req, res) => {
  getWidgetSession(res);
  getWidget();
})

app.get('/getProviders', (req, res) => {
  terra.getProviders()
  .then((p) => {
    res.send(p);
  	console.log(p);
	})
})

app.get('/getUsers', (req, res)=> {
  terra
  .getUsers()
  .then((allUsers) => {
    allUsers.users.forEach(element => {
      if (element.reference_id == reference_id) {
        userid = element.user_id;
      }
    });
  	console.log(allUsers);
    res.send(allUsers);
	})
})

app.get('/getUserDataDetails', (req, res) => {

  // fill up historical data
terra
.getAthlete({ userId: userid, toWebhook: false })
  .then((p) => {
    console.log(p);
    res.send(p);
  })
  .catch((e) => console.log(e.status, e.message));
})

app.get('/getUserDataNutrition', (req, res) => {

  // fill up historical data
terra
.getNutrition({ userId: userid, startDate: new Date("2023-06-29"), endDate: new Date(), toWebhook: false })
  .then((p) => {
    console.log(p);
    res.send(p);
  })
  .catch((e) => console.log(e.status, e.message));
})

 // ?user_id=wow_a_new_user&reference_id=fun_identifier&resource=FITBIT

app.get('/getUserDataActivity', (req, res) => {
  terra
  .getActivity({
    userId: userid,
    startDate: new Date("2023-06-29"),
    endDate: new Date(),
    toWebhook: false
  })

  .then((p) => {
    console.log(p);
    res.send(p);
  })
  .catch((e) => console.log(e.status, e.message));
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

async function getAllInfo(userId) {
  try {
      const nutritionData = await terra.getNutrition({
          userId: userId,
          startDate: new Date("2023-03-29"),
          endDate: new Date(),
          toWebhook: false,
      });

      const activityData = await terra.getActivity({
          userId: userId,
          startDate: new Date("2023-03-29"),
          endDate: new Date(),
          toWebhook: false,
      });

      console.log(nutritionData);
      console.log(activityData);
  } catch (error) {
      console.error('Error in getAllInfo:', error);
  }
}


async function getDiagnosis (prompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);

  return chatCompletion.choices;
}

async function getWidgetSession(res) {
  terra.generateWidgetSession({
    referenceID: "helloHarvard",
    providers: ["CRONOMETER", "OURA"],
      authSuccessRedirectUrl: "http://localhost:3000/diagnosis",
      authFailureRedirectUrl: "http://localhost:3000/diagnosis",
      language: 'en'
  })
  .then((s) => {
    console.log(s);
    // res.send(s);
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
    return json;
  } catch (error) {
    console.error(error);
  }
}

app.post('/sms', express.json(), (req, res) => {
  const body = req.body.body;
  const from = req.body.from;
  const to = req.body.to;

  if (!from || !to || !body) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Add debugging output
  console.log('Received SMS data:', { body, from, to });

  notifyPatient(body, from, to);
  getAllInfo(reference_id);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.send(terra.getUser(reference_id));
});


async function notifyPatient(body, from, to) {
  try {
    client.messages
    .create({
       body: body,
       from: from,
       to: to
     });
     console.log(message.sid);
  } catch (error) {
    console.error('Error in notifyPatient:', error);
  }
}

function main () {
  //terra.authUser();
  
}

main();