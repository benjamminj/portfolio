import { useState, useRef, useEffect } from 'react'
import { jsx } from '@emotion/core'
/** @jsx jsx */ jsx

export interface ImgProps {
  /** Relative path to the image file */
  src: string
  placeholder: string
  /** Alt text describing the image */
  alt: string
}

/**
 * The actual image—it will only be displayed after it has loaded into the client.
 */
const ActualImg = ({ src, alt }: ImgProps) => {
  const [loaded, setLoaded] = useState(false)

  const img = useRef(typeof window === 'undefined' ? null : new Image())

  useEffect(() => {
    if (!img.current) return
    img.current.src = src

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
        zIndex: 1
      }}
    />
  )
}

/**
 * An `img` tag. Initially renders a low quality version of the image as a placeholder
 * image and will fade in the actual image once it has been loaded.
 */
export const Img = (props: ImgProps) => {
  const path = '../../img/pawel-czerwinski-unsplash.jpg'
  return (
    <div css={{ position: 'relative' }}>
      <img src={props.placeholder} css={{ width: '100%' }} alt={props.alt} />
      <ActualImg {...props} />
    </div>
  )
}
