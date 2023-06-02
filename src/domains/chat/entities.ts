import { Entity, Generated, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  chatId: number;

  @Column()
  userId: number;
}