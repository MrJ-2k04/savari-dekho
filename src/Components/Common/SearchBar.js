import { AirlineSeatReclineExtra, LocationSearching, MyLocation } from "@mui/icons-material";
import { Box, Button, Divider, InputAdornment, TextField, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SEARCH_BAR_SIZE } from "Store/constants";
import inLocale from "date-fns/locale/en-IN";

function SearchBar() {

    const Gridv2 = styled('div')(({ theme }) => ({
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 168px 96px 168px',
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
        height: '56px',
        position: 'relative',
        zIndex: 10,
        placeContent: 'center',
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: '1fr 96px',
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


    return (<>
        <Box maxWidth={'600px'} mx={'auto'}>

            <Gridv2>
                <BoxV2>
                    <TextField
                        variant={'standard'}
                        placeholder="From"
                        size={SEARCH_BAR_SIZE}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <LocationSearching fontSize="small" />
                            </InputAdornment>
                        }}
                    />
                </BoxV2>
                <DividerV2 orientation="vertical" />
                <BoxV2>
                    <TextField
                        placeholder="To"
                        variant={'standard'}
                        size={SEARCH_BAR_SIZE}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MyLocation fontSize="small" />
                            </InputAdornment>
                        }}
                    />
                </BoxV2>
                <DividerV2 orientation="vertical" flexItem />
                <Box display={'flex'}>
                    <LocalizationProvider adapterLocale={inLocale} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disablePast
                            openTo="day"
                            views={["year", "month", "day"]}
                            format='eee, dd MMM, yyyy'
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    size: SEARCH_BAR_SIZE,
                                    // contentEditable: false
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                </Box>
                <Box>
                    <TextField
                        variant={'standard'}
                        size={SEARCH_BAR_SIZE}
                        placeholder='Passengers'
                        fullWidth
                        // helperText={emptySeatsError}
                        // error={!isEmptyString(emptySeatsError)}
                        // value={emptySeats}
                        // onChange={e => {
                        //     if (isEmptyString(e.target.value)) {
                        //         setEmptySeats('');
                        //         return;
                        //     }
                        //     const seats = parseInt(e.target.value);
                        //     if (isNumeric(seats) && seats > 0) {
                        //         setEmptySeats(seats);
                        //         setEmptySeatsError('');
                        //     }
                        // }}
                        inputProps={{
                            inputMode: 'numeric',
                            min: 1,
                            step: 1
                        }}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><AirlineSeatReclineExtra /></InputAdornment>
                        }}
                    />
                </Box>
                <BoxV2>
                    <Button variant="contained" color="primary" fullWidth>
                        Search
                    </Button>
                </BoxV2>
            </Gridv2>

            
            <Box
                // display="flex"
                // flexDirection={{ xs: 'column', md: 'row' }}
                // alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                // justifyContent={{ xs: 'flex-start', md: 'center' }}
                // width={'100%'}
                mx={'auto'}
            >
                {/* <Divider variant="fullWidth" orientation="vertical" flexItem />
                <Button variant="contained" color="primary" fullWidth>
                    Search
                </Button> */}
            </Box>
        </Box>
    </>);
}

export default SearchBar;