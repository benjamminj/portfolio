document.addEventListener('DOMContentLoaded', function() {
  // Makes sure that menu items also close the menu
  var menu = document.querySelector('.menu')
  var menuToggle = document.getElementById('menu-toggle')

  menu.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'A') {
      menuToggle.checked = false // Close the menu
    }
  })
})
