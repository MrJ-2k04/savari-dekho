
import { LocationOn } from "@mui/icons-material";
import { Autocomplete, Box, Grid, TextField, Typography, debounce } from "@mui/material";
import { selectIsMapLoaded } from "Store/selectors";
import parse from "autosuggest-highlight/parse";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const autocompleteService = { current: null };

function PlaceAutocomplete({
    value,
    onChange,
    label,
    error,
    helperText,
    placeholder,
    fullWidth = false,
}) {

    const isLoaded = useSelector(selectIsMapLoaded);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([""]);

    const fetch = useMemo(
        () =>
            debounce((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 400),
        [],
    );

    useEffect(() => {

        let active = true;

        
        if (!isLoaded) return;
        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return;
        }
        if (inputValue === '') {
            setOptions(value ? [value] : [""]);
            return;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [""];

                if (value) {
                    newOptions = [...newOptions, value];
                }

                if (results) {
                    results = results.filter(result => result.place_id !== value.place_id);
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (<>
        <Autocomplete
            fullWidth={fullWidth}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={x => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            isOptionEqualToValue={(option, value) => option.place_id === value.place_id}
            value={value}
            noOptionsText="No locations"
            onChange={(event, newValue) => {
                if (newValue) {
                    if (!(options.some(option => option.place_id === newValue.place_id))) {
                        setOptions([newValue, ...options]);
                    }
                } else {
                    setOptions(["", ...options])
                }
                onChange(newValue || "");
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    error={error}
                    helperText={helperText}
                    placeholder={placeholder}
                    fullWidth={fullWidth}
                />
            )}
            renderOption={(props, option) => {
                // console.log(props,option, a, b, options);
                if (option === "") return <></>;
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOn sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    </>);
}

export default PlaceAutocomplete;