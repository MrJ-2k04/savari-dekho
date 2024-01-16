import { Box } from "@mui/material";
import RideMapView from "Components/MapItems/RideMapView";


// const StyledBadge = styled(Badge)(({ isvisible }) => ({
//     '& .MuiBadge-badge': {
//         marginTop: "7px",
//         marginRight: "7px",
//         zIndex: 1100,
//         width: "10px",
//         height: '10px',
//         borderRadius: '50%',
//         display: isvisible === "true" ? '' : 'none !important',
//     },
// }));

function RideRouteSection({ ride }) {

    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    if (ride) {
        var startIndex = ride.departure?.index || 0;
        var endIndex = ride.destination?.index || ride.locations.coordinates.length - 1;
        var coordinates = ride.locations.coordinates.slice(startIndex, endIndex + 1);
        var bounds = ride.bounds;
    }

    return (<>
        <Box width={'100%'} position={'relative'}>
            <RideMapView
                coordinates={coordinates}
                bounds={bounds}
            // from={locations[ID_RIDE_FROM]}
            // to={locations[ID_RIDE_TO]}
            // waypoints={waypoints}
            // pickup={locations[ID_RIDE_PICKUP]}
            // dropoff={locations[ID_RIDE_DROPOFF]}
            />
        </Box>

    </>);
}

export default RideRouteSection;