import {
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
  useCallback,
  type ReactNode,
} from 'react';
import {Icon} from './Icon';
type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};
const AsideContext = createContext<AsideContextValue | null>(null);
export function Aside({
  children,
  heading,
  type,
}: {
  children?: ReactNode;
  heading: ReactNode;
  type: AsideType;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const nodes = Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"]',
        ) ?? [],
      ).filter((el) => el.getClientRects().length > 0);
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (!first) {
        event.preventDefault();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === panel.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === panel.current)
      ) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (previous?.isConnected) previous.focus();
    };
  }, [expanded, close]);
  return (
    <div className={`overlay ${expanded ? 'expanded' : ''}`} hidden={!expanded}>
      <button
        type="button"
        className="close-outside"
        aria-label={`Close ${String(heading)}`}
        onClick={close}
        tabIndex={-1}
      />
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`aside-${type}-heading`}
        tabIndex={-1}
      >
        <header>
          <h2 id={`aside-${type}-heading`}>{heading}</h2>
          <button
            className="icon-button"
            type="button"
            onClick={close}
            aria-label="Close dialog"
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="aside-content">{children}</div>
      </aside>
    </div>
  );
}
Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');
  const close = useCallback(() => setType('closed'), []);
  return (
    <AsideContext.Provider value={{type, open: setType, close}}>
      {children}
    </AsideContext.Provider>
  );
};
export function useAside() {
  const value = useContext(AsideContext);
  if (!value) throw new Error('useAside requires Aside.Provider');
  return value;
}
