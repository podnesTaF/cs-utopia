import { IAnswer } from "@/models/IAnswer";
import { DraggableAnswer } from "@/models/IResult";
import { reorderOptions } from "@/utils/draggable-events";
import { Box, Divider, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState} from "react";
import { Droppable } from "react-beautiful-dnd";
import DragAnswer from "./DragAnswer";
import DragBox from "./DragBox";
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((module) => module.DragDropContext),
  { ssr: false }
);

interface DragSectionProps {
  boxNames: string[];
  setSelection?: Function;
  answers: IAnswer[];
  questionId: number;
  correctAnswer?: DraggableAnswer[];
  userAnswer?: DraggableAnswer[];
}

const DragSection: React.FC<DragSectionProps> = ({
  boxNames,
  setSelection,
  answers,
  questionId,
  userAnswer,
  correctAnswer,
}) => {
  const [boxes, setBoxes] = useState<any[]>(
    userAnswer ||
      boxNames.map((box: string, index: number) => ({
        id: index,
        name: box,
        answers: [],
      }))
  );
  const [options, setOptions] = useState<IAnswer[]>(answers);

  function handleDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // reorder the items within the same box
      if (source.droppableId === "options") {
        setOptions((prev) => reorderOptions(source, destination, prev));
      } else {
        const boxIndex = parseInt(source.droppableId);
        const box = boxes[boxIndex];
        const [removed] = box.answers.splice(source.index, 1);
        box?.answers.splice(destination.index, 0, removed);
        setBoxes([...boxes]);
      }
    } else if (
      !isNaN(parseInt(source.droppableId)) &&
      !isNaN(parseInt(destination.droppableId))
    ) {
      // move the item from one box to another
      const sourceBoxIndex = parseInt(source.droppableId);
      const destinationBoxIndex = parseInt(destination.droppableId);
      const sourceBox = boxes[sourceBoxIndex];
      const destinationBox = boxes[destinationBoxIndex];
      const [removed] = sourceBox.answers.splice(source.index, 1);
      destinationBox.answers.splice(destination.index, 0, removed);
      setBoxes([...boxes]);
    } else {
      if (source.droppableId === "options") {
        const [removedOption] = options.splice(source.index, 1);
        const [box] = boxes.splice(parseInt(destination.droppableId), 1);
        box.answers.push(removedOption);
        boxes.splice(parseInt(destination.droppableId), 0, box);
        setBoxes([...boxes]);
      } else {
        const sourceBoxIndex = parseInt(source.droppableId);
        const sourceBox = boxes[sourceBoxIndex];
        const [removed] = sourceBox.answers.splice(source.index, 1);
        const destinationIndex = destination.index;
        options.splice(destinationIndex, 0, removed);
        setOptions([...options]);
      }
    }
  }

  useEffect(() => {
    if (setSelection) {
      setSelection((prev: any) => ({ ...prev, [questionId]: boxes }));
    }
  }, [boxes]);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ width: "45%" }}>
          {userAnswer && <Typography variant="h3" color={'textPrimary'}>Your answer</Typography>}
          {boxes.map((box: any) => (
            <DragBox
              key={box.id}
              box={box}
              isFinished={!!userAnswer}
            />
          ))}
        </Box>
        {!correctAnswer ? (
          <Box
            sx={{ p: 3, width: "45%", boxShadow: "0 0 8px rgba(0,0,0,0.25)" }}
          >
            <Typography variant="h4" color={'textPrimary'} sx={{ mb: 2, textTransform: "uppercase" }}>
              Options
            </Typography>
            <Divider />
            <Droppable droppableId="options">
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    height: "100%",
                    px: 2,
                    mt: 3,
                  }}
                >
                  {options.length > 0 ? (
                    options.map((answer: IAnswer, index: number) => (
                      <DragAnswer
                        key={answer.id}
                        answer={answer}
                        index={index}
                      />
                    ))
                  ) : (
                    <Typography
                      variant="h4"
                      sx={{
                        color: "lightgrey",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      You dropped all options
                    </Typography>
                  )}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ) : (
          <Box sx={{ width: "45%" }}>
            {correctAnswer && (
              <Typography variant="h3" color="textPrimary">Correct answer</Typography>
            )}
            {correctAnswer.map((box: any) => (
              <DragBox
                key={box.id}
                box={box}
                isAnswer={true}
                isFinished={!!correctAnswer}
              />
            ))}
          </Box>
        )}
      </DragDropContext>
    </Box>
  );
};

export default DragSection;
