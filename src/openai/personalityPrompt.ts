import { ChatCompletionRequestMessage } from "openai";

import Personality from "./personality";

class PersonalityPrompt {
  personality: Personality;

  constructor(personality: Personality) {
    this.personality = personality;
  }

  private buildPrompt(prefix: string, prompts: string[]) {
    const characteristicsText = prompts.reduce(
      (prev, curr) => {
        return `${prev}\n${curr}`;
      }, prefix);
    return characteristicsText;
  }

  getPersonalityPrompt(): ChatCompletionRequestMessage[] {
    const introduction = this.personality.introduction;
    const prompt: ChatCompletionRequestMessage[] = [];

    if (introduction) {
      prompt.push({ role: "system", content: introduction });
    }

    prompt.push({ role: "system", content: this.buildPrompt("You are:\n", this.personality.characteristics) });
    prompt.push({ role: "system", content: this.buildPrompt("Your behavior:\n", this.personality.characteristics) });
    prompt.push({ role: "system", content: this.buildPrompt("Your restrictions:\n", this.personality.characteristics) });

    return prompt;
  }
}

export default PersonalityPrompt;