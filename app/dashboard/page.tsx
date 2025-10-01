'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Entry = {
  id: string
  week: number
  date: string
  hours: number
}

type WeekSummary = {
  week: number
  startDate: string
  endDate: string
  totalHours: number
  status: 'Completed' | 'Incomplete' | 'Missing'
}

type SortKey = 'week' | 'date' | 'status'
type SortOrder = 'asc' | 'desc'

export default function Dashboard() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Incomplete' | 'Missing'>('All')
  const [weekFilter, setWeekFilter] = useState<number | 'All'>('All')

  const [sortKey, setSortKey] = useState<SortKey>('week')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    fetch('/api/timesheets')
      .then(r => r.json())
      .then(data => setEntries(data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [])

  function statusFor(totalHours: number) {
    if (totalHours === 0) return 'Missing'
    if (totalHours >= 40) return 'Completed'
    return 'Incomplete'
  }

  const weeksMap: Record<number, Entry[]> = {}
  entries.forEach(e => {
    if (!weeksMap[e.week]) weeksMap[e.week] = []
    weeksMap[e.week].push(e)
  })

  let weekSummaries: WeekSummary[] = Object.keys(weeksMap)
    .map(wk => {
      const weekEntries = weeksMap[Number(wk)]
      const dates = weekEntries.map(e => e.date).sort()
      const totalHours = weekEntries.reduce((sum, e) => sum + e.hours, 0)
      return {
        week: Number(wk),
        startDate: dates[0],
        endDate: dates[dates.length - 1],
        totalHours,
        status: statusFor(totalHours),
      }
    })

  weekSummaries = weekSummaries.filter(w => {
    if (statusFilter !== 'All' && w.status !== statusFilter) return false
    if (weekFilter !== 'All' && w.week !== weekFilter) return false
    return true
  })

  weekSummaries.sort((a, b) => {
    let aValue: string | number = 0
    let bValue: string | number = 0

    if (sortKey === 'week') {
      aValue = a.week
      bValue = b.week
    } else if (sortKey === 'date') {
      aValue = new Date(a.startDate).getTime()
      bValue = new Date(b.startDate).getTime()
    } else if (sortKey === 'status') {
      aValue = a.status
      bValue = b.status
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(weekSummaries.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginated = weekSummaries.slice(startIndex, startIndex + pageSize)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const uniqueWeeks = Object.keys(weeksMap).map(Number).sort((a, b) => a - b)

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Timesheet by Week</h1>

          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="border px-2 py-1 rounded"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Missing">Missing</option>
            </select>

            <select
              value={weekFilter}
              onChange={e => setWeekFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value="All">All Weeks</option>
              {uniqueWeeks.map(w => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => toggleSort('week')}>
                  Week # {sortKey === 'week' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => toggleSort('date')}>
                  Date Range {sortKey === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => toggleSort('status')}>
                  Status {sortKey === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                paginated.map(w => (
                  <tr key={w.week} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{w.week}</td>
                    <td className="px-4 py-3">
                      {w.startDate} - {w.endDate}
                    </td>
                    <td className="px-4 py-3">{w.status}</td>
                    <td className="px-4 py-3">
                      {w.status === 'Completed' && (
                        <Link href={`/dashboard/${w.week}`} className="text-sm underline text-green-600">
                          View
                        </Link>
                      )}
                      {w.status === 'Incomplete' && (
                        <Link href={`/dashboard/${w.week}`} className="text-sm underline text-yellow-600">
                          Update
                        </Link>
                      )}
                      {w.status === 'Missing' && (
                        <Link href={`/dashboard/${w.week}`} className="text-sm underline text-blue-600">
                          Create
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  )
}
