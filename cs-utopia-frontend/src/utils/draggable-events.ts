import { IAnswer } from "@/models/IAnswer";

export type dragData = {
  index: number;
  droppableId: string;
};

export const reorderOptions = (
  source: dragData,
  destination: dragData,
  options: IAnswer[]
): IAnswer[] => {
  const sourceIndex = source.index;
  const destinationIndex = destination.index;
  const [removedOption] = options.splice(sourceIndex, 1);
  options.splice(destinationIndex, 0, removedOption);
  return options;
};
