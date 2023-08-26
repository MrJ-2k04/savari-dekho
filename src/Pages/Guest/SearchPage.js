import { Container } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import Layout from "Layout/User";


function SearchPage() {

    return (<Layout>
        <Container sx={{my: 2}}>
            <SearchBar />
        </Container>
    </Layout>);
}

export default SearchPage;