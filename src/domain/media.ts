export type LoopConfig = { start?: number; end?: number };

type MediaBase = { src: string; alt: string };

export type ImageSource = MediaBase & { type: "IMAGE" };
export type VideoSource = MediaBase & { type: "VIDEO" };
export type LoopSource = MediaBase & { type: "LOOP"; loop?: LoopConfig };

export type MediaSource = ImageSource | VideoSource | LoopSource;
