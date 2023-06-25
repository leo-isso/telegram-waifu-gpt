export interface IBotActions {
  userId: number,
  message: string | null,
  processMessage(): Promise<void>,
}
