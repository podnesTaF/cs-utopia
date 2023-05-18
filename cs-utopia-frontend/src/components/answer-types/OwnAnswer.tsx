import { Box, TextField } from "@mui/material";
import React, { useEffect } from "react";

interface OwnAnswerProps {
  setSelection?: Function;
  questionId: number;
  userAnswer?: any;
  correctAnswer?: any;
}

const OwnAnswer: React.FC<OwnAnswerProps> = ({
  questionId,
  setSelection,
  userAnswer,
  correctAnswer,
}) => {
  const [ownAnswer, setOwnAnswer] = React.useState<any>(userAnswer || "");

  useEffect(() => {
    if (!setSelection) return;
    setSelection((prev: any) => ({ ...prev, [questionId]: ownAnswer }));
  }, [ownAnswer]);

  const defineColor = () => {
    if (correctAnswer) {
      if (correctAnswer === ownAnswer) {
        return "success.main";
      } else {
        return "error.main";
      }
    } else {
      return "initial";
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", mt: 4 }}>
        <TextField
          label="Your answer"
          variant="standard"
          value={ownAnswer}
          fullWidth
          onChange={(e) => setOwnAnswer(e.target.value)}
          color={"secondary"}
          InputProps={{
            style: { color: "white" },
          }}
          disabled={!!correctAnswer}
        />
      </Box>
      {correctAnswer && (
        <Box sx={{ width: "100%", my: 2, pb: 2 }}>
          <TextField
            label="Correct answer"
            variant="standard"
            fullWidth
            value={correctAnswer}
            color={"success"}
            InputProps={{
              style: { color: "white" },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default OwnAnswer;
