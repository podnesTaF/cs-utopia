import { Api } from "@/api";
import MainLayout from "@/layouts/MainLayout";
import { IQuestion } from "@/models/IQuestion";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import QuestionItem from "@/components/questions/QuestionItem";
import ResultInto from "@/components/results/ResultInto";
import { getCorrectAnswer } from "@/utils/get-answer";
import { Container, Typography } from "@mui/material";
import {CustomTheme} from "@/styles/theme";
import {countPercentage} from "@/utils/count";

interface ResultPage {
  moduleName: string;
  moduleId: number;
  theme: any;
}

const ResultPage: NextPage<ResultPage> = ({
  moduleName,
  moduleId,
  theme,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();


  const homeRoute = {
    name: "Modules",
    path: "/modules",
    icon: <HomeIcon sx={{ mr: 1 }} />,
  };
  const moduleRoute = {
    name: moduleName,
    path: "/question/" + moduleId,
    icon: <QuizIcon sx={{ mr: 1 }} />,
  };

  const resultRoute = {
    name: "Results",
    path: router.pathname,
    icon: <SportsScoreIcon sx={{ mr: 1 }} />,
  };

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
    setResults(JSON.parse(localStorage.getItem(`results-${moduleId}`) || "{}"));
  }, []);

  return (
    <MainLayout theme={theme} routes={[homeRoute, moduleRoute, resultRoute]} isLoading={isLoading} loadingText={'Counting Your Result...'}>
      {Object.keys(results).length > 0 && questions && (
        <ResultInto
          sectionName={moduleName}
          results={results}
          questions={questions}
          moduleId={moduleId}
        />
      )}
      <Container
        sx={{
          boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
          p: "0 !important",
          border: `1px solid ${!isNaN(countPercentage(results, questions))
              ? countPercentage(results, questions) >= 50 ?
                  CustomTheme.palette.success.light
                  : CustomTheme.palette.error.main
              : "lightgray"}`,
        }}
      >
        <Typography
          variant="h3"
          color={'textPrimary'}
          sx={{ p: 3, bgcolor: "primary.main", textAlign: "center" }}
        >
          Questions and answers
        </Typography>
        <Container maxWidth={"lg"} sx={{ p: 3 }}>
          {Object.keys(results).length > 0 &&
            questions.map((question: IQuestion, i: number) => (
              <QuestionItem
                key={question.id}
                question={question}
                questLength={questions.length}
                isFinished={true}
                questionIdx={i + 1}
                setResults={setResults}
                answer={results[question.id].answer}
                correctAnswer={getCorrectAnswer(question)}
                points={results[question.id].points}
              />
            ))}
        </Container>
      </Container>
    </MainLayout>
  );
};

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
    console.log("results page:", error);
    return {
      props: {},
    };
  }
};

export default ResultPage;
