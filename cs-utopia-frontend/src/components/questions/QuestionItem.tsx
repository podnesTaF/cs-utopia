import { IQuestion } from "@/models/IQuestion";
import styles from "@/styles/Question.module.scss";
import { CustomTheme } from "@/styles/theme";
import { defineOutOf } from "@/utils/count";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import DragSection from "../answer-types/Dragable/DragSection";
import Multiple from "../answer-types/Multiple";
import Order from "../answer-types/Order";
import OwnAnswer from "../answer-types/OwnAnswer";
import Single from "../answer-types/Single";
import HintDialog from "../shared/HintDialog";
import {CustomThemeContext} from "@/context/theme-context";

interface QuestionItemProps {
  question: IQuestion;
  setActive?: Function;
  questLength: number;
  questionIdx: number;
  setSelection?: Function;
  submitQuiz?: Function;
  isFinished?: boolean;
  setResults?: Function;
  activeQuestion?: number;
  answer?: any;
  correctAnswer?: any;
  points?: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  setActive,
  questLength,
  questionIdx,
  setSelection,
  submitQuiz,
  isFinished,
  setResults,
  activeQuestion,
  answer,
  correctAnswer,
  points,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const {theme} = useContext(CustomThemeContext);

  const next = () => {
    if (!activeQuestion || !setActive || !submitQuiz || !setResults) return;
    if (questLength > activeQuestion) {
      setActive((prevState: number) => prevState + 1);
    } else {
      submitQuiz();
    }
  };

  const prev = () => {
    if (!activeQuestion || !setActive) return;
    if (activeQuestion > 1) {
      setActive((prevState: number) => prevState - 1);
    }
  };

  const handleHintOpen = () => {
    setOpen(true);
  };

  const defineClass = () => {
    if (isFinished && question) {
      const percentage = points! / defineOutOf(question.answers, question.type);
      if (percentage === 1) {
        setStatus(CustomTheme.palette.success.light);
      } else if (percentage > 0) {
        setStatus(CustomTheme.palette.warning.dark);
      } else {
        setStatus(CustomTheme.palette.error.light);
      }
    }
  };

  useEffect(() => {
    defineClass();
  }, [isFinished, points]);

  return (
    <Container
      sx={{
        display:
          activeQuestion === questionIdx || isFinished ? "block" : "none",
        position: "relative",
      }}
      maxWidth="lg"
    >
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="textPrimary">
          Question {`${questionIdx}/${questLength}`}
        </Typography>
        {isFinished && (
          <Typography variant={'h5'} color={'textPrimary'} className={styles.points}>
            {points} / {defineOutOf(question.answers, question.type)}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          bgcolor: theme?.palette?.primary.main,
          borderRadius: "20px",
        }}
      >
        <Box
          className={styles.header}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 3,
            backgroundColor:
              status ||
              theme?.palette?.primary.light,
            alignItems: "center",
          }}
        >
          <Typography color="textPrimary" variant="h5">{question.title}</Typography>
          <IconButton onClick={handleHintOpen} color={"secondary"}>
            <HelpCenterOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box sx={{ mx: 3, my: 2, maxWidth: "600px", width: "100%" }}>
          <Box
            sx={{ bgcolor: "#B885F4", width: "100%", height: "1rem", mb: 1 }}
          ></Box>
          <Box
            sx={{
              bgcolor:
                theme?.palette?.primary.light,
              width: "30%",
              height: "1rem",
            }}
          ></Box>
        </Box>
        <Container maxWidth="lg" sx={{ mb: 4, justifyContent: "center" }}>
          {question.type === "single" &&
            (question.answers.length > 1 ? (
              <Single
                answers={question.answers}
                questionId={question.id}
                setSelection={setSelection}
                correctAnswer={correctAnswer}
                userAnswer={answer}
              />
            ) : (
              <OwnAnswer
                questionId={question.id}
                setSelection={setSelection}
                correctAnswer={correctAnswer}
                userAnswer={answer}
              />
            ))}
          {question.type === "multiple" && (
            <Multiple
              answers={question.answers}
              questionId={question.id}
              setSelection={setSelection}
              correctAnswer={correctAnswer}
              userAnswer={answer}
            />
          )}
          {question.type === "order" && (
            <Order
              answers={question.answers}
              questionId={question.id}
              setSelection={setSelection}
              userAnswer={answer}
              correctAnswer={correctAnswer}
            />
          )}

          {question.type === "dragable" && (
            <DragSection
              boxNames={question.boxes!.split(",")}
              setSelection={setSelection}
              answers={question.answers}
              questionId={question.id}
              correctAnswer={correctAnswer}
              userAnswer={answer}
            />
          )}
        </Container>
        {!isFinished && activeQuestion && (
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 4 }}>
            <Button onClick={prev} sx={{visibility: activeQuestion > 1 ? 'visible' : 'hidden'}} color={"secondary"} variant={"outlined"}>
              Prev
            </Button>
            <Button onClick={next} color={"secondary"} variant={"contained"}>
              Next
            </Button>
          </Box>
        )}
      </Box>
      <HintDialog open={open} setOpen={setOpen} content={question.hint} />
    </Container>
  );
};

export default QuestionItem;
