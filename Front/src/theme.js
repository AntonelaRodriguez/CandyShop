import { extendTheme, theme } from '@chakra-ui/react'

export default extendTheme({
  colors: {
    primary: {
      ...theme.colors.pink,
      200: '#F6ACA3',
      300: '#FF6B6B'
    }
  }
})
