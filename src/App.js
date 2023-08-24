import { Box } from "@mui/material";
import useFetch from "Components/Hooks/useFetch";
import Routes from "Routes";
import { selectAccessToken, selectIsAuthReady, selectRefreshToken } from "Store/selectors";
import { authActions } from "Store/slices";
import ThemeConfig from 'Theme';
import { showError } from "Utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";


function App() {

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const isAuthReady = useSelector(selectIsAuthReady);
  const {getUserDetails} = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.setAuthReadyStatus(false));
    if(accessToken&&refreshToken){
      getUserDetails(accessToken).then((userDetails)=>{
        console.log("test");
        dispatch(authActions.setUser(userDetails));
      }).catch(err=>{
        console.log(err);
        showError({message:err.message})
      dispatch(authActions.setAuthReadyStatus(true));
      });
    }else{
      console.log("No tokens found, Logout!",accessToken, refreshToken);
      dispatch(authActions.setAuthReadyStatus(true));
    }
  }, [accessToken, refreshToken])
  

  return (
    <div className="App">
      {isAuthReady?
      <ThemeConfig>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeConfig>
      :<Box>
        Loading...
      </Box>
    }
    </div>
  );
}

export default App;
