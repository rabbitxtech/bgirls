import { MdLightMode } from "react-icons/md"
import { MdDarkMode } from "react-icons/md"
import { useTheme } from "next-themes"

const SwitchTheme = () => {
  const { setTheme } = useTheme()

  return (
    <>
      <span className="sr-only">Switch Theme</span>
      <span
        aria-hidden="true"
        className="p-3 flex dark:hidden justify-center items-center rounded-full hover:bg-gray-500/10 cursor-pointer"
        onClick={() => setTheme("dark")}
      >
        <MdDarkMode size={28} />
      </span>
      <span
        aria-hidden="true"
        className="p-3 hidden dark:flex justify-center items-center rounded-full dark:hover:bg-gray-100/10 cursor-pointer"
        onClick={() => setTheme("light")}
      >
        <MdLightMode size={28} />
      </span>
    </>
  )
}

export default SwitchTheme
