//import { IconButton, Stack } from "@mui/material"
import { Card, List, ListItemButton, Typography, ListItem, ListItemText, Stack, IconButton } from "@mui/material"
import SyntaxHighlighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { useQuestionsStore } from "./store/questions"

import { type Question as QuestionType } from "./types"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./Footer"

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (answerIndex: number) => {
    if (info.userSelectedAnswer == null) return "transparent" // si no se ha seleccionado ninguna respuesta

    if (answerIndex !== info.correctAnswer && answerIndex !== info.userSelectedAnswer) return "transparent" // si ya se selecciono una respuesta y no es la correcta

    if (answerIndex === info.correctAnswer) return "green" // si la respuesta es correcta

    if (answerIndex === info.userSelectedAnswer) return "red" // si la respuesta es incorrecta

    return "transparent"
  }

  return (
    <>
      <Card variant="outlined" sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}>
        <Typography variant="h5">{info.question}</Typography>

        <SyntaxHighlighter language="javascript" style={gradientDark}>
          {info.code}
        </SyntaxHighlighter>

        <List sx={{ bgcolor: "#444" }} disablePadding>
          {info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{ backgroundColor: getBackgroundColor(index) }}
              >
                <ListItemText primary={answer} sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
