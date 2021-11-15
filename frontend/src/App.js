import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Activate from "./pages/Activate/Activate";
import Authenticate from "./pages/Authenticate/Authenticate";
import Room from "./pages/Room/Room";
const isAuth = false;
const user = {
  activated: false,
};
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, location }) => {
  return isAuth ? (
    <Navigate
      to={{
        pathname: "/rooms",
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};

const SemiProtectedRoute = ({ children, location }) => {
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/rooms",
        state: { from: location },
      }}
    />
  );
};

const ProtectedRoute = ({ children, location }) => {
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    <Navigate
      to={{
        pathname: "/activate",
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};

// const GuestRoute = ({ children, ...rest }) => {
//   // const { isAuth } = useSelector((state) => state.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return isAuth ? (
//           <Navigate
//             to={{
//               pathname: "/rooms",
//               state: { from: location },
//             }}
//           />
//         ) : (
//           children
//         );
//       }}
//     ></Route>
//   );
// };

export default App;
