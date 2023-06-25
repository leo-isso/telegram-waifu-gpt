import PersonalityPrompt from "../../openai/personalityPrompt";
import nyanna from "../../openai/personalities/nyanna";
import { ChatCompletionMessage } from "../../domains/message/messages.types";

class PromptComposer {
  private includePersonality: boolean;
  private latestPrompts: ChatCompletionMessage[] | null;
  private personalityPrompt = new PersonalityPrompt(nyanna).getPersonalityPrompt();
  private newPrompts: ChatCompletionMessage[];

  constructor(
    newPrompts: ChatCompletionMessage[],
    latestPrompts: ChatCompletionMessage[] | null=null,
    includePersonality=true) {
    this.newPrompts = newPrompts;
    this.latestPrompts = latestPrompts;
    this.includePersonality = includePersonality;
  }
  
  compose() {
    let composedPrompt: ChatCompletionMessage[] = [];
    if (this.includePersonality) {
      composedPrompt = [...composedPrompt, ...this.personalityPrompt];
    }
    if (this.latestPrompts && this.latestPrompts.length > 0) {
      composedPrompt = [...composedPrompt, ...this.latestPrompts];
    }
    composedPrompt = [...composedPrompt, ...this.newPrompts]

    return composedPrompt;
  }

}

export default PromptComposer;
