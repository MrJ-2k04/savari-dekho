import {
  Box,
  Stack,
  Typography
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { selectIsDarkMode } from "Store/selectors";
import { useSelector } from "react-redux";

const MinimalFooter = () => {
  const theme = useTheme();
  const isDark = useSelector(selectIsDarkMode);

  return (
    <Box
      sx={{ clipPath: { md: "polygon(0 11%, 100% 0%, 100% 100%, 0 100%)", xs: "none" } }}
      bgcolor={isDark ? theme.palette.background.paper : theme.palette.background.disabled}
      // bgcolor={theme.palette.background.paper}
      color={theme.palette.text.primary}
      mt={3}
    >
      <Stack
        direction={"row"}
        spacing={1}
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        <Box display={"flex"} alignItems={"center"} gap={0.7}>
          {/* <Copyright sx={{ height: 20, width: 20 }} /> */}
          <Typography variant="subtitle2">
            {`© ${new Date().getFullYear()} WEBSITE BY`}
          </Typography>
          <Typography
            component="a"
            href="https://webwizards.in/"
            target="_blank"
            rel="noopener noreferrer"
            variant="subtitle2"
            sx={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            Webwizards.in
          </Typography>
        </Box>
      </Stack>
    </Box >
  );
};

export default MinimalFooter;