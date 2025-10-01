'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Entry = {
    id: string
    week: number
    date: string
    hours: number
}

export default function TimesheetDetail() {
    const params = useParams()
    const week = Number(params.week)
    const [entries, setEntries] = useState<Entry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/timesheets')
            .then(res => res.json())
            .then((data: Entry[]) => {
                setEntries(data.filter(e => e.week === week))
            })
            .finally(() => setLoading(false))
    }, [week])

    const handleEdit = (id: string) => {
        alert(`Edit entry ${id}`)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            setEntries(prev => prev.filter(e => e.id !== id))
            alert(`Deleted entry ${id}`)
        }
    }

    if (loading) return <div className="p-6">Loading...</div>

    return (
        <main className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Timesheet for Week {week}</h1>

                {entries.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    entries.map(e => (
                        <div key={e.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Homepage Development</p>
                                <p className="text-gray-500">{e.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p>{e.hours} hrs</p>
                                <button
                                    onClick={() => handleEdit(e.id)}
                                    className="text-sm underline text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(e.id)}
                                    className="text-sm underline text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}
