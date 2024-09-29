import type { Metadata } from "next";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.scss";
import "../sass/main.scss";
import Navbar from '../components/Navbar'
import ContextWrapper from "../context/Context";
import  AuthModal  from "@/components/AuthModal";

import MediaData from '../components/MediaData'

export const metadata: Metadata = {
  title: "New productions",
  description: "Access and save your favorite films and series, discover new productions and save them into your watchlists or any other custom lists!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { 
  return (
    <html lang="en">
      <body>
        <ContextWrapper>
          <MediaData/>
          <Navbar />
          {children}
          {<AuthModal />}
        </ContextWrapper>
      </body>
    </html>
  );
}
