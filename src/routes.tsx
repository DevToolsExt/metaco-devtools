import DashboardPage from "./pages/dashboard";
import GenerateKeyPairPage from "./pages/generateKeyPair";

export default [
  {
    path: "/",
    element: <DashboardPage />,
    exact: true,
  },
  {
    path: "/generateKeyPair",
    element: <GenerateKeyPairPage />,
  },
];
