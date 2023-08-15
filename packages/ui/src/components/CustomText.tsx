import { Paragraph, H1, H2, H3 } from 'tamagui';
import React from "react";

/// dufok and gpt was here (^.^')

/// This component is used to parse and render text with custom styles
/// The text is parsed by the following rules:
/// - `*/` and `/*` are used to toggle blue color
/// - `~` is used to toggle strike-through
/// - `^` is used to toggle bold
/// - `_` is used to toggle underline
/// - `*` is used to toggle italic
/// - Any other text is rendered as-is
///

function parseAndRenderText(text, color) {
  
  const parts = text.split(/(\*\/|\/\*|~|\^|_|\*)/);
  let isBlue = false;
  let isStrikeThrough = false;
  let isBold = false;
  let isUnderline = false;
  let isItalic = false;

  return parts.map((part, index) => {
    switch(part) {
      case '*/':
      case '/*':
        isBlue = !isBlue;
        return null;
      case '~':
        isStrikeThrough = !isStrikeThrough;
        return null;
      case '^':
        isBold = !isBold;
        return null;
      case '_':
        isUnderline = !isUnderline;
        return null;
      case '*':
        isItalic = !isItalic;
        return null;
      default:
        if (isBlue) {
          return <Paragraph key={index} col='$blue8Light' >{part}</Paragraph>;
        } else if (isStrikeThrough) {
          return <Paragraph key={index} col={color} textDecorationLine="line-through">{part}</Paragraph>;
        } else if (isBold) {
          return <Paragraph key={index} col={color} fontFamily="$bodyBold" >{part}</Paragraph>;
        } else if (isUnderline) {
          return <Paragraph key={index} col={color} textDecorationLine="underline" >{part}</Paragraph>;
        } else if (isItalic) {
          return <Paragraph key={index} col={color} fontStyle="italic" >{part}</Paragraph>;
        } else {
          return <Paragraph key={index} col={color}>{part}</Paragraph>;
        }
    }
  });
}

interface CustomProps {
  text: string;
  col?: string;
}

export const ParagraphCustom: React.FC<CustomProps> = ({ text, col }) => {
  return (
    <div>
      {parseAndRenderText(text, col)}
    </div>
  );
}