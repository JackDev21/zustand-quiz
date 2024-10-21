import { create } from "zustand"
import { Question } from "../types"
import confetti from "canvas-confetti"

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0, // posicion del arrya de Questions

    fetchQuestions: async (limit: number) => {
      const res = await fetch("http://localhost:5173/data.json")
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      // const {questions} = get() (destructurado)
      const questions = get().questions // obtenemos el valor del estado questions linea 14

      // structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions)

      const questionIndex = newQuestions.findIndex((question) => question.id === questionId) // encuentra el indice de la pregunta
      const questionInfo = newQuestions[questionIndex] //obtenemos la pregunta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex //comparamos la respuesta correcta con la respuesta del usuario
      if (isCorrectUserAnswer) {
        confetti() // si la respuesta es correcta se lanza el confetti
      }

      // cambiar esta información en la copia de la pregunta

      newQuestions[questionIndex] = {
        ...questionInfo, // copiamos la pregunta
        isCorrectUserAnswer, // agregamos la respuesta correcta
        userSelectedAnswer: answerIndex, // agregamos la respuesta del usuario
      }

      // actualizamos el estado
      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { questions, currentQuestion } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1

      if (prevQuestion >= 0) {
        set({ currentQuestion: prevQuestion })
      }
    },
  }
})
