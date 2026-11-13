"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckCircle, XCircle, Shield, User as UserIcon, Loader2 } from "lucide-react"

interface UserData {
    id: string
    name: string
    email: string
    role: string
    status: string
    provider: string
    createdAt: string
}

export default function UserManagementPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [users, setUsers] = useState<UserData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [processingId, setProcessingId] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users")
            if (res.ok) {
                const data = await res.json()
                setUsers(data)
            } else {
                console.error("Failed to fetch users")
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAction = async (userId: string, action: "approve" | "disable" | "enable") => {
        setProcessingId(userId)
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            })

            if (res.ok) {
                // Refresh local state optimistically or re-fetch
                fetchUsers()
            } else {
                console.error("Failed to update user")
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setProcessingId(null)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black p-8">
            <Card className="max-w-7xl mx-auto bg-gray-900 border-gray-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="h-6 w-6 text-sky-500" />
                        User Management ({users.length})
                    </CardTitle>
                    <Button variant="outline" onClick={() => router.push("/dashboard")}>
                        Back to Dashboard
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-800 hover:bg-transparent">
                                <TableHead className="text-gray-400">User</TableHead>
                                <TableHead className="text-gray-400">Provider</TableHead>
                                <TableHead className="text-gray-400">Role</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-gray-400">Joined</TableHead>
                                <TableHead className="text-right text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/50">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-white">{user.name}</span>
                                            <span className="text-sm text-gray-500">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-gray-700 text-gray-400 capitalize">
                                            {user.provider}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {user.role === 'admin' ? <Shield className="h-4 w-4 text-purple-500" /> : <UserIcon className="h-4 w-4 text-gray-500" />}
                                            <span className="capitalize">{user.role}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`
                        ${user.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                        ${user.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : ''}
                        ${user.status === 'disabled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}
                      `}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.status === "pending" && (
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                    disabled={!!processingId}
                                                    onClick={() => handleAction(user.id, "approve")}
                                                >
                                                    {processingId === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                                                    Approve
                                                </Button>
                                            )}
                                            {user.status === "disabled" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-green-800 text-green-500 hover:bg-green-900/20"
                                                    disabled={!!processingId}
                                                    onClick={() => handleAction(user.id, "enable")}
                                                >
                                                    Enable
                                                </Button>
                                            )}
                                            {(user.status === "approved" || user.status === "pending") && user.role !== "admin" && (
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    disabled={!!processingId}
                                                    onClick={() => handleAction(user.id, "disable")}
                                                >
                                                    {processingId === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-1" />}
                                                    Disable
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
