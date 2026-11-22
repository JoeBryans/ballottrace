import ResutUpload from '@/components/resut-upload'
import prisma from '@/lib/db'
import React from 'react'

const page = async() => {
    const states=await prisma.state.findMany()
    const lgas=await prisma.lGA.findMany()
    const wards=await prisma.ward.findMany()
    const pollingUnits=await prisma.pollingUnit.findMany()
    const locations={
        states,
        lgas,
        wards,
        pollingUnits
    }
  return (
    <div className="w-full min-h-svh">
        <ResutUpload
        locations={locations}
        />
    </div>
  )
}

export default page