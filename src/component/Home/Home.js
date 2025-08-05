// component/Home/Home.js
import { Outlet } from "react-router-dom";
import Header from "../General/Header";
import '../../styles.css'

export default function Home() {
    return (
        <div className="home-layout">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
