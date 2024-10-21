import { useQuestionData } from "./hooks/useQUestionsData"

export function Footer() {
  const { correct, incorrect, unanswered } = useQuestionData()

  return (
    <>
      <footer>
        <strong>{`✅${correct} correctas - ❌ ${incorrect} incorrectas - ? ${unanswered} sin responder`}</strong>
      </footer>
    </>
  )
}
