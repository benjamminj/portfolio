import { copyToClipboard } from '../copyToClipboard'

const originalExecCommand = document.execCommand

beforeEach(() => {
  document.execCommand = jest.fn()
})

afterEach(() => {
  document.execCommand = originalExecCommand
})

test("should copy the input to the user's clipboard", () => {
  copyToClipboard('test clipboard')
  expect(document.execCommand).toHaveBeenCalledTimes(1)
  expect(document.execCommand).toHaveBeenCalledWith('copy')
})
