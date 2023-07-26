import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AdminAppNavigator from './AdminAppNavigator'
import AdminAuthNavigator from './AdminAuthNavigator'
import useAuth from '../auth/useAuth'

const Tab = createBottomTabNavigator()

const AdminNavigator = () => {
  const { user, logOut } = useAuth()

  return user ? <AdminAppNavigator /> : <AdminAuthNavigator />
}

export default AdminNavigator
