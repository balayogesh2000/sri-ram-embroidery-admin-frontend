import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!isLoggedIn) {
          router.push("/login");
        } else {
          setAuthorized(true);
        }
      }
    }, [isLoggedIn, loading, router]);

    if (loading) return null;
    if (!authorized) return null;

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;
