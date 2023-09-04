import { Container } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import UserLayout from "Layout/User";


function SearchPage() {

    return (<UserLayout>
        <Container sx={{my: 2}}>
            <SearchBar />
        </Container>
    </UserLayout>);
}

export default SearchPage;