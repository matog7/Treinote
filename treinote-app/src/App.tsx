import React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import Header from "./components/layout/Header";
import {
  Home,
  Training,
  Community,
  Login,
  Contact,
  Events,
  About,
  Profile,
  Coach,
  Settings,
} from "./pages";

import "./App.css";
import MyTrainingDashboard from "./components/features/training/MyTrainingDashboard";
import { useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import AuthContextProvider from "./contexts/authContext";

type Props = {
  auth: {
    user: any;
  };
  redirectPath?: string;
};

const ProtectedRoute: React.FC<Props> = ({ auth, redirectPath = "/login" }) => {
  const location = useLocation();

  const isAuthenticated = auth.user && Object.keys(auth.user).length > 0;
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return <Outlet />; // Afin de rendre la route de l'enfant, s'il y en a 1
};

function App() {
  const auth = useSelector((s: RootState) => s.auth);
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route element={<ProtectedRoute auth={auth} />}>
            <Route path="/training" element={<Training />} />
            <Route path="/community" element={<Community />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-training" element={<MyTrainingDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coaches" element={<Coach />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
