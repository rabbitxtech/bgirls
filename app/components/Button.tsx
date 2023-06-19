import React from "react"
import clsx from "clsx"

const Button: React.FC<React.ComponentProps<"button">> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx("px-3 py-2 rounded text-white bg-pink-500", className)}
    >
      {children}
    </button>
  )
}

export default Button
