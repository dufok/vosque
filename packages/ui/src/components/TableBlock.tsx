import { Paragraph, YStack, XStack } from "tamagui";
import React from "react";

export type Tables = {
  name: string;
  row1?: string;
  row2?: string;
  row3?: string;
  row4?: string;
};

interface TableBlockProps {
  tables: Tables[];
}

export const TableBlock: React.FC<TableBlockProps> = ({ tables }) => {
  return (
    <YStack m="$6">
      <table style={{ border: "1px solid #0E171A", borderCollapse: "collapse" }}>
          <tbody>
              {["name", "row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8"].map((rowKey, index) => (
                <tr key={index}>
                  {tables.map((table, index) => (
                    table[rowKey] && (
                      <td key={index} style={{ border: "1px solid #0E171A", padding: "10px" }}>{table[rowKey]}</td>
                    )
                  ))}
                </tr>
              ))}
          </tbody>
      </table>
    </YStack>
  );
};








