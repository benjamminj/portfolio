export const getGlobalProperty = (propertyName) => {
  const bodyStyles = window.getComputedStyle(document.body)
  return bodyStyles.getPropertyValue(propertyName)
}

export const remToPx = (remValue) => {
  if (/rem/.test(remValue)) {
    // removes any units from the values
    const rootPixelNumber = getGlobalProperty('font-size').replace(/[a-z]/g, '')
    const remNumber = remValue.replace(/[a-z]/g, '')

    return rootPixelNumber * remNumber
  }
}
