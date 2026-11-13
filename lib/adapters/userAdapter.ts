export function adaptUser(user: any) {
    if (!user) return null

    return {
        id: user._id?.toString() || "",
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        role: user.role || "user",
        status: user.status || "pending",
        createdAt: user.createdAt?.toISOString?.() || new Date().toISOString(),
        updatedAt: user.updatedAt?.toISOString?.() || new Date().toISOString(),
    }
}
