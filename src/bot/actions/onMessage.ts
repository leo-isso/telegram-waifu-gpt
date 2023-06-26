import { IBotActions } from "./BotActionsInterface";
import BaseAction from "./BaseAction";

class OnMessageAction extends BaseAction implements IBotActions {
  private message: string | null = null;

  constructor(userId: number, newMessage?: string) {
    super(userId, newMessage);
  }

  getMessage(): string | null {
    return this.message;
  }

  protected setMessage(message: string): void {
    this.message = message;
  }

  async processMessage(): Promise<void> {
    const chat = await super.getOrCreateChat();
    const latestPrompts = await super.getLatestMessages(chat.id);
    const newPrompt = super.getNewMessageAsCompletionMessage();
    const prompts = super.composeMessages(newPrompt, latestPrompts);
    const AIResponse = await super.getAIResponse(prompts);

    if (AIResponse) {
      this.setMessage(AIResponse.content);
      const newMessages = super.composeMessages([...newPrompt, AIResponse], [], false);
      await super.cacheMessages(chat.id, newMessages);
      await super.saveMessages(chat.id, newMessages);
    } else {
      this.setMessage("Sorry, an error occurred.");
    }
  }
}

export default OnMessageAction;
