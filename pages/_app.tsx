import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/context";
import { Toaster } from "react-hot-toast";
import { useUserData } from "../lib/hooks";

// Components:
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Toaster />
        <Navbar />
        <Component {...pageProps} />;
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
