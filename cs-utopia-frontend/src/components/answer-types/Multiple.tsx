import { IAnswer } from "@/models/IAnswer";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

interface MultipleProps {
  answers: IAnswer[];
  setSelection?: Function;
  questionId: number;
  correctAnswer?: any;
  userAnswer?: any;
}

const Multiple: React.FC<MultipleProps> = ({
  answers,
  setSelection,
  questionId,
  correctAnswer,
  userAnswer,
}) => {
  const [values, setValues] = React.useState<number[]>([]);

  useEffect(() => {
    if (!setSelection) return;
    setSelection((prev: any) => ({ ...prev, [questionId]: values }));
  }, [values]);

  const onChange = (e: any) => {
    if (e.target.checked) {
      setValues((prev) => [...prev, +e.target.value]);
    } else {
      setValues((prev) => prev.filter((v) => v !== +e.target.value));
    }
  };

  const defineLabel = (id: number) => {
    const isYourAnswer = userAnswer?.includes(id);
    const isCorrectAnswer = correctAnswer.includes(id);
    const isYourCorrect = isYourAnswer && isCorrectAnswer;
    if (isYourCorrect) {
      return " - correct answer (your)";
    } else if (isCorrectAnswer) {
      return " - correct answer";
    } else if (isYourAnswer) {
      return " - your answer";
    }
  };

  return (
    <FormGroup>
      {answers.map((answer) =>
        !userAnswer ? (
          <FormControlLabel
            key={answer.id}
            sx={{
              borderBottom: "1px solid #1E1E1E",
              py: 1,
              color: "text.primary",
            }}
            control={
              <Checkbox
                onChange={onChange}
                color={"secondary"}
                value={answer.id}
              />
            }
            label={answer.text}
          />
        ) : (
          <FormControlLabel
            key={answer.id}
            sx={{
              borderBottom: "1px solid #1E1E1E",
              py: 1,
            }}
            control={
              <Checkbox
                disabled
                checked={userAnswer?.includes(answer.id)}
                onChange={onChange}
                color={correctAnswer?.includes(answer.id) ? "success" : "error"}
                value={answer.id}
              />
            }
            label={
              <Typography
                sx={{
                  color: correctAnswer?.includes(answer.id)
                    ? "success.main"
                    : "grey",
                }}
              >
                {`${answer.text} ${defineLabel(answer.id) || ""}`}
              </Typography>
            }
          />
        )
      )}
    </FormGroup>
  );
};

export default Multiple;
