import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gzjxxpeofotelxrzblez.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anh4cGVvZm90ZWx4cnpibGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDEwODEsImV4cCI6MjA1MjY3NzA4MX0.R_tCibbHI78B0JYvIja4aNam3tltG3M-eDnmQKn15Cg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { data, error } = await supabase
		.from("clicks")
		.select("*")
		.order("inserted_at", { ascending: false });
	if (error) {
		return res.status(500).json({ error: error.message });
	}
	console.log("📥 Fetched Clicks Data:", data);
	res.status(200).json(data);
}
