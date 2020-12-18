import env from 'dotenv'
import '@testing-library/jest-dom/extend-expect'

env.config({
  path: '.env.local',
})

const originalExecCommand = document.execCommand

beforeEach(() => {
  document.execCommand = jest.fn()
})

afterEach(() => {
  document.execCommand = originalExecCommand
})
