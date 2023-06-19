"use client"

import React, { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

const CustomeThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...rest
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme={false} {...rest}>
      {children}
    </ThemeProvider>
  )
}

export default CustomeThemeProvider
