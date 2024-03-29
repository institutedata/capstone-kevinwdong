import PropType from 'prop-types'
import Alert from '@mui/material/Alert';

const ErrorMessage = ({children}) => {
  return (
    <Alert variant='outlined' severity="error" >
        <strong>{children}</strong>
      </Alert>
  )
}

ErrorMessage.propTypes = {
  children: PropType.node.isRequired
}

export default ErrorMessage