import { useMemo, useState } from "react";
import {
  addMonths,
  getCalendarYmdList,
  isValidDate,
  Months,
  setMonth,
  setYear,
  WeekDays,
} from "@utils/Date";
import * as Styles from "./style.css";
import CaretLeftSVG from "@assets/icons/caret_left.svg";
import CaretRightSVG from "@assets/icons/caret_right.svg";
import ModalLayout from "@components/modals/ModalLayout";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";

type DatePrecision = "year" | "month" | "day";
const DatePrecisions = [
  {
    key: "year",
    placeholder: "YYYY",
  },
  {
    key: "month",
    placeholder: "MM",
  },
  {
    key: "day",
    placeholder: "DD",
  },
] as const;

type DateSeparator = "dash" | "dot" | "space";
const DateSeparators = [
  {
    key: "dash",
    placeholder: "YYYY-MM-DD",
  },
  {
    key: "dot",
    placeholder: "YYYY. MM. DD",
  },
  {
    key: "space",
    placeholder: "YYYY MM DD",
  },
] as const;

type DateFormatConfig = {
  zeroPad: boolean;
  precision: DatePrecision;
  separator: DateSeparator;
  dotSpace?: boolean;
};

const pad = (n: number, zeroPad: boolean) =>
  zeroPad ? String(n).padStart(2, "0") : String(n);

const formatDateByConfig = (d: Date, cfg: DateFormatConfig) => {
  const y = String(d.getFullYear());
  const m = pad(d.getMonth() + 1, cfg.zeroPad);
  const day = pad(d.getDate(), cfg.zeroPad);

  const parts: string[] =
    cfg.precision === "year"
      ? [y]
      : cfg.precision === "month"
        ? [y, m]
        : [y, m, day];

  if (cfg.separator === "dash") return parts.join("-");
  if (cfg.separator === "space") return parts.join(" ");

  // dot
  const sep = cfg.dotSpace ? ". " : ".";
  return parts.join(sep);
};

const DEFAULT_FORMAT: DateFormatConfig = {
  zeroPad: true,
  precision: "year",
  separator: "dash",
};

type Props = {
  initialDate?: Date;
  applyDate: (nextDate: Date, nextText: string) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
};

