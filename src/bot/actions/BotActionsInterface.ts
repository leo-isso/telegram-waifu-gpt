export interface IBotActions {
  userId: number,
  getMessage(): string | null,
  processMessage(): Promise<void>,
}
