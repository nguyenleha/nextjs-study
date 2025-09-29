import React, { useState } from 'react'
import ChildComponent from './ChildComponent'

const ParentComponent: React.FC = () => {
    const [message, setMessage] = useState('')

    const handleDataFromChild = (data: string) => {
        setMessage(data)
    }

    return (
        <div>
            <ChildComponent onSendData={handleDataFromChild} />
            <p>Message from child: {message}</p>
        </div>
    )
}

export default ParentComponent
