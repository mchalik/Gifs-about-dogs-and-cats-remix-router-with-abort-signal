
import type { Route } from './+types/api.get-gifs';

export async function loader({request}: Route.LoaderArgs) {
    const API_GIPHY_URL = process.env.API_GIPHY_KEY;

    if (!API_GIPHY_URL) {
        throw 'No API GIF KEY';
    }

    const url = new URL(request.url);
    url.searchParams.set('api_key', API_GIPHY_URL)

    const responseGiphy = await fetch('https://api.giphy.com/v1/gifs/search' + url.search);

    if (!responseGiphy.ok) {
        throw 'No API GIF KEY';

    }

    const jsonGiphy = await responseGiphy.json();

    return Response.json(jsonGiphy);
}