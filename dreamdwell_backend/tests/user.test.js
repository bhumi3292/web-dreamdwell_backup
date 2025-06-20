const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../index");
const User = require("../models/User");

let resetToken;

afterAll(async () => {
    await mongoose.disconnect();
});

describe("User Authentication API", () => {
    beforeAll(async () => {
        await User.deleteOne({ email: "ram123@gmail.com" });
    });

    test("should validate missing fields while creating user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                fullName: "Ram Bahadur",
                email: "ram123@gmail.com",
                phoneNumber: "9800000000",
                stakeholder: "Tenant"
                // missing password + confirmPassword
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Please fill all the fields");
    });

    test("should create a user with all fields", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                fullName: "Ram Singh",
                email: "ram123@gmail.com",
                phoneNumber: "9800000000",
                stakeholder: "Tenant",
                password: "password123",
                confirmPassword: "password123"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("User registered successfully");
    });

    test("should login a user with valid credentials", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "ram123@gmail.com",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toEqual(expect.any(String));
    });
});

describe("Password Reset Flow", () => {
    test("should request password reset link", async () => {
        const res = await request(app)
            .post("/api/auth/request-reset/send-link")
            .send({ email: "ram123@gmail.com" });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toMatch(/password reset link has been sent/i);

        // Simulate getting the reset token (what would be emailed)
        const user = await User.findOne({ email: "ram123@gmail.com" });
        resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    });

    test("should reset password with valid token", async () => {
        const res = await request(app)
            .post(`/api/auth/reset-password/${resetToken}`)
            .send({
                newPassword: "newpassword123",
                confirmPassword: "newpassword123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Password has been reset successfully.");
    });

    test("should fail reset with invalid token", async () => {
        const res = await request(app)
            .post("/api/auth/reset-password/invalidtoken123")
            .send({
                newPassword: "anotherpass123",
                confirmPassword: "anotherpass123"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/invalid reset token/i);
    });
});
