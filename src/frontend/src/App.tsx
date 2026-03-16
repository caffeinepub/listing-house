import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Commercial from "./pages/Commercial";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Sell from "./pages/Sell";
import Warehouse from "./pages/Warehouse";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties",
  component: Properties,
});
const commercialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/commercial",
  component: Commercial,
});
const warehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/warehouse",
  component: Warehouse,
});
const sellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sell",
  component: Sell,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  propertiesRoute,
  commercialRoute,
  warehouseRoute,
  sellRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
