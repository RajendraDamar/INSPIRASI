import React, { useState, useMemo, KeyboardEvent } from 'react';

export const Tabs: React.FC<{ tabs: string[]; active?: number; onChange?: (index: number) => void }> = ({ tabs, active, onChange }) => {
  // bounds-check the active index; default to 0 when invalid
  const safeActive = useMemo(() => {
    const a = typeof active === 'number' ? active : 0;
    if (!tabs || tabs.length === 0) return 0;
    return Math.min(Math.max(0, a), tabs.length - 1);
  }, [active, tabs]);

  const [localActive, setLocalActive] = useState<number>(safeActive);

  // keep local state in sync when controlled via prop
  React.useEffect(() => {
    setLocalActive(safeActive);
  }, [safeActive]);

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      const next = Math.min(localActive + 1, tabs.length - 1);
      setLocalActive(next);
      onChange?.(next);
      (document.getElementById(`tab-${next}`) as HTMLElement | null)?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = Math.max(localActive - 1, 0);
      setLocalActive(prev);
      onChange?.(prev);
      (document.getElementById(`tab-${prev}`) as HTMLElement | null)?.focus();
    } else if (e.key === 'Home') {
      setLocalActive(0);
      onChange?.(0);
      (document.getElementById(`tab-0`) as HTMLElement | null)?.focus();
    } else if (e.key === 'End') {
      const last = tabs.length - 1;
      setLocalActive(last);
      onChange?.(last);
      (document.getElementById(`tab-${last}`) as HTMLElement | null)?.focus();
    }
  };

  return (
    <div className="flex space-x-2" role="tablist">
      {tabs.map((t, i) => (
        <button
          key={t}
          id={`tab-${i}`}
          aria-controls={`panel-${i}`}
          role="tab"
          aria-selected={i === localActive}
          tabIndex={i === localActive ? 0 : -1}
          onClick={() => {
            setLocalActive(i);
            onChange?.(i);
          }}
          onKeyDown={(e) => handleKey(e)}
          className={`px-3 py-1 rounded ${i === localActive ? 'bg-primary-600 text-white' : 'bg-gray-100 text-black'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
