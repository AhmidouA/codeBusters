interface SimpleBikeStation {
    id: string;
    name: string; // Correspond à "streetAddress"
    address: string; // Correspond à l'adresse complète (locality + streetAddress)
    totalSlots: number; // Correspond à "totalSlotNumber"
    availableSlots: number; // Correspond à "freeSlotNumber"
    latitude: number;
    longitude: number;
}

interface OffStreetParking {
    id: string;
    name: string; // Correspond à "name"
    adress: string;
    totalSpots: number;
    availableSpots: number;
    latitude: number;
    longitude: number;
}

interface SimpleParkingSpace {
    id: string;
    name: string;
    adress: string;
    totalSpots: number;
    availableSpots: number; // Correspond à "remainingSpaces"
    latitude: number;
    longitude: number;
}

// types/station.types.ts
export type Station = {
    id: number;
    station_type: string;
    name: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    total_spot: number;
    indoor: boolean;
    created_at: Date;
    updatat_at: Date;
    favorite?: [];
};
