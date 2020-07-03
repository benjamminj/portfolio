---
title: Audit all NPM dependencies in a project using this bash script
date: 2020-07-02
draft: false
tags:
  - bash
  - automation
  - npm
---

## Intro

It's no secret that the JavaScript ecosystem is built on the backbone of OSS. Need a fully-featured front-end framework with all the batteries included? Only an `npm install` away. Need to parse a URL query string? `npm install querystring`. Want some padding before the start of your string? `leftpad` to the rescue! Chances are, any substantially large project built in JavaScript will have _some_ OSS dependencies, if not _many_.

_Note: this isn't a post about when you should install an NPM package vs when you should write some custom code. That is certainly a long, nuanced discussion that merits its own post!_

However, when you start diving into the _legal_ aspects of OSS, you'll quickly find that there are _**a bunch of different open source licenses**_. MIT, Apache-2.0, GPL, MPL-2.0, WTFPL, the list can go on and on.

The differences between these licenses can be nuanced and difficult to understand. 😭 But as an engineer working with open source software, it's important that we know the implications of the license that we're using. But that's a different post altogether! 😅

Even if you're being diligent to only use licenses that you have permission to use, it's still likely that your company's legal team is going to want to check this at some point. And that makes sense, it's their job to check this type stuff and make sure that the company isn't headed towards legal problems from software licensing issues.

This exact situation has happened to me a few times now over the course of a project I've been working on for one of our clients. As a team lead, these types of requests often fall on my plate. The first time I went through every single repository for the project and started copying the licenses (`yarn licenses list`) into a document.

Talk about tedious. 😱

But then I had a thought.

Isn't this what writing code is for—getting computers to automate away all the boring, repetitive tasks, so that we can focus on more important things?

So here's my script for automating away this problem!

## Prerequisites to run this script

I know this script isn't bullet-proof—it's something I've been using in my personal development to solve a problem. As a result, it's somewhat tailored to my own workflow.

So before we get to the code, a couple disclaimers.

**This script is Zsh-specific.** I use Zsh along with the fantastic [git aliases](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet#git) that come built-in with Oh My Zsh. As a result some of the git operations (like `ggl` for `git pull origin` and `gco` for `git checkout`) might not work if you run this in regular ol' Bash.

_I might circle back around and update this to be completely Bash someday, but it's not really that high on my priority list. If you want to submit a PR to this article to update the snippet I'm more than happy to merge it!_

**This script is built assuming the following directory structure.** Since I'm currently working as a consultant and it's possible that we might have code for different clients on the same computer, I use the following directory structure on my work machine.

```
work
└─ client-a
│     └─  repo-1
│     └─  repo-2
└─ client-b
│     └─  repo-1
```

This snippet is built to run inside of the `client-a` repository, and would provide you with all the licenses used in both `repo-1` and `repo-2` as a single text file (`licenses.txt`).

## Enough already, show me the code!

Without further ado, here's the code:

```bash
# We go thru the directories and update the git branches in a SEPARATE
# loop so that we can easily see whether there were any issues with updating
# the master branch (for example, you have changed files on a branch that
# would be overwritten by merging master).
for d in */;
# $d is the directory name
do
  SEPARATOR="\n--------------------\n"
  echo "$SEPARATOR $d $SEPARATOR";
  # Putting this line in parentheses makes the terminal cd out of the
  # directory after all of the commands in the parentheses have exited.
  (cd $d && gco master && ggl);
done;

# Clean out the file if it was preexisting
rm licenses-2020-07-02.txt;
# Create a new blank file
touch licenses-2020-07-02.txt;

# Loop thru every directory in the folder containing all of the repos.
# This 2nd loop is where we are going to aggregate all of the licenses into
# the licenses file.
for d in */;
# $d is the directory name
do
  HEADING="\n-------------------------\n $d \n-------------------------\n";

  # Print out a header with the repo name,
  # append (>>) this to the licenses file.
  echo $HEADING >> licenses-2020-07-02.txt;

  # Go into the directory and print the licenses
  # append them to the licenses file as well.
  (cd $d && yarn licenses list) >> licenses-2020-07-02.txt;
  echo "✅ Audited licenses for '$d'."
done;
```

If this code was useful to you and helped you solve real-world problems, I'd love to hear about it! Feel free to reach out to me on my [Twitter](https://twitter.com/benjamminj) or connect with me on [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/) (reference this article so I know it's not spam!). Thanks for reading!
