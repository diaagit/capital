import db from "@repo/db";
import { SigninType, SignupType } from "@repo/types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { type Request, type Response, type Router } from "express";
import jwt from "jsonwebtoken";

// have to Add public private key logic Cards logic OTP logic

dotenv.config();
const userRouter: Router = express.Router();

const jwtSecret = process.env.JWT_SECRET as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

const _a = 500;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const generateToken = (id: string) =>
    jwt.sign(
        {
            userId: id,
        },
        jwtSecret,
        {
            expiresIn: "10m",
        },
    );

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const parsed = SignupType.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                errors: parsed.error.format(),
                message: "Validation failed",
            });
        }

        const { firstName, lastName, email, password } = parsed.data;

        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        if (!firstName || !lastName) {
            throw new Error("First name and last name are required");
        }

        const newUser = await db.user.create({
            data: {
                email,
                first_name: firstName,
                is_verified: false,
                last_name: lastName,
                password: hashedPassword,
                public_key: Math.random().toString(36).substring(2, 12),
                role: "user",
            },
        });

        if (typeof newUser.id !== "string") {
            return res.status(500).json({
                message: "User ID is invalid",
            });
        }

        const token = generateToken(newUser.id);

        return res.status(201).json({
            message: "User successfully registered",
            token: token,
            user: {
                email: newUser.email,
                firstName: newUser.first_name,
                id: newUser.id,
                lastName: newUser.last_name,
            },
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const parsed = SigninType.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                errors: parsed.error.format(),
                message: "Validation failed",
            });
        }

        const { email, password } = parsed.data;

        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password as string);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        if (typeof existingUser.id !== "string") {
            return res.status(500).json({
                message: "User ID is invalid",
            });
        }
        const token = generateToken(existingUser.id);

        return res.status(200).json({
            message: "Signin successful",
            token: token,
            user: {
                email: existingUser.email,
                firstName: existingUser.first_name,
                id: existingUser.id,
                lastName: existingUser.last_name,
            },
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

export default userRouter;
