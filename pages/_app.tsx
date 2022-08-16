import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/context";
import { Toaster } from "react-hot-toast";

// Components:
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContext.Provider value={{ user: {}, username: "xDamneDx" }}>
        <Toaster />
        <Navbar />
        <Component {...pageProps} />;
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
