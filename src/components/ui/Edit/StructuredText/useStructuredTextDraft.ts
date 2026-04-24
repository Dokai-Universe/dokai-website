import { useEffect, useMemo, useRef, useState } from "react";

type UseStructuredTextDraftOptions<T> = {
  value: T;
  toDraft: (value: T) => string;
  fromDraft: (draft: string) => T;
  onCommit?: (next: T) => void;
  syncWhen?: (args: { isFocus: boolean; dirty: boolean }) => boolean;
};

export default function useStructuredTextDraft<T>({
  value,
  toDraft,
  fromDraft,
  onCommit,
  syncWhen,
}: UseStructuredTextDraftOptions<T>) {
  const initial = useMemo(() => toDraft(value), []);
  const [draft, setDraft] = useState(initial);
  const [isFocus, setIsFocus] = useState(false);

  const lastSyncedRef = useRef<string>(draft);
  const dirty = draft !== lastSyncedRef.current;

  const shouldSync = syncWhen ?? (({ isFocus }) => !isFocus);

  const nextDraft = useMemo(() => toDraft(value), [value, toDraft]);

  useEffect(() => {
    if (!shouldSync({ isFocus, dirty })) return;

    setDraft(nextDraft);
    lastSyncedRef.current = nextDraft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextDraft, isFocus, dirty, shouldSync]);

  const commit = () => {
    const next = fromDraft(draft);
    onCommit?.(next);

    lastSyncedRef.current = draft;
  };

  const reset = () => {
    setDraft(lastSyncedRef.current);
  };

  return {
    draft,
    setDraft,
    isFocus,
    setIsFocus,
    dirty,
    commit,
    reset,
  };
}
