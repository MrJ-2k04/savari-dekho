import useFetch from "Components/Hooks/useFetch";
import Routes from "Routes";
import { selectAccessToken, selectIsAuthReady, selectRefreshToken } from "Store/selectors";
import ThemeConfig from 'Theme';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";


function App() {

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const isAuthReady = useSelector(selectIsAuthReady);
  const {getUserDetails} = useFetch();

  useEffect(() => {
    if(accessToken&&refreshToken){
      getUserDetails();
    }else{
      console.log("Tokens changed, do something",accessToken, refreshToken);
    }
  }, [accessToken, refreshToken])
  

  return (
    <div className="App">
      <ThemeConfig>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeConfig>
    </div>
  );
}

export default App;
