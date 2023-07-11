import { Spinner } from "tamagui";
import React from "react";

export function SpinnerOver() {
  return (
    <div style={{
      position: 'fixed', // Use fixed position
      top: 0, // Position from the top
      left: 0, // Position from the left
      width: '100%', // Take up full width
      height: '100%', // Take up full height
      display: 'flex', // Use flex for centering
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 8px )',
      backgroundColor: 'rgba( 255, 255, 255, 0.25 )', // Semi-transparent background
      zIndex: 1000, // High z-index to overlay everything
    }}>
      <Spinner size="large" color="$backgroundFocus" />
    </div>
  );
} 