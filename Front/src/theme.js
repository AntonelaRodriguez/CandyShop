import { extendTheme, theme } from '@chakra-ui/react'

export default extendTheme({
  colors: {
    primary: {
      ...theme.colors.pink,
      200: '#F6ACA3',
      300: '#FF6B6B'
    }
  },
  global: {
    'html, body, #root': {
      minHeight: '100%'
    },

    "a": {
      _hover: {
        textDecoration: 'none'
      }
    },
    "p": {
      _hover: {
        textDecoration: 'none'
      }
    }
  }
})
