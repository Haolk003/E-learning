const convertDuration = (duration: number) => {
  if (duration < 60) {
    return `${duration.toFixed(2)} seconds`;
  } else if (duration < 3600) {
    return `${(duration / 60).toFixed(2)} minutes`;
  } else {
    return `${(duration / 3600).toFixed(2)} hours`;
  }
};

export default convertDuration;
