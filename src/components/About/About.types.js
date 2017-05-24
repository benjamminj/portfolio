// @flow

export type Bio = {
  content: string,
  invite: {
    textBefore: string,
    textAfter: string,
    invite: {
      text: string,
      href: string
    }
  }
}

export type AboutProps = {
  bio: Bio
}
