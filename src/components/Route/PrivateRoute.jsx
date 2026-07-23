import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const session = localStorage.getItem(
        "noiravenue_session"
    );

    console.log(session);
    
    return session
        ? children
        : <Navigate to="/" replace />;
};

export default PrivateRoute;