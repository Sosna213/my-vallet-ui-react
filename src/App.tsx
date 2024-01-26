import "./globals.css";
import { Route, Routes } from "react-router-dom";
import { Accounts, Home, Layout } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { checkIsRegistered, registerUser } from "./services/api-calls/users";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import Transactions from "./pages/Transactions";
import { IntlProvider } from "react-intl";
import AuthenticationGuard from "./components/AuthenticationGuard";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();
  const lang = navigator.language;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-32 w-32 animate-spin" />
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
          <IntlProvider locale={lang ?? "en"}>
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
          </IntlProvider>
        </QueryClientProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
