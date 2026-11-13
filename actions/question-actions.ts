"use server"

import connectToDatabase from "@/lib/db"
import { Question } from "@/models/index"
import { mockQuestions } from "@/lib/mock-data"

export async function getQuestions(category: string) {
    try {
        await connectToDatabase()
        const questions = await Question.find({ category }).sort({ difficulty_level: 1 }).limit(10).lean()

        // Convert _id to string
        const sanitizedQuestions = questions.map((q: any) => ({
            ...q,
            id: q._id.toString(),
            _id: undefined,
        }))

        if (sanitizedQuestions.length > 0) {
            return { data: sanitizedQuestions }
        }

        // Fallback to mock data if no questions found in DB
        const mockCategoryQuestions = mockQuestions.filter((q) => q.category === category).slice(0, 10)
        return { data: mockCategoryQuestions }
    } catch (error) {
        console.error("Error fetching questions:", error)
        return { error: "Failed to fetch questions" }
    }
}

export async function createQuestion(data: any) {
    try {
        await connectToDatabase()
        const question = await Question.create(data)
        return { data: JSON.parse(JSON.stringify(question)) }
    } catch (error) {
        console.error("Error creating question:", error)
        return { error: "Failed to create question" }
    }
}

export async function updateQuestion(id: string, data: any) {
    try {
        await connectToDatabase()
        const question = await Question.findByIdAndUpdate(id, data, { new: true }).lean()
        return { data: JSON.parse(JSON.stringify(question)) }
    } catch (error) {
        console.error("Error updating question:", error)
        return { error: "Failed to update question" }
    }
}

export async function deleteQuestion(id: string) {
    try {
        await connectToDatabase()
        await Question.findByIdAndDelete(id)
        return { success: true }
    } catch (error) {
        console.error("Error deleting question:", error)
        return { error: "Failed to delete question" }
    }
}
