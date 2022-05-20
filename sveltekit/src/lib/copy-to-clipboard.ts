/**
 * Copies its input to the user's clipboard
 */
export const copyToClipboard = (input: string) => {
	const $el = document.createElement('textarea')
	$el.value = input

	// Make sure we hide the element from sight
	$el.setAttribute('readonly', '')
	$el.style.position = 'absolute'
	$el.style.left = '-9999px'

	document.body.appendChild($el)

	// Select the input, this is the same as dragging your cursor over it.
	$el.select()
	// Copy the current selection to the clipboard
	document.execCommand('copy')

	// Finally, clean up after ourselves
	document.body.removeChild($el)
}
