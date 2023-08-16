import { Paragraph, H5, YStack, XStack, useWindowDimensions } from "tamagui";
import React, { useRef, useState, useEffect } from "react";
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
  const tableRef = useRef<HTMLTableElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    if (tableRef.current) {
      const tableWidth = tableRef.current.offsetWidth;
      if (tableWidth > windowWidth) {
        setScaleFactor(windowWidth / tableWidth);
      } else {
        setScaleFactor(1);
      }
    }
  }, [windowWidth, table]); // Recalculate when window size or table content changes

  return (
    <YStack marginHorizontal="$6" mb="$10" w="100%" f={1} maw={800}>
      <table style={{ 
        border: "2px solid #83503C", 
        borderCollapse: "collapse",
        transform: `scale(${scaleFactor})`,
        transformOrigin: '0 0'
      }}>
        <tbody>
          <tr>
            <td colSpan={maxColumns} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
              <XStack jc="center">
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
                    <div>
                      {row.name?.split("\n").map((line, i) => (
                        <YStack key={i} style={{ textAlign: "center" }}>
                          <ParagraphCustom text={line}/>
                        </YStack>
                      ))}
                    </div>
                  </td>
                  {row.data.map((cell, index) => (
                    <td key={index} style={{ border: "2px solid #83503C", padding: "10px", textAlign: "center" }}>
                      <div>
                        { cell.split("\n").map((line, i) => (
                          <YStack key={i} style={{ textAlign: "center" }}>
                            <ParagraphCustom text={line}/>
                          </YStack>
                        ))}
                      </div>
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
