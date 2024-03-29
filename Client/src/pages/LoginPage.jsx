import PropType from "prop-types"
import LoginForm from "../components/LoginForm"



const SignInPage = () => {
  return (

    <LoginForm />

  )
}

SignInPage.propTypes = {
  logStatus: PropType.bool,
  setLogStatus: PropType.func
}

export default SignInPage