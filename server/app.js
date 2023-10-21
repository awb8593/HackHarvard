const express = require('express');
const fs = require('fs');
const OpenAI = require('openai');
const auth = require('./authentication.js');


const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const openai = new OpenAI({
  apiKey: auth.openai_key, // defaults to process.env["OPENAI_API_KEY"]
});

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