import { Container } from "@mui/material";
import SearchResultsForm from "Components/Forms/SearchResultsForm";
import UserLayout from "Layout/User";

function SearchResultsPage() {

    return (<UserLayout>
        <Container sx={{ my: 2 }}>
            <SearchResultsForm />
        </Container>
    </UserLayout>);
}

export default SearchResultsPage;