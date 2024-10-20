import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions"

export function Footer() {
  const { correct, incorrect, unanswered } = useQuestionData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <>
      <footer>
        <strong>{`✅${correct} correctas - ❌ ${incorrect} incorrectas - ? ${unanswered} sin responder`}</strong>
        <div style={{ marginTop: "16px" }}>
          <Button onClick={() => reset()}>Reiniciar Juego</Button>
        </div>
      </footer>
    </>
  )
}
