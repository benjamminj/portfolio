export const getGlobalProperty = propertyName => {
  const bodyStyles = window.getComputedStyle(document.body)
  return bodyStyles.getPropertyValue(propertyName)
}

export const remToPx = remValue => {
  if (/rem/.test(remValue)) {
    const rootPixelNumber = getGlobalProperty('font-size')
    const remNumber = remValue

    // removes any units from the values
    return (
      rootPixelNumber.replace(/[a-z]/g, '') * remNumber.replace(/[a-z]/g, '')
    )
  }
}
