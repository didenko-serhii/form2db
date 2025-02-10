// components/UserManagement.tsx
"use client"
import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function UserManagement() {
	const [users, setUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)

	const fetchUsers = async () => {
		const res = await fetch("/api/users")
		const data = await res.json()
		setUsers(data)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	const handleDelete = async (id) => {
		await fetch(`/api/users/${id}`, { method: "DELETE" })
		fetchUsers()
	}

	const handleUpdateClick = (user) => {
		setSelectedUser(user)
	}

	const handleFormSuccess = () => {
		setSelectedUser(null)
		fetchUsers()
	}

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm user={selectedUser} onSuccess={handleFormSuccess} />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:flex items-center justify-center">
				<Table>
					<TableCaption>A list of users.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Password</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.password}</TableCell>
								<TableCell className="flex gap-4">
									<Button onClick={() => handleUpdateClick(user)} className="bg-blue-400 hover:bg-blue-600">update</Button>
									<Button onClick={() => handleDelete(user.id)} className="bg-red-400 hover:bg-red-600">delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}