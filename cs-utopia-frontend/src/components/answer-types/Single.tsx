import { IAnswer } from "@/models/IAnswer";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect } from "react";

interface SingleProps {
  answers: IAnswer[];
  questionId: number;
  setSelection?: Function;
  userAnswer?: any;
  correctAnswer?: any;
}

const Single: React.FC<SingleProps> = ({
  answers,
  questionId,
  setSelection,
  userAnswer,
  correctAnswer,
}) => {
  const [yourAnswer, setYourAnswer] = React.useState<any>(userAnswer || null);
  useEffect(() => {
    if (!setSelection) return;
    setSelection((prev: any) => ({ ...prev, [questionId]: yourAnswer }));
  }, [yourAnswer]);

  const onChange = (e: any) => {
    setYourAnswer(+e.target.value);
  };

  return (
    <RadioGroup name="radio-buttons-group">
      {answers.map((answer) => {
        if (answer.id === correctAnswer) {
          return (
            <FormControlLabel
              key={answer.id}
              onChange={onChange}
              sx={{ borderBottom: "1px solid #1E1E1E", py: 1, color: "text.primary" }}
              value={correctAnswer}
              control={<Radio color={"success"} checked />}
              label={answer.text + " - correct answer"}
            />
          );
        }
        return (
          <FormControlLabel
            key={answer.id}
            onChange={onChange}
            sx={{ borderBottom: "1px solid #1E1E1E", py: 1, color: "text.primary" }}
            value={answer.id}
            control={
              <Radio
                disabled={!!correctAnswer}
                color={
                  correctAnswer
                    ? answer.id === correctAnswer
                      ? "success"
                      : "error"
                    : "secondary"
                }
              />
            }
            label={`${answer.text}${
              +userAnswer === answer.id ? " - your answer" : ""
            }`}
          />
        );
      })}
    </RadioGroup>
  );
};

export default Single;
