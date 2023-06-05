import { ChatCompletionRequestMessage } from "openai";

import Personality from "./personality";

class PersonalityPrompt {
  personality: Personality;

  constructor(personality: Personality) {
    this.personality = personality;
  }

  private buildPrompt(prefix: string, prompts: string[]) {
    return prompts.reduce(
      (prev, curr) => {
        return `${prev}\n${curr}`;
      }, prefix);
  }

  getPersonalityPrompt(): ChatCompletionRequestMessage[] {
    const introduction = this.personality.introduction;
    const prompt: ChatCompletionRequestMessage[] = [];

    if (introduction) {
      prompt.push({ role: "system", content: introduction });
    }

    prompt.push({ role: "system", content: this.buildPrompt("You are:\n", this.personality.characteristics) });
    prompt.push({ role: "system", content: this.buildPrompt("Your behavior:\n", this.personality.behaviors) });
    prompt.push({ role: "system", content: this.buildPrompt("Your restrictions:\n", this.personality.restrictions) });

    return prompt;
  }
}

export default PersonalityPrompt;