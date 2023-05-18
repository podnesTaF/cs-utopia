import { IAnswer } from "@/models/IAnswer";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface DragAnswerProps {
  answer: IAnswer;
  index: number;
  isAnswer?: boolean;
  isFinished?: boolean;
}

const DragAnswer: React.FC<DragAnswerProps> = ({
  answer,
  index,
  isAnswer,
  isFinished,
}) => {
  return (
    <Draggable
      key={answer.id}
      draggableId={answer.id.toString()}
      isDragDisabled={isFinished}
      index={index}
    >
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            maxWidth: "100%",
            height: 'auto',
            overflowWrap: 'break-word',
            border: "1px solid black",
            p: 2,
            borderRadius: "5px",
            mb: 2,
            bgcolor: isAnswer
              ? "rgba(164, 114, 243, 0.1)"
              : "rgba(164, 114, 243, 0.3)",
          }}
        >
          <Typography variant="h5" color={'textPrimary'}>{answer.text}</Typography>
        </Box>
      )}
    </Draggable>
  );
};

export default DragAnswer;
