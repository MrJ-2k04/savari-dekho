import { useTheme } from '@emotion/react';
import { Box, Skeleton } from '@mui/material';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import { GOOGLE_MAP_ID, MAP_CENTER } from 'Store/constants';
import { selectIsMapLoaded } from 'Store/selectors';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';


const PICKUP_MARKER_URL = window.location.origin + "/assets/pickup.svg";
const DROPOFF_MARKER_URL = window.location.origin + "/assets/dropoff.svg";
// const WAYPOINT_MARKER_URL = window.location.origin + "/assets/marker.svg";


function RideMapView({ coordinates: origCoords = [], bounds }) {
    const coordinates = origCoords.map(([lng, lat]) => ({ lat, lng }));
    const isApiLoaded = useSelector(selectIsMapLoaded);
    const theme = useTheme();

    // ################################################## STATES ##################################################

    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // Refs
    const map = useRef(null);
    const markers = useRef({});

    // ################################################## MAP Manupilators ##################################################

    const removeMarker = (field) => {
        if (!markers.current[field]) return;
        markers.current[field].setMap(null);
        delete markers.current[field];
    }

    const removeAllMarkers = () => {
        Object.values(markers.current).forEach(marker => marker.setMap(null));
        markers.current = {};
    }

    const placeMarkerWithPosition = (markerPosition, markerTitle, field, iconUrl) => {
        removeMarker(field);
        // Create a marker and set its position
        const marker = new window.google.maps.Marker({
            position: markerPosition,
            map: map.current,
            title: markerTitle, // Optional: Add the location string as the title
            icon: {
                url: iconUrl,
                scaledSize: new window.google.maps.Size(55, 55),
            }
        });
        if (markers.current[field]) {
            markers.current[field]?.setMap(null);
            delete markers.current[field]
        }
        markers.current[field] = marker;
        // map.current.setCenter(markerPosition);
    }

    // ################################################## USE-EFFECTS ##################################################

    useEffect(() => {
        return removeAllMarkers;
    }, []);

    useEffect(() => {
        if (coordinates.length < 3 || !isApiLoaded || !isMapLoaded) return;

        placeMarkerWithPosition(coordinates[0], "Departure", "Departure", PICKUP_MARKER_URL);
        placeMarkerWithPosition(coordinates[coordinates.length - 1], "Destination", "Destination", DROPOFF_MARKER_URL);
        if (bounds && Object.keys(bounds).length === 4) {
            map.current.fitBounds(bounds);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coordinates, isApiLoaded, isMapLoaded]);

    if (!isApiLoaded) {
        return <Box position="relative"
            display="flex"
            flexDirection="column"
            height="100%"
            width="100%"
            minHeight={'400px'}>
            <Skeleton variant='rectangular' animation="wave" width={"100%"} height={'100%'} />
        </Box>
    }

    return (
        <>
            <Box
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="start"
                height="100%"
                width="100%"
                minHeight={{ xs: 'calc(100vh - 146px)', sm: 'calc(100vh - 174px)', md: 'calc(100vh - 190px)' }}
            >
                <Box position="absolute" left={0} top={0} height="100%" width="100%">
                    {/* Google Map Box */}
                    <GoogleMap
                        id='navigator-map'
                        center={MAP_CENTER}
                        zoom={5}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            zoomControl: true,
                            // streetViewControl: false,
                            // mapTypeControl: false,
                            fullscreenControl: false,
                            mapId: GOOGLE_MAP_ID,
                        }}
                        onLoad={(gmap) => {
                            map.current = gmap;
                            setIsMapLoaded(true);
                        }}
                    >
                        {/* {directionsResponse && directionsResponse.routes.map((route, routeIndex) => {
                            const isActive = activeRouteIndex === routeIndex;

                            return <DirectionsRenderer
                                key={routeIndex}
                                panel={document.body}
                                routeIndex={routeIndex}
                                directions={directionsResponse}
                                // onDirectionsChanged={e => console.log(e)}
                                options={{
                                    polylineOptions: {
                                        strokeColor: isActive ? '#71531b' : theme.palette.secondary.main,
                                        strokeWeight: isActive ? '5' : '3',
                                        clickable: true,
                                        zIndex: isActive ? 999 : routeIndex,
                                        clickable: true,
                                    },
                                    markerOptions: {
                                        zIndex: -9999,
                                        opacity: 0,
                                    },
                                }}
                            />
                        }
                        )} */}
                        {coordinates.length > 1 && (
                            <Polyline
                                path={coordinates}
                                options={{
                                    strokeColor: theme.palette.secondary.main,
                                    strokeOpacity: 1,
                                    strokeWeight: 3,
                                }}
                            />
                        )}
                    </GoogleMap>
                </Box>
            </Box>
        </>
    );
}

export default RideMapView;