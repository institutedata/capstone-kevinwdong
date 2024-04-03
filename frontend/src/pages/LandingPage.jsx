import { Box } from "@mui/material"
import bbgame from "../assets/bbgame.jpg"
import FlexBetween from "../components/FlexBetween"


const LandingPage = () => {
  return (
      <FlexBetween>
      <img src={bbgame} alt="nature" />
      </FlexBetween>  
  )
}

export default LandingPage