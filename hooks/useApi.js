import { useState } from 'react'

const useApi = (apiFunc) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const request = async (...args) => {
    setLoading(true)
    const response = await apiFunc(...args)
    setLoading(false)

  
    setError(!response.ok)
    try {
      setData(await response.json())
    } catch {
      setData(response.data)
    }
    
    return response
  }

  return { data, error, isLoading, request }
}

export default useApi
