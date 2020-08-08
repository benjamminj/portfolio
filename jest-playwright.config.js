require('dotenv').config({ path: '.env.local' })

const getJestPlaywrightConfig = () => {
  const {
    TEST_HEADLESS_BROWSER = 'true',
    TEST_DEBUG_MODE = 'false',
    TEST_BROWSERS = 'chromium,firefox,webkit'
  } = process.env

  if (TEST_DEBUG_MODE === 'true') {
    return {
      launchOptions: {
        headless: false,
        devtools: true
      }
    }
  }

  return {
    launchOptions: { headless: TEST_HEADLESS_BROWSER === 'true' },
    browsers: TEST_BROWSERS.split(',')
  }
}

module.exports = getJestPlaywrightConfig()
