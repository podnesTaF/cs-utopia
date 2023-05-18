import { IAnswer } from "../models/IAnswer";
import { IQuestion } from "../models/IQuestion";
import {
  countDraggablePoints,
  countMultiplePoints,
  countOrderPoints,
  countOwnAnswerPoints,
  countSingleAnswerPoints,
} from "./answers-check";
import { getCorrectAnswer } from "./get-answer";

export const addAnswers = (
  question: IQuestion,
  selection: any,
  setResults: Function
): void => {
  switch (question.type) {
    case "single":
      if (question.answers.length === 1) {
        setResults((prev: any) => ({
          ...prev,
          [question.id]: {
            answer: selection[question.id],
            points: countOwnAnswerPoints(
              selection[question.id],
              question.answers[0].text
            ),
          },
        }));
      } else {
        const selected = question.answers.filter(
          (answer: any) => selection[question.id] === answer.id
        )[0];
        setResults((prev: any[]) => ({
          ...prev,
          [question.id]: {
            answer: selection[question.id],
            points: countSingleAnswerPoints(selected),
          },
        }));
      }
      break;
    case "multiple":
      const selected = question.answers.filter((answer: any) =>
        selection[question.id].includes(answer.id)
      );
      setResults((prev: any[]) => ({
        ...prev,
        [question.id]: {
          answer: selection[question.id],
          points: countMultiplePoints(selected),
        },
      }));
      break;
    case "order":
      let answer: IAnswer[];
      if (selection[question.id] && selection[question.id].length > 0) {
        answer = selection[question.id];
      } else {
        answer = question.answers;
      }
      const structuredAnswer = {
        answer,
        points: countOrderPoints(selection[question.id]),
      };
      setResults((prev: any[]) => ({
        ...prev,
        [question.id]: structuredAnswer,
      }));
      break;
    case "dragable":
      let emptyBoxes = getCorrectAnswer(question) as any[];
      emptyBoxes = emptyBoxes
        .filter((box: any) => box.answers.length === 0)
        .map((box: any) => box.name);
      const selectedAnswers = {
        answer: selection[question.id],
        points: countDraggablePoints(emptyBoxes, selection[question.id]),
      };
      setResults((prev: any[]) => ({
        ...prev,
        [question.id]: selectedAnswers,
      }));
      break;
  }
};
