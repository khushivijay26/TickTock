import { NextResponse } from 'next/server'

const DATA = [
  { id: '1', week: 1, date: '2024-01-01', hours: 20 },
  { id: '2', week: 1, date: '2024-01-02', hours: 8 },
  { id: '3', week: 1, date: '2024-01-03', hours: 0 },
  { id: '4', week: 1, date: '2024-01-04', hours: 6 },
  { id: '5', week: 1, date: '2024-01-05', hours: 10 },

  { id: '6', week: 2, date: '2024-01-08', hours: 8 },
  { id: '7', week: 2, date: '2024-01-09', hours: 8 },
  { id: '8', week: 2, date: '2024-01-10', hours: 0 },
  { id: '9', week: 2, date: '2024-01-11', hours: 7 },
  { id: '10', week: 2, date: '2024-01-12', hours: 8 },

  { id: '11', week: 3, date: '2024-01-15', hours: 0 },
  { id: '12', week: 3, date: '2024-01-16', hours: 0 },
  { id: '13', week: 3, date: '2024-01-17', hours: 0 },
  { id: '14', week: 3, date: '2024-01-18', hours: 0 },
  { id: '15', week: 3, date: '2024-01-19', hours: 0 },

  { id: '16', week: 4, date: '2024-01-22', hours: 10 },
  { id: '17', week: 4, date: '2024-01-23', hours: 8 },
  { id: '18', week: 4, date: '2024-01-24', hours: 14 },
  { id: '19', week: 4, date: '2024-01-25', hours: 6 },
  { id: '20', week: 4, date: '2024-01-26', hours: 8 },

  { id: '21', week: 5, date: '2024-01-29', hours: 8 },
  { id: '22', week: 5, date: '2024-01-30', hours: 8 },
  { id: '23', week: 5, date: '2024-01-31', hours: 0 },
  { id: '24', week: 5, date: '2024-02-01', hours: 6 },
  { id: '25', week: 5, date: '2024-02-02', hours: 8 },

  { id: '26', week: 6, date: '2024-02-05', hours: 8 },
  { id: '27', week: 6, date: '2024-02-06', hours: 15 },
  { id: '28', week: 6, date: '2024-02-07', hours: 0 },
  { id: '29', week: 6, date: '2024-02-08', hours: 18 },
  { id: '30', week: 6, date: '2024-02-09', hours: 8 },

  { id: '31', week: 7, date: '2024-02-12', hours: 8 },
  { id: '32', week: 7, date: '2024-02-13', hours: 0 },
  { id: '33', week: 7, date: '2024-02-14', hours: 8 },
  { id: '34', week: 7, date: '2024-02-15', hours: 8 },
  { id: '35', week: 7, date: '2024-02-16', hours: 8 },

  { id: '36', week: 8, date: '2024-02-19', hours: 8 },
  { id: '37', week: 8, date: '2024-02-20', hours: 8 },
  { id: '38', week: 8, date: '2024-02-21', hours: 0 },
  { id: '39', week: 8, date: '2024-02-22', hours: 8 },
  { id: '40', week: 8, date: '2024-02-23', hours: 8 },
]

export async function GET() {
  return NextResponse.json(DATA)
}

export async function POST(request: Request) {
  const body = await request.json()
  DATA.push({ id: String(Date.now()), ...body })
  return NextResponse.json({ ok: true })
}
