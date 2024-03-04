function UseFormatLargeNumbers(value: number): string {
  // Define the value for a million, billion, etc.
  const million = 1e6;
  const billion = 1e9;
  const trillion = 1e12;

  // Determine the size of the number and format it with the appropriate abbreviation.
  if (value < million) {
    return value.toLocaleString("en-US");
  } else if (value >= million && value < billion) {
    return (value / million).toFixed(1) + "M";
  } else if (value >= billion && value < trillion) {
    return (value / billion).toFixed(1) + "B";
  } else {
    return (value / trillion).toFixed(1) + "T";
  }
}

export default UseFormatLargeNumbers;
