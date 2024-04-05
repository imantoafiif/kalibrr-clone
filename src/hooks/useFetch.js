import React from "react"
import { instance as axios } from "../utils/axios"

const useFetch = (url, params, method) => {
    
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        axios[method](url, ( method === 'get' ? { params } : params))
        .then(r => {
            if(Array.isArray(r.data)) {
                setData(r.data)
            }
        })
        .catch(e => {
            setError(e)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [url, params, method])

    return { data, loading, error }

}

export default useFetch