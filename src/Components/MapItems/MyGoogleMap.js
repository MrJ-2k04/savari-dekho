import { useTheme } from '@emotion/react';
import { Box, Skeleton } from '@mui/material';
import { DirectionsRenderer, DirectionsService, GoogleMap, Polyline } from '@react-google-maps/api';
import { GOOGLE_MAP_ID, ID_RIDE_FROM, ID_RIDE_TO, MAP_CENTER } from 'Store/constants';
import { selectIsMapLoaded } from 'Store/selectors';
import { showError } from 'Utils';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';


const PICKUP_MARKER_URL = window.location.origin + "/assets/pickup.svg";
const DROPOFF_MARKER_URL = window.location.origin + "/assets/dropoff.svg";
// const WAYPOINT_MARKER_URL = window.location.origin + "/assets/marker.svg";


function MyGoogleMap({ from, to, waypoints, onChange: updateParentState }) {

    const isLoaded = useSelector(selectIsMapLoaded);
    const theme = useTheme();

    // ################################################## STATES ##################################################

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [activeRouteIndex, setActiveRouteIndex] = useState(0);

    // Refs
    const map = useRef(null);
    const markers = useRef({});

    // ################################################## MAP Manupilators ##################################################

    const calculateRoute = async (origin, destination, waypoints) => {
        if (!isLoaded) return;

        // Trim Waypoints Array
        var finalWaypoints = [...waypoints];
        finalWaypoints = finalWaypoints.map(wp => {
            if (!wp.location) return undefined;

            return { location: wp.location.description, stopover: true };
        }).filter(wp => wp);

        // eslint-disable-next-line no-undef
        const directionService = new window.google.maps.DirectionsService();
        try {
            const routeParams = {
                origin,
                destination,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
                avoidFerries: true,
                provideRouteAlternatives: true,
                // optimizeWaypoints: true
            }
            if (finalWaypoints.length > 0) {
                routeParams.waypoints = finalWaypoints;
            }
            directionService.route(routeParams, (results, status) => {
                if (status !== 'OK') throw new Error("Can't find a proper route");

                setDirectionsResponse(results);


                // Place Markers
                const legs = results.routes[0].legs
                const startMarkerPosition = results.routes[0].overview_path[0].toJSON();
                const endMarkerPosition = results.routes[0].overview_path[results.routes[0].overview_path.length - 1].toJSON();
                const startTitle = results.routes[0].legs[0].start_address;
                const endTitle = results.routes[0].legs[results.routes[0].legs.length - 1].start_address;
                placeMarkerWithPosition(startMarkerPosition, startTitle, ID_RIDE_FROM, PICKUP_MARKER_URL);
                placeMarkerWithPosition(endMarkerPosition, endTitle, ID_RIDE_TO, DROPOFF_MARKER_URL);

                if (legs.length > 1) {
                    legs.forEach((leg, legIndex) => {
                        if (legIndex === 0) return;
                        placeMarkerWithPosition(leg.start_location, leg.start_address, legIndex);
                    })
                }

                // Calculate Distance
                const newDistance = results.routes[0].legs[0].distance.text;
                const newDuration = results.routes[0].legs[0].duration.text;
                setDistance(newDistance);
                setDuration(newDuration);
            });
        } catch (error) {
            console.log(error);
            showError({ message: error.message })
        }
    };

    const clearRoute = () => {
        removeAllMarkers();
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
    };

    const removeMarker = (field) => {
        if (!markers.current[field]) return;
        markers.current[field].setMap(null);
        delete markers.current[field];
    }

    const removeAllMarkers = () => {
        Object.values(markers.current).forEach(marker => marker.setMap(null));
        markers.current = {};
    }

    const placeMarker = (locationString, field, icon = {}) => {
        removeMarker(field);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: locationString }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const markerPosition = results[0].geometry.location;

                // Create a marker and set its position
                const marker = new window.google.maps.Marker({
                    position: markerPosition,
                    map: map.current,
                    title: locationString, // Optional: Add the location string as the title
                    icon,
                    // icon: {
                    //     url: window.location.origin + "/assets/pickup.svg",
                    //     scaledSize: new window.google.maps.Size(70, 70),
                    // }
                });
                if (markers.current[field]) {
                    markers.current[field]?.setMap(null);
                    delete markers.current[field]
                }
                markers.current[field] = marker;
                map.current.setCenter(markerPosition);
            } else {
                console.error('Geocoding failed: ' + status);
            }
        });
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
        map.current.setCenter(markerPosition);
    }

    // ################################################## USE-EFFECTS ##################################################

    // Pickup Marker Management
    // useEffect(() => {
    //     if (!isLoaded) return;

    //     if (pickup) {
    //         placeMarker(pickup.description, ID_RIDE_PICKUP, {
    //             url: window.location.origin + "/assets/pickup.svg",
    //             scaledSize: new window.google.maps.Size(70, 70),
    //         });
    //     } else {
    //         removeMarker(ID_RIDE_PICKUP)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pickup]);

    // Dropoff Marker Management
    // useEffect(() => {
    //     if (!isLoaded) return;

    //     if (dropoff) {
    //         placeMarker(dropoff.description, ID_RIDE_DROPOFF, {
    //             url: window.location.origin + "/assets/dropoff.svg",
    //             scaledSize: new window.google.maps.Size(70, 70),
    //         });
    //     } else {
    //         removeMarker(ID_RIDE_DROPOFF)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dropoff]);

    // Route Management
    useEffect(() => {

        if (from && to) {
            removeMarker(ID_RIDE_FROM);
            removeMarker(ID_RIDE_TO);
            calculateRoute(from.description, to.description, waypoints);
            // placeMarker(from.description, ID_RIDE_FROM, {
            //     url: window.location.origin + "/assets/pickup.svg",
            //     scaledSize: new window.google.maps.Size(55, 55),
            // });
            // placeMarker(to.description, ID_RIDE_TO, {
            //     url: window.location.origin + "/assets/dropoff.svg",
            //     scaledSize: new window.google.maps.Size(55, 55),
            // });
            return;
        } else if (from) {
            placeMarker(from.description, ID_RIDE_FROM, {
                url: PICKUP_MARKER_URL,
                scaledSize: new window.google.maps.Size(55, 55),
            });
        } else if (to) {
            placeMarker(to.description, ID_RIDE_TO, {
                url: DROPOFF_MARKER_URL,
                scaledSize: new window.google.maps.Size(55, 55),
            });
        }

        clearRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, waypoints])

    useEffect(() => {
        console.log(distance, duration);
    }, [distance, duration]);

    useEffect(() => {
        return removeAllMarkers;
    }, []);
    useEffect(() => {
        if (!directionsResponse) return;
        const route = directionsResponse.routes[activeRouteIndex]
        updateParentState(route);
    }, [directionsResponse]);
    if (!isLoaded) {
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
                minHeight={'400px'}
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
                        onLoad={(gmap) => map.current = gmap}
                    >
                        {directionsResponse && directionsResponse.routes.map((route, routeIndex) => {
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
                        )}

                    </GoogleMap>
                </Box>
            </Box>
        </>
    );
}

export default MyGoogleMap;