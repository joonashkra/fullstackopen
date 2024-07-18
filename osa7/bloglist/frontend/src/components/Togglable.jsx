import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div style={{ paddingBlock: 5 }}>
            {visible && props.children}
            <Button onClick={toggleVisibility}>
                {visible ? props.buttonLabels[1] : props.buttonLabels[0]}
            </Button>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabels: PropTypes.array.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
