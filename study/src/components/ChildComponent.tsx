import React from 'react'

type ChildComponentProps = {
    onSendData: (data: string) => void
}

const ChildComponent: React.FC<ChildComponentProps> = ({ onSendData }) => {
    return <button onClick={() => onSendData('Hello from child!')}>Send Data to Parent</button>
}

export default ChildComponent
