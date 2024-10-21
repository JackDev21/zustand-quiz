//import { IconButton, Stack } from "@mui/material"
import { Card, List, ListItemButton, Typography, ListItem, ListItemText } from "@mui/material"
import SyntaxHighlighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { useQuestionsStore } from "./store/questions"

import { type Question as QuestionType } from "./types"

const Question = ({ info }: { info: QuestionType }) => {
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
              <ListItemButton>
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

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
