const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "YOUR_TOKEN",
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
        write a description for the api 

        paths:
          /slots:
            post:
              operationId: get_slots
              responses:
                200:
                  description: list of available slots
                  content:
                    application/json:
                      schema:
                        type: object
                        properties:
                          text:
                              type: string
              requestBody:
                content:
                  application/x-www-form-urlencoded:
                    schema:
                      $ref: "#/components/schemas/Slack"


        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
	console.log("Answer: ", parsedResponse.A);
};

runPrompt();