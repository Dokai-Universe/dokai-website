import { useMemo } from "react";
import * as Styles from "./style.css";
import SaveSVG from "@assets/icons/save.svg";
import useStructuredTextDraft from "./useStructuredTextDraft";
import {
  fromStructuredText,
  toStructuredText,
  StructuredTextSpec,
} from "./utils";
import { useAutoResizeTextarea } from "@hooks/useAutoResizeTextarea";

const StructuredTextEditor = <T extends Record<string, unknown> | string>({
  data,
  spec,
  onChange,
  placeholder,
}: {
  data: T[];
  spec: StructuredTextSpec;
  onChange?: (nextData: T[]) => void;
  placeholder?: string;
}) => {
  const toDraft = useMemo(
    () => (v: T[]) => toStructuredText<T>(v, spec),
    [spec],
  );
  const fromDraft = useMemo(
    () => (s: string) => fromStructuredText<T>(s, spec),
    [spec],
  );

  const { draft, setDraft, setIsFocus, dirty, commit } = useStructuredTextDraft<
    T[]
  >({
    value: data,
    toDraft,
    fromDraft,
    onCommit: onChange,
    syncWhen: ({ isFocus, dirty }) => !isFocus && !dirty,
  });

  const textareaRef = useAutoResizeTextarea(draft, { minRows: 6, maxRows: 18 });

  return (
    <div className={Styles.Container}>
      <textarea
        ref={textareaRef}
        className={Styles.Content}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        spellCheck={false}
        placeholder={
          placeholder ?? `name\n  - value1\n  - value2\n  - value3\n...`
        }
      />

      <button
        type="button"
        onClick={commit}
        className={Styles.Button}
        aria-disabled={!dirty}
      >
        <SaveSVG className={Styles.ButtonIcon} />
      </button>
    </div>
  );
};

export default StructuredTextEditor;
