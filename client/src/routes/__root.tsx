import { Helmet } from "react-helmet-async";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Must export interface to make it accessible to other routes
export interface RouterContext {
  auth: {
    isLoading: boolean;
    isAuthenticated: boolean;
  };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});

function Root() {
  const authRoutes = ["/login", "/register"];

  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <>
      <Helmet>
        <title>DocuMagic</title>
        <meta
          name="description"
          content="Welcome to DocuMagic - Your Ultimate Conversion Tool"
        />
        <meta
          name="keywords"
          content="jpg to text converter, convert jpg to txt, free jpg to txt converter, image to text converter, txt to pdf converter, convert txt to pdf, text to pdf online, free txt to pdf conversion, txt to docx converter, convert txt to docx, text to word converter, free txt to docx conversion, file converter online, document converter, best file converter website, convert files easily online, best free jpg to text converter online, how to convert jpg files to txt format, convert text files to pdf or docx online"
        />
      </Helmet>

      {!isAuthRoute ? <Navbar /> : null}
      <Outlet />
      {!isAuthRoute ? <Footer /> : null}
    </>
  );
}
