import { ArrowRight, ArrowRightAlt, History, KeyboardArrowRight, NextPlan, NextPlanOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import useApi from "Components/Hooks/useApi";
import UserLayout from "Layout/User";
import { ROUTE_RIDES, ROUTE_SEARCH_RESULT } from "Store/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function SearchPage() {

    const [searchHistory, setSearchHistory] = useState([
        { "from": "New York, NY", "to": "Los Angeles, CA", "seats": 3, fromPlaceId: "rskh545", toPlaceId: "kfsugvkj" },
        { "from": "Chicago, IL", "to": "Houston, TX", "seats": 7, fromPlaceId: "rskh545", toPlaceId: "kfsugvkj" },
        { "from": "Miami, FL", "to": "Denver, CO", "seats": 5, fromPlaceId: "rskh545", toPlaceId: "kfsugvkj" },
        { "from": "Seattle, WA", "to": "Atlanta, GA", "seats": 2, fromPlaceId: "rskh545", toPlaceId: "kfsugvkj" },
        { "from": "Boston, MA", "to": "San Francisco, CA", "seats": 8, fromPlaceId: "rskh545", toPlaceId: "kfsugvkj" }
    ]);
    // const { loading } = useApi();
    const loading = true;

    useEffect(() => {

    }, []);
    return (<UserLayout>
        <Container sx={{ my: 2 }}>
            <Stack spacing={4}>
                <SearchBar />

                <List>
                    {searchHistory.map((item, index) =>
                        <>
                            <Divider variant="middle" flexItem />
                            <ListItemButton
                                LinkComponent={Link}
                                to={`${ROUTE_SEARCH_RESULT}?${new URLSearchParams(item).toString()}`}
                                sx={{ borderRadius: '16px', my: 1 }}>
                                <ListItemIcon>
                                    <History sx={{ WebkitTextStrokeWidth: '1px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    secondary={`${item.seats} ${item.seats > 1 ? "Passengers" : "Passenger"}`}
                                >
                                    <Box display={'flex'} alignItems={'center'} gap={2}>
                                        {item.from} <ArrowRightAlt sx={{ color: 'text.disabled' }} /> {item.to}
                                    </Box>
                                </ListItemText>
                                <ListItemIcon sx={{ justifyContent: 'right' }}>
                                    <KeyboardArrowRight />
                                </ListItemIcon>
                            </ListItemButton>
                        </>
                    )}
                </List>

                <Link to={`${ROUTE_RIDES}/65436b97e278c64189bae00d`}>Details</Link>
            </Stack>
        </Container>
    </UserLayout>);
}

export default SearchPage;