export type ResponseAnswer = {
  id: number;
  attributes: {
    isCorrect: boolean;
    text: string;
    position: number | null;
    box: string | null;
  };
};

export type IAnswer = {
  id: number;
  isCorrect: boolean;
  text: string;
  position: number | null;
  box: string | null;
};
