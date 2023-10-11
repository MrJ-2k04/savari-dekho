import { Box, Container } from "@mui/material";
import StaticPageLayout from "Layout/Other/StaticPageLayout";

function AboutUsPage() {
    return (<StaticPageLayout>
        <Container maxWidth='md'>
            <Box textAlign={'center'}>
                About Us
            </Box>
        </Container>
    </StaticPageLayout>);
}

export default AboutUsPage;