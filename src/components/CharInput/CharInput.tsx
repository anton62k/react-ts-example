import React, { ChangeEvent, Component } from "react";
import { observer } from "mobx-react";
import { Input } from "antd";
import { observable } from "mobx";
import { IStore } from "../../store/IStore";

export interface CharInputProp {
  onChange: (value: string) => void;
  store: IStore;
}

@observer
export class CharInput extends Component<CharInputProp> {
  @observable
  private value: string = "";

  public render(): React.ReactNode {
    const { store } = this.props;
    const placeholder: string = `allowed chars: ${store.allowedChars}`;
    return (
      <Input
        placeholder={placeholder}
        value={this.value}
        onChange={this.onChange}
        allowClear
      />
    );
  }

  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.saveValue(e.target.value);
    this.notify();
  };

  private saveValue(value: string): void {
    this.value = value;
  }

  private notify(): void {
    const { onChange } = this.props;
    onChange(this.value);
  }
}
