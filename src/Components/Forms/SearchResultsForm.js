
import { Box, Stack, Typography } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import { ROUTE_SEARCH } from "Store/constants";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function SearchResultsForm() {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();

    // ############################################# States #############################################



    // ############################################# Effects #############################################

    // Redirects if invalid query
    useEffect(() => {
        if (searchParams.size === 0) {
            nav(ROUTE_SEARCH);
        } else if ([...searchParams].some(([k, v]) => v === "")) {
            nav(ROUTE_SEARCH);
        }
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
                <Typography>Filters</Typography>
                <Typography>Results</Typography>
            </Box>
        </Stack>
    </>);
}

export default SearchResultsForm;