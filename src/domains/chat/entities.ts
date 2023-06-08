import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";

import { Message } from "../message/entities";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: number;

  @OneToMany(() => Message, message => message.chat)
  messages: Relation<Message>[];
}
