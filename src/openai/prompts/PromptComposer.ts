import PersonalityPrompt from "../../openai/personalityPrompt";
import { ChatCompletionMessage } from "../../domains/message/messages.types";
import Personality from "../personality";

class PromptComposer {
  private includePersonality: boolean;
  private latestPrompts: ChatCompletionMessage[] | null;
  private personalityPrompt: PersonalityPrompt;
  private newPrompts: ChatCompletionMessage[];

  constructor(
    personality: Personality,
    newPrompts: ChatCompletionMessage[],
    latestPrompts: ChatCompletionMessage[] | null = null,
    includePersonality = true
  ) {
    this.newPrompts = newPrompts;
    this.latestPrompts = latestPrompts;
    this.includePersonality = includePersonality;
    this.personalityPrompt = new PersonalityPrompt(personality);
  }

  compose() {
    let composedPrompt: ChatCompletionMessage[] = [];
    if (this.includePersonality) {
      composedPrompt = [...composedPrompt, ...this.personalityPrompt.getPersonalityPrompt()];
    }
    if (this.latestPrompts && this.latestPrompts.length > 0) {
      composedPrompt = [...composedPrompt, ...this.latestPrompts];
    }
    composedPrompt = [...composedPrompt, ...this.newPrompts];

    return composedPrompt;
  }

}

export default PromptComposer;
