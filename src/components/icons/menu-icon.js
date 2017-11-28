// @flow @jsx h
import { h } from 'preact'

type PropTypes = {
  open: boolean
}

const MenuIcon = ({ open }: PropTypes) => (
  <div className='MenuIcon' open={open}>
    <div className='menuBar' />
    <div className='menuBar' />
    <div className='menuBar' />

    <style jsx>{`
      --color: var(--black);
      --transition: 300ms ease-in-out;

      .MenuIcon {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .menuBar {
        height: 2px;
        width: 100%;
        background: var(--color);
        transform-origin: 0 0;
        transition: transform var(--transition), opacity var(--transition),
          background var(--transition);
      }

      .menuBar + .menuBar {
        margin-top: 3px;
      }

      [open='true'] .menuBar {
        --color: var(--white);
      }

      [open='true'] .menuBar:nth-child(1) {
        transform: translate(4px, -2px) rotate(45deg);
      }

      [open='true'] .menuBar:nth-child(2) {
        opacity: 0;
      }

      [open='true'] .menuBar:nth-child(3) {
        transform: translate(2.5px, 0.75px) rotate(-45deg);
      }
    `}</style>
  </div>
)

export default MenuIcon
