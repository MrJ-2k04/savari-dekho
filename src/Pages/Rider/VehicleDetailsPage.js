import useApi from "Components/Hooks/useApi";
import UserLayout from "Layout/User";
import { showError } from "Utils";
import { useParams } from "react-router-dom";

function VehicleDetailsPage() {
    const { id } = useParams();
    const { loading, getVehicleDetails } = useApi();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        getVehicleDetails(id)
            .then(details => setVehicle(details))
            .catch(err => showError({ message: err.message }));
    }, []);

    return (<UserLayout>
        
    </UserLayout>);
}

export default VehicleDetailsPage;