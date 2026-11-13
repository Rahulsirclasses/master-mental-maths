import mongoose, { Schema, model, models } from "mongoose"

// User Schema
const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        name: { type: String },
        image: { type: String },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        status: { type: String, enum: ["pending", "approved", "disabled"], default: "pending" },
        provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
    },
    { timestamps: true },
)

UserSchema.index({ email: 1 });
UserSchema.index({ provider: 1 });

export const User = models.User || model("User", UserSchema)

// Category Schema
const CategorySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        difficulty: { type: String, required: true },
        timeEstimate: { type: String, required: true },
        color: { type: String, required: true },
    },
    { timestamps: true },
)

export const Category = models.Category || model("Category", CategorySchema)

// Question Schema
const QuestionSchema = new Schema(
    {
        category: { type: String, required: true }, // Ideally ref to Category, but maintaining string for simplicity in migration
        question: { type: String, required: true },
        answer: { type: Number, required: true },
        difficulty_level: { type: Number, required: true },
        hint: { type: String },
        explanation: { type: String },
        tags: [{ type: String }],
    },
    { timestamps: true },
)

QuestionSchema.index({ category: 1, difficulty_level: 1 });

export const Question = models.Question || model("Question", QuestionSchema)

// FlashcardSet Schema
const FlashcardSetSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true },
)

export const FlashcardSet = models.FlashcardSet || model("FlashcardSet", FlashcardSetSchema)

// Flashcard Schema
const FlashcardSchema = new Schema(
    {
        set_id: { type: String, required: true },
        front: { type: String, required: true },
        back: { type: String, required: true },
        order_index: { type: Number, required: true },
    },
    { timestamps: true },
)

FlashcardSchema.index({ set_id: 1, order_index: 1 });

export const Flashcard = models.Flashcard || model("Flashcard", FlashcardSchema)

// MotivationalQuote Schema
const MotivationalQuoteSchema = new Schema(
    {
        quote: { type: String, required: true },
        author: { type: String, required: true },
        category: { type: String, required: true },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true },
)

MotivationalQuoteSchema.index({ is_active: 1 });

export const MotivationalQuote = models.MotivationalQuote || model("MotivationalQuote", MotivationalQuoteSchema)

// DailyTip Schema
const DailyTipSchema = new Schema(
    {
        tip: { type: String, required: true },
        category: { type: String, required: true },
        difficulty: { type: String, required: true },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true },
)

DailyTipSchema.index({ is_active: 1 });

export const DailyTip = models.DailyTip || model("DailyTip", DailyTipSchema)
