// All invitation copy and media paths live here.
export const WEDDING_DATE = new Date('2027-02-14T07:30:00+05:30')

export const media = {
  openingVideo: '/media/aarav-ananya-opening.mp4',
  openingPoster: '/images/entrance-first-frame.png',
  hero: '/images/invitation-reference.png',
  ceremony: '/images/haldi-mehendi.png',
  footer: '/images/og-aarav-ananya.png',
}

export const events = [
  { name: 'Haldi', date: '12 February 2027', time: '10:00 AM', venue: 'The Courtyard, Heritage Madurai', note: 'Sunshine, turmeric, and the people we love.', icon: '✦' },
  { name: 'Mehendi', date: '12 February 2027', time: '4:30 PM', venue: 'Mango Grove, Heritage Madurai', note: 'An evening drawn in henna and laughter.', icon: '❋' },
  { name: 'Sangeet', date: '13 February 2027', time: '7:00 PM', venue: 'Lotus Ballroom, Heritage Madurai', note: 'Come for the music. Stay for the family dance-off.', icon: '♫' },
  { name: 'Wedding', date: '14 February 2027', time: '7:30 AM', venue: 'Meenakshi Amman Temple, Madurai', note: 'The moment two families become one.', icon: '❧' },
  { name: 'Reception', date: '14 February 2027', time: '7:00 PM', venue: 'Temple View Lawns, Madurai', note: 'Dinner, dancing, and our first night as newlyweds.', icon: '✧' },
]

// Floating lantern atmosphere: position (%), parallax depth, scale, blur (px).
export const atmosphereLanterns = [
  { x: 6, y: 12, d: 0.22, s: 0.62, b: 2.2 },
  { x: 89, y: 20, d: 0.35, s: 0.78, b: 1.4 },
  { x: 12, y: 42, d: 0.7, s: 1.05, b: 0.4 },
  { x: 93, y: 55, d: 0.28, s: 0.58, b: 2.6 },
  { x: 4, y: 72, d: 1, s: 1.35, b: 0.2 },
  { x: 87, y: 84, d: 0.62, s: 0.92, b: 0.8 },
  { x: 48, y: 64, d: 0.18, s: 0.42, b: 3.2 },
]
