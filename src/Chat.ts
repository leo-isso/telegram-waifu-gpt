import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gptChatId: number;

  @Column()
  userId: boolean;
}