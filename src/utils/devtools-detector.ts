import { addListener, launch } from "devtools-detector"

// https://github.com/AEPKILL/devtools-detector
addListener((isOpen) => {
  if (isOpen) {
    window.location.href = "about:blank"
  }
})
launch()
