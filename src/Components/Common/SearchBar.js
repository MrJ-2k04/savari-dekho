import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SEARCH_BAR_SIZE } from "Store/constants";
import inLocale from "date-fns/locale/en-IN"

function SearchBar() {

    return (<>
        <Box maxWidth={'700px'} mx={'auto'}>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                justifyContent={{ xs: 'flex-start', md: 'center' }}
                width={'100%'}
                mx={'auto'}
            >
                <TextField label="From" variant="filled" size={SEARCH_BAR_SIZE} fullWidth />
                <TextField label="To" variant="filled" size={SEARCH_BAR_SIZE} fullWidth />
                <Stack direction={'row'} width={'100%'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={inLocale}>
                        <DatePicker
                            sx={{ width: "100%" }}
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
                            slotProps={{
                                textField: {
                                    // error: !isEmptyString(dobError),
                                    // helperText: dobError,
                                    fullWidth: true,
                                    variant: 'filled',
                                    required: true,
                                    size: SEARCH_BAR_SIZE
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <Divider variant="fullWidth" orientation="vertical" flexItem />
                    <TextField label="Seats" variant="filled" size={SEARCH_BAR_SIZE} type="number" />
                </Stack>
                <Button variant="contained" color="primary" fullWidth>
                    Search
                </Button>
            </Box>
        </Box>
    </>);
}

export default SearchBar;