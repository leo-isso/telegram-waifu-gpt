import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi
} from "openai";

class OpenAI {
  private configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_API_ORG
  });
  private model = process.env.OPENAI_API_MODEL || "gpt-3.5-turbo";
  instance: OpenAIApi;

  constructor() {
    this.instance = new OpenAIApi(this.configuration);
  }

  async createChatCompletion(messages: ChatCompletionRequestMessage[]) {
    return await openai.instance.createChatCompletion({
      model: this.model,
      messages,
      temperature: 0.2,
    });
  }

}

const openai = new OpenAI();

export default openai;