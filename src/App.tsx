
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss";
import { Body } from "Body";

export function App() {

  const { scrollbarStyles, theme } = useStyles();

  return (
    <>
      <GlobalStyles
        styles={{
          "html, body": {
            "margin": "0",
            "padding": "0",
            "overflowX": "hidden",
            "boxSizing": "border-box",
            "position": "relative"
          },
          "html": {
            "colorScheme": "light",
            "backgroundColor": theme.palette.background.default
          },
          "body": {
            "scrollBehavior": "smooth",
            ...scrollbarStyles
          }
        }}
      />
      <Body />
    </>
  )
}
