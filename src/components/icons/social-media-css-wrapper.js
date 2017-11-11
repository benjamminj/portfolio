import { h } from 'preact'

// Currently, styled-jsx is not working for external styles & preact,
// so safest way is to wrap external styles in a component
export const SocialMediaCssWrapper = ({ children }) => (
  <div className='SocialMediaCssWrapper'>
    {children}

    <style jsx>{`
      --fill: var(--local-accent, var(--gray-normal));
      --size: 2rem;

      .SocialMediaCssWrapper :global(svg) {
        height: var(--size);
        width: var(--size);
      }

      /* assumes each svg has a single path */
      .SocialMediaCssWrapper :global(path) {
        fill: var(--fill);
        transition: 0.175s fill ease-in-out;
      }
    `}</style>
  </div>
)

export default SocialMediaCssWrapper
