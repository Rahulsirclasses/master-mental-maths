"use server"

import connectToDatabase from "@/lib/db"
import { Question, Category, FlashcardSet, Flashcard, MotivationalQuote, DailyTip } from "@/models/index"
import {
    mockQuestions,
    mockCategories,
    mockFlashcardSets,
    mockFlashcards,
    mockMotivationalQuotes,
    mockDailyTips
} from "@/lib/mock-data"

export async function getAdminData() {
    await connectToDatabase()

    try {
        const [questions, categories, flashcardSets, flashcards, quotes, tips] = await Promise.all([
            Question.find({}).sort({ createdAt: -1 }).lean(),
            Category.find({}).sort({ title: 1 }).lean(),
            FlashcardSet.find({}).sort({ name: 1 }).lean(),
            Flashcard.find({}).sort({ set_id: 1, order_index: 1 }).lean(),
            MotivationalQuote.find({}).sort({ createdAt: -1 }).lean(),
            DailyTip.find({}).sort({ createdAt: -1 }).lean()
        ])

        // Helper to sanitize _id
        const sanitize = (items: any[], mockItems: any[]) => {
            if (items.length > 0) {
                return items.map((item: any) => ({
                    ...item,
                    id: item._id.toString(),
                    _id: undefined,
                }))
            }
            return mockItems
        }

        return {
            questions: sanitize(questions, mockQuestions),
            categories: sanitize(categories, mockCategories),
            flashcardSets: sanitize(flashcardSets, mockFlashcardSets),
            flashcards: sanitize(flashcards, mockFlashcards),
            motivationalQuotes: sanitize(quotes, mockMotivationalQuotes),
            dailyTips: sanitize(tips, mockDailyTips),
            isConnected: true
        }
    } catch (error) {
        console.error("Error fetching admin data:", error)
        // Return mocks with error flag
        return {
            questions: mockQuestions,
            categories: mockCategories,
            flashcardSets: mockFlashcardSets,
            flashcards: mockFlashcards,
            motivationalQuotes: mockMotivationalQuotes,
            dailyTips: mockDailyTips,
            isConnected: false,
            error: "Failed to connect to database"
        }
    }
}

// Additional CRUD for Quotes and Tips
export async function createQuote(data: any) {
    try {
        await connectToDatabase()
        const quote = await MotivationalQuote.create(data)
        return { data: JSON.parse(JSON.stringify(quote)) }
    } catch (error) {
        console.error("Error creating quote:", error)
        return { error: "Failed to create quote" }
    }
}

export async function createTip(data: any) {
    try {
        await connectToDatabase()
        const tip = await DailyTip.create(data)
        return { data: JSON.parse(JSON.stringify(tip)) }
    } catch (error) {
        console.error("Error creating tip:", error)
        return { error: "Failed to create tip" }
    }
}
// Quote Operations
export async function updateQuote(id: string, data: any) {
    try {
        await connectToDatabase()
        const quote = await MotivationalQuote.findByIdAndUpdate(id, data, { new: true }).lean()
        return { data: JSON.parse(JSON.stringify(quote)) }
    } catch (error) {
        console.error("Error updating quote:", error)
        return { error: "Failed to update quote" }
    }
}

export async function deleteQuote(id: string) {
    try {
        await connectToDatabase()
        await MotivationalQuote.findByIdAndDelete(id)
        return { success: true }
    } catch (error) {
        console.error("Error deleting quote:", error)
        return { error: "Failed to delete quote" }
    }
}

// Tip Operations
export async function updateTip(id: string, data: any) {
    try {
        await connectToDatabase()
        const tip = await DailyTip.findByIdAndUpdate(id, data, { new: true }).lean()
        return { data: JSON.parse(JSON.stringify(tip)) }
    } catch (error) {
        console.error("Error updating tip:", error)
        return { error: "Failed to update tip" }
    }
}

export async function deleteTip(id: string) {
    try {
        await connectToDatabase()
        await DailyTip.findByIdAndDelete(id)
        return { success: true }
    } catch (error) {
        console.error("Error deleting tip:", error)
        return { error: "Failed to delete tip" }
    }
}
