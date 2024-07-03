import React from 'react'
import { redirect } from 'next/navigation';

const page = () => {
    redirect('/listings');
  return (
    <div>page</div>
  )
}

export default page