import { Container, Stack, Typography, Grid, Box } from "@mui/material";
import StaticPageLayout from "Layout/Other/StaticPageLayout";
import { useTheme } from "@emotion/react";
import f21 from "Assets/images/f21.jpg";
import f1 from "Assets/images/f1.jpg";
import f3 from "Assets/images/f3.jpg";
{/*
import v1 from "Assets/images/v1.jpg";
import v2 from "Assets/images/v2.jpg";
import v3 from "Assets/images/v3.jpg";
import v4 from "Assets/images/v4.jpg";*/}

function AboutUsPage() {
  const theme = useTheme();

  const circleImageStyle = {
    borderRadius: "50%",
    overflow: "hidden",
  };

  {/*const horizontalImagesContainer = {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    animation: 'moveHorizontal 10s linear infinite',
    animationPlayState: 'running', 
  };

  const horizontalImage = {
    marginRight: '10px',
  };

  const moveHorizontal = {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  };
*/}
return (
  <StaticPageLayout>
    <Container maxWidth='md'>
      <Stack spacing={3} py={3}>
        <Typography variant="h1" align="center" color={'primary'}>
          Ab<span style={{ color: theme.palette.secondary.main }}>o</span>ut Us
        </Typography>

        <Stack spacing={3} py={5}>
          <Typography variant="h6" align="center">
            Save money, reduce your carbon footprint, and enjoy stress-free journeys.
            Carpooling - Your Eco-Friendly Ride to a Greener Tomorrow!
          </Typography>
        </Stack>
        </Stack>

       {/* <Stack>
        <Typography variant="h5" align="left" color={'primary'}>
          Visits <span style={{ color: theme.palette.secondary.main }}>by</span> Team
        </Typography>
</Stack>*/}
      {/* <Stack >
        <img src={v1} alt="Visit" style={{  maxWidth: '500px', maxHeight: '500px' }} />
        <img src={v2} alt="Visit" style={{ maxWidth: '500px', maxHeight: '500px' }} />
        <img src={v3} alt="Visit" style={{  maxWidth: '500px', maxHeight: '500px' }} />
        <img src={v4} alt="Visit" style={{  maxWidth: '500px', maxHeight: '500px' }} />

 
          </Stack>

</Stack>*/}

     
       {/*  <div style={horizontalImagesContainer}>
          <img src={v1} alt="Visit" style={{ ...horizontalImage, width: '500px', height: '500px' }} />
          <img src={v2} alt="Visit" style={{ ...horizontalImage, width: '500px', height: '500px' }} />
          <img src={v3} alt="Visit" style={{ ...horizontalImage, width: '500px', height: '500px' }} />
          <img src={v4} alt="Visit" style={{ ...horizontalImage, width: '500px', height: '500px' }} />
</div>*/}


        {/* founder 1*/}
        <Grid container spacing={{ xs: 2, md: 6, lg: 20 }} style={{ justifyContent: 'flex-start' }} py={10}>
          <Grid item xs={12} md={5.5} justifyContent={'flex-start'}>
            <Box maxWidth={{ xs: "75%", md: 'sm' }} mx={'auto'}>
              <img src={f21} alt="Founder" style={circleImageStyle} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6.5} maxWidth={'sm'}>
            <Stack spacing={2} maxWidth={'md'} mx={"auto"}>
              <Box>
                <Typography color={"primary"} textAlign={"center"} variant="h3">
                  Jay Soni
                </Typography>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                  labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis no
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* founder 2*/}

          <Grid item xs={12} md={6.5} maxWidth={'sm'}>
            <Stack spacing={2} maxWidth={'md'} mx={"auto"}>
              <Box>
                <Typography color={"primary"} textAlign={"center"} variant="h3">
                  Nirali Sheta
                </Typography>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                  labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis no
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5.5} justifyContent={'flex-start'}> {/* Align Grid to the left */}
            <Box maxWidth={{ xs: "75%", md: 'sm' }} mx={'auto'}>
              <img src={f1} alt="Founder" style={circleImageStyle} />
            </Box>
          </Grid>

          {/* founder 3*/}
          <Grid item xs={12} md={5.5} justifyContent={'flex-start'}> {/* Align Grid to the left */}
            <Box maxWidth={{ xs: "75%", md: 'sm' }} mx={'auto'}>
              <img src={f3} alt="Founder" style={circleImageStyle} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6.5} maxWidth={'sm'}>
            <Stack spacing={2} maxWidth={'md'} mx={"auto"}>
              <Box>
                <Typography color={"primary"} textAlign={"center"} variant="h3">
                  Diksha Rohera
                </Typography>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                  labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis no
                </Typography>
              </Box>
            </Stack>
          </Grid>

        </Grid>

    </Container>
  </StaticPageLayout>
);

}
export default AboutUsPage;
