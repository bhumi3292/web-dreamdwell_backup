import React, { useEffect } from 'react';
import { useLoginUser } from '../../hooks/useLoginUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function LoginForm() {
    const { mutate, data, error, isPending } = useLoginUser();

    // Validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
        stakeholder: Yup.string()
            .oneOf(["Landlord", "Tenant"], "Select a valid role")
            .required("Stakeholder is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            stakeholder: '',
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values);
        },
    });

    // Show toast notifications on data or error changes
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            toast.success("Login successful!");

        }
        if (error) {
            toast.error(error.message || "Login failed");
        }
    }, [data, error, navigate]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Login to DreamDwell</h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 max-w-md">
                <label htmlFor="email" className="font-medium">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="border p-2 rounded"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-600 text-sm">{formik.errors.email}</p>
                )}

                <label htmlFor="password" className="font-medium">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="border p-2 rounded"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-600 text-sm">{formik.errors.password}</p>
                )}

                <label htmlFor="stakeholder" className="font-medium">Stakeholder</label>
                <select
                    id="stakeholder"
                    name="stakeholder"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stakeholder}
                    className="border p-2 rounded"
                >
                    <option value="" disabled>
                        Select Stakeholder
                    </option>
                    <option value="Landlord">Landlord</option>
                    <option value="Tenant">Tenant</option>
                </select>
                {formik.touched.stakeholder && formik.errors.stakeholder && (
                    <p className="text-red-600 text-sm">{formik.errors.stakeholder}</p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
