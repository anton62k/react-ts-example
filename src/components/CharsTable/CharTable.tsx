import React, { Component } from "react";
import { observer } from "mobx-react";
import { IStore } from "../../store/IStore";
import { Table } from "antd";

export interface CharTableProps {
  store: IStore;
}

@observer
export class CharTable extends Component<CharTableProps> {
  public render(): React.ReactNode {
    const store = this.props.store;
    const data = store.chars.slice();

    return data.length ? (
      <Table
        dataSource={store.chars.slice()}
        columns={columns}
        pagination={false}
      />
    ) : null;
  }
}

const columns = [
  {
    title: "Char",
    dataIndex: "char",
    key: "char"
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count"
  }
];
