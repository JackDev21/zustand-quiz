import { create } from "zustand"

import { Question } from "../types"

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnwer: (questionId: number, answerIndex: number) => void
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

    selectAnswer:(questionId: number, answerIndex: number) => {
      // const {questions} = get() (destructurado)
      const questions = get().questions // obtenemos el valor del estado questions linea 14


      // structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions)
  }
})
