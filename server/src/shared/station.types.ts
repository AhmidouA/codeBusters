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
