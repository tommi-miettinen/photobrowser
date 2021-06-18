import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PhotoGrid from "./components/photogrid/photogrid";
import ImageDetails from "./components/image-details/image-details";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <PhotoGrid />
        </Route>
        <Route path="/image/:id" exact>
          <ImageDetails />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
