import { message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../data/data";

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        message.success("Logout Successfully");
        navigate("/login");
    };

    const getSidebarMenu = () => {
        return user?.isAdmin ? adminMenu : userMenu;
    };

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Rayan Healthcare</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {getSidebarMenu().map((menu) => (
                                <div
                                    className={`menu-item ${location.pathname === menu.path && "active"}`}
                                    key={menu.id}
                                >
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            ))}
                            <div className={`menu-item`} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content">
                                <i className="fa-solid fa-bell"></i>
                                <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
