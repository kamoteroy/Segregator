import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log("bonak");
	if (req.method === "OPTIONS") {
		// CORS preflight
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		return res.status(200).end();
	}

	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { email, password } = req.body;

	if (email === "admin@example.com" && password === "admin") {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return res.status(200).json({ success: true, message: "Login successful" });
	}

	res.setHeader("Access-Control-Allow-Origin", "*");
	return res
		.status(401)
		.json({ success: false, message: "Invalid credentials" });
}
