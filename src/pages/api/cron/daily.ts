import fs from 'fs';
import path from 'path';
import { fetchAthleteActivities } from "@/lib/stravaApiRequests";
import { NextApiRequest, NextApiResponse } from 'next';
import { StravaActivityRequestParams, StravaWeeklyStats } from "@/interfaces/strava";

const TWENTY_FOUR_WEEKS_IN_SECONDS = 48 * 7 * 24 * 60 * 60;

function getWeek(date: Date): string {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    const weekNumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    const year = date.getFullYear();
    return `${year}-W${weekNumber}`;
}


function saveDataToFile(data: StravaWeeklyStats): void {
    const filePath = path.join(process.cwd(), 'stravaData.json');
    fs.writeFileSync(filePath, JSON.stringify(data));
}

export default async function daily(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    
    const userId = process.env.STRAVA_USER_ID;
    if (!userId) {
        res.status(200).json({ message: 'Internal server error, STRAVA_USER_ID must be set in environment variables' });
        return;
    }

    try {
        const before = Math.floor(new Date().getTime() / 1000);
        const after = before - TWENTY_FOUR_WEEKS_IN_SECONDS;
        const params: StravaActivityRequestParams = {
            before,
            after,
            per_page: 200
        };
        const activities = await fetchAthleteActivities(params);

        const weeklyStats: StravaWeeklyStats = {};
        for (const activity of activities) {
            if (activity.type == "Ride") {
                const startDate = new Date(activity.start_date);
                const weekIdx = getWeek(startDate);
                const distance = activity.distance / 1609.34; // Distance in miles
                const elevation = activity.total_elevation_gain / 0.3048; // Elevation in feet
                if (!weeklyStats[weekIdx]) {
                    weeklyStats[weekIdx] = { miles: 0, elevation: 0 };
                }
                weeklyStats[weekIdx].miles += distance;
                weeklyStats[weekIdx].elevation += elevation;
            }
        }

        saveDataToFile(weeklyStats);
        res.status(200).json({ message: "Strava data updated" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error, could not fetch strava data!' });
    }
}
