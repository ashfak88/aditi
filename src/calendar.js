export function downloadWeddingIcs() {
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:20270214T020000Z',
    'DTEND:20270214T060000Z',
    'SUMMARY:Aarav & Ananya — Wedding',
    'LOCATION:Meenakshi Amman Temple, Madurai',
    'DESCRIPTION:Celebrate the wedding of Aarav and Ananya.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }))
  a.download = 'aarav-ananya-wedding.ics'
  a.click()
  URL.revokeObjectURL(a.href)
}
