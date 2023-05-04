import { H4, Square } from "tamagui";
import React from "react";

export function SquareText({text}) {
  return (
    <Square paddingHorizontal="$4" bc="$backgroundFocus">
      <H4 col="$background"> {text} </H4>
    </Square>
  )
} 