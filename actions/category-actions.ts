"use server"

import connectToDatabase from "@/lib/db"
import { Category } from "@/models/index"
import { mockCategories } from "@/lib/mock-data"

export async function getCategories() {
    try {
        await connectToDatabase()
        const categories = await Category.find({}).sort({ title: 1 }).lean()

        const sanitizedCategories = categories.map((c: any) => ({
            ...c,
            id: c._id.toString(),
            _id: undefined,
        }))

        if (sanitizedCategories.length > 0) {
            return { data: sanitizedCategories }
        }

        return { data: mockCategories }
    } catch (error) {
        console.error("Error fetching categories:", error)
        return { error: "Failed to fetch categories" }
    }
}

export async function createCategory(data: any) {
    try {
        await connectToDatabase()
        const category = await Category.create(data)
        return { data: JSON.parse(JSON.stringify(category)) }
    } catch (error) {
        console.error("Error creating category:", error)
        return { error: "Failed to create category" }
    }
}

export async function updateCategory(id: string, data: any) {
    try {
        await connectToDatabase()
        const category = await Category.findByIdAndUpdate(id, data, { new: true }).lean()
        return { data: JSON.parse(JSON.stringify(category)) }
    } catch (error) {
        console.error("Error updating category:", error)
        return { error: "Failed to update category" }
    }
}

export async function deleteCategory(id: string) {
    try {
        await connectToDatabase()
        await Category.findByIdAndDelete(id)
        return { success: true }
    } catch (error) {
        console.error("Error deleting category:", error)
        return { error: "Failed to delete category" }
    }
}
