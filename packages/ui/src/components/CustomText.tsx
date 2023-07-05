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

  if (typeof text !== 'string') {
    return null; // Or return a default value or throw an error, as appropriate for your use case
  }
  
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
          return <Paragraph col='$blue8Light' >{part}</Paragraph>;
        } else if (isStrikeThrough) {
          return <Paragraph col={color} textDecorationLine="line-through">{part}</Paragraph>;
        } else if (isBold) {
          return <Paragraph col={color} fontFamily="$bodyBold" >{part}</Paragraph>;
        } else if (isUnderline) {
          return <Paragraph col={color} textDecorationLine="underline" >{part}</Paragraph>;
        } else if (isItalic) {
          return <Paragraph col={color} fontStyle="italic" >{part}</Paragraph>;
        } else {
          return <Paragraph col={color}>{part}</Paragraph>;
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
    <Paragraph ta="left">
      {parseAndRenderText(text, col)}
    </Paragraph>
  );
}

export const H1Custom: React.FC<CustomProps> = ({ text, col }) => {
  return (
    <H1 ta="left">
      {parseAndRenderText(text, col)}
    </H1>
  );
}

export const H2Custom: React.FC<CustomProps> = ({ text, col }) => {
  return (
    <H2 ta="left">
      {parseAndRenderText(text, col)}
    </H2>
  );
}

// This is not H3 actualy it is Paragraph Bold
export const H3Custom: React.FC<CustomProps> = ({ text, col }) => {
  return (
    <Paragraph fontFamily="$bodyBold" ta="left">
      {parseAndRenderText(text, col)}
    </Paragraph>
  );
}