import { Col, DatePicker, Form, Input, Row, Select, TimePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Layout from "./../components/Layout";
import dayjs from "dayjs";
const { Option } = Select;

const EditAppointmentForm = () => {
    const params = useParams();
    const [appointment, setAppointment] = useState(null);
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const treatments = [
        { treatmentName: "Consultation (Check-up)", price: 100 },
        { treatmentName: "Physical Therapy Session", price: 125 },
        { treatmentName: "Medication Management", price: 50 },
        { treatmentName: "Minor Procedure (e.g., mole removal, wart removal)", price: 200 },
        { treatmentName: "Blood Test Panel", price: 200 },
    ];
    const getAppointmentById = async () => {
        try {
            const response = await axios.post(`/api/v1/doctor/getAppointmentById`,
                { appointmentId: params.appointmentId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response.data.success) {
                setAppointment(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAppointmentById();
        //eslint-disable-next-line
    }, []);

    const handleFinish = async (values) => {
        const time = moment(values.time).format("HH:mm");
        const updatedTreatments = values.treatments.map((treatment) => {
            if (treatment && treatment.includes(" - ")) {
                const parts = treatment.split(" - ");
                return {
                    treatmentName: parts[0].trim(),
                    value: Number(parts[1].trim().slice(0, -1)),
                };
            } else {
                return null;
            }
        });

        console.log("updatedTreatments:", updatedTreatments);
        try {
            dispatch(showLoading());
            const response = await axios.post(`/api/v1/doctor/update-appointment`,
                {
                    appointmentId: params.appointmentId,
                    date: date,
                    time: time,
                    treatments: updatedTreatments || [],
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                navigate("/doctor-appointments"); // Redirect to doctor's appointments list
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
            message.error("Something Went Wrong ");
        }
    };

    return (
        <Layout>
            <h1 className="text-center">Edit Appointment</h1>
            {appointment && (
                <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={
                    {
                        ...appointment,
                        date: dayjs(appointment.date),
                        time: moment(appointment.time, "HH:mm"),
                        treatments: appointment.treatments.map((treatment) => {
                            return treatment.treatmentName + " - " + treatment.value + "$";
                        })
                    }
                }>
                    <h4 className="">Appointment Details : </h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={12}>
                            <Form.Item label="Date" name="date" required>
                                <DatePicker
                                    className="m-2 date-picker"
                                    format="DD-MM-YYYY"
                                    onChange={(value) => {
                                        const selectedDate = value
                                            ? dayjs(value).format("DD-MM-YYYY")
                                            : "";
                                        setDate(selectedDate);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={12}>
                            <Form.Item label="Time" name="time" required>
                                <TimePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={24}>
                            <Form.Item label="Treatments" name="treatments">
                                <Select placeholder="Select a treatment" mode="multiple">
                                    {treatments.map((treatment, index) => (
                                        <Option key={index} value={treatment.treatmentName + " - " + treatment.price + "$"}>
                                            {treatment.treatmentName + " - " + treatment.price + "$"}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <button className="btn btn-primary form-btn" type="submit">
                        Update Appointment
                    </button>
                </Form>
            )}
        </Layout>
    );
};

export default EditAppointmentForm;
