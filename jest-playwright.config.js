require('dotenv').config({ path: '.env.local' })

const getJestPlaywrightConfig = () => {
  const { TEST_MODE = 'dev' } = process.env

  const configs = {
    dev: {
      launchOptions: {
        headless: false,
        devtools: true,
      },
    },
    headless: {
      launchOptions: {
        headless: true,
      },
    },
    browsers: {
      launchOptions: {
        headless: true,
      },
      browsers: ['chromium', 'firefox', 'webkit'],
    },
    devices: {
      launchOptions: {
        headless: true,
      },
      devices: /(iPhone X)|(Pixel 2)/,
    },
  }

  return configs[TEST_MODE]
}

module.exports = getJestPlaywrightConfig()
