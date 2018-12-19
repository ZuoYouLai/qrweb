import React from "react";
import MainLayout from "../components/MainLayout/MainLayout";

const Home = ({children,dispatch}) => {
    return (
        <MainLayout menus="user" dispatch={dispatch}>
            {children}
        </MainLayout>
    )
}


export default Home