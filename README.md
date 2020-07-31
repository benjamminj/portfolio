# www.benjaminjohnson.me

Welcome to the source code for my personal corner of the internet!

## The purpose of this website

First and foremost—my website is for me! If the things on my website aren't bringing enjoyment to me, then I'm likely to change them. I built this site using NextJS because _I like working with NextJS_. Is NextJS a "heavy-handed" tool for a site of this size? Perhaps. But is it _fun_ to work in? Absolutely. Not to mention that I'm doing a lot of my day-in, day-out using NextJS so I like to have another codebase to hone my chops on. And it's nice to have my own little corner of the Internet that's primarily _for me_.

Secondly, this website is a place for me to log my journey and keep track of the things I'm learning. I think of this website as more of a "digital garden" than I do of it as a polished, money-making blog. Perhaps one day I'll monetize the website and shift gears, but for now, my focus is on making it an enjoyable _writing_ experience as well as easy for me to look back on the things I've learned.

## Contributing

Feel free to open a PR to edit the posts! I'm happy to merge PRs for broken code, typos, and other changes. I like the idea of having this blog's source out in the open where people can collaboratively edit when they find something wrong in what I've written.

## Running the project

### 1. Install the dependencies.

```bash
$ yarn
```

### 2. Add a `.env.local` file wit environment variables.

You'll need a `.env.local` file with the following variables in order to run the application.

```bash
# REQUIRED
# This variable allows creation of absolute links. It should reference the _root_ URL
# of the site—if you're running locally it'll be `localhost:PORT` as shown below, in
# the deployed environment it will be your domain name.
VERCEL_URL="http://localhost:3000"

# OPTIONAL
# Track pageviews on google analytics. Having this locally won't track real pageviews
# since the tracker is scoped to the hosted domain.
NEXT_PUBLIC_GA_TRACKING_ID="TRACKER_ID"

# OPTIONAL
# Run a bundle analyzer on the build and open a report of all the built bundles.
# Will create 2 reports—one for the client-side bundles (`client.html`) and another
# for the server-side bundles (`server.html`)
ANALYZE="true"
```

### 3. Run the development server

This should spin up a development server with hot reloading, live builds of pages, etc.

```bash
$ yarn dev
```

## Running the tests

Right now I've got a small suite of [`playwright`](https://playwright.dev) tests to make sure that my website loads on a few key browsers and that nothing crazy is missing. 🙃

To run the `playwright` tests you'll need to add the following variables to your `.env.local` file.

```bash
# REQUIRED
# Base url from which to load web pages.
# Should correspond to the deployment url of whichever application is being tested.
TEST_BASE_URL="http://localhost:3000"

# OPTIONAL
# Whether to launch a headful or headless browser for end-to-end tests.
# DEFAULT: "true"
TEST_HEADLESS_BROWSER="true"

# OPTIONAL
# Puts the e2e test runner into "debug" mode
# DEFAULT: "false"
# Note that this will override the behavior in "TEST_HEADLESS_BROWSER"
TEST_DEBUG_MODE="false"

# OPTIONAL
# Which browsers to run end-to-end tests in.
# DEFAULT: "chromium,firefox,webkit"
TEST_BROWSERS='chromium'
```

Once you've got the environment variables added, you can run the end-to-end tests with `npm test` or `yarn test`.

## Copyright & Theft

My content is all out here in the open—if you plan on stealing it and reposting somewhere, I know this little paragraph at the bottom of my `README` isn't going to stop you.

That said, my approach toward my content on this blog goes something like this: feel free to copy the _code_ and _code snippets_ from this blog verbatim. That's the whole point of sharing what I've learned in the public sphere. But if you want to copy the _post content_ verbatim, provide an attribution or a link back to the original post.

## Some of the technologies used on this website

Right now, here's a couple of the technologies that I'm into and exploring with this website.

- [NextJS](https://nextjs.org/docs). Additionally, I'm working mainly with the static site generation tools released in v9.3+
- [CSS-in-JS](https://emotion.sh/docs/introduction). Specifically Emotion. I like the fluidity that comes from being able to style things directly in the JSX.
- [MDX](https://mdxjs.com/). I hadn't previously published any MDX posts before moving my website to NextJS. But now that it's MDX-compatible, I'm excited to explore the fluidity and enhanced experience that this could offer in my writing.

Since this is a relatively simple website, I've tried to keep the usage of libraries low—most of the libraries in this website have to do with markdown parsing and the static generation.

## Thank you!

Thanks for taking the time to read my blog, contribute to it, and browse the source code. I'm happy to be a part of the tech community and it's people like you that make me happy to share my journey on this website.
