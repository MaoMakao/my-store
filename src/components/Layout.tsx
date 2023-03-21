import React, { FC } from "react";
import Header from "./Header/Header";

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: FC<LayoutProps> = ({ children }) => {

    return(
        <>
            <Header/>
            {children}
        </>
    )
};
export default Layout;