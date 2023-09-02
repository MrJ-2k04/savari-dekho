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
import { CONTACT_EMAIL_PRIMARY, CONTACT_EMAIL_SECONDARY, CONTACT_NUMBER, ROUTE_ABOUT_US, ROUTE_PRIVACY_POLICY, ROUTE_RIDE_PUBLISH, ROUTE_SEARCH, ROUTE_TERMS_AND_CODITIONS, SITE_CAPTION } from "Store/constants";
import { selectIsDarkMode } from "Store/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      <Box
        p={{ md: "106px 24px 24px", xs: "48px 16px 16px" }}
      >
        <Grid container columnSpacing={3} rowSpacing={4}
        // p={{ md: "106px 20px 20px", xs: "48px 16px 16px" }}
        // m={{md: '6rem 0 1.25rem'}}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Logo sx={{ width: '72px' }} />
              <Typography maxWidth={'250px'}>{SITE_CAPTION}</Typography>
              <Stack
                width={"100%"}
                direction={"row"}
                justifyContent={"start"}
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
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h4">Useful Links</Typography>
              <Stack spacing={1} width='fit-content'>
                <Link to={ROUTE_SEARCH}>
                  <Typography color={'text.primary'} sx={{ textDecoration: 'underline' }} >Search a Ride</Typography>
                </Link>
                <Link to={ROUTE_RIDE_PUBLISH}>
                  <Typography color={'text.primary'} sx={{ textDecoration: 'underline' }}>Publish a Ride</Typography>
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h4">Site Menu</Typography>
              <Stack spacing={1} width='fit-content'>
                <Link to={ROUTE_PRIVACY_POLICY} target="_blank" >
                  <Typography color={'text.primary'} sx={{ textDecoration: 'underline' }} >Privacy Policy</Typography>
                </Link>
                <Link to={ROUTE_TERMS_AND_CODITIONS} target="_blank">
                  <Typography color={'text.primary'} sx={{ textDecoration: 'underline' }}>Terms & Conditions</Typography>
                </Link>
                <Link to={ROUTE_ABOUT_US} target="_blank">
                  <Typography color={'text.primary'} sx={{ textDecoration: 'underline' }}>About Us</Typography>
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h4">Contact Us</Typography>
              <Stack spacing={1}>
                <Typography>
                  Need help or have a question?<br />Contact us at:
                </Typography>
                <Box>
                  <Typography>Office:</Typography>
                  <Link to={`tel:${CONTACT_NUMBER}`}>
                    <Typography color={'text.primary'} style={{ textDecoration: 'underline' }}>{CONTACT_NUMBER}</Typography>
                  </Link>
                  <Link to={`mailto:${CONTACT_EMAIL_PRIMARY}`}>
                    <Typography color={'text.primary'} style={{ textDecoration: 'underline' }}>{CONTACT_EMAIL_PRIMARY}</Typography>
                  </Link>
                  <Link to={`mailto:${CONTACT_EMAIL_SECONDARY}`}>
                    <Typography color={'text.primary'} style={{ textDecoration: 'underline' }}>{CONTACT_EMAIL_SECONDARY}</Typography>
                  </Link>
                </Box>
                <Typography>
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          p: 2,
          mt: 3,
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