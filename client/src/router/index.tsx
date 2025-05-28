import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routerConfig } from "./router-factory";

const router = createBrowserRouter(routerConfig);

export default function Router() {
  return <RouterProvider router={router} />;
}