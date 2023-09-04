
import { Button } from "@mui/material";
import UserLayout from "Layout/User"
import { selectUser } from "Store/selectors";
import { authActions } from "Store/slices";
import { useDispatch, useSelector } from "react-redux";

function VerifyRiderPage() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleVerify = () => {
        dispatch(authActions.setUser({ ...user, isRider: true, isRiderVerified: false }));
    }

    return (<UserLayout>
        Verify Rider page
        <Button variant="contained" onClick={handleVerify}>Verify Rider</Button>
    </UserLayout>);
}

export default VerifyRiderPage;