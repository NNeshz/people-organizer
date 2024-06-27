import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  redirectTo,
  isAllowed,
  children,
}: {
  redirectTo: string;
  isAllowed: boolean;
  children?: React.ReactNode;
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace/>;
    }
    
    return children ? children : <Outlet />;
};

export default ProtectedRoute;