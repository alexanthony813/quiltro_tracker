import React, { useContext } from 'react'
import AuthContext from './context'

const useOnboarding = () => {
  const {
    onboardingUser,
    setOnboardingUser,
    pendingAdoptionInquiryQuiltro,
    setPendingAdoptionInquiryQuiltro,
  } = useContext(AuthContext)

  return {
    onboardingUser,
    setOnboardingUser,
    pendingAdoptionInquiryQuiltro,
    setPendingAdoptionInquiryQuiltro,
  }
}

export default useOnboarding
