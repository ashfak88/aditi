// Small "Crafted by Zetron Tech" watermark — footer only, links to our Instagram.
export const ZETRON_INSTAGRAM = 'https://www.instagram.com/zetron.tech'

export default function Credit() {
  return (
    <a
      href={ZETRON_INSTAGRAM}
      target="_blank"
      rel="noreferrer"
      aria-label="Crafted by Zetron Tech on Instagram"
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '16px',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '.2em',
        color: 'rgba(92, 53, 59, 0.6)', /* using a slightly faded --ink color for visibility on peach */
        textDecoration: 'none',
        paddingBottom: '14px',
      }}
    >
      <span>Crafted by</span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
      </svg>
      <span>Zetron Tech</span>
    </a>
  )
}
