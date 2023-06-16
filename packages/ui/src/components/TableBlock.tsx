import { Paragraph, H5, YStack, XStack } from "tamagui";
import React from "react";

export type Row = {
  name?: string;
  data: string[];
  spanAllColumns?: boolean;
};

export type Table = {
  header: string;
  rows: Row[];
};

interface TableBlockProps {
  table: Table;
}

export const TableBlock: React.FC<TableBlockProps> = ({ table }) => {
  return (
    <YStack m="$6" w="100%" f={1} maw={800}>
      <table style={{ border: "2px solid #83503C", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td colSpan={table.rows.length} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
              <H5 tt="uppercase" ta="center">{table.header}</H5>
            </td>
          </tr>
          {table.rows.map((row, index) => (
            <tr key={index}>
              {row.spanAllColumns ? (
                <td colSpan={table.rows.length} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                  <Paragraph p="$6"  tt="uppercase" dangerouslySetInnerHTML={{ __html: row.data[0].replace(/\n/g, "<br />") }} />
                </td>
              ) : (
                <>
                  <td style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                    <Paragraph p="$6">
                      {row.name?.split("\n").map((line, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                          {line}
                        </div>
                      ))}
                    </Paragraph>
                  </td>
                  {row.data.map((cell, index) => (
                    <td key={index} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                      <Paragraph p="$6">
                        { cell.split("\n").map((line, i) => (
                          <div key={i} style={{ textAlign: "center" }}>
                            {line}
                          </div>
                        ))}
                      </Paragraph>
                    </td>
                  ))}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </YStack>
  );
};