const EditDatePickerModal = ({
  initialDate,
  applyDate,
  isOpen,
  closeModal,
  requestCloseModal,
}: Props) => {
  const [draftDate, setDraftDate] = useState<Date>(
    isValidDate(initialDate) ? initialDate : new Date(),
  );
  const [yearMonth, setYearMonth] = useState<Date>(
    new Date(
      new Date(isValidDate(initialDate) ? initialDate : new Date()).setDate(1),
    ),
  );
  const [draftFormat, setDraftFormat] =
    useState<DateFormatConfig>(DEFAULT_FORMAT);

  const preview = useMemo(() => {
    if (!draftDate) return "날짜를 선택하세요";
    return formatDateByConfig(draftDate, draftFormat);
  }, [draftDate, draftFormat]);

  const handleAfterMonth = () => setYearMonth((d) => addMonths(d, 1));
  const handleBeforeMonth = () => setYearMonth((d) => addMonths(d, -1));
  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setYearMonth((d) => setYear(d, Number(e.target.value)));
  const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setYearMonth((d) => setMonth(d, Number(e.target.value)));
  const updateFormat = (patch: Partial<DateFormatConfig>) =>
    setDraftFormat((p) => ({ ...p, ...patch }));

  const handleApply = () => {
    if (!draftDate) return;
    applyDate(draftDate, formatDateByConfig(draftDate, draftFormat));
    requestCloseModal();
  };

  const handleCancel = () => {
    requestCloseModal();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeModal}
      title="Calendar"
      className={Styles.Container}
    >
      <div className={Styles.CalendarContainer}>
        <div className={Styles.CalendarHeader}>
          <button
            onClick={handleBeforeMonth}
            className={Styles.CalendarHeaderButton}
          >
            <CaretLeftSVG className={Styles.CalendarHeaderButtonIcon} />
          </button>
          <div className={Styles.CalendarHeaderTitle}>
            <select
              className={Styles.CalendarHeaderTitleYear}
              value={yearMonth.getFullYear()}
              onChange={handleChangeYear}
            >
              {Array.from({ length: 100 }, (_, i) => 1970 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className={Styles.CalendarHeaderTitleMonth}
              value={yearMonth.getMonth()}
              onChange={handleChangeMonth}
            >
              {Months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAfterMonth}
            className={Styles.CalendarHeaderButton}
          >
            <CaretRightSVG className={Styles.CalendarHeaderButtonIcon} />
          </button>
        </div>
        <div className={Styles.CalendarBody}>
          <div className={Styles.CalendarGridHeader}>
            {WeekDays.map((day) => (
              <p key={day} className={Styles.CalendarGridHeaderItem}>
                {day}
              </p>
            ))}
          </div>
          <div className={Styles.CalendarGridBody}>
            {getCalendarYmdList(yearMonth, draftDate, {
              fixedWeeks: true,
            }).map((day) => (
              <button
                key={day.ymd}
                data-selected={day.isSelected}
                data-in-month={day.inMonth}
                data-is-today={day.isToday}
                className={Styles.CalendarGridBodyItem}
                onClick={() => {
                  setDraftDate(new Date(day.ymd));
                }}
              >
                {day.date}
              </button>
            ))}
          </div>
        </div>
      </div>
      <aside className={Styles.OptionContainer}>
        <div className={Styles.OptionPreviewContainer}>
          <p className={Styles.OptionTitle}>Preview</p>
          <p className={Styles.OptionPreview}>{preview}</p>
        </div>

        <div className={Styles.OptionFormatContainer}>
          <p className={Styles.OptionTitle}>Format</p>

          <div className={Styles.OptionFormatItemContainer}>
            <label className={Styles.OptionFormatZeroPadLabel}>
              <p className={Styles.OptionSubTitle}>Leading zero</p>
              <input
                type="checkbox"
                checked={draftFormat.zeroPad}
                onChange={(e) => updateFormat({ zeroPad: e.target.checked })}
              />
            </label>
            <span className={Styles.OptionFormatItemHint}>
              2026-02-07 vs 2026-2-7
            </span>
          </div>

          <div className={Styles.OptionFormatItemContainer}>
            <p className={Styles.OptionSubTitle}>Precision</p>
            <div className={Styles.OptionFormatPrecisionContainer}>
              {DatePrecisions.map((prec) => (
                <label
                  key={`CALENDAR-PRECISION-${prec.key}`}
                  className={Styles.OptionFormatItemLabel}
                >
                  {prec.placeholder}
                  <input
                    type="radio"
                    name="precision"
                    value={prec.key}
                    checked={draftFormat.precision === prec.key}
                    className={Styles.OptionFormatItemInput}
                    onChange={(e) =>
                      updateFormat({
                        precision: e.target.value as DatePrecision,
                      })
                    }
                  />
                </label>
              ))}
            </div>
            <span className={Styles.OptionFormatItemHint}>
              {draftFormat.precision === "year"
                ? "YYYY"
                : draftFormat.precision === "month"
                  ? "YYYY-MM"
                  : "YYYY-MM-DD"}
            </span>
          </div>

          <div className={Styles.OptionFormatItemContainer}>
            <p className={Styles.OptionSubTitle}>Separator</p>

            <div className={Styles.OptionFormatSeparatorContainer}>
              {DateSeparators.map((opt) => (
                <label key={opt.key} className={Styles.OptionFormatItemLabel}>
                  {opt.key}
                  <p className={Styles.OptionFormatItemHint}>
                    {opt.placeholder}
                  </p>

                  <input
                    type="radio"
                    name="separator"
                    value={opt.key}
                    checked={draftFormat.separator === opt.key}
                    className={Styles.OptionFormatItemInput}
                    onChange={() =>
                      updateFormat({
                        separator: opt.key,
                        dotSpace: opt.key === "dot",
                      })
                    }
                  />
                </label>
              ))}
            </div>

            {draftFormat.separator === "dot" && (
              <label className={Styles.OptionFormatItemDotSpaceLabel}>
                <input
                  type="checkbox"
                  checked={!!draftFormat.dotSpace}
                  onChange={(e) => updateFormat({ dotSpace: e.target.checked })}
                />
                <span>Dot + space (&quot;. &quot;)</span>
              </label>
            )}
          </div>
        </div>
        <div className={Styles.ButtonContainer}>
          <CancelButton onClick={handleCancel} />
          <ApplyButton onClick={handleApply} />
        </div>
      </aside>
    </ModalLayout>
  );
};

export default EditDatePickerModal;
