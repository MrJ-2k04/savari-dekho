import { Box, Button, Divider, Grid, Stack, TextField, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SEARCH_BAR_SIZE } from "Store/constants";
import inLocale from "date-fns/locale/en-IN"

function SearchBar() {
    const variant = "outlined";

    const Gridv2 = styled('div')(({ theme }) => ({
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 168px 96px 168px',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
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
                    <TextField label="From" variant={'standard'} size={SEARCH_BAR_SIZE} fullWidth />
                </BoxV2>
                <DividerV2 orientation="vertical" />
                <BoxV2>
                    <TextField label="From" variant={'standard'} size={SEARCH_BAR_SIZE} fullWidth />
                </BoxV2>
                <DividerV2 orientation="vertical" flexItem />
                <Box display={'flex'}>
                    <TextField label="From" variant={'standard'} size={SEARCH_BAR_SIZE} fullWidth />
                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                </Box>
                <Box>
                    <TextField label="From" variant={'standard'} size={SEARCH_BAR_SIZE} fullWidth />
                </Box>
                <BoxV2>
                    <Button variant="contained" color="primary" fullWidth>
                        Search
                    </Button>
                </BoxV2>
            </Gridv2>

            {/* <Grid container>
                <Grid item>
                </Grid>
                <Grid item>
                    <TextField label="To" variant={variant} size={SEARCH_BAR_SIZE} fullWidth />
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={inLocale}>
                        <DatePicker
                            label={"Date of Birth"}
                            maxDate={new Date()}
                            openTo="day"
                            views={["year", "month", "day"]}
                            // name={ID_DATE_OF_BIRTH}
                            format='dd/MM/yyyy'
                        // value={dateOfBirth}
                        // onChange={value => {
                        //     setDobError('');
                        //     setDateOfBirth(value);
                        // }}
                        // slotProps={{
                        //     textField: {
                        //         // error: !isEmptyString(dobError),
                        //         // helperText: dobError,
                        //         fullWidth: true,
                        //         variant,
                        //         required: true,
                        //         size: SEARCH_BAR_SIZE
                        //     },
                        // }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <TextField label="Seats" variant={variant} size={SEARCH_BAR_SIZE} type="number" />
                </Grid>
            </Grid> */}
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