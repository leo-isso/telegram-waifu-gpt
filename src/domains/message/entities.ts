import { ChatCompletionResponseMessageRoleEnum } from "openai";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Chat } from "../chat/entities";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  role: ChatCompletionResponseMessageRoleEnum;

  @Column()
  message: string;

  @Column()
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}