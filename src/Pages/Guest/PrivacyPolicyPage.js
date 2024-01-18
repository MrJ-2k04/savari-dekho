import { useTheme } from "@emotion/react";
import { Container, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import StaticPageLayout from "Layout/Other/StaticPageLayout";

function PrivacyPolicyPage() {
    const theme = useTheme();
    return (
        <StaticPageLayout>
            <Container maxWidth='md'>
                <Stack spacing={3} py={3}>
                    <Typography variant="h1" align="center" color={'primary'}>
                        Priv<span style={{ color: theme.palette.secondary.main }}>a</span>cy Pol<span style={{ color: theme.palette.secondary.main }}>i</span>cy
                    </Typography>

                    <Stack p={2} spacing={2}>
                        <Typography variant="h3">Last Updated: [17 SEPTEMBER , 2023]</Typography>

                        <Typography variant="body1">
                            Your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website[Savari Dekho Ltd] or use our services.
                            By accessing or using our services, you consent to the practices described in this Privacy Policy.
                        </Typography>


                        <Typography variant="h4">Information We Collect</Typography>
                        <Typography variant="body1">
                            We collect information in the following ways:
                        </Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    We use cookies and similar tracking technologies to collect information about your interactions with our website and services.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    You can control the use of cookies through your browser settings.
                                </ListItemText>
                            </ListItem>
                        </List>


                        <Typography variant="h4">How We Use Your Information</Typography>
                        <Typography variant="body1">
                            We use your personal information to:
                        </Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    Provide and maintain our services.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Communicate with you about your account or our services.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Send you newsletters, marketing materials, and promotional offers if you opt in.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Analyze usage patterns to improve our website and services.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Comply with legal obligations.
                                </ListItemText>
                            </ListItem>
                        </List>


                        <Typography variant="h4">Disclosure of Your Information</Typography>
                        <Typography variant="body1">
                            We may share your personal information with:
                        </Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    Third-party service providers who assist us in providing our services.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    You can control the use of cookies through your browser settings.
                                </ListItemText>
                            </ListItem>
                        </List>


                        <Typography variant="h4">Information We Collect</Typography>
                        <Typography variant="body1">
                            We collect information in the following ways:
                        </Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    Third-party service providers who assist us in providing our services.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Law enforcement or government authorities when required by law.
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>
                                    Business partners for marketing and advertising purposes if you consent.
                                </ListItemText>
                            </ListItem>
                        </List>


                        <Typography variant="h4"> Your Choices</Typography>
                        <Typography variant="body1">
                            You can:
                        </Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    Access, correct, or delete your personal information.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Opt out of marketing communications.
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>
                                    Disable cookies through your browser settings.
                                </ListItemText>
                            </ListItem>

                        </List>

                        <Typography variant="h4">  Security</Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    We take reasonable measures to protect your personal information,
                                    but no data transmission over the internet or storage system is 100% secure.
                                </ListItemText>
                            </ListItem>

                        </List>

                        <Typography variant="h4"> Links to Other Websites</Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    Our website may contain links to third-party websites.
                                    We are not responsible for the privacy practices or content of those sites.
                                </ListItemText>
                            </ListItem>

                        </List>

                        <Typography variant="h4">Changes to this Privacy Policy</Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    We may update this Privacy Policy from time to time.
                                    The updated policy will be posted on our website with the revised date.
                                </ListItemText>
                            </ListItem>

                        </List>

                        <Typography variant="h4">Contact Us</Typography>
                        <List component="ul" dense>
                            <ListItem>
                                <ListItemText>
                                    If you have any questions or concerns about our Privacy Policy, please contact us at [Savaridekho1@gmail.com].
                                </ListItemText>
                            </ListItem>

                        </List>

                    </Stack>
                </Stack>
            </Container>
        </StaticPageLayout>);
}

export default PrivacyPolicyPage;
