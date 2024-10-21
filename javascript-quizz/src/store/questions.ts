import { create } from "zustand"
import { persist } from "zustand/middleware"

import { Question } from "../types"
import confetti from "canvas-confetti"

import { getAllQuestions } from "../services/questions"

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(
  // hay que añadir los parentesis para que funcione el persist porque devuelve una función create<State>()
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0, // posicion del arrya de Questions

        fetchQuestions: async (limit: number) => {
          const questions = await getAllQuestions(limit)
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

        reset: () => {
          set({ questions: [], currentQuestion: 0 })
        },
      }
    },
    {
      name: "questions",
    }
  )
)
