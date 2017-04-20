document.addEventListener('DOMContentLoaded', function() {
  // Makes sure that menu items also close the menu
  var menu = document.querySelector('.menu')
  var menuToggle = document.getElementById('menu-toggle')

  menu.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'A') {
      menuToggle.checked = false // Close the menu
    }
  })

  applySmoothScroll(document.querySelector('.next-pane-btn a'))
  document.querySelectorAll('.menu-item-link a').forEach(function (el) {
    applySmoothScroll(el)
  })
})

// Apply scroll easing to a single DOM node click
function applySmoothScroll (node) {
  node.addEventListener('click', function (ev) {
    ev.preventDefault()

    // Scroll to the target specified in the node's target
    var target = node.getAttribute('href')
    
    // Apply scroll easing over 750ms
    smoothScroll(target, 750)
  })
}

// Ease scrolling
function smoothScroll (target, duration) {
  var start = window.pageYOffset
  var distance = document.querySelector(target).offsetTop - start

  // Robert Penner's easeInOutQuad - http://robertpenner.com/
  function easing (time, start, distance, duration) {
		if ((time /= duration / 2) < 1) {
      return distance / 2 * time * time + start;
    }

		return -distance / 2 * ((--time) * (time - 2) - 1) + start;
  }

  var timeStart = null
  var timeElapsed = 0

  // Starts the scrolling
  requestAnimationFrame(loop)

  function loop (time) {
    if (timeStart === null) {
      timeStart = time
    }

    timeElapsed = time - timeStart

    // Scroll to the `next` position determined by this function
    window.scrollTo(0, easing(timeElapsed, start, distance, duration))

    if (timeElapsed < duration) {
      // Recursively call function to continue scroll while duration lasts
      requestAnimationFrame(loop)
    } else {
      // Scroll whatever is remaining once duration is up & reset timeStart
      window.scrollTo(0, start + distance)
      timeStart = null
    }
  }
}
