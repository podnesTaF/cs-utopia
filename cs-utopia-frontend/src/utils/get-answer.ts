import { IQuestion } from "../models/IQuestion";

export const getCorrectAnswer = (question: IQuestion) => {
  if (question.type === "single" && question.answers.length > 1) {
    return question.answers.find((answer) => answer.isCorrect)!.id;
  } else if (question.type === "multiple") {
    return question.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => answer.id);
  } else if (question.type === "single") {
    return question.answers[0].text;
  } else if (question.type === "order") {
    return question.answers.map((answer) => answer.position);
  } else if (question.type === "dragable") {
    const boxes = question.boxes!.trim().split(",");
    const c = boxes.map((box, i) => ({
      id: i,
      name: box,
      answers: question.answers.filter((answer) => answer.box === box),
    }));
    return c;
  }
};
