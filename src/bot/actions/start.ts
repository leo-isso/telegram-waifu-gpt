import { ChatCompletionMessage } from "../../domains/message/messages.types";
import { IBotActions } from "./BotActionsInterface";
import BaseAction from "./BaseAction";

const START_PROMPT: ChatCompletionMessage = {
  role: "system",
  content: "Introduce yourself, greet the user, and ask him how he is doing."
};

class StartAction extends BaseAction implements IBotActions {
  private message: string | null = null;

  constructor(userId: number) {
    super(userId);
  }

  getMessage(): string | null {
    return this.message;
  }

  protected setMessage(message: string): void {
    this.message = message;
  }

  async processMessage(): Promise<void> {
    const chat = await super.getOrCreateChat();
    const prompts = super.composeMessages([START_PROMPT]);
    const AIResponse = await super.getAIResponse(prompts);

    if (AIResponse) {
      this.setMessage(AIResponse.content);
      const newMessages = [...prompts, AIResponse];
      await super.saveMessages(chat.id, newMessages);
    } else {
      this.setMessage("Sorry, an error occurred.");
    }
  }
}

export default StartAction;
