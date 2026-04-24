"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";

import TextBoldIcon from "@assets/icons/text-bold.svg";
import TextItalicIcon from "@assets/icons/text-italic.svg";
import TextUnderlineIcon from "@assets/icons/text-underline.svg";
import TextHyperlinkIcon from "@assets/icons/text-hyperlink.svg";

import ErrorText from "../ErrorText/ErrorText";
import {
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";
import { useModalStackStore } from "@stores/modalStackStore";

/** ===== sanitize utils (동일) ===== */
const UNWRAP_TAGS = new Set(["DIV", "SPAN", "P"]);
const ALLOWED_TAGS = new Set(["B", "I", "U", "A", "BR"]);
const ALLOWED_A_ATTRS = new Set(["href", "target", "rel"]);

function unwrap(el: Element) {
  const parent = el.parentNode;
  if (!parent) return;
  while (el.firstChild) parent.insertBefore(el.firstChild, el);
  parent.removeChild(el);
}
function removeAllAttributes(el: Element) {
  for (let i = el.attributes.length - 1; i >= 0; i--) {
    el.removeAttribute(el.attributes[i].name);
  }
}
function sanitizeAnchor(a: HTMLAnchorElement) {
  for (let i = a.attributes.length - 1; i >= 0; i--) {
    const name = a.attributes[i].name.toLowerCase();
    if (!ALLOWED_A_ATTRS.has(name)) a.removeAttribute(a.attributes[i].name);
  }
  if (a.getAttribute("target") === "_blank") {
    const rel = a.getAttribute("rel") ?? "";
    if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) {
      a.setAttribute("rel", "noopener noreferrer");
    }
  }
}
function removeHtmlComments(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  const toRemove: Comment[] = [];
  let n = walker.nextNode();
  while (n) {
    toRemove.push(n as Comment);
    n = walker.nextNode();
  }
  for (const c of toRemove) c.parentNode?.removeChild(c);
}
export function sanitizeRichHtml(root: HTMLElement) {
  removeHtmlComments(root);
  for (const el of Array.from(root.querySelectorAll("*"))) {
    const tag = el.tagName;
    if (UNWRAP_TAGS.has(tag) || !ALLOWED_TAGS.has(tag)) {
      unwrap(el);
      continue;
    }
    if (tag === "A") sanitizeAnchor(el as HTMLAnchorElement);
    else removeAllAttributes(el);
  }
}
function isBlankTextNode(n: ChildNode) {
  return n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim() === "";
}
function isBr(n: ChildNode) {
  return n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName === "BR";
}
function trimOuterBlankLines(root: HTMLElement) {
  while (
    root.firstChild &&
    (isBlankTextNode(root.firstChild) || isBr(root.firstChild))
  ) {
    root.removeChild(root.firstChild);
  }
  while (
    root.lastChild &&
    (isBlankTextNode(root.lastChild) || isBr(root.lastChild))
  ) {
    root.removeChild(root.lastChild);
  }
}
function trimBlankLinesText(input: string) {
  const s = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = s.split("\n");
  let start = 0;
  while (start < lines.length && lines[start].trim() === "") start++;
  let end = lines.length - 1;
  while (end >= start && lines[end].trim() === "") end--;
  return lines.slice(start, end + 1).join("\n");
}
function textToSafeHtmlWithBr(text: string) {
  return trimBlankLinesText(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}
export function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
export function getClosestLinkInSelection(
  editor: HTMLElement,
): HTMLAnchorElement | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const node = sel.anchorNode;
  if (!node) return null;

  let el: HTMLElement | null =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as HTMLElement)
      : node.parentElement;

  while (el && el !== editor) {
    if (el.tagName === "A") return el as HTMLAnchorElement;
    el = el.parentElement;
  }
  return null;
}

/** ===== toolbar (링크까지 포함) ===== */
const TOOLBARS = [
  { Icon: TextBoldIcon, ariaLabel: "Bold", cmd: "bold" },
  { Icon: TextItalicIcon, ariaLabel: "Italic", cmd: "italic" },
  { Icon: TextUnderlineIcon, ariaLabel: "Underline", cmd: "underline" },
  { Icon: TextHyperlinkIcon, ariaLabel: "Hyperlink", cmd: "link" as const },
] as const;

