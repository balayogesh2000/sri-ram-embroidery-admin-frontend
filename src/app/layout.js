import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";

export const metadata = {
  title: "Admin | Gandhiram embroidery",
  description: "Admin panel for Gandhiram embroidery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <AuthContextProvider>
          <Layout>{children}</Layout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
