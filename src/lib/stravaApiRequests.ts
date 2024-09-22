import { setToken, getToken } from "./tokenStore";
import { StravaStats, StravaRefreshTokenResponse, StravaActivityRequestParams, StravaActivityDataElement } from "@/interfaces/strava";

export const stravaApiUrl: string = "https://strava.com/api/v3";

export async function fetchAccessToken(): Promise<void>{
    const response = await fetch(`${stravaApiUrl}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            refresh_token: process.env.STRAVA_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        }),
    });
    if (!response.ok) {
        throw new Error('Error when requesting new strava access token');
    }

    const refreshTokenResponse: StravaRefreshTokenResponse = await response.json();
    setToken(refreshTokenResponse.access_token, refreshTokenResponse.expires_at);
};

export async function fetchAthleteStats(athlete_id: string, retry: boolean=true): Promise<StravaStats> {
    const { access_token } = getToken();
    const response = await fetch(`${stravaApiUrl}/athletes/${athlete_id}/stats`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        if (retry && (data.message == "Authorization Error" && data.errors[0].field == "access_token" && data.errors[0].code == "invalid")) {
            await fetchAccessToken();
            return await fetchAthleteStats(athlete_id, false);
        }
        throw new Error(`Error when fetching strava athlete data`);
    }
    return data;
};

export async function fetchAthleteActivities(params: StravaActivityRequestParams, retry: boolean=true): Promise<Array<StravaActivityDataElement>> {
    const { access_token } = getToken();
    const url = new URL(`${stravaApiUrl}/athlete/activities`);
    let urlParams: URLSearchParams = url.searchParams;
    urlParams.set('before', params.before.toString());
    urlParams.set('after', params.after.toString());
    urlParams.set('per_page', params.per_page.toString());
    if (params.page) {
        urlParams.set('page', params.page.toString());
    }


    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    const activities = await response.json();
    if (!response.ok) {
        if (activities.message == "Authorization Error" && activities.errors[0].field == "access_token" && activities.errors[0].code == "invalid") {
            await fetchAccessToken();
            return await fetchAthleteActivities(params, false);
        }
        throw new Error(`Error when fetching strava athlete data`);
    }
    return activities;
};
