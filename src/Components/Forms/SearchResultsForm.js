
import { Box, CircularProgress, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import useApi from "Components/Hooks/useApi";
import { ROUTE_SEARCH } from "Store/constants";
import { showError } from "Utils";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function SearchResultsForm() {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();
    const { loading, searchRide } = useApi();

    // ############################################# States #############################################

    const [searchResults, setSearchResults] = useState([]);

    // ############################################# Effects #############################################

    useEffect(() => {
        // Redirects if invalid query
        if (searchParams.size === 0) {
            nav(ROUTE_SEARCH);
            return;
        } else if ([...searchParams].some(([k, v]) => v === "")) {
            nav(ROUTE_SEARCH);
            return;
        }


        // Retrieve Search Results from Backend
        const params = {
            from: searchParams.get("from"),
            fromPlaceId: searchParams.get("fromPlaceId"),
            to: searchParams.get("to"),
            toPlaceId: searchParams.get("toPlaceId"),
            seats: searchParams.get("seats"),
        }

        if (searchParams.get("date")) {
            params["date"] = new Date(...searchParams.get("date").split("-").reverse());
        }

        searchRide(params).then(rides => {
            if (rides.length === 0) {
                // handle no search result found
            } else {
                setSearchResults(rides);
            }
        }).catch(err => {
            showError({ message: err.message });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>
        <Stack spacing={4}>
            <SearchBar
                from={{
                    fullName: searchParams.get("from"),
                    placeId: searchParams.get("fromPlaceId"),
                }}
                to={{
                    fullName: searchParams.get("to"),
                    placeId: searchParams.get("toPlaceId"),
                }}
                date={searchParams.get("date")}
                seats={searchParams.get("seats")}
            />
            <Box display={'flex'} width={'100%'}>
                <Box width={'100%'}>
                    <Typography>Filters</Typography>
                </Box>
                <Box width={'100%'}>
                    {loading ? <>
                        <CircularProgress />
                    </>
                        :
                        searchResults.length === 0 ?
                            <>No Search Found</>
                            :
                            <List>
                                {searchResults.map((result, index) =>
                                    <ListItemButton key={index} sx={{ borderRadius: '16px', my: 1 }}>
                                        <ListItemText>
                                            Hello
                                        </ListItemText>
                                    </ListItemButton>
                                )}
                            </List>
                    }
                </Box>
            </Box>
        </Stack>
    </>);
}

export default SearchResultsForm;