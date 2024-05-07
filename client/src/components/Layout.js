import { Badge, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
import "../styles/LayoutStyles.css";
import { adminMenu, doctorMenu, userMenu } from "./../data/data";

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        message.success("Logout Successfully");
        navigate("/login");
    };

    const getSidebarMenu = () => {
        if (user?.isAdmin) {
            return adminMenu
        } if (user?.isDoctor) {
            return doctorMenu(user._id)
        }
        return userMenu
    };

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>RAYAN HEALTHCARE</h6>
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
                            <div className="header-content" style={{ cursor: "pointer" }}>
                                <Badge
                                    count={user && user.notification.length}
                                    onClick={() => {
                                        navigate("/notification");
                                    }}
                                >
                                    <i class="fa-solid fa-bell"></i>
                                </Badge>
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
