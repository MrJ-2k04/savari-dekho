import { Box, Skeleton } from '@mui/material';
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import { selectIsMapLoaded } from 'Store/selectors';
import { showError } from 'Utils';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';



function MyGoogleMap({ from, to, waypoints }) {
    const center = {
        lat: 20.5937,
        lng: 78.9629,
    };

    const isLoaded = useSelector(selectIsMapLoaded);

    // ################################################## STATES ##################################################

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    // Refs
    const map = useRef(null);
    const markers = useRef([]);
    // const originRef = useRef(null);
    // const destinationRef = useRef(null);
    // const autocompleteRef = useRef([]);

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
        markers.current.forEach(marker => marker.setMap(null));
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        // originRef.current.value = ''
        // destinationRef.current.value = ''
    };

    const placeMarker = (locationString) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: locationString }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const markerPosition = results[0].geometry.location;

                // Create a marker and set its position
                const marker = new window.google.maps.Marker({
                    position: markerPosition,
                    map: map.current,
                    title: locationString, // Optional: Add the location string as the title
                });
                markers.current.push(marker);
                map.current.setCenter(markerPosition);
            } else {
                console.error('Geocoding failed: ' + status);
            }
        });
    }

    // ################################################## OTHER HANDLERS ##################################################


    // const handleWaypointDelete = (index) => {
    //     const newWaypoints = [...waypoints];
    //     newWaypoints.splice(index, 1);

    //     setWaypoints(newWaypoints);
    // };

    // const handleWaypointChange = (index) => {
    //     return (place) => {
    //         console.log(place);
    //         if (place && place.geometry && place.geometry.location) {
    //             const selectedWaypoint = {
    //                 location: place.formatted_address,
    //             };
    //             const newWaypoints = [...waypoints];
    //             newWaypoints[index] = selectedWaypoint;

    //             setWaypoints(newWaypoints);
    //         }
    //     };
    // };

    // const handleTextChange = (index, value) => {
    //     const newWaypoints = [...waypoints];
    //     newWaypoints[index] = { location: value };
    //     setWaypoints(newWaypoints);
    // };

    useEffect(() => {
        if (!isLoaded) return;

        if (from && to) {
            calculateRoute(from.description, to.description, waypoints);
            return;
        } else if (from) {
            placeMarker(from.description);
        }

        clearRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, waypoints])

    useEffect(() => {
        console.log(distance, duration);
    }, [distance, duration]);

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
                        center={center}
                        zoom={5}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            // zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            mapId: '1a52ed7dbb9da825',
                        }}
                        onLoad={(gmap) => { map.current = gmap; window.map = gmap; }}
                    >
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                    </GoogleMap>
                </Box>
                {/* <Card sx={{ mt: 4, zIndex: 3 }}>
                    <CardContent>
                        <Stack display={"flex"} justifyContent={"center"} p={4} spacing={4}>
                            <Box display={"flex"} gap={2} flexDirection={'column'}>
                                <Autocomplete>
                                    <TextField label='From' variant='outlined' placeholder="Origin" inputRef={originRef} fullWidth />
                                </Autocomplete>


                                <Button startIcon={<Add />} variant='contained' color='success' onClick={e => setWaypoints([...waypoints, {}])}>Add Waypoints</Button>
                                {waypointss.map((waypoint, index) => (
                                    <Box display={'flex'} gap={2} alignItems={'center'} key={`waypointInput${index}`}>
                                        <Autocomplete
                                            onLoad={(autocomplete) => (autocompleteRef.current[index] = autocomplete)}
                                            onPlaceChanged={() => {
                                                const place = autocompleteRef.current[index]?.getPlace();
                                                handleWaypointChange(index)(place);
                                            }}
                                        >
                                            <TextField
                                                label='Waypoint'
                                                placeholder={`Waypoint ${index + 1}`}
                                                value={waypoint.location || ''}
                                                onChange={(e) => handleTextChange(index, e.target.value)}
                                            />
                                        </Autocomplete>
                                        <IconButton onClick={() => handleWaypointDelete(index)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                ))}

                                <Autocomplete>
                                    <TextField label='To' variant='outlined' placeholder="Destination" inputRef={destinationRef} fullWidth />
                                </Autocomplete>
                            </Box>
                            <ButtonGroup sx={{ mx: 'auto' }}>
                                <Button color="info" variant="contained" onClick={calculateRoute} fullWidth>
                                    Calculate Route
                                </Button>
                                <Button aria-label="Clear Route" onClick={clearRoute}>
                                    <Close />
                                </Button>
                            </ButtonGroup>
                            <Box mt={4} display="flex" justifyContent="space-between" width={"100%"}>
                                <Typography>Distance: {distance}</Typography>
                                <Typography>Duration: {duration}</Typography>
                                <IconButton
                                    aria-label="Center Map"
                                    onClick={() => {
                                        map.current.panTo(center);
                                        map.current.setZoom(15);
                                    }}
                                >
                                    <NearMe />
                                </IconButton>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card> */}
            </Box>
        </>
    );
}

export default MyGoogleMap;