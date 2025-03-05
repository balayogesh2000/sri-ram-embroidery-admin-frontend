import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withGuest = (Component) => {
  const GuestComponent = (props) => {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
      if (loading) {
        setIsAllowed(false);
      } else {
        if (isLoggedIn) {
          setIsAllowed(false);
          router.push("/");
        } else {
          setIsAllowed(true);
        }
      }
    }, [isLoggedIn, loading, router]);

    if (loading || !isAllowed) return null;

    return <Component {...props} />;
  };

  GuestComponent.displayName = `withGuest(${
    Component.displayName || Component.name || "Component"
  })`;

  return GuestComponent;
};

export default withGuest;
