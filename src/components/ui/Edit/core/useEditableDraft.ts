import { useEffect, useRef, useState } from "react";

type UseEditableDraftOptions<T> = {
  value: T;
  toDraft: (value: T) => string;
  fromDraft: (draft: string) => T;
  onCommit?: (next: T) => void;
  syncWhen?: (args: { isFocus: boolean; dirty: boolean }) => boolean;
};

export default function useEditableDraft<T>({
  value,
  toDraft,
  fromDraft,
  onCommit,
  syncWhen,
}: UseEditableDraftOptions<T>) {
  const [draft, setDraft] = useState(() => toDraft(value));
  const [isFocus, setIsFocus] = useState(false);

  const lastSyncedRef = useRef<string>(draft);
  const dirty = draft !== lastSyncedRef.current;

  const shouldSync = syncWhen ?? (({ isFocus }) => !isFocus);

  useEffect(() => {
    const nextDraft = toDraft(value);
    if (!shouldSync({ isFocus, dirty })) return;

    setDraft(nextDraft);
    lastSyncedRef.current = nextDraft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isFocus]);

  const commit = () => {
    const next = fromDraft(draft);
    onCommit?.(next);

    lastSyncedRef.current = draft;
  };

  const reset = () => {
    const nextDraft = toDraft(value);
    setDraft(nextDraft);
    lastSyncedRef.current = nextDraft;
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
