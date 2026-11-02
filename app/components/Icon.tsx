import type {CSSProperties} from 'react';

export function Icon({
  name,
  size = 20,
  style,
}: {
  name:
    | 'arrow'
    | 'search'
    | 'bag'
    | 'menu'
    | 'close'
    | 'car'
    | 'check'
    | 'chevron'
    | 'pin'
    | 'phone'
    | 'sound'
    | 'shield';
  size?: number;
  style?: CSSProperties;
}) {
  const paths: Record<typeof name, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    bag: (
      <>
        <path d="M5 7h14l1 14H4L5 7Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </>
    ),
    menu: (
      <>
        <path d="M3 6h18M3 12h18M3 18h18" />
      </>
    ),
    close: <path d="m5 5 14 14M19 5 5 19" />,
    car: (
      <>
        <path d="m4 10 2-6h12l2 6M3 10h18v9h-3v-3H6v3H3v-9Z" />
        <path d="M6 12h2m8 0h2" />
      </>
    ),
    check: <path d="m5 12 4 4L20 5" />,
    chevron: <path d="m8 4 8 8-8 8" />,
    pin: (
      <>
        <path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="9" r="2" />
      </>
    ),
    phone: (
      <path d="m8 3 3 5-3 2c1 3 3 5 6 6l2-3 5 3-2 5C10 23 1 14 3 5l5-2Z" />
    ),
    sound: (
      <>
        <path d="M4 9h4l5-5v16l-5-5H4V9Z" />
        <path d="M17 7a8 8 0 0 1 0 10m3-13a12 12 0 0 1 0 16" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" />
        <path d="m8 11 3 3 5-5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
