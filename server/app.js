const express = require('express');
const fs = require('fs');
const OpenAI = require('openai');
const auth = require('./authentication.js');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes or configure it as needed.

// Importing the API and instantiating the client
const { default: Terra } = require("terra-api");
const terra = new Terra(auth.DEV_ID, auth.API_KEY, auth.SECRET);

const openai = new OpenAI({
  apiKey: auth.openai_key, // defaults to process.env["OPENAI_API_KEY"]
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const USER_ID = "harvardhack-testing-bvgOmUYqpi";

app.get('/', (req, res) => {
})

 
// Get data from start date to current time

app.get('/getData', (req, res) => {
  res.json({'message': 'Hello World'})
  terra
  .getNutrition({
    userId: USER_ID,
    startDate: new Date("2023-03-29"),
    endDate: new Date(),
    toWebhook: false,
  })
  terra
  .getActivity({
    userId: USER_ID,
    startDate: new Date("2023-03-29"),
    endDate: new Date(),
    toWebhook: false,
  })

  .then((p) => console.log(p))
  .catch((e) => console.log(e.status, e.message));
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

async function getDiagnosis (prompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);

  return chatCompletion.choices;
}

// export async function GET() {
//   const resp = await terra.generateWidgetSession({
//       referenceID: "HelloHarvard",
//       language: "en",
//       authSuccessRedirectUrl: "http://localhost:3000",
//       authFailureRedirectUrl: "http://localhost:3000"
//   })
//   return NextResponse.json({ url: resp.url }, { status: 200}); 
// }

function main () {
  terra.authUser();
}