import { ChatCompletionRequestMessageRoleEnum, ChatCompletionResponseMessageRoleEnum } from "openai";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from "typeorm";

import { Chat } from "../chat/entities";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  role: ChatCompletionResponseMessageRoleEnum | ChatCompletionRequestMessageRoleEnum;

  @Column()
  message: string;

  @Column()
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Relation<Chat>;

  // createdAt as Unix Timestamp
  @Column({ type: "integer" })
  createdAt: number;
}