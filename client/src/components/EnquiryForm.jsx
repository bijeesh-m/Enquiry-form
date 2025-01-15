import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        subject: "",
        email: "",
        message: "",
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.subject) {
            errors.subject = "subject is required.";
        }
        if (!formData.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid.";
        }
        if (!formData.message) {
            errors.message = "Message is required.";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        const toastId = toast.loading("Sending...");
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setSubmittedData(formData);
            axios
                .post("http://localhost:4000/send-email", formData)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            setErrors({});
            toast.success("Message send successfully!", { id: toastId });
        } else {
            toast.dismiss();
            setErrors(errors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="container p-5">
            <h2>Enquiry Form</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Subject
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    {errors.subject && <p className="text-danger">{errors.subject}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        Message
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && <p className="text-danger">{errors.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            {submittedData && (
                <div className="mt-5">
                    <h3>Submitted Details</h3>
                    <p>
                        <strong>Name:</strong> {submittedData.subject}
                    </p>
                    <p>
                        <strong>Email:</strong> {submittedData.email}
                    </p>
                    <p>
                        <strong>Message:</strong> {submittedData.message}
                    </p>
                </div>
            )}
        </div>
    );
};

export default EnquiryForm;
