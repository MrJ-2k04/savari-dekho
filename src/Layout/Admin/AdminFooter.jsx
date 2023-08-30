import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
// import { ReactComponent as Logo } from "Assets/brand/logo.svg";
import { useTheme } from "@emotion/react";
import { Email, Facebook, Instagram, YouTube } from "@mui/icons-material";
import Logo from "Components/Common/Logo";
import { selectIsDarkMode } from "Store/selectors";
import { useSelector } from "react-redux";

const iconItems = [
  { icon: Instagram, path: "" },
  { icon: YouTube, path: "" },
  { icon: Facebook, path: "" },
  { icon: Email, path: "" },
];

const UserFooter = () => {
  const theme = useTheme();
  const isDark = useSelector(selectIsDarkMode);

  return (
    <Box
      sx={{ clipPath: { md: "polygon(0 11%, 100% 0%, 100% 100%, 0 100%)", xs: "none" } }}
      bgcolor={isDark ? theme.palette.background.paper : theme.palette.background.disabled}
      // bgcolor={theme.palette.background.paper}
      color={theme.palette.text.primary}
    >
      <Grid container spacing={2} p={{ md: "106px 20px 20px", xs: "48px 16px 16px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Logo />
          <p>This is the first item in the grid.</p>
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"start"}
            sx={{ ml: "3px" }}
          >
            {iconItems.map((item, idx) => (
              <IconButton
                // size="large"
                // LinkComponent={Link}
                to={item.path}
                target="_blank"
                rel="noopener noreferrer"
                edge="end"
                color="inherit"
                key={idx}
                sx={{ mx: 0.5 }}
              >
                <item.icon />
              </IconButton>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <h2>Item 2</h2>
          <p>This is the second item in the grid.</p>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <h2>Item 3</h2>
          <p>This is the third item in the grid.</p>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <h2>Item 4</h2>
          <p>This is the fourth item in the grid.</p>
        </Grid>
      </Grid>

      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          p: 2,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#252d35",
          // color: "#FFF",
        }}
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
    </Box>
  );
};

export default UserFooter;