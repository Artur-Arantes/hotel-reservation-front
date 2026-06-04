export interface Hotel {
  id: number;
  name: string;
  city: string;
  state: string;
  description?: string;
  imageUrl?: string;
}

export interface HotelPage {
  content: Hotel[];
  totalElements: number;
  totalPages: number;
  number: number;
}
