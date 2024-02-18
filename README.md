# www.benjaminjohnson.me

Welcome to the source code for my personal corner of the internet!

## bUt bEn...tHiS iS oVeReNgInEeReD!

I don't care. Yeah, you don't _need_ all this for a blog website. But this is my corner of the internet, so I'm gonna use tools that ✨ spark joy ✨

Right now that's [Next.js](https://nextjs.org/) and [Tailwind](https://tailwindcss.com/). I actually find that both tools _scale down_ nicely as well as up, and I make sure I'm staying on top of what's fresh in frontend.

## Contributing

Feel free to open a PR to edit the posts! I'm happy to merge PRs for broken code, typos, and other changes.

## Running the project

### 1. Install the dependencies.

```bash
$ pnpm install
```

<!-- TODO: is this needed anymore?? -->

### 2. Add a `.env.local` file wit environment variables.

Add an `.env` file with the following variables:

```bash
# REQUIRED
# This variable allows creation of absolute links. It should reference the _root_ URL
# of the site—if you're running locally it'll be `localhost:PORT` as shown below, in
# the deployed environment it will be your domain name.
VERCEL_URL="http://localhost:3000"

# OPTIONAL
# This allows overriding the `VERCEL_URL` so that metadata and absolute URLs can
# be populated with a custom domain.
URL="https://benjaminjohnson.me"


# OPTIONAL
# Root URL of the application under test. This can be used in CI to test against
# any environment, whether it's local, prod, or a preview application.
TEST_BASE_URL="http://localhost:3000"
```

### 3. Run the development server

```bash
$ pnpm dev
```

## Running the tests

Right now I've got a small suite of [`playwright`](https://playwright.dev) tests to make sure that my website loads on a few key browsers and that nothing crazy is missing. 🙃

To run the `playwright` tests you'll need to add the following variables to your `.env` file.

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

That said, you're free to copy the _code_ and _code snippets_ from this blog verbatim. That's the whole point of sharing what I've learned in the public sphere. But if you want to copy the _post content_ verbatim, provide an attribution or a link back to the original post.

## Some of the technologies used on this website

Right now, here's a couple of the technologies that I'm into and exploring with this website.

- [SvelteKiut](https://kit.svelte.dev/)
- [Tailwind](https://tailwindcss.com/). See [this writeup](https://benjaminjohnson.me/how-tailwindcss-converted-me) for why.

Since this is a relatively simple website, I've tried to keep the usage of libraries low—most of the libraries in this website have to do with markdown parsing and the static generation.

## Thank you!

Thanks for taking the time to read my blog, contribute to it, and browse the source code. I'm happy to be a part of the tech community and it's people like you that make me happy to share my journey in public.
