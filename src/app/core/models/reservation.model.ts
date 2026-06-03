export interface Reservation {
    id?: number;
    hotelId: number;
    guestName: string;
    checkIn: string; 
    checkOut: string;
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  }