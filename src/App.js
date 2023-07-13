import { ThemeProvider, createTheme } from "@mui/material";
import Routes from "Routes";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";



function App() {

  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFF",
        contrastText: "#000"
      },
      secondary: {
        main: "#37b6b6",
        contrastText: "#000"
      }
    }
  });

  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
