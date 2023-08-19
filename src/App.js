import Routes from "Routes";
import ThemeConfig from 'Theme';
import { BrowserRouter } from "react-router-dom";


function App() {

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
