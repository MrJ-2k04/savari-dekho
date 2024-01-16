


export const loadMapLibrary = async (library) => {
    if (!window.google) {
        // eslint-disable-next-line
        (g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            v: "weekly",
            // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
            // Add other bootstrap parameters as needed, using camel case.
        });
    }

    return window.google.maps.importLibrary(library);
}

export const isLibraryLoaded = (library) => Boolean(window?.google?.maps[library]);

export const getValidLocation = (placeObj) => {
    return new Promise((res, rej) => {
        const geocoder = new window.google.maps.Geocoder();
        const result = {
            placeId: placeObj.place_id,
            fullName: placeObj.description,
            primaryText: placeObj.structured_formatting.main_text,
            secondaryText: placeObj.structured_formatting.secondary_text,
            geometry: null,
        };
        geocoder.geocode({ placeId: placeObj.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                result.geometry = results[0].geometry.location.toJSON();
                res(result);
            } else {
                rej('Geocoding failed: ' + status);
            }
        });
    })
}

export const formatPlaceObj = (placeObj) => ({
    placeId: placeObj.place_id,
    fullName: placeObj.description,
    primaryText: placeObj.structured_formatting.main_text,
    secondaryText: placeObj.structured_formatting.secondary_text,
    geometry: null,
})

export const unformatPlaceObj = (placeObj) => ({
    place_id: placeObj.placeId,
    description: placeObj.fullName,
    structured_formatting: {
        main_text: placeObj.primaryText,
        secondary_text: placeObj.secondaryText,
    }
})

export function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function getPriceFromDistance(distanceInKm) {
    // Define the range of distances and corresponding prices
    const minDistance = 100;
    const maxDistance = 4000;
    const minPrice = 2;
    const maxPrice = 1.7;

    // Ensure the distance is within the specified range
    const clampedDistance = Math.min(Math.max(distanceInKm, minDistance), maxDistance);

    // Calculate the interpolation factor (a value between 0 and 1)
    const t = (clampedDistance - minDistance) / (maxDistance - minDistance);

    // Use linear interpolation formula to calculate the price
    const interpolatedPrice = minPrice + t * (maxPrice - minPrice);

    // Round the result to a desired precision
    const roundedPrice = parseFloat(interpolatedPrice.toFixed(3));

    return roundedPrice;
}

export function calculateTotalDistance(lineStringCoords = []) {
    return lineStringCoords.reduce((distance, [lng, lat], index) => {
        if (index === 0) return distance;
        return distance + haversineDistance(lineStringCoords[index - 1][1], lineStringCoords[index - 1][0], lat, lng);
    }, 0);
}

export function calculatePriceRange(priceAnchor) {
    const percentages = [-30, -18, -6, 6, 18, 30];

    // Calculate prices based on percentages
    const priceRanges = percentages.map(percent => {
        const adjustedPrice = priceAnchor + (priceAnchor * percent) / 100;
        const roundedOffPrice = Math.ceil(adjustedPrice / 10) * 10;
        return roundedOffPrice;
    });

    return priceRanges;
}

// export const getPlaceFromCoords = ([lng, lat]) => {
//     if (!lng || !lat) return;
//     return new Promise((res, rej) => {
//         const geocoder = new window.google.maps.Geocoder();

//         // Create a LatLng object
//         const latLng = new window.google.maps.LatLng(lat, lng);

//         // Make the Geocode request
//         geocoder.geocode({
//             location: latLng,
//             componentRestrictions: {
//                 country: MAP_SEARCH_COUNTRY_RESTRICTION,
//             },

//         }, (results, status) => {
//             if (status === 'OK') {
//                 if (results[0]) {
//                     res(results)
//                 } else {
//                     rej('No results found');
//                 }
//             } else {
//                 rej('Geocode failed due to:' + status);
//             }
//         });
//     })
// }