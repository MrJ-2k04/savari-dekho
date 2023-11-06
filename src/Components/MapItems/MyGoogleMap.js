import { useTheme } from '@emotion/react';
import { Box, Skeleton } from '@mui/material';
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import { GOOGLE_MAP_ID, ID_RIDE_DROPOFF, ID_RIDE_FROM, ID_RIDE_PICKUP, ID_RIDE_TO, MAP_CENTER } from 'Store/constants';
import { selectIsMapLoaded } from 'Store/selectors';
import { showError } from 'Utils';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';



function MyGoogleMap({ from, to, waypoints, pickup, dropoff }) {

    const isLoaded = useSelector(selectIsMapLoaded);
    const theme = useTheme();

    // ################################################## STATES ##################################################

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

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

            return { location: wp.location.description };
        }).filter(wp => wp);

        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        try {
            const results = await directionService.route({
                origin,
                destination,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: finalWaypoints,

                // optimizeWaypoints: true
            });

            setDirectionsResponse(results);
            const newDistance = results.routes[0].legs[0].distance.text;
            const newDuration = results.routes[0].legs[0].duration.text;
            setDistance(newDistance);
            setDuration(newDuration);
        } catch (error) {
            console.log(error);
            showError({ message: error.message })
        }
    };

    const clearRoute = () => {
        removeMarker(ID_RIDE_FROM);
        removeMarker(ID_RIDE_TO);
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

    // ################################################## USE-EFFECTS ##################################################

    // Pickup Marker Management
    useEffect(() => {
        if (!isLoaded) return;

        if (pickup) {
            placeMarker(pickup.description, ID_RIDE_PICKUP, {
                url: window.location.origin + "/assets/pickup.svg",
                scaledSize: new window.google.maps.Size(70, 70),
            });
        } else {
            removeMarker(ID_RIDE_PICKUP)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pickup]);

    // Dropoff Marker Management
    useEffect(() => {
        if (!isLoaded) return;

        if (dropoff) {
            placeMarker(dropoff.description, ID_RIDE_DROPOFF, {
                url: window.location.origin + "/assets/dropoff.svg",
                scaledSize: new window.google.maps.Size(70, 70),
            });
        } else {
            removeMarker(ID_RIDE_DROPOFF)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropoff]);

    // Route Management
    useEffect(() => {

        if (from && to) {
            removeMarker(ID_RIDE_FROM);
            calculateRoute(from.description, to.description, waypoints);
            return;
        } else if (from) {
            placeMarker(from.description, ID_RIDE_FROM, {
                url: window.location.origin + "/assets/from.svg",
                scaledSize: new window.google.maps.Size(35, 35),
            });
        }
        
        clearRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, waypoints])

    useEffect(() => {
        console.log(distance, duration);
    }, [distance, duration]);

    useEffect(()=>{
        return removeAllMarkers;
    },[]);

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
                            // zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            mapId: GOOGLE_MAP_ID,
                        }}
                        onLoad={(gmap) => map.current = gmap}
                    >
                        {directionsResponse && <DirectionsRenderer options={{
                            polylineOptions: {
                                strokeColor: theme.palette.secondary.main,
                                strokeWeight: '3',
                            },
                            markerOptions: {
                                zIndex: 9999,
                            }
                        }} directions={directionsResponse} />}
                    </GoogleMap>
                </Box>
            </Box>
        </>
    );
}

export default MyGoogleMap;