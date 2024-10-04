// Strava users SI units for all values

interface StravaSubStats {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count: number;
}

export interface StravaStats {
    biggest_ride_distance: number;
    biggest_climb_elevation_gain: number;
    recent_ride_totals: StravaSubStats;
    all_ride_totals: StravaSubStats;
    recent_run_totals: StravaSubStats;
    all_run_totals: StravaSubStats;
    recent_swim_totals: StravaSubStats;
    all_swim_totals: StravaSubStats;
    ytd_ride_totals: StravaSubStats;
    ytd_run_totals: StravaSubStats;
    ytd_swim_totals: StravaSubStats;
};

export interface StravaRefreshTokenResponse {
    token_type: string;
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
};

export interface StravaRequestError {
    message: string;
    errors: Array<{
        resources: string;
        field: string;
        code: string;
    }>
};

export interface StravaActivityRequestParams {
    before: number;
    after: number;
    per_page: number;
    page?: number;
};

export interface StravaActivityDataElement     {
    resource_state: number;
    athlete: {
        id: number;
        resource_state: number;
    };
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    workout_type: number;
    id: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
    utc_offset: number;
    location_city: string | undefined;
    location_state: string | undefined;
    location_country: string;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: {
        id: string;
        summary_polyline: string;
        resource_state: number;
    },
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    gear_id: string;
    start_latlng: Array<number>;
    end_latlng: Array<number>;
    average_speed: number;
    max_speed: number;
    average_temp: number;
    average_watts: number;
    kilojoules: number;
    device_watts: boolean;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
    heartrate_opt_out: boolean;
    display_hide_heartrate_option: boolean;
    elev_high: number;
    elev_low: number;
    upload_id: number;
    upload_id_str: string;
    external_id: string;
    from_accepted_tag: boolean;
    pr_count: number;
    total_photo_count: number;
    has_kudoed: boolean;
    suffer_score: number;
};

export interface StravaWeeklyStats {
    [key: string]: {
        miles: number,
        elevation: number,
    };
};
