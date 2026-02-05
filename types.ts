
export enum HaircutStyle {
  BEARD_TRIM = 'haircut with beard trim',
  DYE = 'haircut with dye',
  LOCKTWIST = 'locktwist + shape'
}

export const PRICES = {
  [HaircutStyle.BEARD_TRIM]: 30,
  [HaircutStyle.DYE]: 45,
  [HaircutStyle.LOCKTWIST]: 60,
};

export interface GiftDetails {
  sender: string;
  recipient: string;
  quantity: number;
  style: HaircutStyle;
  total: number;
  salon: string;
}
