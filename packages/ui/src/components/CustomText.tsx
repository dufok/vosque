import { Paragraph, H1, H2, H3 } from 'tamagui';
import React from "react";

function parseAndRenderText(text) {

  if (typeof text !== 'string') {
    return null; // Or return a default value or throw an error, as appropriate for your use case
  }
  
  const parts = text.split(/(\*\/|\/\*|~|\^|_)/);
  let isBlue = false;
  let isStrikeThrough = false;
  let isBold = false;
  let isUnderline = false;

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
      default:
        if (isBlue) {
          return <Paragraph col='$blue8Light' >{part}</Paragraph>;
        } else if (isStrikeThrough) {
          return <span style={{ textDecoration: 'line-through' }}>{part}</span>;
        } else if (isBold) {
          return <Paragraph fontFamily="$bodyBold" >{part}</Paragraph>;
        } else if (isUnderline) {
          return <Paragraph textDecorationLine="underline" >{part}</Paragraph>;
        } else {
          return <Paragraph>{part}</Paragraph>;
        }
    }
  });
}

export const ParagraphCustom = ({ text }) => {
  return (
    <Paragraph ta="left">
      {parseAndRenderText(text)}
    </Paragraph>
  );
}

export const ParagraphCustomMorron = ({ text }) => {
  return (
    <Paragraph col="$borderColor" ta="left">
      {parseAndRenderText(text)}
    </Paragraph>
  );
}

export const ParagraphCustomGreen = ({ text }) => {
  return (
    <Paragraph col="$backgroundPress" ta="left">
      {parseAndRenderText(text)}
    </Paragraph>
  );
}


export const H1Custom = ({ text }) => {
  return (
    <H1 ta="left">
      {parseAndRenderText(text)}
    </H1>
  );
}

export const H2Custom = ({ text }) => {
  return (
    <H2 ta="left">
      {parseAndRenderText(text)}
    </H2>
  );
}

// This is not H3 actualy it is Paragraph Bold
export const H3Custom = ({ text }) => {
  return (
    <Paragraph fontFamily="$bodyBold" ta="left">
      {parseAndRenderText(text)}
    </Paragraph>
  );
}