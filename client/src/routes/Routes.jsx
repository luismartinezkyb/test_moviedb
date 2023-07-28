import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//errors
import Error404 from "../utils/errors/Error404.jsx"

//pages
import Dashboard from "../pages/Dashboard.jsx";
import MovieDetail from "../pages/MovieDetail.jsx";

export default function Rutas() {
    

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="/movies" element={<Dashboard />} exact />
            {/* USUARIOS ROUTES */}
            
            <Route path="/movie/:id" element={<MovieDetail />} exact />

            
            <Route path="*" element={<Error404/>} />
        </Routes>
    </Router>
    );
}
