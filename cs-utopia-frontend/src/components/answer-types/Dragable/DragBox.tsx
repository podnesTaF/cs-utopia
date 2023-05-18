import { IAnswer } from "@/models/IAnswer";
import { Box, Typography } from "@mui/material";
import React, {useContext} from "react";
import { Droppable } from "react-beautiful-dnd";
import DragAnswer from "./DragAnswer";
import {CustomThemeContext} from "@/context/theme-context";

interface DragBoxProps {
  box: any;
  isAnswer?: boolean;
  isFinished?: boolean;
}

const DragBox: React.FC<DragBoxProps> = ({
  box,
  isAnswer,
  isFinished,
}) => {
    const {theme} = useContext(CustomThemeContext);
  return (
    <Box
      sx={{
        border: "1px solid black",
        bgcolor: isAnswer
          ? theme?.palette?.success.light : theme?.palette?.primary.light,
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        mb: 3,
        p: 3,
        width: "100%",
      }}
    >
      <Droppable droppableId={box.id.toString()} key={box.id}>
        {(provided, snapshot) => (
          <Box>
            <Typography
              variant="h4"
              color="textPrimary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {box.name}
            </Typography>
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                py: 3,
                px: 2,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255, 0.2)",
              }}
            >
              {box.answers.length > 0 ? (
                box.answers.map((answer: IAnswer, index: number) => (
                  <DragAnswer
                    key={answer.id}
                    answer={answer}
                    index={index}
                    isFinished={isFinished}
                    isAnswer={true}
                  />
                ))
              ) : (
                <Typography variant="h4" sx={{ color: "lightgrey" }}>
                  Drop here
                </Typography>
              )}
              {provided.placeholder}
            </Box>
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default DragBox;
