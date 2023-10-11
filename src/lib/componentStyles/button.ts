import { defineStyleConfig, defineStyle } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"

type AccessibleColor = {
    bg?: string
    color?: string
    hoverBg?: string
    activeBg?: string
  }

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
    yellow: {
      bg: "yellow.400",
      color: "black",
      hoverBg: "yellow.500",
      activeBg: "yellow.600",
    },
    cyan: {
      bg: "cyan.400",
      color: "black",
      hoverBg: "cyan.500",
      activeBg: "cyan.600",
    },
  }

const variantSolid = defineStyle((props) => {
    const { colorScheme: c } = props
  
    if (c === "gray") {
      const bg = mode(`gray.100`, `whiteAlpha.200`)(props)
  
      return {
        bg,
        color: mode(`gray.800`, `whiteAlpha.900`)(props),
        _hover: {
          bg: mode(`gray.200`, `whiteAlpha.300`)(props),
          _disabled: {
            bg,
          },
        },
        _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
      }
    }
  
    const {
      bg = `${c}.onWhite.AA`,
      color = "white",
      hoverBg = `${c}.600`,
      activeBg = `${c}.700`,
    } = accessibleColorMap[c] ?? {}
  
    const background = mode(bg, `${c}.200`)(props)
  
    return {
      bg: background,
      color: mode(color, `gray.800`)(props),
      _hover: {
        bg: mode(hoverBg, `${c}.300`)(props),
        _disabled: {
          bg: background,
        },
      },
      _active: { bg: mode(activeBg, `${c}.400`)(props) },
    }
  })

const solidDark = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    bg: `${c}.onWhite.AA`,
    color: 'white',
    _hover: {
      bg: `${c}.700`,
      _disabled: {
        bg: `${c}.onWhite.AA`,
      },
    },
    _active: { bg:`${c}.900` },
  }
})

export const ButtonStyles = defineStyleConfig({

    variants: {
    solid: solidDark,
    solidDark,

  },
})