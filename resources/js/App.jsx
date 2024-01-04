/** @format */

import React from "react";
import "./index.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Frame } from "@shopify/polaris";
import { Loading } from "@shopify/polaris";

const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));
const Products = React.lazy(() => import("./Pages/Products/Products"));
const Orders = React.lazy(() => import("./Pages/Orders/Orders"));
const Help = React.lazy(() => import("./Pages/Help/Help"));
const Setting = React.lazy(() => import("./Pages/Setting/Setting"));
const Plans = React.lazy(() => import("./Pages/Plan/Plan"));
const Installation = React.lazy(() =>
  import("./Pages/Installation/Installation")
);
const EditProduct = React.lazy(() => import("./Pages/EditProduct/EditProduct"));
const Pixel = React.lazy(() => import("./Pages/_Pixel/_pixel"));
const PixelTable = React.lazy(() =>
  import("./Pages/_Pixel/PixelTable/PixelTable")
);
const IntrestFinder = React.lazy(() =>
  import("./Pages/_Pixel/IntrestFinder/IntrestFinder")
);
const PixelHelp = React.lazy(() => import("./Pages/_Pixel/Help/Help"));
const PixelFaqs = React.lazy(() => import("./Pages/_Pixel/Faqs/Faqs"));

import Header from "./Components/Header/Header";
import PixelHeader from "./Components/_pixelComponents/Header/_pixelHeader";
import SkeletonStructure from "./Components/SkeletonStructure/SkeletonStructure";
import LinkProduct from "./Pages/LinkProduct/LinkProduct";

const App = () => {
  function AppNavbar() {
    const location = useLocation();
    const { pathname } = location;
    // const hideNavbar =
    //   pathname === "/Installation"

    if (pathname === "/installation") {
      return null;
    } else if (
      pathname === "/pixel" ||
      pathname === "/pixel/tiktok" ||
      pathname === "/pixel/intrestfinder" ||
      pathname === "/pixel/help" ||
      pathname === "/pixel/faq"
    ) {
      return (
        <>
          <PixelHeader />
        </>
      );
    } else {
      return (
        <>
          <Header />
        </>
      );
    }
  }

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Products />
            </React.Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Orders />
            </React.Suspense>
          }
        />
        <Route
          path="/help"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Help />
            </React.Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Setting />
            </React.Suspense>
          }
        />
        <Route
          path="/plans"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Plans />
            </React.Suspense>
          }
        />
        <Route
          path="/installation"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Installation />
            </React.Suspense>
          }
        />
        <Route
          path="/editproduct"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <EditProduct />
            </React.Suspense>
          }
        />
        <Route
          path="/linkproduct"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <LinkProduct />
            </React.Suspense>
          }
        />
        <Route
          path="/pixel"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <Pixel />
            </React.Suspense>
          }
        />
        <Route
          path="/pixel/tiktok"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <PixelTable />
            </React.Suspense>
          }
        />
        <Route
          path="/pixel/intrestfinder"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <IntrestFinder />
            </React.Suspense>
          }
        />
        <Route
          path="/pixel/help"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <PixelHelp />
            </React.Suspense>
          }
        />
        <Route
          path="/pixel/faq"
          element={
            <React.Suspense
              fallback={
                <Frame>
                  <Loading />
                </Frame>
              }>
              <PixelFaqs />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
