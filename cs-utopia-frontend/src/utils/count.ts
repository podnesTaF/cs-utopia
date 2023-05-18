import { IAnswer } from "@/models/IAnswer";
import { IQuestion } from "@/models/IQuestion";

export const countPercentage = (results: any, questions: IQuestion[]) => {
  let total = questions.reduce(
    (acc, question) => acc + defineOutOf(question.answers, question.type),
    0
  );
  const correct = Object.keys(results).reduce(
    (acc, result) => acc + results[result].points,
    0
  );
  return +Math.round((correct / total) * 100).toFixed(2);
};

export const defineOutOf = (answers: IAnswer[], type: any) => {
  switch (type) {
    case "single":
      return 1;
    case "multiple":
      return answers.filter((answer) => answer.isCorrect).length;
    case "order":
      return answers.filter((answer) => answer.isCorrect).length;
    case "dragable":
      return answers.filter((answer) => answer.isCorrect).length;
    default:
      return 0;
  }
};

export const defineColor = (percentage: number) => {
  if (percentage < 50) {
    return "#69bb7b";
  } else if (percentage >= 50 && percentage < 80) {
    return "#ff9900";
  } else {
    return "#ff0000";
  }
};
