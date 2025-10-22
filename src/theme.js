import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#7c3aed',
    600: '#6d28d9',
    700: '#5b21b6',
    800: '#4c1d95',
    900: '#3b0764'
  }
}

const fonts = {
  heading: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
  body: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`
}

const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.900'
    },
    a: { color: 'brand.500' }
  }
}

const components = {
  Button: {
    baseStyle: { rounded: 'md' }
  },
  Heading: {
    baseStyle: { fontWeight: 700 }
  }
}

const theme = extendTheme({ colors, fonts, styles, components })
export default theme
