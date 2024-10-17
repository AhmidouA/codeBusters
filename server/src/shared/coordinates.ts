// Fonction pour calculer la distance entre deux points géographiques
// définis par leurs latitudes et longitudes en utilisant la formule de Haversine.
export const haversineFormula = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) => {
    // Rayon de la Terre en kilomètres
    const earthRadius = 6371;

    // Calcul de la différence de latitude en radians
    const dLat = (lat2 - lat1) * (Math.PI / 180);

    // Calcul de la différence de longitude en radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    // Calcul de la valeur intermédiaire 'a' pour la formule de Haversine
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Carré de la demi-différence de latitude
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) * // Produit des cosinus des latitudes
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2); // Carré de la demi-différence de longitude

    // Calcul de l'angle central 'c'
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Arctangente de la racine carrée de 'a' et de '1 - a'

    // Retourne la distance en mètres entre les deux points
    return earthRadius * c * 1000; // Conversion de la distance de km à m
};
