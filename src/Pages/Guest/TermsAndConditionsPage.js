import { Box, Container, Stack, Typography } from "@mui/material";
import NavBar from "Layout/Minimal/NavBar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";


function TermsAndCondititionsPage() {
    return (<>
        <Box display={'flex'} flexDirection={'column'}>
            <NavBar transparent={false} />
            <Box height={'100vh'} pt={{ xs: `${APP_BAR_MOBILE}px`, sm: `${APP_BAR_DESKTOP}px` }}>

                <Container maxWidth="md">
                    <Stack spacing={3} py={3}>
                        <Typography variant="h2" align="center" color={'primary'}>
                            Terms  <span style={{ color: '#eaa62b' }}>&</span> Conditions
                        </Typography>

                        <Stack p={2} spacing={2}>

                            <Typography variant="h4">Acceptance of Terms</Typography>
                            <Typography variant="body1">
                                By using the services provided by Savari Dekho Pvt Ltd., you agree to comply with and be bound by these terms and conditions.
                                If you do not agree with these terms, please do not use our services.
                            </Typography>
                            <Typography variant="h4">
                                User Registration
                            </Typography>

                            <Typography variant="body1">
                                Some features of our website may require user registration. You agree to provide accurate and complete information during the registration process and to keep your login credentials confidential.
                                You are responsible for all activities associated with your account.
                            </Typography>
                            <Typography variant="h4">Privacy</Typography>
                            <Typography variant="body1">
                                We collect and process personal information in accordance with our Privacy Policy,
                                which is an integral part of these terms and conditions.
                            </Typography>
                            <Typography variant="h4">Limitation of Liability</Typography>
                            <Typography variant="body1">
                                We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages
                                arising from your use of our website or any products or services purchased from us.
                            </Typography>
                            <Typography variant="h4">Governing Law</Typography>
                            <Typography variant="body1">
                                These terms and conditions are governed by the laws of [Your Jurisdiction],
                                and any disputes shall be resolved in the courts of [Your Jurisdiction].
                            </Typography>

                            <Typography variant="h4">Changes to Terms</Typography>
                            <Typography variant="body1">
                                We reserve the right to modify these terms and conditions at any time.
                                Any changes will be effective immediately upon posting on our website.
                            </Typography>

                            <Typography variant="h4">Intellectual Property</Typography>
                            <Typography variant="body1">
                                All content on our website, including text, images, logos, and trademarks, is protected by copyright
                                and other intellectual property laws.
                                You may not reproduce, distribute, or use our content without our prior written consent.
                            </Typography>
                            <Typography variant="h4">Privacy</Typography>
                            <Typography variant="body1">
                                We collect and process personal information in accordance with our Privacy Policy,
                                which is an integral part of these terms and conditions.
                            </Typography>
                            <Typography variant="h4">Limitation of Liability</Typography>
                            <Typography variant="body1">
                                We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages
                                arising from your use of our website or any products or services purchased from us.
                            </Typography>
                            <Typography variant="h4">Governing Law</Typography>
                            <Typography variant="body1">
                                These terms and conditions are governed by the laws of [Your Jurisdiction],
                                and any disputes shall be resolved in the courts of [Your Jurisdiction].
                            </Typography>

                            <Typography variant="h4">Changes to Terms</Typography>
                            <Typography variant="body1">
                                We reserve the right to modify these terms and conditions at any time.
                                Any changes will be effective immediately upon posting on our website.
                            </Typography>

                            <Typography variant="h4">Intellectual Property</Typography>
                            <Typography variant="body1">
                                All content on our website, including text, images, logos, and trademarks, is protected by copyright
                                and other intellectual property laws.
                                You may not reproduce, distribute, or use our content without our prior written consent.
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    </>);
}

export default TermsAndCondititionsPage;