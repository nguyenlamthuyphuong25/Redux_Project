import React from 'react'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({
  isAuth,
  children,
}: {
  isAuth: any
  children: any
}) {
  return isAuth ? children : <Navigate to="/" />
}
