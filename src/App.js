import useApi from "Components/Hooks/useApi";
import Loader from "Components/Other/Loader";
import Routes from "Routes";
import { selectAccessToken, selectIsAuthReady, selectRefreshToken } from "Store/selectors";
import { authActions } from "Store/slices";
import ThemeConfig from 'Theme';
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// let count = 0;

function App() {

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const isAuthReady = useSelector(selectIsAuthReady);
  const { syncUser } = useApi();
  const dispatch = useDispatch();
  // console.log("App render", ++count);

  /* Update Global User State on Auth change */
  useEffect(() => {
    // dispatch(authActions.setAuthReadyStatus(false));
    if (accessToken && refreshToken) {
      syncUser();
      // getUserDetails(accessToken).then((userDetails) => {
      //   dispatch(authActions.setUser(userDetails));
      // }).catch(err => {
      //   console.log(err.message);
      //   // showError({ message: err.message })
      //   dispatch(authActions.logout());
      // });
    } else {
      dispatch(authActions.setAuthReadyStatus(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken])


  return (
    <div className="App">
      <ThemeConfig>
        {isAuthReady ?
          <BrowserRouter>
            <AnimatePresence mode="wait" presenceAffectsLayout={true}>
              <Routes />
            </AnimatePresence>
          </BrowserRouter>
          : <Loader />
        }
      </ThemeConfig>
    </div>
  );
}

export default App;
