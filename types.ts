
export enum HaircutStyle {
  HAIRCUT = 'haircut',
  MASSAGE = 'massage',
  HAIR_WASH = 'hair wash & dry',
  PEDICURE = 'pedicure',
  MANICURE = 'manicure'
}

export const PRICES = {
  [HaircutStyle.HAIRCUT]: 30,
  [HaircutStyle.MASSAGE]: 150,
  [HaircutStyle.HAIR_WASH]: 40,
  [HaircutStyle.PEDICURE]: 80,
  [HaircutStyle.MANICURE]: 60,
};

export interface GiftDetails {
  sender: string;
  recipient: string;
  quantity: number;
  style: HaircutStyle;
  total: number;
  salon: string;
  message: string;
  codes: string[];
}
