import { Container, Typography } from "@mui/material";
import Layout from "Layout";

function Profile() {
    return (
        <Layout>
            <Container sx={{ my: 4 }}>
                <Typography variant="h3">This is Profile Page</Typography>
            </Container>
        </Layout>
    );
}

export default Profile;