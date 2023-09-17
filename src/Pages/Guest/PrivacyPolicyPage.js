import { Box, Container } from "@mui/material";
import StaticPageLayout from "Layout/Other/StaticPageLayout";

function PrivacyPolicyPage() {
    return (<StaticPageLayout>
        <Container maxWidth='md'>
            <Box textAlign={'center'}>
                Privacy Policy
            </Box>
        </Container>
    </StaticPageLayout>);
}

export default PrivacyPolicyPage;