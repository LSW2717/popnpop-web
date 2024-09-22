export class CategoryResponse {
  content: SimplifiedStoreResponse[];
  totalElements: number;
  totalPages: number;

  constructor() {
    this.content = [];
    this.totalElements = 0;
    this.totalPages = 1;
  }
}


export interface SimplifiedStoreResponse {
  storeId: number;
  name: string;
  startsAt: Date;
  endsAt: Date;
  address: Address;
  thumbnailImageUrl: string;
  isSaved: boolean;
}
interface Address {
  region: string;
  city: string;
  street: string;
  detail?: string | null;
  latitude: number;
  longitude: number;
}
class AreaData {
  text: string;
  request: string;

  constructor(text: string, request: string) {
    this.text = text;
    this.request = request;
  }
}

class AreaSubData {
  title: AreaData;
  sub: AreaData[] | null;

  constructor(title: AreaData, sub: AreaData[] | null = null) {
    this.title = title;
    this.sub = sub;
  }
}

export const mainArea: AreaSubData[] = [
  new AreaSubData(new AreaData("서울", "서울"), [
    new AreaData("서울 전체", "서울"),
    new AreaData("강남구/서초구", "서울.강남구.서초구"),
    new AreaData("강동구/송파구", "서울.강동구.송파구"),
    new AreaData("성동구/광진구", "서울.성동구.광진구"),
    new AreaData("마포구/서대문구/은평구", "서울.마포구.서대문구.은평구"),
    new AreaData("용산구/종로구/마포구", "서울.용산구.종로구.마포구"),
    new AreaData("영등포구/금천구/관악구", "서울.영등포구.금천구.관악구"),
    new AreaData("동대문구/중랑구", "서울.동대문구.중랑구"),
    new AreaData("강서구/양천구", "서울.강서구.양천구"),
    new AreaData("강북구/성북구/노원구/도봉구", "서울.강북구.성북구.노원구.도봉구"),
  ]),
  new AreaSubData(new AreaData("경기", "경기"), [
    new AreaData("경기 전체", "경기"),
    new AreaData("성남시/용인시/하남시/광주시", "경기.성남시.용인시.하남시.광주시"),
    new AreaData("인천시/부천시/김포시/광명시/시흥시", "경기.인천시.부천시.김포시.광명시.시흥시"),
    new AreaData("고양시/파주시", "경기.고양시.파주시"),
    new AreaData("의정부시/양주시/포천시", "경기.의정부시.양주시.포천시"),
    new AreaData("안양시/과천시/의왕시/안산시/군포시/수원시", "경기.안양시.과천시.의왕시.안산시.군포시.수원시"),
  ]),
  new AreaSubData(new AreaData("부산", "부산"), [
    new AreaData("부산 전체", "부산"),
    new AreaData("해운대구/수영구/기장군", "부산.해운대구.수영구.기장군"),
    new AreaData("남구/동구/부산진구", "부산.남구.동구.부산진구"),
    new AreaData("중구/서구/영도구/사하구", "부산.중구.서구.영도구.사하구"),
    new AreaData("동래구/금정구/연제구", "부산.동래구.금정구.연제구"),
  ]),
  new AreaSubData(new AreaData("제주", "제주"), [
    new AreaData("제주 전체", "제주"),
    new AreaData("제주시", "제주.제주시"),
    new AreaData("서귀포시", "제주.서귀포시"),
  ]),
  new AreaSubData(new AreaData("대구", "대구"), null),
  new AreaSubData(new AreaData("인천", "인천"), null),
  new AreaSubData(new AreaData("광주", "광주"), null),
  new AreaSubData(new AreaData("대전", "대전"), null),
  new AreaSubData(new AreaData("울산", "울산"), null),
  new AreaSubData(new AreaData("세종", "세종"), null),
  new AreaSubData(new AreaData("강원", "강원"), null),
  new AreaSubData(new AreaData("충북", "충북"), null),
  new AreaSubData(new AreaData("충남", "충남"), null),
  new AreaSubData(new AreaData("전북", "전북"), null),
  new AreaSubData(new AreaData("전남", "전남"), null),
  new AreaSubData(new AreaData("경북", "경북"), null),
  new AreaSubData(new AreaData("경남", "경남"), null),
];

export function getApiValueFromKorean(koreanValue: string): string {
  switch (koreanValue) {
    case CategoryOrderExtension.getName(CategoryOrder.OPEN):
      return CategoryOrderExtension.getApiValue(CategoryOrder.OPEN);
    case CategoryOrderExtension.getName(CategoryOrder.END):
      return CategoryOrderExtension.getApiValue(CategoryOrder.END);
    case CategoryOrderExtension.getName(CategoryOrder.TOTAL_VIEW_COUNT):
      return CategoryOrderExtension.getApiValue(CategoryOrder.TOTAL_VIEW_COUNT);
    case CategoryOrderExtension.getName(CategoryOrder.TOTAL_SAVE_COUNT):
      return CategoryOrderExtension.getApiValue(CategoryOrder.TOTAL_SAVE_COUNT);
    default:
      return '';  // 해당하지 않는 경우 빈 문자열 반환
  }
}


export enum CategoryOrder {
  OPEN = '오픈일순',
  END = '종료일순',
  TOTAL_VIEW_COUNT = '조회순',
  TOTAL_SAVE_COUNT = '저장순'
}

export class CategoryOrderExtension {
  static getName(order: CategoryOrder): string {
    switch (order) {
      case CategoryOrder.OPEN:
        return '오픈일순';
      case CategoryOrder.END:
        return '종료일순';
      case CategoryOrder.TOTAL_VIEW_COUNT:
        return '조회순';
      case CategoryOrder.TOTAL_SAVE_COUNT:
        return '저장순';
      default:
        return '';
    }
  }

  static getApiValue(order: CategoryOrder): string {
    switch (order) {
      case CategoryOrder.OPEN:
        return 'OPEN';
      case CategoryOrder.END:
        return 'END';
      case CategoryOrder.TOTAL_VIEW_COUNT:
        return 'TOTAL_VIEW_COUNT';
      case CategoryOrder.TOTAL_SAVE_COUNT:
        return 'TOTAL_SAVE_COUNT';
      default:
        return '';
    }
  }
}