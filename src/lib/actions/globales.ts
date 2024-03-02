export const isValidResult = (char: string, result: string) => {
  return (
    char === result ||
    (char === 'U' && result === 'R') ||
    (char === 'R' && result === 'U') ||
    (char === 'N' && result === 'M') ||
    (char === 'M' && result === 'N') ||
    (char === 'P' && result === 'Q')
  );
};
