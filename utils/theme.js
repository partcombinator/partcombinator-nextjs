import { extendTheme } from "@chakra-ui/react"
// 2. Add your color mode config
const config = {
    useSystemColorMode: true,
    initialColorMode: "dark"
}
// 3. extend the theme
const theme = extendTheme({ config })


export default theme