---
title: How To Ship Multiple Versions of the Same NPM Package
draft: true
date: 2018-03-05
---

<!-- https://github.com/AutoGravity/autogravity-web-app/pull/1503 -->

Intro...
Something about dependencies?
Something about JS & breaking changes?

## The Problem

- Dependency migration is painful, especially if you're not on _the latest_ version of something.
- On a codebase of non-trivial size, dependencies that are widely used may take a long time to migrate, especially when there are breaking changes between versions.
- You don't want to stop shipping / halt on feature development. Rather, you want to migrate your codebase in isolated, digestable portions rather than stopping everything to do this migration.

## How To

### 1. Install Your "Legacy" Dependencies Alongside Your "New" Dependencies

If you're gonna ship two versions, first they have to both be installed.
Typically npm doesn't make it easy to install multiple versions of the same package, but we found another package on npm called `npm-install-version` (`niv` for short) that was made for this exact purpose.

So let's install `niv`

```bash
npm i -D npm-install-version
```

It will install itself as `niv` from the command line. And then we can run the `niv` script to install a custom version to _any name we want!_

```json
{
  // inside "scripts"
  "install-legacy": "niv redux-form@5.3.6 --desination redux-form-legacy"
}
```

We placed the script inside of a `postinstall` hook to make the process seamless for everyone (and so that the legacy dependencies would install seamlessly in automated CI environments as well)

```json
{
  // inside "scripts"
  "postinstall": "npm run install-legacy"
}
```

Lastly, let's install the latest version of redux-form (7 at the time of writing)

```bash
npm i redux-form
```

Boom. Now installing redux-forms 7 & 5 is as simple as `npm install`

### 2. Make sure your old & new dependencies play nice in the sandbox

<!-- pic of kids in sandbox? -->

In many cases your dependencies will likely play nice with each other. You might be free at this point to simply update your old imports, ship some code, & move on with your life.

In our case with `redux-form` it wasn't so simple. Since both packages are manipulating the redux store we had to separate the keys in our redux store that they controlled. This way they're not both stomping over the `form` key.

Fortunately `redux-form` provides a way to do this (in both versions!).

Here's an example of integrating both forms into the reducer

```javascript
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form' // the new version
import { reducer as formReducerLegacy } from 'redux-form-legacy' // the old version
import normalizers from '../path/to/legacy/normalizers'

const reducers = {
  // other reducers
  form: formReducer,
  formLegacy: reducer.normalize(normalizers)
}

const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

In addition, any components using the legacy redux form needed to be updated in regards to _which version they relied on_. Basically, we just need to update import paths & point the `reduxForm` higher-order-component to our legacy redux store. By default this HOC points to the `form` key of the redux store, so we just need to redirect it to `formLegacy`.

```javascript
// MyFancyOldForm.js

import { reduxForm } from 'redux-form-legacy' // make sure you're importing the right version!
import React from 'react'

@reduxForm({
  form: 'sampleForm',
  formMountPoint: 'formLegacy' // look Ma, it just works!!!
  // rest of form setup here
})
export default class MyFancyOldForm extends React.Component {
  // component code
}
```

## TradeOffs & Considerations

- This is definitely a case of "technical debt", where you are making severe tradeoffs in favor of shipping quickly. It's not a "best-case" scenario, but rather a pragmatic approach to dependency migrations. This is something that will eventually have to be cleaned up once the migration of versions is complete
- This will provide a performance hit in regards to load time & bundle size. The effects of an increased bundle size are a factor that needs to be carefully weighed before choosing this path. If the dependency is large enough, the time lost on load time may be reason enough to not take this route, instead opting for the more painful migration path of doing it all at once. However, performance effects can potentially be mitigated with thingslike lazy-loading / code-splitting, especially if you don't use your dependency on the entry points to your app.
- If you're primarily a Yarn user (I'm not, but I have to admit this is super cool), this functionality is baked into the package manager

```bash
yarn add redux-form@latest # latest version
yarn add redux-form-legacy@npm:redux-from@5.6.2 # legacy version, this automatically does the alias for you
```