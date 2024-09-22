import {DayOfWeek, OpeningHour, ReservationType} from "@/interfaces/StoreDetailInterface";

export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric'
  });
}

export function formatSearchDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateWithYear(dateString: Date): string {
  const date = new Date(dateString);
  const year = date.getFullYear(); // 연도 추출
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 추출 (0부터 시작하므로 +1 필요)
  const day = String(date.getDate()).padStart(2, '0'); // 일 추출

  return `${year}.${month}.${day}`; // 원하는 형식으로 포맷팅
}

export function remainingDays(startDate: string | Date, endDate: string | Date, type: boolean): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const currentDate = new Date();

  const difference = Math.floor((end.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  if(type){
    if (
        currentDate.getFullYear() === end.getFullYear() &&
        currentDate.getMonth() === end.getMonth() &&
        currentDate.getDate() === end.getDate()
    ) {
      return '오늘 종료';
    } else if (currentDate > end) {
      return '종료';
    } else if (currentDate < start) {
      return '오픈 예정';
    } else {
      return `종료 D-${difference + 1}`;
    }
  }
  else{
    if (
        currentDate.getFullYear() === end.getFullYear() &&
        currentDate.getMonth() === end.getMonth() &&
        currentDate.getDate() === end.getDate()
    ) {
      return '오픈중';
    } else if (currentDate > end) {
      return '종료';
    } else if(currentDate < start){
      return '오픈 예정';
    } else{
      return '오픈중';
    }
  }
}
function formatFullDate(dateString: string | Date): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  // 요일을 문자열로 변환
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayNames[date.getDay()];

  return `${year}.${month}.${day}(${dayOfWeek})`;
}

export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  const formattedStartDate = formatFullDate(startDate);
  const formattedEndDate = formatFullDate(endDate);

  return `${formattedStartDate} ~ ${formattedEndDate}`;
}

export function formatOpeningHours(openingHours: OpeningHour[]): string {
  // 배열이 비어 있으면 빈 문자열 반환
  if (!openingHours || openingHours.length === 0) {
    return '';
  }

  // 요일을 한글로 변환하는 매핑
  const dayNames: { [key in DayOfWeek]: string } = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일'
  };

  // 요일을 순서대로 배열로 정렬
  const orderedDays = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
    DayOfWeek.SUNDAY
  ];

  // 요일을 숫자로 변환해 정렬 (월~일 순서)
  openingHours.sort((a, b) => orderedDays.indexOf(a.dayOfWeek) - orderedDays.indexOf(b.dayOfWeek));

  // 가장 이른 시작 시간과 가장 늦은 종료 시간을 찾기
  const earliestStartTime = openingHours.reduce(
      (earliest, current) => (current.startsAt < earliest ? current.startsAt : earliest),
      openingHours[0].startsAt
  );
  const latestEndTime = openingHours.reduce(
      (latest, current) => (current.endsAt > latest ? current.endsAt : latest),
      openingHours[0].endsAt
  );

  // 요일 그룹을 '월 ~ 금' 형식으로 처리
  const firstDay = openingHours[0].dayOfWeek;
  const lastDay = openingHours[openingHours.length - 1].dayOfWeek;

  // 결과 생성
  return `${dayNames[firstDay]} ~ ${dayNames[lastDay]}, ${earliestStartTime.slice(0, 5)} ~ ${latestEndTime.slice(0, 5)}`;
}
export function reservationTypeToString(type: ReservationType): string {
  switch (type) {
    case ReservationType.WALK_IN:
      return '현장방문';
    case ReservationType.PRE_RESERVE:
      return '사전예약';
    case ReservationType.ON_SITE_RESERVE:
      return '현장 웨이팅';
    default:
      return '';
  }
}

export function formatReservationTypes(types: ReservationType[]): string {
  return types.map(reservationTypeToString).join(', ');
}
// 요일을 한국어로 변환하는 함수
const dayOfWeekToKorean = (day: string) => {
  const dayMap: { [key: string]: string } = {
    MONDAY: '월요일',
    TUESDAY: '화요일',
    WEDNESDAY: '수요일',
    THURSDAY: '목요일',
    FRIDAY: '금요일',
    SATURDAY: '토요일',
    SUNDAY: '일요일',
  };
  return dayMap[day];
};

// 시간을 포맷팅하는 함수
export const formatOpeningHour = (dayOfWeek: string, startsAt: string, endsAt: string) => {
  const day = dayOfWeekToKorean(dayOfWeek); // 요일을 한국어로 변환
  const startsAtFormatted = startsAt.substring(0, 5); // "HH:mm" 형식으로 변환
  const endsAtFormatted = endsAt.substring(0, 5);     // "HH:mm" 형식으로 변환
  return `${day}, ${startsAtFormatted} ~ ${endsAtFormatted}`;
};