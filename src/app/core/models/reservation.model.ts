export interface Reservation {
  id?: number;
  roomId: number;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface ReservationRequest {
  roomId: number;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
}

export interface ReservationPage {
  content: Reservation[];
  totalElements: number;
  totalPages: number;
  number: number;
}
