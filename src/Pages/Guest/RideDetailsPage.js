import { Box, Container } from "@mui/material";
import RouteList from "Components/Common/RouteList";
import UserLayout from "Layout/User";

function RideDetailsPage() {

    const waypoints = [
        {
            location: {
                primaryText: "Ahmedabad, Gujarat",
                secondaryText: "Block-J",
                fullName: "Block-J, Ahmedabad, Gujarat",
                time: "8:00"
            }
        },
        {
            location: {
                primaryText: "Surat, Gujarat",
                secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
                fullName: "Railway Station Cir, Surat, Gujarat",
                time: "11:40"
            }
        },
        {
            location: {
                primaryText: "Mahabaleshwar, Mumbai",
                secondaryText: "Green Gairy Bungalow, Lodwick Point Rd",
                fullName: "Green Gairy Bungalow, Mahabaleshwar, Mumbai",
                time: "" // You can fill in the time if needed
            }
        },
        {
            location: {
                primaryText: "Kerala, India",
                secondaryText: "Kele ka jaad", // You can fill in additional details if needed
                fullName: "Kerala, India",
                time: "" // You can fill in the time if needed
            }
        },
        {
            location: {
                primaryText: "Goa, India",
                secondaryText: "Goa Market",
                fullName: "Goa, India",
                time: "" // You can fill in the time if needed
            }
        }
    ];

    return (<UserLayout>
        <Container sx={{ py: 4 }}>
            <Box maxWidth={'500px'} mx={'auto'}>
                <RouteList waypoints={waypoints} price={540} startIndex={2} endIndex={4} />
            </Box>
        </Container>
    </UserLayout>);
}

export default RideDetailsPage;