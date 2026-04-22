// src/stores/modalStackStore.ts
import { AboutCard, AboutContent, AboutGroup, AboutTeam } from "@domain/about";
import { ContactLink, ProjectContent } from "@domain/careers";
import { MediaSource, MediaType } from "@domain/media";
import { NewsChapterContent } from "@domain/news";
import { WorkCredit, WorkMetaField } from "@domain/work";
import { create } from "zustand";

export type ModalMap = {
  API: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFetch: () => void | Promise<any>;
    loadingText?: string;
    doneText?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess?: (data: any) => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
    isRouteAfterConfirm?: boolean;
  };

  CONFIRM: {
    title: string;
    content: string;
    onConfirm?: () => void | Promise<void>;
  };

  DRAWER_MENU: {
    handleCloseAll: () => void;
  };

  SEARCH: {
    handleCloseAll: () => void;
  };

  PROJECT: {
    ownerEmail: string;
    inEditPage?: boolean;
    editProjectId?: string;
  };

  EDIT_MEDIA_LIST: {
    initial?: MediaSource[];
    applyMedias?: (medias: MediaSource[]) => void;
    blockedTypes?: MediaType[];
  };

  EDIT_MEDIA_SINGLE: {
    initial?: MediaSource | null;
    applyMedia?: (media: MediaSource) => void;
    blockedTypes?: MediaType[];
  };

  EDIT_PROJECT_CONTENT: {
    initial?: ProjectContent;
    applyContent?: (content: ProjectContent) => void;
  };

  EDIT_CONTACT: {
    initial: ContactLink;
    applyContact: (contact: ContactLink) => void;
    deleteContact?: () => void;
  };

  EDIT_EXPERIENCE: {
    initial: string;
    applyExperience: (next: string) => void;
    deleteExperience?: () => void;
  };

  EDIT_CALENDAR: {
    initialDate?: Date;
    applyDate: (nextDate: Date) => void;
  };

  EDIT_DATE_PICKER: {
    initialDate?: Date;
    applyDate: (nextDate: Date, nextText: string) => void;
  };

  EDIT_META_INFO: {
    initial?: WorkMetaField;
    applyMeta: (next: WorkMetaField) => void;
    deleteMeta?: () => void;
  };

  EDIT_CREDIT: {
    initial?: WorkCredit;
    applyCredit: (next: WorkCredit) => void;
    deleteCredit?: () => void;
  };

  UPLOAD_IMAGE: {
    uploadImages: (
      setProgress: (file: File | null, progress: number, count: number) => void,
    ) => void;
    handleCommit?: () => void;
  };

  HYPERLINK: {
    onApply: (url: string) => void;
  };

  EDIT_ABOUT_GROUP: {
    initial?: AboutGroup;
    applyGroup: (next: AboutGroup) => void;
    deleteGroup?: () => void;
  };

  EDIT_ABOUT_CARD: {
    initial?: AboutCard;
    applyCard: (next: AboutCard) => void;
    deleteCard?: () => void;
  };

  EDIT_ABOUT_TEAM: {
    initial?: AboutTeam;
    applyTeam: (next: AboutTeam) => void;
    deleteTeam?: () => void;
  };

  ADD_ABOUT_SECTION: {
    addAboutContent: (content: AboutContent) => void;
  };

  ADD_NEWS_CONTENT: {
    addNewsContent: (content: NewsChapterContent) => void;
  };
};

export type ModalState = {
  [K in keyof ModalMap]: {
    id: string;
    type: K;
    props: ModalMap[K];
    status?: "open" | "closing";
  };
}[keyof ModalMap];

type Store = {
  stack: ModalState[];
  push: <K extends keyof ModalMap>(type: K, props: ModalMap[K]) => string;
  pop: () => void;
  replaceTop: <K extends keyof ModalMap>(type: K, props: ModalMap[K]) => void;
  clear: () => void;
  requestCloseTop: () => void;
  requestCloseById: (id: string) => void;
  finalizeCloseById: (id: string) => void;
  requestCloseByTypes: (types: (keyof ModalMap)[]) => void;
  requestCloseAll: () => void;
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useModalStackStore = create<Store>((set) => ({
  stack: [],
  push: (type, props) => {
    const id = uid();
    set((s) => ({
      stack: [...s.stack, { id, type, props, status: "open" } as ModalState],
    }));
    return id;
  },
  pop: () => set((s) => ({ stack: s.stack.slice(0, -1) })),
  replaceTop: (type, props) =>
    set((s) => ({
      stack: [
        ...s.stack.slice(0, -1),
        { id: uid(), type, props, status: "open" } as ModalState,
      ],
    })),
  clear: () => set({ stack: [] }),
  requestCloseById: (id) =>
    set((s) => ({
      stack: s.stack.map((m) =>
        m.id === id ? ({ ...m, status: "closing" } as ModalState) : m,
      ),
    })),
  requestCloseTop: () =>
    set((s) => {
      const top = s.stack[s.stack.length - 1];
      if (!top) return s;
      return {
        stack: s.stack.map((m) =>
          m.id === top.id ? ({ ...m, status: "closing" } as ModalState) : m,
        ),
      };
    }),
  finalizeCloseById: (id) =>
    set((s) => ({ stack: s.stack.filter((m) => m.id !== id) })),
  requestCloseByTypes: (types) =>
    set((s) => ({
      stack: s.stack.map((m) =>
        types.includes(m.type)
          ? ({ ...m, status: "closing" } as ModalState)
          : m,
      ),
    })),
  requestCloseAll: () =>
    set((s) => ({
      stack: s.stack.map((m) => ({ ...m, status: "closing" }) as ModalState),
    })),
}));
