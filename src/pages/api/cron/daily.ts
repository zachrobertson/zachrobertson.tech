import { generateStravaData } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function daily(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await generateStravaData();
        res.status(200).json({ message: "Strava data updated" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error, could not fetch strava data!' });
    }
}
