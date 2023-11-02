import { Add, Close, Delete, LocationCity, NearMe } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, IconButton, Input, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';



function MyGoogleMap() {

    const [libraries] = useState(['places']);
    const { isLoaded } = useJsApiLoader({
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const [map, setMap] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const autocompleteRef = useRef([]);

    const center = {
        lat: 23.0225,
        lng: 72.5714,
    };

    const calculateRoute = async () => {
        if (originRef.current.value === '' || destinationRef.current.value === '') return;

        // Trim Waypoints Array
        var finalWaypoints = [...waypoints];
        finalWaypoints = finalWaypoints.filter(wp => wp.location && wp.location.trim() !== '');
        setWaypoints(finalWaypoints);
        console.log(finalWaypoints);


        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        try {
            const results = await directionService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: finalWaypoints,
                // optimizeWaypoints: true
            });

            setDirectionsResponse(results);
            setDistance(results.routes[0].legs[0].distance.text)
            setDuration(results.routes[0].legs[0].duration.text)
            console.log(results);
        } catch (error) {
            console.log(error);
        }
    };

    const clearRoute = () => {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    };

    const handleWaypointDelete = (index) => {
        const newWaypoints = [...waypoints];
        newWaypoints.splice(index, 1);

        setWaypoints(newWaypoints);
    };

    const handleWaypointChange = (index) => {
        return (place) => {
            if (place && place.geometry && place.geometry.location) {
                const selectedWaypoint = {
                    location: place.formatted_address,
                };
                const newWaypoints = [...waypoints];
                newWaypoints[index] = selectedWaypoint;

                setWaypoints(newWaypoints);
            }
        };
    };

    const handleTextChange = (index, value) => {
        const newWaypoints = [...waypoints];
        newWaypoints[index] = { location: value };
        setWaypoints(newWaypoints);
    };

    if (!isLoaded) {
        return <Box display={"flex"} gap={2} flexDirection={"column"}>
            <Skeleton variant='rectangular' animation="wave" height={"500px"} width={"100%"} />
            {Array.from({ length: 10 }).map((ele, index) => {
                return <Skeleton variant='text' animation="wave" key={index} />
            })}
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
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            // zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            mapId: '1a52ed7dbb9da825',
                        }}
                        onLoad={(map) => setMap(map)}
                    >
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                    </GoogleMap>
                </Box>
                <Card sx={{ mt: 4, zIndex: 3 }}>
                    <CardContent>
                        <Stack display={"flex"} justifyContent={"center"} p={4} spacing={4}>
                            <Box display={"flex"} gap={2} flexDirection={'column'}>
                                <Autocomplete>
                                    <TextField label='From' variant='outlined' placeholder="Origin" inputRef={originRef} fullWidth />
                                </Autocomplete>

                                
                                <Button startIcon={<Add />} variant='contained' color='success' onClick={e => setWaypoints([...waypoints, {}])}>Add Waypoints</Button>
                                {waypoints.map((waypoint, index) => (
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
                                        map.panTo(center);
                                        map.setZoom(15);
                                    }}
                                >
                                    <NearMe />
                                </IconButton>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default MyGoogleMap;