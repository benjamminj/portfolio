<script lang="ts">
  import clsx from 'clsx'

  export let level: number = 2
  const tag = `h${Math.max(Math.min(level, 6), 1)}`
  const styles = {
    h1: '',
    h2: 'mt-16 mb-6 text-3xl',
    h3: 'mt-12 mb-4 text-2xl',
    h4: 'mt-10 mb-4 text-xl',
    h5: 'mt-6 mb-4 text-lg',
    h6: 'mt-6 mb-4 text-base',
  }
  const headerStyle = styles[tag as unknown as keyof typeof styles]
</script>

<svelte:element 
  this={tag} 
  {...$$restProps}
  class={clsx(
    headerStyle,
    'font-medium'
  )}
>
  <slot />
</svelte:element>