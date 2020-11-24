export const makeUpdateSentence = (weekDay: string, prevWeekDay: string) => (
  sentence: string
) => {
  if (!sentence) {
    return sentence;
  }

  return sentence.replace(
    `jak w przepisie na ${prevWeekDay}`,
    `jak w przepisie na ${weekDay}`
  );
};
