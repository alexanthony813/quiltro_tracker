import React, { useContext } from 'react'
import QuiltroContext from './context'

const useQuiltro = () => {
  const { quiltro, setQuiltro } = useContext(QuiltroContext)

  return { quiltro, setQuiltro }
}

export default useQuiltro
