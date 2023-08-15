import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as Illustration } from "Assets/SVGs/404.svg";
import { ROUTE_HOME } from "Store/constants";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <Container sx={{ maxWidth: { xs: 'sm', md: 'lg' } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: 'calc(100vh)',
            textAlign: 'center'
          }}
        >
          <Grid container spacing={{xs: 5, md:15}}>
            <Grid item xs={12} md={6}>
              <Box maxWidth={'sm'}>
                <Illustration height={'100%'} width={'100%'} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6} maxWidth={'sm'}>
              <Stack spacing={3} height={'100%'} justifyContent={'center'}>
                <Typography variant="h2" textAlign={'left'} color={'primary'}>Something is not right...</Typography>
                <Typography variant="body" maxWidth={'500px'} textAlign={'justify'} color={'textSecondary'}>
                  Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.
                </Typography>
                <Button
                  LinkComponent={Link}
                  to={ROUTE_HOME}
                  variant="outlined"
                  sx={{ width: { xs: "100%", md: 'fit-content' } }}
                  size="large"
                >
                  Back Home
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
