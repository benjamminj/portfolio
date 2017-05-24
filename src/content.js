import {COLORS} from 'src/theme'

export const bio = {
  invite: {
    textBefore: `Like what you see or want a little more background info? Let's connect on `,
    href: `https://www.linkedin.com/in/benjamin-d-johnson`,
    text: 'LinkedIn',
    textAfter: `, I'd love to chat.`
  },
  content: `Los Angeles native. Coffee drinker. Music lover. Functional programming enthusiast. Always learning new things, one mistake at a time.`
}

export const projects = [
  {
    url: 'https://test.com',
    title: 'horizon',
    images: {
      desktop: 'https://placehold.it/100x100?text=Desktop',
      mobile: 'https://placehold.it/100x100?text=Mobile'
    },
    background: COLORS.accent2,
    desc: `I could do the math myself to see how long I have till sunset, but that's not as fun as making an app to do it for me. Watch the sun move and the background adjust to reflect the time of day.`,
    tech: ['react', 'express', 'nodejs', 'scss', 'webpack']
  },
  {
    url: 'https://test.com',
    title: 'adze',
    images: {
      desktop: 'https://placehold.it/100x100?text=Desktop',
      mobile: 'https://placehold.it/100x100?text=Mobile'
    },
    background: COLORS.accent4,
    desc: `Adze is a headless CMS that offers a simpler content management style, making it perfect for static websites. No fluff, no themes, just your posts — the way you wrote them, the way you want them.`,
    tech: ['koa', 'nodejs', 'hyperapp', 'scss', 'webpack', 'mongodb']
  },
  {
    url: 'https://test.com',
    title: 'minutes',
    images: {
      desktop: 'https://placehold.it/100x100?text=Desktop',
      mobile: 'https://placehold.it/100x100?text=Mobile'
    },
    background: COLORS.accent3,
    desc: `Time management can be really hard sometimes. You start working on something, get caught up in what you're doing, and when you look up, you spent hours on what felt like minutes. Minutes helps you find out how long it took.`,
    tech: ['nodejs', 'express', 'jquery', 'less', 'webpack', 'mongodb']
  }
]
