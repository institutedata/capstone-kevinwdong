import PropType from "prop-types"
import LoginForm from "../components/LoginForm"


const SignInPage = ({logStatus, setLogStatus}) => {
  return (
    <LoginForm logStatus={logStatus} setLogStatus={setLogStatus}/>
  )
}

SignInPage.propTypes = {
  logStatus: PropType.bool,
  setLogStatus: PropType.func
}

export default SignInPage