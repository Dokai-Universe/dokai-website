export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const WeekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

type CalendarCellYMD = {
  ymd: string; // "YYYY-MM-DD"
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  date: number; // day of month (1~31)
};

const pad2 = (n: number) => String(n).padStart(2, "0");

export const isValidDate = (d?: Date): d is Date =>
  d instanceof Date && !Number.isNaN(d.getTime());

function toYMDFromParts(y: number, m1: number, d: number) {
  return `${y}-${pad2(m1)}-${pad2(d)}`;
}

export function toYMD(input: Date | string) {
  const t = new Date(input);
  return toYMDFromParts(t.getFullYear(), t.getMonth() + 1, t.getDate());
}

function todayYMD() {
  return toYMD(new Date());
}

/**
 * viewDate: 달력에 "표시할 월" (이 달을 기준으로 그리드 생성)
 * selectedDate: 선택된 날짜(없으면 선택 표시 없음)
 * - weekStartsOn: 0이면 일요일 시작(일~토), 1이면 월요일 시작(월~일)
 * - fixedWeeks: true면 항상 6주(42칸)
 */
export function getCalendarYmdList(
  viewDate: Date | string,
  selectedDate?: Date | string | null,
  opts?: { weekStartsOn?: 0 | 1; fixedWeeks?: boolean },
): CalendarCellYMD[] {
  const weekStartsOn = opts?.weekStartsOn ?? 0;
  const fixedWeeks = opts?.fixedWeeks ?? false;

  // 표시할 월의 1일 (DST 안전을 위해 정오로)
  const base = new Date(viewDate);
  const first = new Date(base.getFullYear(), base.getMonth(), 1, 12, 0, 0, 0);

  const year = first.getFullYear();
  const monthIndex = first.getMonth(); // 0~11
  const month1 = monthIndex + 1; // 1~12

  const tYMD = todayYMD();
  const sYMD = selectedDate ? toYMD(selectedDate) : null;

  // 시작일: 첫째날이 포함된 주의 weekStartsOn 요일까지 당김
  const firstDow = first.getDay(); // 0~6
  const offset = (firstDow - weekStartsOn + 7) % 7;

  const start = new Date(first);
  start.setDate(1 - offset);

  // 마지막날
  const last = new Date(year, monthIndex + 1, 0, 12, 0, 0, 0);

  // 끝일: 마지막날이 포함된 주의 마지막 요일까지 확장
  const lastDow = last.getDay();
  const weekEnd = (weekStartsOn + 6) % 7;
  const tail = (weekEnd - lastDow + 7) % 7;

  const end = new Date(last);
  end.setDate(last.getDate() + tail);

  // 6주 고정(42칸)
  if (fixedWeeks) {
    const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    const need = 42 - days;
    if (need > 0) end.setDate(end.getDate() + need);
  }

  const out: CalendarCellYMD[] = [];
  const cur = new Date(start);

  while (cur <= end) {
    const y = cur.getFullYear();
    const m = cur.getMonth() + 1;
    const d = cur.getDate();

    const ymd = toYMDFromParts(y, m, d);

    out.push({
      ymd,
      inMonth: y === year && m === month1,
      isToday: ymd === tYMD,
      isSelected: sYMD ? ymd === sYMD : false,
      date: d,
    });

    cur.setDate(cur.getDate() + 1);
  }

  return out;
}

export function startOfMonth(input: Date) {
  return new Date(input.getFullYear(), input.getMonth(), 1, 12, 0, 0, 0);
}

export function addMonths(input: Date, diff: number) {
  return new Date(input.getFullYear(), input.getMonth() + diff, 1, 12, 0, 0, 0);
}

export function setYear(input: Date, year: number) {
  return new Date(year, input.getMonth(), 1, 12, 0, 0, 0);
}

export function setMonth(input: Date, monthIndex: number) {
  return new Date(input.getFullYear(), monthIndex, 1, 12, 0, 0, 0);
}
