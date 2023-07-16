import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Skeleton, Stack, TextField, Typography } from "@mui/material";
import Payment from "Components/Payment";
import Layout from "Layout";
import { THEME } from "Store/constants";
import { useSelector } from "react-redux";
import heroImg from "Assets/images/hero.svg";
import mobileHeroImg from "Assets/images/heroMobile.svg";
import { ExpandMore } from "@mui/icons-material";


function HomePage() {

    const themeMode = useSelector(state => state.ui.themeMode);

    return (
        <Layout>
            {/* <Payment /> */}
            <Box
                component="section"
                sx={{
                    height: 600,
                    position: "relative",
                    width: "100%",
                    backgroundImage: { xs: `url(${mobileHeroImg})`, md: `url(${heroImg})` },
                    backgroundPosition: "50%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "space-evenly",
                    // alignItems: "flex-start"
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1080px",
                    }}
                >
                    <Stack
                        sx={{
                            zIndex: 5,
                            m: 4,
                            width: { xs: "80%", sm: "50%" },
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                        spacing={3}
                    >
                        <Typography variant="h2" sx={{ color: "white" }}>
                            Unlock Affordable Adventures Across Cities and States
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={e => { }}
                            sx={{
                                backgroundColor: "white",
                                width: 110,
                                p: 2,
                                borderRadius: 24,
                                display: "flex",
                                justifyContent: "center",
                                ":hover": {
                                    backgroundColor: "secondary.main",
                                },
                            }}
                        >
                            <Typography variant="subtitle1" color="#254e71">
                                Talk to us
                            </Typography>
                        </Button>
                    </Stack>
                </Box>
                <Box></Box>
                <Box></Box>

                <Box
                    component="div"
                    sx={{
                        height: "100px",
                        backgroundSize: "100%",
                        bottom: 0,
                        zIndex: 1,
                        transform: "scale(1,1)",
                        backgroundRepeat: "no-repeat",
                        display: "block",
                        position: "absolute",
                        pointerEvents: "none",
                        width: "100%",
                        right: 0,
                        left: 0,
                        marginBottom: -0.1,
                        backgroundImage:
                            themeMode === THEME.DARK
                                ? `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMxNDJhM2UiPjxwYXRoIGQ9Ik03MjUuMjkgMTAxLjJDMzI1LjIyIDEyMi40OCAwIDAgMCAwdjE0MGgxMjgwVjBzLTE1NC42NCA3OS45Mi01NTQuNzEgMTAxLjJ6IiBmaWxsLW9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTU1Ni40NSAxMTkuNzRDOTUzLjQxIDE0MCAxMjgwIDE0IDEyODAgMTR2MTI2SDBWMHMxNTkuNSA5OS40OCA1NTYuNDUgMTE5Ljc0eiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02NDAgMTQwYzM1My40NiAwIDY0MC0xNDAgNjQwLTEzOXYxNDBIMFYwczI4Ni41NCAxNDAgNjQwIDE0MHoiLz48L2c+PC9zdmc+)`
                                : `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik03MjUuMjkgMTAxLjJDMzI1LjIyIDEyMi40OCAwIDAgMCAwdjE0MGgxMjgwVjBzLTE1NC42NCA3OS45Mi01NTQuNzEgMTAxLjJ6IiBmaWxsLW9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTU1Ni40NSAxMTkuNzRDOTUzLjQxIDE0MCAxMjgwIDE0IDEyODAgMTR2MTI2SDBWMHMxNTkuNSA5OS40OCA1NTYuNDUgMTE5Ljc0eiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02NDAgMTQwYzM1My40NiAwIDY0MC0xNDAgNjQwLTEzOXYxNDBIMFYwczI4Ni41NCAxNDAgNjQwIDE0MHoiLz48L2c+PC9zdmc+)`,
                    }}
                />
            </Box>

            <Box mx={"auto"} maxWidth={500} gap={4} display={"flex"} flexDirection={"column"}>
                <Stack spacing={2}>
                    <Button>Test Button</Button>
                    <Button variant="contained">Test Button</Button>
                    <Button variant="outlined">Test Button</Button>
                    <Button disabled>Test Button</Button>
                    <Button variant="contained" disabled>Test Button</Button>
                    <Button variant="outlined" disabled>Test Button</Button>
                    <Divider sx={{ py: 4 }} />
                    <Button>Test Button</Button>
                    <Button color="secondary" variant="contained">Test Button</Button>
                    <Button color="secondary" variant="outlined">Test Button</Button>
                    <Button color="secondary" disabled>Test Button</Button>
                    <Button color="secondary" variant="contained" disabled>Test Button</Button>
                    <Button color="secondary" variant="outlined" disabled>Test Button</Button>
                    <Divider sx={{ py: 4 }} />
                    <TextField placeholder="Enter email"></TextField>
                    <TextField disabled placeholder="This is disabled"></TextField>
                </Stack>
                <Box>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Disabled Accordion</Typography>
                        </AccordionSummary>
                    </Accordion>
                </Box>

                <h2>Search</h2>
                <p>No matter where you’re going, by bus or <br /> carpool, find the perfect ride from our wide <br /> range of destinations and routes at low <br /> prices.</p>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Stack spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
            </Box>
        </Layout>
    );
}

export default HomePage;