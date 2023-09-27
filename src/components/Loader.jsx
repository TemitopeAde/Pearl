import React from 'react'
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#1a0101");

  return (
    <div className='centered'>
      <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    
  )
}

export default Loader