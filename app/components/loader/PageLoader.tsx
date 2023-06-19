import { CSSProperties } from "react"
import { HashLoader } from "react-spinners"

const override: CSSProperties = {
  color: "#ec4899",
  alignContent: "center",
  
}

const PageLoader = () => {
  return (
    <HashLoader
      cssOverride={override}
      size={150}
      aria-label="Page Loading Spinner"
      data-testid="loader"
    />
  )
}

export default PageLoader
