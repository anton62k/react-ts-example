import React, { Component } from "react";
import styles from "./App.module.css";
import { inject } from "mobx-react";
import { CharInput } from "../CharInput/CharInput";
import { CharTable } from "../CharsTable/CharTable";
import { CharPie } from "../CharPie/CharPie";
import { IStore } from "../../store/IStore";

interface AppProps {
  store?: IStore;
}

@inject("store")
export class App extends Component<AppProps> {
  public render(): React.ReactNode {
    const store: IStore = this.props.store!;

    return (
      <div className={styles.root}>
        <div className={styles.item}>
          <CharInput store={store} onChange={this.onChangeChars} />
        </div>
        <div className={styles.item}>
          <CharTable store={store} />
        </div>
        <div>
          <CharPie store={store} />
        </div>
      </div>
    );
  }

  onChangeChars = (value: string) => {
    const store: IStore = this.props.store!;
    store.setValue(value);
  };
}
