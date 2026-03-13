import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { WorkInput } from "./work";
import EditMediaSingle from "@components/ui/Edit/EditMediaSingle/EditMediaSingle";
import { MediaSource } from "@domain/media";
import EditDatePicker from "@components/ui/Edit/EditDatePicker/EditDatePicker";
import { WorkMetaField } from "@domain/work";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useModalStackStore } from "@stores/modalStackStore";
import EditToggle from "@components/ui/Edit/EditToggle/EditToggle";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";

const WorkEditHeader = () => {
  const form = useFormContext<WorkInput>();
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const { push } = useModalStackStore();

  const mainMedia = watch("mainMedia") as MediaSource;
  const meta = (watch("meta") ?? []) as WorkMetaField[];
  const isShortForm = watch("isShortForm");

  const handleApplyMedia = (media: MediaSource) => {
    setValue("mainMedia", media);
  };

  const handleEditMeta = (idx: number) => {
    push("EDIT_META_INFO", {
      initial: meta[idx],
      applyMeta: (next) => {
        setValue(
          "meta",
          meta.map((e, i) => (i === idx ? next : e)),
        );
      },
      deleteMeta: () => {
        setValue(
          "meta",
          meta.filter((_, i) => i !== idx),
        );
      },
    });
  };

  const handleAddMeta = () => {
    push("EDIT_META_INFO", {
      applyMeta: (next) => {
        setValue("meta", [...meta, next]);
      },
    });
  };

  return (
    <div className={Styles.HeaderContainer}>
      <TitleInput
        title="Title"
        placeholder="Title"
        form={form}
        name="title"
        className={Styles.HeaderTitle}
      />
      <div className={Styles.HeaderBody({ isShortForm })}>
        <div className={Styles.HeaderInfo}>
          <EditDatePicker
            title="Production Date"
            placeholder="Production Date"
            form={form}
            name="productionDate"
          />
          <TitleInput
            title="Production Type"
            placeholder="Production Type"
            form={form}
            name="productionType"
          />
        </div>
        <div className={Styles.HeaderMetaList({ isShortForm })}>
          {meta.map((e, idx) => (
            <div
              key={`WORK_META_${idx}`}
              className={Styles.EditHeaderMetaItemContainer}
            >
              <div className={Styles.HeaderMetaItem}>
                <p className={Styles.HeaderMetaName}>{e.name}</p>
                <div>
                  {e.values.map((v, vIdx) => (
                    <p
                      key={`WORK_META_${idx}_${vIdx}`}
                      className={Styles.HeaderMetaValue}
                    >
                      {v}
                    </p>
                  ))}
                </div>
              </div>
              <EditButton
                onClick={() => handleEditMeta(idx)}
                className={Styles.EditHeaderMetaEditButton}
              />
            </div>
          ))}
          <div className={Styles.EditHeaderMetaAddButtonContainer}>
            <AddButton onClick={handleAddMeta} />
            <ErrorText message={errors.meta?.message} />
          </div>
        </div>
      </div>
      <div className={Styles.HeaderMediaContainer({ isShortForm })}>
        <EditToggle
          title="Vertical (9:16) Mode"
          checked={isShortForm}
          onChange={(checked) => {
            setValue("isShortForm", checked);
          }}
        />
        <EditMediaSingle
          media={mainMedia}
          applyMedia={handleApplyMedia}
          className={Styles.HeaderMedia({ isShortForm })}
          priority
        />
        <ErrorText message={errors.mainMedia?.message} />
      </div>
    </div>
  );
};

export default WorkEditHeader;
