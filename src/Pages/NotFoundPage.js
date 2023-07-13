import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ROUTE_HOME } from "Store/constants";
import Layout from "Layout";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Layout>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: 'calc(100vh - 200px)',
            textAlign: 'center'
          }}
        >
          <TextField />
          <Typography variant="h1">404</Typography>
          <Typography variant="h6">
            The page you're looking for doesn't exist.
          </Typography>
          <Button
            LinkComponent={Link}
            to={ROUTE_HOME}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#27374D',
              ":hover": {
                backgroundColor: '#4c5c72'
              }
            }}
          >
            Back Home
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}
