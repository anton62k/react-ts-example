import { action, computed, observable } from "mobx";
import { IStore, CharStat } from "./IStore";

export class Store implements IStore {
  @observable chars: CharStat[] = [];

  @action
  setValue(value: string): void {
    const mapper: CharStatMapper = this.getCharStatMapper(value);
    const chars: CharStat[] = this.getCharStat(mapper);
    chars.sort(this.sortCharStat);

    this.chars = chars;
  }

  @action
  setAllowedChars(value: string): void {
    this._allowedChars = this.getUniqChars(value);
  }

  @computed
  get allowedChars(): string[] {
    return Object.keys(this._allowedChars).sort();
  }

  private getCharStat(mapper: CharStatMapper): CharStat[] {
    return Object.entries(mapper).map(([key, value]) => ({
      char: key,
      count: value
    }));
  }

  private getCharStatMapper(value: string): CharStatMapper {
    const mapper: { [field: string]: number } = {};

    const chars: string[] = value.split("");

    chars.forEach(char => {
      if (this._allowedChars[char]) {
        if (!mapper[char]) {
          mapper[char] = 0;
        }

        mapper[char]++;
      }
    });

    return mapper;
  }

  private getUniqChars(value: string): AllowedChars {
    const chars: string[] = value.split("");

    return chars.reduce((chars: AllowedChars, item: string) => {
      chars[item] = true;
      return chars;
    }, {});
  }

  private sortCharStat(a: CharStat, b: CharStat): number {
    return a.char.charCodeAt(0) - b.char.charCodeAt(0);
  }

  private _allowedChars: AllowedChars = {};
}

export type AllowedChars = { [key: string]: true };

export type CharStatMapper = { [field: string]: number };
