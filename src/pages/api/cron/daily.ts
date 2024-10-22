import { generateStravaData } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function daily(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    console.log("Cron job /api/cron/daily called");
    try {
        await generateStravaData();
        console.log("Strava data updated successfully");
        res.status(200).json({ message: "Strava data updated" });
    } catch (error) {
        console.error("Error updating strava data:", error);
        res.status(500).json({ message: 'Internal server error, could not fetch strava data!' });
    }
}
