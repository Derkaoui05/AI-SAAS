import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  return (
    <div className='px-4 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto flex justify-center items-center'>
      <SignUp signInFallbackRedirectUrl={"/create-profile"}
      />
    </div>
  )
}

export default SignUpPage