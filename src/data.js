// All invitation copy and media paths live here.
import adPhoto from './ad.jpeg'
import adiPhoto from './aditi.jpeg'
import songAditi from './song aditi.mpeg'

export const WEDDING_DATE = new Date('2026-11-20T19:00:00+05:30')

export const media = {
  openingVideo: '/media/aarav-ananya-opening.mp4',
  openingPoster: '/images/entrance-first-frame.png',
  hero: '/images/invitation-reference.png',
  ceremony: '/images/haldi-mehendi.png',
  footer: '/aditi.jpeg',
  couple: '/images/couple.png',
  song: songAditi,
  bridePhoto: adiPhoto,
  groomPhoto: adPhoto,
}

export const events = [
  { name: 'Engagement', date: '20 November 2026', time: '7:00 PM', venue: 'The Landmark Hotel, Muzaffarpur', note: 'Maripur, Muzaffarpur', icon: '✦' },
]

export const atmosphereLanterns = [
  { x: 6, y: 12, d: 0.22, s: 0.62, b: 2.2 },
  { x: 89, y: 20, d: 0.35, s: 0.78, b: 1.4 },
  { x: 12, y: 42, d: 0.7, s: 1.05, b: 0.4 },
  { x: 93, y: 55, d: 0.28, s: 0.58, b: 2.6 },
  { x: 4, y: 72, d: 1, s: 1.35, b: 0.2 },
  { x: 87, y: 84, d: 0.62, s: 0.92, b: 0.8 },
  { x: 48, y: 64, d: 0.18, s: 0.42, b: 3.2 },
]
