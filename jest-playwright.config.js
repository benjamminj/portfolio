require('dotenv').config({ path: '.env.local' })

const getJestPlaywrightConfig = () => {
  const {
    TEST_HEADLESS_BROWSER = 'true',
    TEST_DEBUG_MODE = 'false'
  } = process.env

  let isHeadless = TEST_HEADLESS_BROWSER === 'true'

  if (TEST_DEBUG_MODE === 'true') {
    return {
      launchOptions: {
        headless: false,
        devtools: true
      }
    }
  }

  return {
    launchOptions: { headless: isHeadless }
    // browsers: ['chromium', 'firefox', 'webkit']
  }
}

module.exports = getJestPlaywrightConfig()
