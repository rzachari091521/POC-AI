const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

const response_example = {
  "changes_made": [
    {
      "path": "",
      "value": ""
    }
  ]
}

const runPrompt = async () => {
  const openapi = require('./openapi.json');
	const prompt = `
    For the below openAPI spec add summary, description and operationIds wherever possible, do not return the updated spec, rather return the changes made or the diff generated as a json.
    ${JSON.stringify(openapi)}. Give the response in the json format:${JSON.stringify(response_example)}, where changes_made is an array of objects with keys path and value. Path indicates the position where the summary or description has been added. 
    value indicates the suggested changes. 
  `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 0.45,
	});

	const parsableJSONresponse = response.data.choices[0].text;

  console.log(require('util').inspect({parsableJSONresponse}, { depth: null }));
};

runPrompt();