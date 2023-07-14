import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import BookShow from "./pages/BookShow";
import "./stylesheets/alignments.css";
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import VenuesForEvent from './pages/VenuesForEvent';
import Venueshows from "./pages/Venueshows";
import { Components } from 'antd/es/date-picker/generatePicker';
import ImageContainer from './ImageContainer';



function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/event/:id" element={<ProtectedRoute><VenuesForEvent /></ProtectedRoute>}/>
      <Route path="/venue-shows/:id" element={<ProtectedRoute><Venueshows /></ProtectedRoute>}/>
      <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><ImageContainer /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
