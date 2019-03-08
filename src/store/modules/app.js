import bowser from 'bowser'

const browser = bowser.parse(window.navigator.userAgent)
const isDesktopBrowser = browser.platform.type === 'desktop'

export default {
  namespaced: true,
  state: {
    isDesktopBrowser
  }
}
