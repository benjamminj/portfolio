import { useState, useRef, useEffect } from 'react'
import { jsx, css } from '@emotion/core'
import { aboveDesktop } from '../styles/media'
/** @jsxImportSource @emotion/core */ jsx

export interface ImageResource {
  /** The URI to the primary (or fallback) image source */
  src: string
  /** If providing multiple size options, this */
  srcSet?: string[]
}

export interface ImgProps {
  /** Relative path to the image file */
  src: string
  /** Low quality placeholder image source */
  placeholder: string
  /** Alt text describing the image */
  alt: string
  /** Overrides for styles */
  className?: string
}

/**
 * The actual image—it will only be displayed after it has loaded into the client.
 */
const ActualImg = ({ src, alt }: ImgProps) => {
  const [loaded, setLoaded] = useState(false)

  const isServer = typeof window === 'undefined'

  // Store the image asset in a ref so that we can fade it in after the component
  // renders into the DOM.
  const img = useRef(isServer ? null : new Image())

  useEffect(() => {
    if (!img.current) return
    img.current.src = src

    // Once the image has fully loaded into the browser, flip the state
    // and display it!
    img.current.onload = () => {
      setLoaded(true)
    }
  }, [])

  return (
    <img
      alt={alt}
      src={src}
      css={{
        transition: 'opacity 500ms ease-in-out',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: loaded ? 1 : 0,
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}

/**
 * An `img` tag. Initially renders a low quality version of the image as a placeholder
 * image and will fade in the actual image once it has been loaded.
 */
export const Img = (props: ImgProps) => {
  return (
    <div
      css={[
        { position: 'relative', overflow: 'hidden' },
        aboveDesktop({
          borderRadius: 'var(--border-radius-m)',
        }),
      ]}
      {...props}
    >
      <img src={props.placeholder} css={{ width: '100%' }} alt={props.alt} />
      <ActualImg {...props} />
    </div>
  )
}
