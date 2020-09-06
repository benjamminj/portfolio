import env from 'dotenv'
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'

expect.extend(matchers)

env.config({
  path: '.env.local',
})
