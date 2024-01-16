import { useTheme } from "@emotion/react";
import { Event, LocationSearching, MyLocation, Person, Search } from "@mui/icons-material";
import { Box, Button, Card, Divider, IconButton, InputAdornment, TextField, styled, useMediaQuery } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MHidden } from "Components/@Material-Extend";
import MapsApiLoader from "Components/MapItems/MapsApiLoader";
import PlaceAutocomplete from "Components/MapItems/PlaceAutocomplete";
import { ID_RIDE_FROM, ID_RIDE_TO, ROUTE_SEARCH_RESULT, SEARCH_BAR_SIZE } from "Store/constants";
import { getValidLocation, isEmptyString, isFalsy, isNumeric } from "Utils";
import { format, parse } from "date-fns";
import inLocale from "date-fns/locale/en-IN";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";




const Gridv2 = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto 200px auto 98px 140px',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    gap: 3,
    // backgroundColor: 'var(--g43xplf)',
    // boxShadow: 'var(--g43xpl4f)',
    // paddingTop: 'YOUR_PADDING_TOP_VALUE',
    // paddingBottom: 'YOUR_PADDING_BOTTOM_VALUE',
    // paddingLeft: 'YOUR_PADDING_LEFT_VALUE',
    // paddingRight: '0px', // Your padding right value
    // height: '56px',
    position: 'relative',
    zIndex: 10,
    placeContent: 'center',
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: '1fr 98px',
        width: 'auto',
        height: 'auto',
        paddingRight: 'YOUR_PADDING_RIGHT_VALUE',
        paddingLeft: 'YOUR_PADDING_LEFT_VALUE',
        paddingBottom: '0px',
        alignItems: 'stretch',
        paddingTop: 'var(--g43xpl46)'
    }
}));

const DividerV2 = styled(Divider)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        gridColumn: "1 / span 2",
    }
}))

const BoxV2 = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        gridColumn: "1 / span 2",
    }
}))



