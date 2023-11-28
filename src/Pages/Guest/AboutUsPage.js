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
            <Typography variant="h6" align="center">
              Save money, reduce your carbon footprint, and enjoy stress-free journeys.
              Carpooling - Your Eco-Friendly Ride to a Greener Tomorrow!
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
                  <Box maxWidth={{ xs: "75%", md: '350px' }} mx={'auto'} my={"auto"}>
                    <img src={f1} alt="Founder" style={circleImageStyle} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6.5} maxWidth={'sm'}>
                  <Stack spacing={2} maxWidth={'md'} mx={"auto"} justifyContent={"center"} height={"100%"}>
                    <Typography color={"primary"} textAlign={"center"} variant="h3">
                      Jay Soni
                    </Typography>
                    <Typography>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      Nemo enim ipsam voluptatem quia voluptas
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
                      Nirali Sheta
                    </Typography>
                    <Typography>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      Nemo enim ipsam voluptatem quia voluptas
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={5.5} justifyContent={'flex-start'}> {/* Align Grid to the left */}
                  <Box maxWidth={{ xs: "75%", md: '350px' }} mx={'auto'}>
                    <img src={f2} alt="Founder" style={circleImageStyle} />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* founder 3*/}
            <Box>
              <Grid container columnSpacing={10} rowSpacing={3}>
                <Grid item xs={12} sm={5.5} justifyContent={'flex-start'}> {/* Align Grid to the left */}
                  <Box maxWidth={{ xs: "75%", md: '350px' }} mx={'auto'}>
                    <img src={f3} alt="Founder" style={circleImageStyle} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6.5} maxWidth={'sm'}>
                  <Stack spacing={2} maxWidth={'md'} mx={"auto"} justifyContent={"center"} height={"100%"}>
                    <Typography color={"primary"} textAlign={"center"} variant="h3">
                      Diksha Rohera
                    </Typography>
                    <Typography>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      Nemo enim ipsam voluptatem quia voluptas
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
