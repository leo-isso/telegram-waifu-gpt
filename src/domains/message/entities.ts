import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from "typeorm";

import { Chat } from "../chat/entities";
import { ChatCompletionMessage } from "./messages.types";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  role: ChatCompletionMessage;

  @Column()
  message: string;

  @Column()
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Relation<Chat>;

  // createdAt as Timestamp
  @Column({ type: "integer" })
  createdAt: number;
}
