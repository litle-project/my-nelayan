import { Suspense } from 'react'
import Profile from './screen'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <Profile />
    </Suspense>
  )
}