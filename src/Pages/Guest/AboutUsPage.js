import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import f1 from "Assets/images/f1.jpeg";
import f2 from "Assets/images/f2.jpg";
import f3 from "Assets/images/f3.jpg";
import StaticPageLayout from "Layout/Other/StaticPageLayout";

import v1 from "Assets/images/v1.jpg";
import v2 from "Assets/images/v2.jpg";
import v3 from "Assets/images/v3.jpg";
import v4 from "Assets/images/v4.jpg";
import ImageCarousal from "Components/Common/ImageCarousal";
import { ABOUT_US, SITE_TITLE } from "Store/constants";

function AboutUsPage() {
  const circleImageStyle = {
    borderRadius: '50%',
    overflow: 'hidden',
  };

  return (
    <StaticPageLayout>
      <Container maxWidth='lg'>
        <Stack spacing={10} mb={8}>
          <Stack spacing={3} pt={{ xs: 1, sm: 0 }}>
            <Typography variant="h1" align="center" color={'primary'}>
              Ab<Box component={"span"} color={"secondary.main"}>o</Box>ut Us
            </Typography>
            <Typography variant="h6" fontWeight={500} align="center" textAlign={'justify'}>
              At {SITE_TITLE}, we're more than just a carpooling company – we're a passionate team dedicated to providing
              user-friendly and cost-effective platform for ride sharing. With a commitment to excellence, innovation, and
              dedication, we strive to provide best possible service, ensure trust and safety.
            </Typography>
            <Typography variant="h4" align="center" color={'secondary'}>
              Our journey began with a simple idea: <br />
            </Typography>
            <Typography variant="h6" align="center" color={'text.secondary'} textAlign={'center'} mx={'auto !important'}>
              How to travel efficiently without <br /> 
              hassle of public transport, without <br />
              paying too much extra fees & without <br />
              worrying about incidents arising from trust issue?
            </Typography>
          </Stack>
          <Box>
            <ImageCarousal>
              <img src={v1} alt="Visit" />
              <img src={v2} alt="Visit" />
              <img src={v3} alt="Visit" />
              <img src={v4} alt="Visit" />
            </ImageCarousal>
          </Box>
          <Stack spacing={10}>
            {/* founder 1*/}
            <Box>
              <Grid container columnSpacing={10} rowSpacing={3}>
                <Grid item xs={12} sm={5.5}>
                  <Box maxWidth={{ xs: "75%", md: '300px' }} mx={'auto'} my={"auto"}>
                    <img src={f1} alt="Founder" style={circleImageStyle} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6.5} maxWidth={'sm'}>
                  <Stack spacing={2} maxWidth={'md'} mx={"auto"} justifyContent={"center"} height={"100%"}>
                    <Typography color={"primary"} textAlign={"center"} variant="h3">
                      {ABOUT_US.JAY_SONI.displayName}
                    </Typography>
                    <Typography textAlign={'center'}>
                      {ABOUT_US.JAY_SONI.description}
                    </Typography>
                    <Typography textAlign={'center'} color={'text.disabled'} variant="subtitle1">
                      Experience of {ABOUT_US.JAY_SONI.experience}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* founder 2*/}
            <Box>
              <Grid container columnSpacing={10} rowSpacing={3}>
                <Grid item xs={12} sm={6.5} order={{ xs: 1, sm: -1 }} maxWidth={'sm'}>
                  <Stack spacing={2} maxWidth={'md'} mx={"auto"} justifyContent={"center"} height={"100%"}>
                    <Typography color={"primary"} textAlign={"center"} variant="h3">
                      {ABOUT_US.NIRALI_SHETA.displayName}
                    </Typography>
                    <Typography textAlign={'center'}>
                      {ABOUT_US.NIRALI_SHETA.description}
                    </Typography>
                    <Typography textAlign={'center'} color={'text.disabled'} variant="subtitle1">
                      Experience of {ABOUT_US.NIRALI_SHETA.experience}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={5.5} justifyContent={'flex-start'}> {/* Align Grid to the left */}
                  <Box maxWidth={{ xs: "75%", md: '300px' }} mx={'auto'}>
                    <img src={f2} alt="Founder" style={circleImageStyle} />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* founder 3*/}
            <Box>
              <Grid container columnSpacing={10} rowSpacing={3}>
                <Grid item xs={12} sm={5.5} justifyContent={'flex-start'}> {/* Align Grid to the left */}
                  <Box maxWidth={{ xs: "75%", md: '300px' }} mx={'auto'}>
                    <img src={f3} alt="Founder" style={circleImageStyle} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6.5} maxWidth={'sm'}>
                  <Stack spacing={2} maxWidth={'md'} mx={"auto"} justifyContent={"center"} height={"100%"}>
                    <Typography color={"primary"} textAlign={"center"} variant="h3">
                      {ABOUT_US.DIKSHA_ROHERA.displayName}
                    </Typography>
                    <Typography textAlign={'center'}>
                      {ABOUT_US.DIKSHA_ROHERA.description}
                    </Typography>
                    <Typography textAlign={'center'} color={'text.disabled'} variant="subtitle1">
                      Experience of {ABOUT_US.DIKSHA_ROHERA.experience}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

          </Stack>
        </Stack>
      </Container>
    </StaticPageLayout>
  );

}
export default AboutUsPage;
