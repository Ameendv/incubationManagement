import React from 'react'

function Processing() {
  return (
    <div style={{backgroundColor:'black'}}>
     <h3> Your data is processing </h3>
     <div className=" ms-3 spinner-grow text-primary" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-secondary" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-success" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-danger" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-warning" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-info" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-light" role="status">
  
</div>
<div className=" ms-3 spinner-grow text-dark" role="status">
  
</div>
    </div>
  )
}

export default Processing
