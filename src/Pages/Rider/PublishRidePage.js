import RideForm from "Components/Forms/RideForm";
import MapPageLayout from "Layout/Other/MapPageLayout";

function PublishRidePage() {
    return (<MapPageLayout>
        <RideForm isNew />
    </MapPageLayout>);
}

export default PublishRidePage;