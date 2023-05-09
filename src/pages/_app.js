import "@/styles/globals.scss";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      }
    </>
  );
}
