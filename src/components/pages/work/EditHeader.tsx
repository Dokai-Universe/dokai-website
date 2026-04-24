import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { WorkInput } from "./work";
import EditMediaSingle from "@components/ui/Edit/EditMediaSingle/EditMediaSingle";
import { MediaSource } from "@domain/media";
import EditDatePicker from "@components/ui/Edit/EditDatePicker/EditDatePicker";
import { WorkMetaField } from "@domain/work";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import { useModalStackStore } from "@stores/modalStackStore";
import EditToggle from "@components/ui/Edit/EditToggle/EditToggle";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import AddButton from "@components/ui/Edit/AddButton/AddButton";

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
    setValue("mainMedia", media, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleEditMetaList = () => {
    push("EDIT_META_INFO_LIST", {
      initial: meta,
      applyMetaList: (next: WorkMetaField[]) => {
        setValue("meta", next, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
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
          <p className={Styles.EditHeaderMetaTitle}>Meta</p>
          <EditButton
            onClick={handleEditMetaList}
            className={Styles.EditHeaderMetaEditButton}
          />

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
            </div>
          ))}

          {!meta.length && <AddButton onClick={handleEditMetaList} />}

          <ErrorText message={errors.meta?.message} />
        </div>
      </div>

      <div className={Styles.HeaderMediaContainer({ isShortForm })}>
        <EditToggle
          title="Vertical (9:16) Mode"
          checked={isShortForm}
          onChange={(checked) => {
            setValue("isShortForm", checked, {
              shouldDirty: true,
              shouldTouch: true,
            });
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
