import { useState } from "react";
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

type Props = {
  initialDate?: Date;
  applyDate: (nextDate: Date) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
};

const EditCalendarModal = ({
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

  const handleAfterMonth = () => setYearMonth((d) => addMonths(d, 1));
  const handleBeforeMonth = () => setYearMonth((d) => addMonths(d, -1));
  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setYearMonth((d) => setYear(d, Number(e.target.value)));
  const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setYearMonth((d) => setMonth(d, Number(e.target.value)));

  const handleApply = () => {
    if (!draftDate) return;
    applyDate(draftDate);
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
      <div className={Styles.ButtonContainer}>
        <CancelButton onClick={handleCancel} />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditCalendarModal;
