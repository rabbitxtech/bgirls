import { CSSProperties } from 'react'
import { BarLoader, DotLoader } from 'react-spinners'

const override: CSSProperties = {
  color: '#ec4899',
  width: '100%'
}

const ChildLoader = () => {
  return <BarLoader cssOverride={override} aria-label="Modal Loading Spinner" />
}

export default ChildLoader
