import { selectIsMapLoaded } from "Store/selectors";
import { mapActions } from "Store/slices";
import { loadMapLibrary } from "Utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MapsApiLoader({ children }) {

    const isMapLoaded = useSelector(selectIsMapLoaded);
    const dispatch = useDispatch();
    const library = "places";

    useEffect(() => {
        if (!isMapLoaded) {
            loadMapLibrary(library).then((places) => {
                dispatch(mapActions.setMapLoadedStatus(true));
            }).catch(err=>{
                console.log(err.message);
            });
        }
    }, [])

    return (<>
        {children}
    </>);
}

export default MapsApiLoader;