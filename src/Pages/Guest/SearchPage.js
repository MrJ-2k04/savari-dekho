import { Container } from "@mui/material";
import SearchBar from "Components/Common/SearchBar";
import UserLayout from "Layout/User";
import { ROUTE_RIDES } from "Store/constants";
import { Link } from "react-router-dom";


function SearchPage() {

    return (<UserLayout>
        <Container sx={{ my: 2 }}>
            <SearchBar />
            <Link to={`${ROUTE_RIDES}/65436b97e278c64189bae00d`}>Details</Link>
        </Container>
    </UserLayout>);
}

export default SearchPage;