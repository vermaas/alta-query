
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
