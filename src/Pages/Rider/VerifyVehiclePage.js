
import UserLayout from "Layout/User";
import { Button, Container } from "@mui/material";
import { selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import { useDispatch, useSelector } from "react-redux";
import AddVehicleForm from "Components/Forms/AddVehicleForm";

function VerifyVehiclePage() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleVerify = () => {
        dispatch(authActions.setUser({ ...user, vehicles: ["45sg243qie245gr32iure64fuie"] }));
    }

    return (<UserLayout>
        <Container sx={{ my: 3 }}>
            <AddVehicleForm />
            <Button variant="contained" onClick={handleVerify}>Verify Rider's Vehicle</Button>
        </Container>
    </UserLayout>);
}

export default VerifyVehiclePage;