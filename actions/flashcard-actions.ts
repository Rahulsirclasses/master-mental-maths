"use server"

import connectToDatabase from "@/lib/db"
import { FlashcardSet, Flashcard } from "@/models/index"
import { mockFlashcardSets, mockFlashcards } from "@/lib/mock-data"

// Sets
export async function getFlashcardSets() {
    try {
        await connectToDatabase()
        const sets = await FlashcardSet.find({}).sort({ name: 1 }).lean()

        const sanitizedSets = sets.map((s: any) => ({
            ...s,
            id: s._id.toString(),
            _id: undefined,
        }))

        if (sanitizedSets.length > 0) {
            return { data: sanitizedSets }
        }

        return { data: mockFlashcardSets }
    } catch (error) {
        console.error("Error fetching flashcard sets:", error)
        return { error: "Failed to fetch flashcard sets" }
    }
}

export async function createFlashcardSet(data: any) {
    try {
        await connectToDatabase()
        const set = await FlashcardSet.create(data)
        return { data: JSON.parse(JSON.stringify(set)) }
    } catch (error) {
        console.error("Error creating flashcard set:", error)
        return { error: "Failed to create flashcard set" }
    }
}

// Cards
export async function getFlashcards(setId?: string) {
    try {
        await connectToDatabase()
        const query = setId ? { set_id: setId } : {}
        const cards = await Flashcard.find(query).sort({ order_index: 1 }).lean()

        const sanitizedCards = cards.map((c: any) => ({
            ...c,
            id: c._id.toString(),
            _id: undefined,
        }))

        if (sanitizedCards.length > 0) {
            return { data: sanitizedCards }
        }

        if (setId) {
            return { data: mockFlashcards.filter(c => c.set_id === setId) }
        }
        return { data: mockFlashcards }

    } catch (error) {
        console.error("Error fetching flashcards:", error)
        return { error: "Failed to fetch flashcards" }
    }
}

export async function createFlashcard(data: any) {
    try {
        await connectToDatabase()
        const card = await Flashcard.create(data)
        return { data: JSON.parse(JSON.stringify(card)) }
    } catch (error) {
        console.error("Error creating flashcard:", error)
        return { error: "Failed to create flashcard" }
    }
}
// Sets Operations
export async function updateFlashcardSet(id: string, data: any) {
    try {
        await connectToDatabase()
        const set = await FlashcardSet.findByIdAndUpdate(id, data, { new: true }).lean()
        return { data: JSON.parse(JSON.stringify(set)) }
    } catch (error) {
        console.error("Error updating flashcard set:", error)
        return { error: "Failed to update flashcard set" }
    }
}

export async function deleteFlashcardSet(id: string) {
    try {
        await connectToDatabase()
        await FlashcardSet.findByIdAndDelete(id)
        return { success: true }
    } catch (error) {
        console.error("Error deleting flashcard set:", error)
        return { error: "Failed to delete flashcard set" }
    }
}

// Cards Operations
export async function updateFlashcard(id: string, data: any) {
    try {
        await connectToDatabase()
        const card = await Flashcard.findByIdAndUpdate(id, data, { new: true }).lean()
        return { data: JSON.parse(JSON.stringify(card)) }
    } catch (error) {
        console.error("Error updating flashcard:", error)
        return { error: "Failed to update flashcard" }
    }
}

export async function deleteFlashcard(id: string) {
    try {
        await connectToDatabase()
        await Flashcard.findByIdAndDelete(id)
        return { success: true }
    } catch (error) {
        console.error("Error deleting flashcard:", error)
        return { error: "Failed to delete flashcard" }
    }
}
