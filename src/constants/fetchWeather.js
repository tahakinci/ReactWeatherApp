const API_KEY = import.meta.env.REACT_APP_API_KEY
const fetchWeather = async ({ queryKey }) => {
    const search = queryKey[1]

    if (!search) return []
    // i'm fecthing user's coordinate using navigator.geolocation 
    // this fuction gives me lat, and lon array but i also get city name from users when they submited
    // so the search parameter can be string or array
    let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
    // if search parameter  is string adding url to "q=" and search 
    if (typeof search === "string") {
        baseUrl += `&q=${search}`;
        // if its array adding lat long and items of array
    } else if (Array.isArray(search)) {
        baseUrl += `&lat=${search[0]}&lon=${search[1]}`;
    }

    const apiRes = await fetch(baseUrl)

    if (!apiRes.ok) {
        throw new Error(`Weather API ${search} is not ok!`)
    }

    return apiRes.json()
}

export default fetchWeather