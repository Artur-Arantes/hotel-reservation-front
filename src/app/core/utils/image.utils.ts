const HOTEL_IMAGES: Record<string, string> = {
  'Hotel Atlântico':   'images/hotels/hotel_1.jpeg',
  'Hotel Recife Mar':  'images/hotels/hotel_2.jpeg',
  'Hotel Serra Verde': 'images/hotels/hotel_3.jpeg',
  'Hotel Paulista':    'images/hotels/hotel_4.jpeg',
  'Hotel Floripa Bay': 'images/hotels/hotel_5.jpeg',
};

const ROOM_IMAGES: Record<string, string> = {
  STANDARD: 'images/rooms/room_1.jpeg',
  DELUXE:   'images/rooms/room_3.jpeg',
  SUITE:    'images/rooms/room_2.jpeg',
};

const HOTEL_FALLBACK = 'images/hotels/hotel_1.jpeg';
const ROOM_FALLBACK  = 'images/rooms/room_1.jpeg';

export function getHotelImage(name: string, imageUrl?: string): string {
  if (imageUrl) return imageUrl;
  return HOTEL_IMAGES[name] ?? HOTEL_FALLBACK;
}

export function getRoomImage(type: string): string {
  return ROOM_IMAGES[type] ?? ROOM_FALLBACK;
}

export const FERIAS_IMAGES = [
  'images/ferias/ferias2_hd.jpeg',
  'images/ferias/ferias4_hd.jpeg',
  'images/ferias/ferias5_hd.jpeg',
  'images/ferias/ferias6_hd.jpeg',
];
