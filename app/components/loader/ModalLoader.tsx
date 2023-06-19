import { CSSProperties } from 'react'
import { BarLoader, DotLoader } from 'react-spinners'

const override: CSSProperties = {
  width: '100%'
}

const ModalLoader = () => {
  return (
    <BarLoader
      cssOverride={override}
      color="#ec4899"
      caria-label="Child Loading Spinner"
    />
  )
}

export default ModalLoader
