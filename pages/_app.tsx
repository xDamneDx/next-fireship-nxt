import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

// Components:
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
