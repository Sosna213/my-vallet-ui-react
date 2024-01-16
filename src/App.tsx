import "./globals.css";
import { Route, Routes } from "react-router-dom";
import { Accounts, Home, Layout } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { checkIsRegistered, registerUser } from "./services/api-calls/users";
import { ThemeProvider } from "./components/theme-provider";
import { AuthenticationGuard } from "./components/authentication-guard";
import { Toaster } from "./components/ui/toaster";
import Transactions from "./pages/Transactions";

const queryClient = new QueryClient();

const App = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();

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
    <ThemeProvider>
      <main className="flex h-screen">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="/accounts"
                element={<AuthenticationGuard component={Accounts} />}
              />
              <Route
                path="/transactions"
                element={<AuthenticationGuard component={Transactions} />}
              />
            </Route>
          </Routes>
        </QueryClientProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
