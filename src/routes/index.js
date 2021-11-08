import BooksListComponent from "../components/BooksListComponent/BooksListComponent";
import PannierListComponent from "../components/PannierListComponent/PannierListComponent";
import {
  Routes ,
  Route,
} from "react-router-dom";
  const GetRoutes= () => <Routes>

  <Route
      exact
      path={'/books'}
      element={<BooksListComponent />}
  />
  <Route
      exact
      path={'/pannier'}
      element={<PannierListComponent />}
  />
</Routes>
export default GetRoutes