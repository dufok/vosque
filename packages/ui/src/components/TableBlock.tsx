import { Paragraph, H5, YStack, XStack } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";
import { HelpComp } from "@my/ui/src/components/HelpComp";

/// dufok and gpt was here (^.^')
///
/// Json structure:
/// "tableBlock3": {
///   "header": "Querer - хотеть",
///   "help": "любить о человеке = te quiero mucho",
///   "rows": [
///     {
///       "name": "yo",
///       "data": [
///         "quiero", "test1", "test2"
///         ]
///    },
///    {
///        "name": "vos",
///        "data": [
///          "querés", "test1", "test2"
///         ]
///     }
///   ]
/// }

export type Row = {
  name?: string;
  data: string[];
  spanAllColumns?: boolean;
};

export type Table = {
  header: string;
  rows: Row[];
  help?: string[];
};

interface TableBlockProps {
  table: Table;
}

export const TableBlock: React.FC<TableBlockProps> = ({ table }) => {
  const maxColumns = Math.max(...table.rows.map(row => row.data.length + (row.name ? 1 : 0)));
  return (
    <YStack marginHorizontal="$6" mb="$4" w="100%" f={1} maw={800}>
      <table style={{ border: "2px solid #83503C", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td colSpan={maxColumns} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
              <XStack>
                <H5 tt="uppercase" ta="center">{table.header}</H5>
                {table.help && <HelpComp texts={table.help} html="help" />}
              </XStack>
            </td>
          </tr>
          {table.rows.map((row, index) => (
            <tr key={index}>
              {row.spanAllColumns ? (
                <td colSpan={table.rows.length} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                  <H5 tt="uppercase" dangerouslySetInnerHTML={{ __html: row.data[0].replace(/\n/g, "<br />") }} />
                </td>
              ) : (
                <>
                  <td style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                    <Paragraph p="$6">
                      {row.name?.split("\n").map((line, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                          <ParagraphCustom text={line}/>
                        </div>
                      ))}
                    </Paragraph>
                  </td>
                  {row.data.map((cell, index) => (
                    <td key={index} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                      <Paragraph p="$6">
                        { cell.split("\n").map((line, i) => (
                          <div key={i} style={{ textAlign: "center" }}>
                            <ParagraphCustom text={line}/>
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
