import { ArrowRightAlt, History, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Container, Divider, List, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import useApi from "Components/Hooks/useApi";
import UserLayout from "Layout/User";
import { ROUTE_SEARCH_RESULT } from "Store/constants";
import { selectIsAuthenticated } from "Store/selectors";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function SearchPage() {

    const [searchHistory, setSearchHistory] = useState([]);
    const { loading, getSearchHistory } = useApi();
    const isLoggedIn = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!isLoggedIn) return;

        getSearchHistory()
            .then(history => setSearchHistory(history))
            .catch(err => console.error(err.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<UserLayout>
        <Container sx={{ my: 2 }}>
            <Stack spacing={4}>
                <SearchBar />

                {loading && Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rounded" animation={'pulse'} height={'60px'} />)}

                <List>
                    {searchHistory.map((item, index) => {
                        const params = {
                            from: item.from,
                            to: item.to,
                            fromPlaceId: item.fromPlaceId,
                            toPlaceId: item.toPlaceId,
                            seats: item.seats,
                            fLng: item.fromCoords[0],
                            fLat: item.fromCoords[1],
                            tLng: item.toCoords[0],
                            tLat: item.toCoords[1],
                        }
                        if (item.date) {
                            params["date"] = format(new Date(item.date), "dd-MM-yyyy");
                        }
                        return <React.Fragment key={index}>
                            <Divider variant="middle" flexItem />
                            <ListItemButton
                                LinkComponent={Link}
                                to={`${ROUTE_SEARCH_RESULT}?${new URLSearchParams(params).toString()}`}
                                sx={{ borderRadius: '16px', my: 1 }}>
                                <ListItemIcon>
                                    <History sx={{ WebkitTextStrokeWidth: '1px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    secondary={`${item.seats} ${item.seats > 1 ? "Passengers" : "Passenger"}`}
                                >
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <Typography sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            textOverflow: 'ellipsis',
                                            width: '100%',
                                            maxWidth: 'max-content'
                                        }}>
                                            {item.from}
                                        </Typography>
                                        <ArrowRightAlt sx={{ color: 'text.disabled' }} />
                                        <Typography sx={{
                                            width: '100%',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            {item.to}
                                        </Typography>
                                    </Box>
                                </ListItemText>
                                <ListItemIcon sx={{ justifyContent: 'right' }}>
                                    <KeyboardArrowRight />
                                </ListItemIcon>
                            </ListItemButton>
                        </React.Fragment>
                    })}
                </List>
            </Stack>
        </Container>
    </UserLayout>);
}

export default SearchPage;