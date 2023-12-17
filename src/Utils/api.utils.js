


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
