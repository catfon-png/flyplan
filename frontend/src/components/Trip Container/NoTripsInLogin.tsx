import React from 'react'
import { Link } from 'react-router-dom'

export default function NoTripsNoLogin() {
  return (
    <div>
        <div>
        <div className="w-full max-w-md mx-auto border rounded-lg p-6 h-100 flex items-center justify-center mt-14" style={{ borderColor: '#D1D1D1' }}>

          <div className="text-center">
            <img src="sending-message@4x.png" alt="" className="block mx-auto mb-4" />
          </div>
        </div>
        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2 text-center mt-10">Plan your first trip</h1>
          <p className="text-gray-600 mb-4 text-center" style={{ color : '#9A9A9A' }}>You don't have any trips</p>
          <div className="flex justify-center">
          <Link to="/">
          <button className="bg-gray-400 text-black py-2 px-4 rounded hover:bg-gray-500" style={{ backgroundColor : '#EDEDED' }}>
            Search
          </button>
        </Link>
          </div>
        </div>
    </div>


    </div>
    
  )
}
