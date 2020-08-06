import React, { useState } from 'react';
import Header from '../../Components/Header/Header';

const Kitchen = (props) => {
  const [user, setUser] = useState(null)

  return (
    <>
      <Header place={'kitchen'} />
    </>
  )
}

export default Kitchen