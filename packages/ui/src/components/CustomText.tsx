import { Paragraph, H1, H2, H3 } from 'tamagui';
import React from "react";

function parseAndRenderText(text) {
  const parts = text.split(/(~|\*)/);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      if (part === '~') {
        return null;
      }
    } else if (index % 4 === 1) {
      return <span style={{ textDecoration: 'line-through' }}>{part}</span>;
    } else if (index % 4 === 3) {
      return <span style={{ color: 'blue' }}>{part}</span>;
    } else {
      return part;
    }
  });
}

export const ParagraphCustom = ({ text }) => {
  return (
    <Paragraph ta="center">
      {parseAndRenderText(text)}
    </Paragraph>
  );
}

export const H1Custom = ({ text }) => {
  return (
    <H1 ta="center">
      {parseAndRenderText(text)}
    </H1>
  );
}

export const H2Custom = ({ text }) => {
  return (
    <H2 ta="center">
      {parseAndRenderText(text)}
    </H2>
  );
}

export const H3Custom = ({ text }) => {
  return (
    <H3 ta="center">
      {parseAndRenderText(text)}
    </H3>
  );
}