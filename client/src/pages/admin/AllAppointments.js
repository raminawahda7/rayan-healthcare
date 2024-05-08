import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Input } from "antd";
import Layout from "../../components/Layout";

const AllAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchText, setSearchText] = useState("");

    const getAppointments = async () => {
        try {
            const res = await axios.get("/api/v1/admin/get-all-appointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {record.time}
                </span>
            ),
        },
        {
            title: "Patient Name",
            dataIndex: "userInfo",
            render: (text, record) => (
                <span>
                    {record.userInfo}
                </span>
            ),
        },
        {
            title: "Doctor Name",
            dataIndex: "doctorInfo",
            render: (text, record) => <span>{record.doctorInfo}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Medical visit fee",
            dataIndex: "treatments",
            render: (text, record) => {
                const totalPrice = record.treatments.reduce((acc, treatment) => acc + treatment.value, 0);
                return (
                    <span>
                        {record.treatments.map((treatment, index) => (
                            <span key={index}>
                                {treatment.treatmentName} - {treatment.value}
                                <br />
                            </span>
                        ))}
                        Total Price: {totalPrice}
                    </span>
                );
            }
        }
    ];

    const filteredAppointments = searchText ? appointments.filter(appointment => appointment._id.includes(searchText)) : appointments;

    return (
        <Layout>
            <div className="search-container">
                <Input.Search
                    placeholder="Search by ID"
                    onChange={e => setSearchText(e.target.value)}
                    style={{ flex: 1, marginRight: 16 }}
                />
            </div>
            <h1>Visits List</h1>
            <Table columns={columns} dataSource={filteredAppointments} />
        </Layout>
    );
};

export default AllAppointments;
