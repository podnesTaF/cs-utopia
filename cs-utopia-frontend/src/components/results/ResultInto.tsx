import { IQuestion } from "@/models/IQuestion";
import { CustomTheme } from "@/styles/theme";
import { countPercentage } from "@/utils/count";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

interface ResultIntroProps {
  sectionName: string;
  results: any;
  moduleId: number;
  questions: IQuestion[];
}

const ResultInto: React.FC<ResultIntroProps> = ({
  sectionName,
  results,
  questions,
}) => {
  const [percentage, setPercentage] = React.useState<number>(0);

  useEffect(() => {
    if (questions) {
      setPercentage(countPercentage(results, questions));
    }
  }, [questions]);


  return (
    <Container
      sx={{
        backgroundColor: !isNaN(percentage)
          ? percentage >= 50 ?
                CustomTheme.palette.success.light
            : CustomTheme.palette.secondary.main
            : "lightgray",
      }}
    >
      <Container
        sx={{
          backgroundColor: !isNaN(percentage)
              ? percentage >= 50 ?
                  CustomTheme.palette.success.light
                  : CustomTheme.palette.secondary.main
              : "lightgray",
          display: "flex",
          m: "0 auto",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          p: 5,
        }}
        maxWidth={"md"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography color="success" variant="h3">
              {percentage > 50  ? 'Congratulations!' : 'Nice Try!'}
          </Typography>
          <Typography variant={'h6'}>You passed section:</Typography>
                <Typography color="light" sx={{alignSelf: 'center'}} variant="h1">
                    {sectionName}
                </Typography>
          <Typography variant={'h6'}>
            your score is: {percentage}%
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default ResultInto;
