import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";
import { UserContextProvider } from "@/context/userContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <UserContextProvider>
        {router.asPath.startsWith("/auth") ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        )}
      </UserContextProvider>
    </>
  );
}
