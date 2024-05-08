export const userMenu = [
    {
        name: "Home",
        path: "/",
        icon: "fa-solid fa-house",
    },
    {
        name: "Visits",
        path: "/appointments",
        icon: "fa-solid fa-list",
    },
    {
        name: "Apply Doctor",
        path: "/apply-doctor",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Profile",
        path: "/profile",
        icon: "fa-solid fa-user",
    },
];

// doctor menu
export const doctorMenu = (userId) => [
    {
        name: "Home",
        path: "/",
        icon: "fa-solid fa-house",
    },
    {
        name: "Visits",
        path: "/doctor-appointments",
        icon: "fa-solid fa-list",
    },

    {
        name: "Profile",
        path: `/doctor/profile/${userId}`,
        icon: "fa-solid fa-user",
    },
];

// admin menu
export const adminMenu = [
    {
        name: "Home",
        path: "/",
        icon: "fa-solid fa-house",
    },
    {
        name: "Visits",
        path: "/admin/appointments",
        icon: "fa-solid fa-list",
    },
    {
        name: "Doctors",
        path: "/admin/doctors",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: "fa-solid fa-user",
    },
    {
        name: "Profile",
        path: "/profile",
        icon: "fa-solid fa-user",
    },
];
