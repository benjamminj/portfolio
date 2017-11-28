// @flow @jsx h
import { h } from 'preact'
import styles from './index.css'

type PropTypes = {
  open: boolean
}

const MenuIcon = ({ open }: PropTypes) => (
  <div className={styles.MenuIcon} open={open}>
    <div className={styles.menuBar} />
    <div className={styles.menuBar} />
    <div className={styles.menuBar} />
  </div>
)

export default MenuIcon
