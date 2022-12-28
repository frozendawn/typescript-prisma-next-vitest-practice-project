import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextProvider } from "../context/context";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
