import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { LoopSource, MediaSource } from "@domain/media";
import * as Styles from "./style.css";

type Blocked = "VIDEO" | "LOOP";

const EditVideo = ({
  media,
  updateMedia,
  blockedType,
}: {
  media: MediaSource;
  updateMedia: (updater: (curr: MediaSource) => MediaSource) => void;
  blockedType?: Blocked;
}) => {
  const isLoop = media.type === "LOOP";

  const patch = (partial: Partial<MediaSource>) =>
    updateMedia((prev) => ({ ...prev, ...partial }));

  const updateLoop = (fn: (loop: LoopSource["loop"]) => LoopSource["loop"]) =>
    updateMedia((prev) =>
      prev.type === "LOOP"
        ? ({ ...prev, loop: fn(prev.loop) } as MediaSource)
        : prev,
    );

  const toggleLoop = (checked: boolean) => {
    if (blockedType) return;
    updateMedia((prev) => {
      if (checked)
        return {
          ...prev,
          type: "LOOP",
          loop: { start: undefined, end: undefined },
        };
      const { loop, ...rest } = prev as LoopSource;
      return { ...rest, type: "VIDEO" };
    });
  };

  const setLoopFieldEnabled = (key: "start" | "end", enabled: boolean) =>
    updateLoop((loop) => ({
      ...loop,
      [key]: enabled ? (loop?.[key] ?? 0) : undefined,
    }));

  const setLoopField = (key: "start" | "end", value: number) =>
    updateLoop((loop) => ({ ...loop, [key]: value }));

  const startEnabled = isLoop && media.loop?.start !== undefined;
  const endEnabled = isLoop && media.loop?.end !== undefined;

  return (
    <div className={Styles.Container}>
      <MediaCard media={media} className={Styles.Media} useAlternative />

      <div className={Styles.Content}>
        <div className={Styles.SourceContainer}>
          <p className={Styles.Title}>Video URL or ID</p>
          <input
            type="text"
            value={media.src}
            onChange={(e) => patch({ src: e.target.value })}
            className={Styles.Input}
          />
        </div>

        {blockedType !== "LOOP" && (
          <div className={Styles.LoopContainer}>
            {blockedType !== "VIDEO" && (
              <label className={Styles.CheckboxContainer}>
                <input
                  type="checkbox"
                  checked={isLoop}
                  onChange={(e) => toggleLoop(e.target.checked)}
                />
                <p>Is loop</p>
              </label>
            )}

            <div className={Styles.LoopConfigContainer}>
              <label className={Styles.CheckboxContainer}>
                <input
                  type="checkbox"
                  checked={startEnabled}
                  disabled={!isLoop}
                  onChange={(e) =>
                    setLoopFieldEnabled("start", e.target.checked)
                  }
                />
                <p>Set start</p>
              </label>

              <input
                type="number"
                step="0.1"
                min={0}
                disabled={!startEnabled}
                value={startEnabled ? media.loop!.start : ""}
                placeholder="0.0"
                onChange={(e) => setLoopField("start", Number(e.target.value))}
                className={Styles.Input}
              />

              <label className={Styles.CheckboxContainer}>
                <input
                  type="checkbox"
                  checked={endEnabled}
                  disabled={!isLoop}
                  onChange={(e) => setLoopFieldEnabled("end", e.target.checked)}
                />
                <p>Set end</p>
              </label>

              <input
                type="number"
                step="0.1"
                min={startEnabled ? media.loop!.start : 0}
                disabled={!endEnabled}
                value={endEnabled ? media.loop!.end : ""}
                placeholder="(video end)"
                onChange={(e) => setLoopField("end", Number(e.target.value))}
                className={Styles.Input}
              />
            </div>

            <p className={Styles.HelpText}>
              If start/end is not set, it loops from the beginning/to the end.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditVideo;
