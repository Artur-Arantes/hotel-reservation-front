export type RoomType = 'STANDARD' | 'DELUXE' | 'SUITE';

export interface Room {
  id: number;
  hotelId: number;
  roomNumber: string;
  type: RoomType;
  capacity: number;
  price: number;
}

export interface AvailabilityRequest {
  hotelId: number;
  checkIn: string;
  checkOut: string;
}
