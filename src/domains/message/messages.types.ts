import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from "openai";

export type ChatCompletionMessage = ChatCompletionRequestMessage | ChatCompletionResponseMessage;
