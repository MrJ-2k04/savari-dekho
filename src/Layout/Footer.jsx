import {
  Box,
  Stack,
  Typography,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import { ReactComponent as Logo } from "Assets/brand/logo.svg";
import { Email, Facebook, Instagram, YouTube } from "@mui/icons-material";

const iconItems = [
  { icon: Instagram, path: "" },
  { icon: YouTube, path: "" },
  { icon: Facebook, path: "" },
  { icon: Email, path: "" },
];

const CopyrightComp = () => {
  return (
    <Box sx={{ clipPath: { md: "polygon(0 11%, 100% 0%, 100% 100%, 0 100%)", xs: "none" }, background: "#DDE6ED" }}>
      <Grid container spacing={2} p={{md:"106px 20px 20px", xs: "48px 16px 16px"}}>
        <Grid item xs={12} sm={6} md={3}>
          <Logo height="3rem" />
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
          backgroundColor: "#27374D",
          color: "#FFF",
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
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Webwizards.in
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CopyrightComp;