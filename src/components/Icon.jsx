const paths = {
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h7"/></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15m6-12v15"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4 4"/></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
  back: <><path d="M19 12H5m6 6-6-6 6-6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 15l1.1 2.9L23 19l-2.9 1.1L19 23l-1.1-2.9L15 19l2.9-1.1L19 15z"/></>,
  idea: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z"/></>,
  flag: <><path d="M6 21V4m0 1 4-1.5a3 3 0 0 1 2.4 0L16 5l-1.6 3.5L16 12l-3.6 1.5a3 3 0 0 1-2.4 0L6 12"/></>,
  pencil: <><path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5.5 17 4 20Z"/><path d="M14 6l3 3"/></>,
  warn: <><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.01"/></>,
  chevron: <><path d="m6 9 6 6 6-6"/></>,
}

export default function Icon({ name, size = 18, className = '' }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}
