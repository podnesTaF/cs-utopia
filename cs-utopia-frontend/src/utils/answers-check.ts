import { IAnswer } from "../models/IAnswer";
import { DraggableAnswer } from "../models/IResult";

export const countSingleAnswerPoints = (chosenAnswer?: IAnswer) => {
  return chosenAnswer?.isCorrect ? 1 : 0;
};

export const countMultiplePoints = (chosenAnswers?: IAnswer[]) => {
  let points = 0;
  chosenAnswers?.forEach((answer) => {
    if (answer.isCorrect) {
      points += 1;
    }
  });
  return points;
};

export const countOwnAnswerPoints = (
  correctAnswer: string,
  ownAnswer?: string
) => {
  return ownAnswer === correctAnswer ? 1 : 0;
};

export const countOrderPoints = (chosenAnswers?: IAnswer[]) => {
  let count = 0;
  chosenAnswers?.forEach((answer, index) => {
    if (answer.position === index) {
      count += 1;
    }
  });
  return count;
};

export const countDraggablePoints = (
  emptyBoxes: string[],
  chosenAnswers?: DraggableAnswer[]
) => {
  let count = 0;
  chosenAnswers?.forEach((box, index) => {
    count += box.answers.filter((answer) => answer.box === box.name).length;
  });

  return count;
};
