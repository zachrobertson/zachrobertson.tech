export interface BlogData {
    id: string,
    html: string,
    content: string,
    excerpt: string
    title: string,
    date: string,
    author: string,
    headerImage: string,
    stravaData?: {
        distanceData: { x: string, y: number }[],
        maxDistance: number,
        elevationData: { x: string, y: number }[],
        maxElevation: number
    }
};
