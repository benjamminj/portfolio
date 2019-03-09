---
title: "Learning a New Codebase: The Good, The Bad, and The Ugly"
description: If getting up to speed with a codebase of thousands and thousands of lines sounds intimidating, remember that it is a long process that greatly pays off.
date: 2017-08-28
---

At one point or another — whether you’re a seasoned pro or just getting started — you’re going to have to learn a new codebase. It’s always easier to know the code inside and out when you’ve crafted every line yourself, but what about when you’re hopping into a new project, potentially with thousands of lines? You want to get up to speed quickly and start providing real contributions, but how can you do that if you don’t understand how the application works?

I’ll be honest, I’m no seasoned veteran, but I have had to grok a couple large codebases in the past year that I’ve spent on this programming journey. To top it off, I just started a new job with a few new codebases, so this is all fresh in my head.

## 1. Read, Read, Read
The fact is simple: to understand what the code in your codebase is doing, you are going to have to read it.

Read everything — unit tests, documentation, and the code itself. Read it slowly, line by line, and figure out what it’s doing. Read as much of it as you can, as often as you can.

Just by reading the code, you’ll automatically start to see a few things—styling, naming conventions, organizational structures, etc. Pretty soon you’ll also have a much better understanding of what the code actually does, making it way easier for you to make changes. But more on that later.

Oftentimes, codebases are extremely large—over a few thousand lines—and you simply won’t have the luxury of sitting down to read the whole codebase from start to finish. I’ve only been able to do this on one occasion, but the application was about 300 lines of code.

Instead of trying to sit down for a full reading, choose a starting place (usually whatever you’re working on at the moment) and figure out how it works internally. Then follow that single module through the rest of the application, seeing where and how it is used. If the codebase is broken up into understandable chunks, understanding how a single module works will greatly increase you knowledge of the whole application.

## 2. Ask questions
However, simply reading code isn’t enough. Ultimately, you have to understand the code, and sometimes this mean asking questions.

Ask yourself questions when you’re reading. Many times, you can find the answers to your questions by either reading more or doing a little online research. If after that you don’t understand something, don’t be afraid to ask the engineers that wrote it.

Ideally many questions will be answered in the code’s documentation, but sometimes this isn’t the case. When there isn’t documentation or comments to explain unclear code, you will have to either find the answers yourself or simply ask for them.

## 3. Don’t be afraid to make changes.
One of the best ways to find out stuff works is to break things. You make a change, perhaps a new feature, perhaps refactoring some code, and you break the application, or now all of the tests are failing. That’s good — now you have a better understanding of how that section of code works.

This strategy only works to some degree. Obviously you can’t just break things or make changes at random, simply hoping that they’ll work. However, if your team has a peer review system of CI/unit tests, you can make changes confidently, knowing that when you break stuff it will never make it to production code.

Life is too short to be paralyzed by fear of breaking things. Rather than being afraid of error messages, understand that each time you break something is an chance to learn something new about how the codebase works. Once you’ve fixed it (even if that’s just rolling back your changes), finding our why/how you broke the application is crucial to understanding how that specific part of the code interacts with the entire codebase.

## Conclusion
If getting up to speed with a codebase of thousands and thousands of lines sounds intimidating to you, just remember that it is a long process with great payoff.

To some degree, it’s a process that you never complete, since the codebase changes rapidly as you and your team work on it. There will always be new code written by other developers that you need to read and understand. That’s part of the thrill of working in software development — the codebase is a living, changing organism, and you are always learning new things about it.