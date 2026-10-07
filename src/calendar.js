export function downloadWeddingIcs() {
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:20261120T133000Z',
    'DTEND:20261120T163000Z',
    'SUMMARY:Aditi & Eshaan — Engagement',
    'LOCATION:The Landmark Hotel, Maripur, Muzaffarpur',
    'DESCRIPTION:Celebrate the engagement of Aditi and Eshaan.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }))
  a.download = 'aditi-eshaan-engagement.ics'
  a.click()
  URL.revokeObjectURL(a.href)
}
