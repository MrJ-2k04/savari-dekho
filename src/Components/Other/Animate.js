import { motion } from "framer-motion";

function Animate({ children }) {

    // const controls = useAnimation();
    // const location = useLocation();
    // const [prevLocation, setPrevLocation] = useState(location);

    // useEffect(() => {
    //     // console.log(location, prevLocation);
    //     // if (prevLocation.pathname !== location.pathname) {
    //     //     const direction = location.pathname > prevLocation.pathname ? 1 : -1;
    //     //     controls.start({ opacity: 1, x: direction * 100 });
    //     //     setPrevLocation(location);
    //     // } else {
    //     //     controls.start({ opacity: 1, x: 0 });
    //     // }
    // }, [location, prevLocation, controls]);

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            // animate={controls}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

export default Animate;