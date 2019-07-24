export interface IStore {
  chars: CharStat[];
  setValue(value: string): void;
  allowedChars: string[];
  setAllowedChars(value: string): void;
}

export type CharStat = { char: string; count: number };
