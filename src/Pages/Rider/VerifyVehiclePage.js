
import UserLayout from "Layout/User";
import { Button } from "@mui/material";
import { selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import { useDispatch, useSelector } from "react-redux";

function VerifyVehiclePage() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleVerify = () => {
        dispatch(authActions.setUser({ ...user, vehicles: ["45sg243qie245gr32iure64fuie"] }));
    }

    return (<UserLayout>
        Verify Vehicle Page
        <Button variant="contained" onClick={handleVerify}>Verify Rider's Vehicle</Button>
    </UserLayout>);
}

export default VerifyVehiclePage;