import { Box, Stack, Typography } from "@mui/material";

const CopyrightComp = () => {
  return (
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
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={0.7}
      >
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
            textDecoration: 'none'
          }}
        >
          Webwizards.in
        </Typography>
      </Box>
    </Stack>
  );
};

export default CopyrightComp;
