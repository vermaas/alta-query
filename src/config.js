
export function get_base_url()
{
    let base_url = "http://localhost:8000/altapi/observations"

    if (process.env.NODE_ENV === 'development') {
        base_url = "http://localhost:8000/altapi/observations"
    } else {
        base_url = "https://alta.astron.nl/altapi/observations"
    }
    return base_url
}

export function get_alta_frontend_url()
{
    let base_url = "http://localhost:3000/science/query"

    if (process.env.NODE_ENV === 'development') {
        base_url = "http://localhost:3000/science/query"
    } else {
        base_url = "https://alta.astron.nl/science/query"
    }
    return base_url
}
