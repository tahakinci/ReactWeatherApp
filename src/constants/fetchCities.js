const API_KEY = import.meta.env.REACT_APP_API_KEY
const fetchCities = async ({ queryKey }) => {
    const id = queryKey[1]
    const cityIdString = id.join(",")
    let apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIdString}&appid=${API_KEY}&units=metric`;


    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json()
}

export default fetchCities