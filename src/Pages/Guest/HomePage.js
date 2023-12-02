import { useTheme } from "@emotion/react";
import { Code, ExpandMore, Lock, Security, SecurityOutlined, Verified } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Divider, Grid, Skeleton, Stack, TextField, Typography, alpha } from "@mui/material";
// import Payment from "Components/Payment";
import heroImg from "Assets/SVGs/hero.svg";
import heroDarkImg from "Assets/SVGs/heroDark1.svg";
import mobileHeroImg from "Assets/SVGs/heroMobile.svg";
import ConstructionSrc from "Assets/images/UnderConstruction.png";
import SearchBar from "Components/Common/SearchBar";
import UserLayout from "Layout/User";
import { ROUTE_SEARCH, SITE_CAPTION, THEME } from "Store/constants";
import { selectIsDarkMode } from "Store/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function BenefitCard({
    CardIcon,
    title,
    body,
}) {
    const theme = useTheme();
    return <Card sx={{ boxShadow: 'none', p: 2, minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
        <CardHeader avatar={<Box bgcolor={alpha(theme.palette.secondary.main, 0.4)} p={1} display={'flex'} borderRadius={'8px'} >
            <CardIcon fontSize="large" color="primary" />
        </Box>
        }>
        </CardHeader>
        <CardContent sx={{ px: 3, py: { xs: "1rem !important", md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box flexGrow={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={{ xs: 3, sm: 2 }}>
                <Typography gutterBottom variant={'h5'} color={'primary'}>
                    {title}
                </Typography>
                <Typography color={'text.secondary'} fontWeight={'500'}>
                    {body}
                </Typography>
            </Box>
        </CardContent>
    </Card>
}


function Section({ children, ...props }) {
    const theme = useTheme();
    const isDark = useSelector(selectIsDarkMode);
    return <Box
        sx={{
            clipPath: { md: "polygon(0 11%, 100% 0%, 100% 100%, 0 100%)", xs: "none" },
            // ...sx
        }}
        component={'section'}
        bgcolor={isDark ? theme.palette.background.paper : theme.palette.background.disabled}
        // bgcolor={theme.palette.background.paper}
        color={theme.palette.text.primary}
        {...props}
    >
        <Box
            p={{ md: "106px 24px 24px", xs: "48px 16px 16px" }}
        >
            {children}
        </Box>
    </Box>
}

function SlantShape({ color }) {
    return <>
        <Box py={{ xs: 4, md: 8 }} />
        <Box sx={{
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            bgcolor: color,
            clipPath: {
                xs: "polygon(0 50%, 101% 0%, 100% 100%, 0 100%)"
            },
        }}>
            <Box
                p={{ md: "106px 24px 24px", xs: "48px 16px 16px" }}
            ></Box>
        </Box>
    </>
}

const BackgroundTriangle = <Box position={'absolute'} py={1} sx={{
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.1,
    zIndex: 0,
}}>
    <svg height={'80%'} width={'100%'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 803.9 891.6">
        <path fill={'gray'} d="M623.9 16.3c80-46.2 180 11.5 180 103.9l-.1 651.2c0 92.4-100 150.1-180 103.9L60 549.8c-80-46.2-80-161.6 0-207.8L623.9 16.3z" />
    </svg>
</Box>


function HomePage() {

    const isDarkMode = useSelector(selectIsDarkMode);
    const theme = useTheme();

    return (
        <UserLayout>
            <Box
                component="section"
                sx={{
                    height: 600,
                    position: "relative",
                    width: "100%",
                    backgroundImage: { xs: `url(${heroImg})`, md: `url(${isDarkMode ? heroDarkImg : heroImg})` },
                    backgroundPosition: "50%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "space-evenly",
                    // alignItems: "flex-start"
                }}
            >
                <Box py={4} maxWidth={'700px'} sx={{ wordWrap: 'break-word' }}>
                    <Typography variant="h2" sx={{ color: "white" }} textAlign={'center'}>
                        {SITE_CAPTION}
                    </Typography>
                </Box>
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
                        // backgroundImage:
                        //     isDarkMode
                        //         ? `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMxNDJhM2UiPjxwYXRoIGQ9Ik03MjUuMjkgMTAxLjJDMzI1LjIyIDEyMi40OCAwIDAgMCAwdjE0MGgxMjgwVjBzLTE1NC42NCA3OS45Mi01NTQuNzEgMTAxLjJ6IiBmaWxsLW9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTU1Ni40NSAxMTkuNzRDOTUzLjQxIDE0MCAxMjgwIDE0IDEyODAgMTR2MTI2SDBWMHMxNTkuNSA5OS40OCA1NTYuNDUgMTE5Ljc0eiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02NDAgMTQwYzM1My40NiAwIDY0MC0xNDAgNjQwLTEzOXYxNDBIMFYwczI4Ni41NCAxNDAgNjQwIDE0MHoiLz48L2c+PC9zdmc+)`
                        //         : `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik03MjUuMjkgMTAxLjJDMzI1LjIyIDEyMi40OCAwIDAgMCAwdjE0MGgxMjgwVjBzLTE1NC42NCA3OS45Mi01NTQuNzEgMTAxLjJ6IiBmaWxsLW9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTU1Ni40NSAxMTkuNzRDOTUzLjQxIDE0MCAxMjgwIDE0IDEyODAgMTR2MTI2SDBWMHMxNTkuNSA5OS40OCA1NTYuNDUgMTE5Ljc0eiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02NDAgMTQwYzM1My40NiAwIDY0MC0xNDAgNjQwLTEzOXYxNDBIMFYwczI4Ni41NCAxNDAgNjQwIDE0MHoiLz48L2c+PC9zdmc+)`,
                    }}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none">
                        <g fill={theme.palette.background.default}>
                            <path d="M725.29 101.2C325.22 122.48 0 0 0 0v140h1280V0s-154.64 79.92-554.71 101.2z" fill-opacity=".3" /><path d="M556.45 119.74C953.41 140 1280 14 1280 14v126H0V0s159.5 99.48 556.45 119.74z" fill-opacity=".5" /><path d="M640 140c353.46 0 640-140 640-139v140H0V0s286.54 140 640 140z" />
                        </g>
                    </svg>
                </Box>

                <Container sx={{
                    position: 'absolute',
                    bottom: 0,
                    mb: 11,
                    zIndex: 10
                    // py:4
                }}>
                    <SearchBar />
                </Container>
            </Box>



            <Box component={'section'} position='relative' zIndex={10}>
                {BackgroundTriangle}
                <Container sx={{ py: 4, pb: { sm: 14 }, position: 'relative' }} maxWidth='xl'>
                    <Box display={'flex'} width={'100%'} justifyContent={'space-between'} columnGap={2} rowGap={6} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                        <Box width={'100%'} maxWidth={{ md: '600px' }}>
                            <Stack
                                sx={{
                                    zIndex: 5,
                                    m: 4,
                                    mx: 'auto',
                                    width: { xs: "90%", md: "80%" },
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                                spacing={4}
                            >
                                <Typography variant="h1">
                                    Commute with Confidence
                                </Typography>
                                <Typography fontSize={'20px !important'} color={'text.secondary'}>
                                    Seamless Rides, Secure Payments - Elevating carpooling with a robust wallet system for a hassle-free experience
                                </Typography>

                                <Button
                                    variant="contained"
                                    onClick={e => { }}
                                    LinkComponent={Link}
                                    to={ROUTE_SEARCH}
                                    color="secondary"
                                    sx={{
                                        // backgroundColor: "white",
                                        // width: 110,
                                        maxWidth: { sm: '200px' },
                                        p: 2,
                                        borderRadius: 24,
                                        display: "flex",
                                        justifyContent: "center",
                                        // ":hover": {
                                        //     backgroundColor: "secondary.main",
                                        // },
                                    }}
                                >
                                    Find a Ride
                                </Button>
                            </Stack>
                            {/* <Typography variant="h3" textAlign={'start'}>Commute with Confidence</Typography> */}
                        </Box>
                        <Box width={'100%'} maxWidth={{ md: '600px' }}>
                            <Grid container spacing={{ xs: 3 }} sx={{
                                "& >:nth-of-type(even)": {
                                    transform: { sm: "translateY(100px)" }
                                }
                            }}>
                                <Grid item xs={12} sm={6}>
                                    <BenefitCard
                                        title={"Secure payment"}
                                        body={"Addressing trust deficits in ridesharing platforms, our solution tackles key industry challenges"}
                                        CardIcon={Security}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <BenefitCard
                                        title={"Extra Verification"}
                                        body={"To enhance safety, we require drivers to upload crucial documents such as their RC book and insurance details"}
                                        CardIcon={Verified}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <BenefitCard
                                        title={"Trusted Platform"}
                                        body={"Prioritizing trust, our platform ensures a secure environment for seamless ridesharing experiences"}
                                        CardIcon={Code}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <BenefitCard
                                        title={"Full Transparency"}
                                        body={"Safety is a top priority with our thorough driver verification process, fostering trust and transparency for all ride companions"}
                                        CardIcon={Lock}
                                    />
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Box py={{ xs: 4, md: 8 }} />
                <Box sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    bgcolor: 'background.default',
                    color: 'red',
                    clipPath: {
                        xs: "polygon(100% 0%, 0% 0% , 0% 65%, 1% 64.95%, 2% 64.8%, 3% 64.6%, 4% 64.3%, 5% 63.9%, 6% 63.45%, 7% 62.9%, 8% 62.25%, 9% 61.55%, 10% 60.8%, 11% 59.95%, 12% 59.05%, 13% 58.1%, 14% 57.1%, 15% 56.05%, 16% 55%, 17% 53.9%, 18% 52.8%, 19% 51.65%, 20% 50.5%, 21% 49.35%, 22% 48.2%, 23% 47.05%, 24% 45.9%, 25% 44.8%, 26% 43.75%, 27% 42.75%, 28% 41.75%, 29% 40.8%, 30% 39.9%, 31% 39.1%, 32% 38.35%, 33% 37.65%, 34% 37.05%, 35% 36.5%, 36% 36.05%, 37% 35.65%, 38% 35.35%, 39% 35.15%, 40% 35.05%, 41% 35%, 42% 35.05%, 43% 35.2%, 44% 35.45%, 45% 35.75%, 46% 36.15%, 47% 36.65%, 48% 37.2%, 49% 37.85%, 50% 38.55%, 51% 39.35%, 52% 40.2%, 53% 41.1%, 54% 42.05%, 55% 43.05%, 56% 44.1%, 57% 45.15%, 58% 46.3%, 59% 47.4%, 60% 48.55%, 61% 49.7%, 62% 50.85%, 63% 52%, 64% 53.15%, 65% 54.25%, 66% 55.35%, 67% 56.4%, 68% 57.45%, 69% 58.4%, 70% 59.35%, 71% 60.2%, 72% 61.05%, 73% 61.8%, 74% 62.45%, 75% 63.05%, 76% 63.6%, 77% 64.05%, 78% 64.4%, 79% 64.7%, 80% 64.85%, 81% 65%, 82% 65%, 83% 64.9%, 84% 64.75%, 85% 64.5%, 86% 64.2%, 87% 63.75%, 88% 63.25%, 89% 62.7%, 90% 62.05%, 91% 61.3%, 92% 60.5%, 93% 59.65%, 94% 58.75%, 95% 57.8%, 96% 56.8%, 97% 55.75%, 98% 54.65%, 99% 53.55%, 100% 52.4%)"
                    },
                }}>
                    <Box
                        p={{ md: "106px 24px 24px", xs: "48px 16px 16px" }}
                    ></Box>
                </Box>
            </Box>


            <Box component={'section'}
                position={'relative'}
                bgcolor={'secondary.main'}
                pt={{ xs: 6, md: 12 }}
                pb={2}
                mt={{ xs: -6, md: -12 }}
                zIndex={0}
            >
                Publish a Ride section

                <Box py={{ xs: 4, md: 8 }} />

                <Box sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    bgcolor: 'background.default',
                    color: 'red',
                    transform: 'rotateZ(180deg)',
                    clipPath: {
                        xs: "polygon(100% 0%, 0% 0% , 0% 65%, 1% 64.95%, 2% 64.8%, 3% 64.6%, 4% 64.3%, 5% 63.9%, 6% 63.45%, 7% 62.9%, 8% 62.25%, 9% 61.55%, 10% 60.8%, 11% 59.95%, 12% 59.05%, 13% 58.1%, 14% 57.1%, 15% 56.05%, 16% 55%, 17% 53.9%, 18% 52.8%, 19% 51.65%, 20% 50.5%, 21% 49.35%, 22% 48.2%, 23% 47.05%, 24% 45.9%, 25% 44.8%, 26% 43.75%, 27% 42.75%, 28% 41.75%, 29% 40.8%, 30% 39.9%, 31% 39.1%, 32% 38.35%, 33% 37.65%, 34% 37.05%, 35% 36.5%, 36% 36.05%, 37% 35.65%, 38% 35.35%, 39% 35.15%, 40% 35.05%, 41% 35%, 42% 35.05%, 43% 35.2%, 44% 35.45%, 45% 35.75%, 46% 36.15%, 47% 36.65%, 48% 37.2%, 49% 37.85%, 50% 38.55%, 51% 39.35%, 52% 40.2%, 53% 41.1%, 54% 42.05%, 55% 43.05%, 56% 44.1%, 57% 45.15%, 58% 46.3%, 59% 47.4%, 60% 48.55%, 61% 49.7%, 62% 50.85%, 63% 52%, 64% 53.15%, 65% 54.25%, 66% 55.35%, 67% 56.4%, 68% 57.45%, 69% 58.4%, 70% 59.35%, 71% 60.2%, 72% 61.05%, 73% 61.8%, 74% 62.45%, 75% 63.05%, 76% 63.6%, 77% 64.05%, 78% 64.4%, 79% 64.7%, 80% 64.85%, 81% 65%, 82% 65%, 83% 64.9%, 84% 64.75%, 85% 64.5%, 86% 64.2%, 87% 63.75%, 88% 63.25%, 89% 62.7%, 90% 62.05%, 91% 61.3%, 92% 60.5%, 93% 59.65%, 94% 58.75%, 95% 57.8%, 96% 56.8%, 97% 55.75%, 98% 54.65%, 99% 53.55%, 100% 52.4%)"
                    },
                }}>
                    <Box
                        p={{ md: "106px 24px 24px", xs: "48px 16px 16px" }}
                    ></Box>
                </Box>
            </Box>

            <Box component={'section'} position={'relative'}>
                Thief section

                <SlantShape color={'secondary.main'} />
            </Box>

            <Box component={'section'} position={'relative'} bgcolor={'secondary.main'}>

                Testimonials
                {/* <Box py={10} /> */}

                <SlantShape color="background.default" />

            </Box>

            <Box component={'section'}>
                FAQs
                {/* <Box py={10} /> */}
            </Box>


            {/* <Box mx={"auto"} maxWidth={500} gap={4} display={"flex"} flexDirection={"column"} justifyContent={'center'} alignItems={'center'}>
                <Box py={4}>
                    <img width={"100%"} height={"100%"} src={ConstructionSrc} alt="" />
                </Box>
            </Box> */}
        </UserLayout>
    );
}

export default HomePage;