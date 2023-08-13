import React, { useContext } from 'react'
import AuthContext from './context'


const useOnboarding = () => {
  const { onboardingUser, setOnboardingUser } = useContext(AuthContext)

  return { onboardingUser, setOnboardingUser }
}

export default useOnboarding
