import { Api } from "@/api";
import QuestionItem from "@/components/questions/QuestionItem";
import MainLayout from "@/layouts/MainLayout";
import { IQuestion } from "@/models/IQuestion";
import { CustomTheme } from "@/styles/theme";
import { addAnswers } from "@/utils/add-answers";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import {useContext, useEffect, useState} from "react";
import Progress from "@/components/questions/Progress";
import {CustomThemeContext} from "@/context/theme-context";

interface QuestionPageProps {
  moduleName: string;
  moduleId: number;
  theme: any;
}

const QuestionPage: NextPage<QuestionPageProps> = ({
  moduleName,
  moduleId,
  theme,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [selection, setSelection] = useState<any>({});
  const [results, setResults] = useState({});
  const router = useRouter();

  const themeCtx = useContext(CustomThemeContext)

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    (async () => {
      setIsLoading(true)
      try {
        const questions = await Api().question.getByModule(+moduleId);

        setQuestions(questions);
      } catch (e) {
        console.log('question page:',e)
      } finally {
        timeout = setTimeout(() => {
          setIsLoading(false);
        }, 500)
      }
    })()

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if(questions?.length > 0) {
      setProgress(Math.round((activeSlide / questions.length) * 100))
    }
  }, [activeSlide, questions])


  const homeRoute = {
    name: "Modules",
    path: "/modules",
    icon: <HomeIcon sx={{ mr: 1 }} />,
  };
  const moduleRoute = {
    name: moduleName,
    path: router.pathname,
    icon: <QuizIcon sx={{ mr: 1 }} />,
  };
  const routes = [homeRoute, moduleRoute];

  const submitQuiz = async () => {
    questions.forEach((question: IQuestion) => {
      if (!selection[question.id]) {
        setResults((prev: any) => ({
          ...prev,
          [question.id]: { answer: null, points: 0 },
        }));
        return;
      }
      addAnswers(question, selection, setResults);
    });
  }

  useEffect(() => {
    (async () => {
      if (questions.length > 0 && Object.keys(results)?.length >= questions?.length) {
        localStorage.setItem(`results-${moduleId}`, JSON.stringify(results));
        setIsLoading(true)
        await router.push(`/results/${moduleId}`);
      }
    })()
  }, [results, submitQuiz]);

  return (
    <MainLayout theme={theme} routes={routes} isLoading={isLoading} loadingText={'Loading Quiz...'}>
      <Box
        sx={{
          width: "100%",
          p: 3,
          bgcolor: themeCtx?.theme?.palette?.primary.light,
        }}
      >
        <Typography
          variant="h4"
          color="textPrimary"
          sx={{ textTransform: "uppercase", textAlign: "end", mr: 4 }}
        >
          {moduleName}
        </Typography>
      </Box>
      <Progress progress={progress} />
      {!questions && <h1>Loading</h1>}
      {questions?.map((question, i) => (
        <QuestionItem
          key={question.id}
          question={question}
          setActive={setActiveSlide}
          questLength={questions.length}
          questionIdx={i + 1}
          setSelection={setSelection}
          submitQuiz={submitQuiz}
          setResults={setResults}
          activeQuestion={activeSlide}
        />
      ))}
    </MainLayout>
  );
};

export default QuestionPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;

    if (!id) {
      return {
        notFound: true,
      };
    }
    const module = await Api().module.getModule(+id);

    return {
      props: {
        moduleName: module.name,
        theme: module.theme,
        moduleId: +id,
      },
    };
  } catch (error) {
    console.log("question page:", error);
    return {
      props: {},
    };
  }
};
