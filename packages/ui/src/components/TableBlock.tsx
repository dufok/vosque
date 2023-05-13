import { Paragraph, YStack } from "tamagui";
import React from "react";

export type Tables = {
  name: string;
  row1: string;
  row2: string;
  row3: string;
  row4: string;
};

interface TableBlockProps {
  tables: Tables[];
}

export const TableBlock: React.FC<TableBlockProps> = ({ tables }) => {
  return (
    <table>
      <tbody>
        {tables.map((table, index) => (
          <React.Fragment key={index}>
            <tr>
              <th>{table.name}</th>
            </tr>
            {["row1", "row2", "row3", "row4"].map((rowKey) => (
              table[rowKey] && (
                <tr key={rowKey}>
                  <td>{table[rowKey]}</td>
                </tr>
              )
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};








