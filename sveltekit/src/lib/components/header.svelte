<script>
	import NavLink from "./nav-link.svelte";

</script>
<header class="z-header max-w-viewport">
  <!-- TODO: separate container comp? -->
  <div class="max-w-prose my-0 mx-auto">
    <div class="justify-between block p-4 space-y-2 sm:flex sm:space-y-0">
      <a
        href="/"
        class="inline-block text-xl font-medium text-black no-underline dark:text-white"
      >
        <span class="lowercase">benjamin johnson</span>
      </a>

      <div class="flex mt-2 space-x-4 lowercase">
        <nav>
          <div class="flex items-center space-x-4">
            <NavLink
              href="/writing"
              title="Writing"
            >
              ./writing
            </NavLink>

            <NavLink
              title="About" 
              href="/about"
            >
              ./about
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  </div>
</header>