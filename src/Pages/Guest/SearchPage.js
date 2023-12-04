import { ArrowRight, ArrowRightAlt, History, KeyboardArrowRight, NextPlan, NextPlanOutlined } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Container, Divider, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import useApi from "Components/Hooks/useApi";
import UserLayout from "Layout/User";
import { ROUTE_RIDES, ROUTE_SEARCH_RESULT } from "Store/constants";
import { selectIsAuthenticated } from "Store/selectors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function SearchPage() {

    const [searchHistory, setSearchHistory] = useState([]);
    const { loading, getSearchHistory } = useApi();
    const isLoggedIn = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!isLoggedIn) return;

        getSearchHistory().then(history => setSearchHistory(history));
    }, []);

    return (<UserLayout>
        <Container sx={{ my: 2 }}>
            <Stack spacing={4}>
                <SearchBar />

                {loading && Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rounded" animation={'pulse'} height={'60px'} />)}

                <List>
                    {searchHistory.map((item, index) =>
                        <React.Fragment key={index}>
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
                        </React.Fragment>
                    )}
                </List>


                <Link to={`${ROUTE_RIDES}/65436b97e278c64189bae00d`}>Details</Link>
            </Stack>
        </Container>
    </UserLayout>);
}

export default SearchPage;