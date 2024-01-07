import "./globals.css";
import { Route, Routes } from "react-router-dom";
import { Accounts, Home, Layout } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { checkIsRegistered, registerUser } from "./services/api-calls/users";

const queryClient = new QueryClient();

const App = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <span>Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    let storeToken = "";
    getAccessTokenSilently()
      .then((res) => {
        storeToken = res;
        return res;
      })
      .then((token) => {
        return checkIsRegistered(token);
      })
      .then((isRegistered) => {
        if (isRegistered) {
          return;
        } else {
          registerUser(storeToken, {
            email: user?.email ?? "",
            nickname: user?.nickname ?? "",
            name: user?.name ?? "",
          });
        }
      });
  }

  return (
    <main className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </main>
  );
};

export default App;
