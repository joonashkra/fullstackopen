import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => { 
        return { toggleVisibility } 
    })

    return (
        <>
            {visible && props.children}
            <button onClick={toggleVisibility} style={{ alignSelf: "end"}}>{visible ? props.buttonLabels[1] : props.buttonLabels[0]}</button>
        </>
    )
})

export default Togglable