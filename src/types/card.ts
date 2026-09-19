export interface CardEntry {
  id: string;
  name: string;
  ownerId: string;
  quantity: number;
}

export interface Card {
  id: string;
  name: string;
  ownerId: string;
}

export interface GroupedCard {
  name: string;
  ownerId:string;
  quantity: number;
}