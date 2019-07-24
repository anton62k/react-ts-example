import React, { Component } from "react";
import { observer } from "mobx-react";
import { IStore } from "../../store/IStore";
import ReactMinimalPieChart from "react-minimal-pie-chart";

export interface CharPieProps {
  store: IStore;
}

@observer
export class CharPie extends Component<CharPieProps> {
  public render(): React.ReactNode {
    const store = this.props.store;

    const data: {
      title: string;
      value: number;
      color: string;
      key: string;
    }[] = store.chars.map(item => ({
      title: item.char,
      value: item.count,
      key: item.char,
      color: getColorByChar(item.char)
    }));

    return (
      <ReactMinimalPieChart
        data={data}
        label={({ data, dataIndex }) =>
          Math.round(data[dataIndex].percentage) + "%"
        }
        lineWidth={15}
        labelPosition={70}
        labelStyle={{
          fontSize: "5px",
          fontFamily: "sans-serif",
          fill: "#000000"
        }}
      />
    );
  }
}

const colors: { [field: string]: string } = {};

function getColorByChar(char: string): string {
  if (!colors[char]) {
    const color: string = `#${Math.round(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;

    colors[char] = color;
  }

  return colors[char];
}
