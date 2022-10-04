import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ConnectPage from "./pages/connect";
import DashboardPage from "./pages/dashboard";
import GenerateKeyPair from "./pages/generateKeyPair";
import MainApp from "./pages/main";
import SetupPage from "./pages/setup";
import SignMessage from "./pages/signMessage";
import darkTheme from "./theme/dark";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Routes>
          <Route path='/index.html' element={<MainApp />}>
            <Route index element={<DashboardPage />} />
          </Route>
          <Route path='/generateKeyPair' element={<GenerateKeyPair />} />
          <Route path='/sign' element={<SignMessage />} />

          <Route path='/setup' element={<SetupPage />} />
          <Route path='/connect' element={<ConnectPage />} />
          <Route path='*' element={<Navigate to='/index.html' />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

const forceSlashAfterHash = () => {
  let _hash = window.location.hash;

  if (_hash[1] && _hash[1] != "/") {
    window.location.href =
      window.location.origin +
      window.location.pathname +
      window.location.search +
      "#/" +
      _hash.slice(1);
  }
};

forceSlashAfterHash();

window.addEventListener("hashchange", forceSlashAfterHash);

export default App;
