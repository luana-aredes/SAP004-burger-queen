import React from 'react'
import Input from '../Input/Input'

const Additional = (props) => {
    return (
        <form action="">

            <div>
                <label><Input type={'checkbox'} value={'queijo'} checked={false} /> Queijo </label>
            </div>
            <div>
                <label><Input type={'checkbox'} value={'ovo'} checked={false} /> Ovo </label>
            </div>
        </form>
    )
}

export default Additional