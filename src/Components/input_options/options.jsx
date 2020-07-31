import React from 'react'
import Input from '../Input/Input'

{/* <label><input type="radio" value="option1" checked={this.state.selectedOption === 'option1'}
onChange={handleOptionChange} /> Option 1 </label>
*/}


const Options = (props) => {
  return (
    <form action="">
      <div><label><Input type={"radio"} value={'boi'} onChange={''} checked={true} /> Boi </label></div>
      <div><label><Input type={"radio"} value={'frango'} onChange={''} checked={true} /> Frango </label></div>
      <div><label><Input type={"radio"} value={'vegetariano'} onChange={''} checked={true} /> Vegetariano </label></div>
    </form>

  )
}

export default Options
