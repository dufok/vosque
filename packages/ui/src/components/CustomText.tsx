import { Paragraph, H1, H2, H3 } from 'tamagui';
import React from "react";

function parseAndRenderText(text) {

  if (typeof text !== 'string') {
    console.error('text must be a string, but got', typeof text);
    return null; // Or return a default value or throw an error, as appropriate for your use case
  }
  
  const parts = text.split(/(\*\/|\/\*|~)/);
  let isBlue = false;
  let isStrikeThrough = false;
  return parts.map((part, index) => {
    if (part === '*/' || part === '/*') {
      isBlue = !isBlue;
      return null;
    } else if (part === '~') {
      isStrikeThrough = !isStrikeThrough;
      return null;
    }
    if (isBlue) {
      return <Paragraph col='$blue8Light' >{part}</Paragraph>;
    } else if (isStrikeThrough) {
      return <span style={{ textDecoration: 'line-through' }}>{part}</span>;
    } else {
      return part;
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

export const H3Custom = ({ text }) => {
  return (
    <H3 ta="left">
      {parseAndRenderText(text)}
    </H3>
  );
}