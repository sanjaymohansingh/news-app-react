import React from 'react'
import { Audio } from 'react-loader-spinner';

const divStyle = {
    minHeight:"80vh",
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center"
}

const Loader = () => {
  return (
    <div style={divStyle}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="red"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
        />
    </div>
  )
}

export default Loader;
