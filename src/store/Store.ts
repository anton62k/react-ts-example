import { action, computed, observable } from "mobx";
import { IStore, CharStat } from "./IStore";

export class Store implements IStore {
  @computed get chars(): CharStat[] {
    const chars: CharStat[] = [...this.map.entries()].map(([key, value]) => ({
      char: key,
      count: value
    }));
    chars.sort(this.sortCharStat);
    return chars;
  }

  @action
  setValue(value: string): void {
    const map: Map<string, number> = this.getCharStatMapper(value);
    this.updateMap(map);
  }

  @action
  setAllowedChars(value: string): void {
    this._allowedChars = this.getUniqChars(value);
  }

  @computed
  get allowedChars(): string[] {
    return Object.keys(this._allowedChars).sort();
  }

  private getCharStatMapper(value: string): Map<string, number> {
    const mapper: Map<string, number> = new Map<string, number>();

    const chars: string[] = value.split("");

    chars.forEach(char => {
      if (this._allowedChars[char]) {
        mapper.set(char, (mapper.get(char) || 0) + 1);
      }
    });

    return mapper;
  }

  private updateMap(newMap: Map<string, number>): void {
    this.map.forEach((value, key) => {
      if (!newMap.has(key)) {
        this.map.delete(key);
      }
    });

    newMap.forEach((value, key) => {
      this.map.set(key, value);
    });
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

  @observable private map: Map<string, number> = new Map<string, number>();

  private _allowedChars: AllowedChars = {};
}

type AllowedChars = { [key: string]: true };
