import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

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
            <button onClick={toggleVisibility}>
                {visible ? props.buttonLabels[1] : props.buttonLabels[0]}
            </button>
        </>
    )
})

Togglable.propTypes = {
    buttonLabels: PropTypes.array.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
