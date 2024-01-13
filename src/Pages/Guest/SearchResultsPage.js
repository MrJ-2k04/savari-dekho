import { Container } from "@mui/material";
import SearchResultsForm from "Components/Forms/SearchResultsForm";
import MapsApiLoader from "Components/MapItems/MapsApiLoader";
import UserLayout from "Layout/User";

function SearchResultsPage() {

    return (<UserLayout>
        <Container sx={{ my: 2 }}>
            <MapsApiLoader>
                <SearchResultsForm />
            </MapsApiLoader>
        </Container>
    </UserLayout>);
}

export default SearchResultsPage;