type Props<T extends FieldValues, K extends Path<T>> = {
  title?: string;
  placeholder?: string;
  form: UseFormReturn<T>;
  name: K;
  className?: string;
  disabled?: boolean;
  onChange?: (nextHtml: string) => void;
};

const TitleRichText = <T extends FieldValues, K extends Path<T>>({
  title,
  placeholder,
  form,
  name,
  className,
  disabled,
  onChange,
}: Props<T, K>) => {
  const { control, trigger } = form;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  const { push } = useModalStackStore();

  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const withEditor = useCallback((fn: (el: HTMLDivElement) => void) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    fn(el);
  }, []);

  const commit = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;

    sanitizeRichHtml(el);
    trimOuterBlankLines(el);

    const next = el.innerHTML;
    if (next !== (field.value ?? "")) {
      field.onChange(next);
      onChange?.(next);
    }

    trigger(name);
  }, [field, onChange, trigger, name]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const next = (field.value ?? "") as string;
    if (el.innerHTML !== next) el.innerHTML = next;
  }, [field.value]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const onBeforeInput = (e: InputEvent) => {
      if (e.inputType === "insertParagraph") {
        e.preventDefault();
        document.execCommand("insertLineBreak");
      }
    };

    el.addEventListener("beforeinput", onBeforeInput as EventListener);
    return () =>
      el.removeEventListener("beforeinput", onBeforeInput as EventListener);
  }, []);

  const exec = useCallback(
    (cmd: string, arg?: string) => {
      withEditor(() => {
        arg !== undefined
          ? document.execCommand(cmd, false, arg)
          : document.execCommand(cmd);
        commit();
      });
    },
    [withEditor, commit],
  );
  const openLink = () => {
    withEditor((el) => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const existing = getClosestLinkInSelection(el);
      if (existing) return exec("unlink");

      if (sel.isCollapsed) return alert("Select text to create a link.");

      savedRangeRef.current = sel.getRangeAt(0).cloneRange();

      push("HYPERLINK", {
        onApply: applyLink,
      });
    });
  };

  const applyLink = (url: string) => {
    if (!isValidUrl(url)) return;

    withEditor((el) => {
      const r = savedRangeRef.current;
      const sel = window.getSelection();
      if (r && sel) {
        sel.removeAllRanges();
        sel.addRange(r);
      }

      document.execCommand("createLink", false, url);

      const link = getClosestLinkInSelection(el);
      if (link) {
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }

      commit();
    });
  };

  const onPaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();

      const html = e.clipboardData.getData("text/html");
      const plain = e.clipboardData.getData("text/plain");

      const insert = (nextHtml: string) => {
        document.execCommand("insertHTML", false, nextHtml);
        commit();
      };

      if (html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        sanitizeRichHtml(tmp);
        trimOuterBlankLines(tmp);
        insert(tmp.innerHTML);
        return;
      }

      insert(textToSafeHtmlWithBr(plain));
    },
    [commit],
  );

  return (
    <div className={`${Styles.Container} ${className ?? ""}`}>
      {title && <p className={Styles.Title}>{title}</p>}
      <div className={Styles.Content}>
        <div
          className={Styles.ToolbarContainer}
          onMouseDown={(e) => e.preventDefault()}
        >
          {TOOLBARS.map(({ Icon, ariaLabel, cmd }) => (
            <button
              key={ariaLabel}
              type="button"
              className={Styles.ToolbarButton}
              aria-label={ariaLabel}
              disabled={disabled}
              onClick={() => (cmd === "link" ? openLink() : exec(cmd))}
            >
              <Icon className={Styles.ToolbarButtonIcon} />
            </button>
          ))}
        </div>

        <div
          ref={editorRef}
          className={Styles.RichText}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder ?? "Write text here..."}
          onPaste={onPaste}
          onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t.closest("a")) e.preventDefault();
          }}
          onBlur={() => {
            commit();
          }}
        />
      </div>
      <ErrorText message={error?.message} />
    </div>
  );
};

export default TitleRichText;
