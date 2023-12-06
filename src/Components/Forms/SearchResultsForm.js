
import { Close, FilterAlt, FilterAltOutlined, FilterList, Group } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CircularProgress, IconButton, Modal, Slide, Stack, Tooltip, Typography } from "@mui/material";
import { MHidden } from "Components/@Material-Extend";
import RouteList from "Components/Common/RouteList";
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

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([
        {
            from: "Ahmedabad",
            fromTime: "8:00",
            to: "Surat",
            toTime: "11:30",
            price: 650,
            seats: 3,
            publisher: {
                profileUrl: "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
                name: "Jacqueline",
            },
        },
        {
            from: "Surat",
            fromTime: "8:00",
            to: "Ahmedabad",
            toTime: "11:30",
            price: 700,
            seats: 2,
            publisher: {
                profileUrl: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
                name: "Denny",
            },
        },
    ]);

    // ############################################# Handlers #############################################



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
            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} gap={2}>
                <MHidden width="mdDown">
                    <Box width={'100%'}>
                        <Typography>Filters</Typography>
                    </Box>
                </MHidden>
                <MHidden width="mdUp">
                    <Button
                        onClick={() => setIsFilterOpen(true)}
                        variant="contained"
                        sx={{ width: 'fit-content', ml: 'auto' }}
                        endIcon={<FilterAlt />}
                    >Apply Filters</Button>
                </MHidden>
                <Box width={'100%'}>
                    {loading ? <>
                        <CircularProgress />
                    </>
                        :
                        searchResults.length === 0 ?
                            <>No Search Found</>
                            :
                            <Stack spacing={4}>
                                {searchResults.map((result, index) =>
                                    <Card key={index} sx={{ borderRadius: '16px', my: 1, cursor: 'pointer' }}>
                                        <CardActionArea>
                                            <CardContent sx={{ p: 1 }}>
                                                <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                                                    <Box>
                                                        <RouteList waypoints={[
                                                            {
                                                                location: {
                                                                    primaryText: result.from,
                                                                    time: result.fromTime,
                                                                    // secondaryText: "Block-J",
                                                                    // fullName: "Block-J, Ahmedabad, Gujarat",
                                                                }
                                                            },
                                                            {
                                                                location: {
                                                                    primaryText: result.to,
                                                                    time: result.toTime,
                                                                    // secondaryText: "Railway Station Cir, Railway Station Area, Varachha",
                                                                    // fullName: "Railway Station Cir, Surat, Gujarat",
                                                                }
                                                            },
                                                        ]} />
                                                    </Box>

                                                    <Box display={'flex'} justifyContent={'right'} pr={2} pt={1}>
                                                        <Typography variant="h4">{`₹${result.price}`}</Typography>
                                                    </Box>
                                                </Box>

                                            </CardContent>
                                            <CardActions>
                                                <Stack direction={'row'} spacing={2} alignItems={'center'} width={'100%'} px={2} pb={1}>
                                                    <Avatar>
                                                        <img src={result.publisher.profileUrl} alt="Publisher Profile" />
                                                    </Avatar>
                                                    <Typography variant="subtitle1">{result.publisher.name}</Typography>
                                                    <Tooltip title={`Max ${result.seats} seats available`}>
                                                        <Box ml={'auto !important'} display={'flex'} gap={1} alignItems={'center'}>
                                                            <Group />
                                                            <Typography variant="subtitle1">{result.seats}</Typography>
                                                        </Box>
                                                    </Tooltip>
                                                </Stack>
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                )}
                            </Stack>
                    }
                </Box>
            </Box>
        </Stack>
        <Modal open={isFilterOpen} onClose={() => setIsFilterOpen(false)} closeAfterTransition>
            <Slide direction="up" in={isFilterOpen}>
                <Card sx={{ height: '85vh', position: 'absolute', bottom: 0, right: 0, left: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
                    <CardHeader
                        action={<IconButton onClick={() => setIsFilterOpen(false)}>
                            <Close />
                        </IconButton>}
                    />
                    <CardContent>
                        Hello World
                    </CardContent>
                </Card>
            </Slide>
        </Modal>
    </>);
}

export default SearchResultsForm;