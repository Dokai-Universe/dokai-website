export type ImageSource = {
  type: "IMAGE";
  src: string;
  alt: string;
};

export type VideoSource = {
  type: "VIDEO";
  src: string;
  alt: string;
};

export type LoopConfig = {
  start?: number;
  end?: number;
};

export type LoopSource = {
  type: "LOOP";
  src: string;
  alt: string;
  loop?: LoopConfig;
};

export type MediaSource = ImageSource | VideoSource | LoopSource;