function SearchBar({
    from: From = "",
    to: To = "",
    date: departureDate = null,
    seats: Seats = 1,
}) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))
    const nav = useNavigate();

    // ############################################# States #############################################

    const [from, setFrom] = useState(From);
    const [to, setTo] = useState(To);
    const [date, setDate] = useState(departureDate ? parse(departureDate, 'dd-MM-yyyy', new Date(), { locale: 'en-IN' }) : null);
    const [seats, setSeats] = useState(Seats);

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const seatsRef = useRef(null);
    const dateRef = useRef(null);
    const searchBtnRef = useRef(null);

    // Errors
    const [fromError, setFromError] = useState("");
    const [toError, setToError] = useState("");
    const [dateError, setDateError] = useState("");
    const [seatsError, setSeatsError] = useState("");

    // ############################################# Handlers #############################################

    const isSearchValid = () => {
        let isValid = true;
        if (isFalsy(from)) {
            setFromError("Start location missing");
            isValid = false;
        }

        if (isFalsy(to)) {
            setToError("End location missing");
            isValid = false;
        }

        if (!isNumeric(seats) || seats < 1 || seats > 9) {
            setSeatsError("Invalid number of passengers");
            isValid = false;
        }

        if (!date) {
            setDateError("Invalid departure date");
            isValid = false;
        }

        return isValid;
    }

    const handleSearch = async () => {
        const searchOptions = {
            from: from.fullName,
            to: to.fullName,
            seats,
            fromPlaceId: from.placeId,
            toPlaceId: to.placeId,
            fLat: from.geometry.lat,
            fLng: from.geometry.lng,
            tLat: to.geometry.lat,
            tLng: to.geometry.lng,
        }
        if (!isSearchValid()) return;
        searchOptions["date"] = format(date, "dd-MM-yyyy");

        const params = new URLSearchParams(searchOptions).toString();
        nav(`${ROUTE_SEARCH_RESULT}?${params}`);
    }

    const handlePlaceChange = placeType => async (placeObj) => {
        let updateValue, updateError, myCallback;

        if (placeType === ID_RIDE_FROM) {
            myCallback = () => toRef.current.focus();
            updateValue = setFrom;
            updateError = setFromError;
        } else if (placeType === ID_RIDE_TO) {
            myCallback = () => setIsDatePickerOpen(true)
            updateValue = setTo;
            updateError = setToError;
        }

        if (!placeObj) {
            updateValue("");
            updateError("");
            return;
        }
        const value = await getValidLocation(placeObj);
        // const value = {
        //     placeId: placeObj.place_id,
        //     fullName: placeObj.description,
        //     primaryText: placeObj.structured_formatting.main_text,
        //     secondaryText: placeObj.structured_formatting.secondary_text,
        // };
        updateValue(value);
        updateError(""); // Clear error on change
        myCallback();
    }

    const getTextfield = useCallback((props) => {
        return <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton sx={{ color: 'action.active', m: 0, }} onClick={e => setIsDatePickerOpen(!isDatePickerOpen)}>
                <Event />
            </IconButton>
            <TextField
                fullWidth
                variant='standard'
                size={SEARCH_BAR_SIZE}
                value={props.value}
                placeholder={"Departure"}
                inputRef={dateRef}
                onKeyDown={e => e.preventDefault()}
                onClick={e => !isDatePickerOpen && setIsDatePickerOpen(true)}
                error={!isEmptyString(dateError)}
                sx={{
                    justifyContent: 'center',
                }}
                inputProps={{
                    style: {
                        cursor: 'pointer',
                        padding: 0,
                        textOverflow: 'ellipsis'
                    }
                }}
                InputProps={{
                    disableUnderline: isEmptyString(dateError),
                    readOnly: true,
                    // endAdornment: (
                    //     <InputAdornment position="end">
                    //         <IconButton size="small" onClick={e => setIsDatePickerOpen(!isDatePickerOpen)}>
                    //             <Event />
                    //         </IconButton>
                    //     </InputAdornment>
                    // ),
                }}
            />
        </Box>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateError])


    return (<>
        <Box mx={'auto'}>
            <Card>
                <MapsApiLoader>
                    <Gridv2>
                        <BoxV2 p={2}>
                            <PlaceAutocomplete
                                inputRef={fromRef}
                                variant={'standard'}
                                placeholder="From"
                                size={SEARCH_BAR_SIZE}
                                fullWidth
                                value={from.fullName || ""}
                                onChange={handlePlaceChange(ID_RIDE_FROM)}
                                error={!isEmptyString(fromError)}
                                // helperText={fromError}
                                InputProps={{
                                    disableUnderline: isEmptyString(fromError),
                                    startAdornment: <InputAdornment position="start">
                                        <LocationSearching fontSize="small" />
                                    </InputAdornment>,
                                }}
                                noValidate
                            />
                        </BoxV2>
                        <DividerV2 orientation={isSmallScreen ? "horizontal" : "vertical"} flexItem variant="middle" />
                        <BoxV2 p={2}>
                            <PlaceAutocomplete
                                inputRef={toRef}
                                variant={'standard'}
                                placeholder="To"
                                size={SEARCH_BAR_SIZE}
                                fullWidth
                                value={to.fullName || ""}
                                onChange={handlePlaceChange(ID_RIDE_TO)}
                                error={!isEmptyString(toError)}
                                // helperText={toError}
                                InputProps={{
                                    disableUnderline: isEmptyString(toError),
                                    startAdornment: <InputAdornment position="start">
                                        <MyLocation fontSize="small" />
                                    </InputAdornment>,
                                }}
                                noValidate
                            />
                        </BoxV2>
                        <DividerV2 orientation={isSmallScreen ? "horizontal" : "vertical"} flexItem variant="middle" />
                        <Box p={1} display={'flex'}>
                            <LocalizationProvider adapterLocale={inLocale} dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    openTo="day"
                                    views={["year", "month", "day"]}
                                    format='eee, dd MMM yyyy'
                                    value={date}
                                    onChange={(newDate) => {
                                        setDate(newDate);
                                        setDateError(""); // Clear error on change
                                        setTimeout(() => {
                                            seatsRef.current.focus();
                                        }, 50);
                                    }}
                                    onClose={e => setIsDatePickerOpen(false)}
                                    open={isDatePickerOpen}
                                    slots={{ textField: getTextfield }}
                                    slotProps={{
                                        popper: {
                                            anchorEl: dateRef.current,
                                        },
                                    }}
                                    error={!isEmptyString(dateError)}
                                    helperText={dateError}
                                />
                            </LocalizationProvider>
                        </Box>
                        <MHidden width="mdDown">
                            <DividerV2 orientation="vertical" flexItem variant="middle" />
                        </MHidden>
                        <Box p={2}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    inputRef={seatsRef}
                                    variant={'standard'}
                                    size={SEARCH_BAR_SIZE}
                                    fullWidth
                                    // helperText={seatsError}
                                    error={!isEmptyString(seatsError)}
                                    value={seats}
                                    onChange={(e) => {
                                        if (isEmptyString(e.target.value)) {
                                            setSeats('');
                                            return;
                                        }
                                        const seats = parseInt(e.target.value);
                                        if (isNumeric(seats) && seats > 0 && seats < 10) {
                                            setSeats(seats);
                                            setSeatsError('');
                                            searchBtnRef.current.focus();
                                        }
                                    }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        min: 1,
                                        step: 1,
                                        max: 9,
                                    }}
                                    type="number"
                                    InputProps={{
                                        disableUnderline: isEmptyString(seatsError),
                                        // startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                                    }}
                                />
                            </Box>
                        </Box>
                        <BoxV2 height={'100%'}>
                            <Button
                                onClick={handleSearch}
                                ref={searchBtnRef}
                                focusRipple
                                variant="contained"
                                color="secondary"
                                sx={{ height: '100%', borderRadius: 0, fontSize: '17px !important', py: 1.5 }}
                                endIcon={<Search />}
                                fullWidth
                            >
                                Search
                            </Button>
                        </BoxV2>
                    </Gridv2>
                </MapsApiLoader>
            </Card>
        </Box>
    </>);
}

export default SearchBar;