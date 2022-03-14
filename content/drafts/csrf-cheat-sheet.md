---
title: CSRF (Cheat Sheet)
date: 2022-02-21
tags:
  - security
  - http
---

- What is CSRF?
  - CSRF stands for Cross Site Request Forgery
  - This type of attack uses the cookies in a user's browser to make requests to an authenticated site that the user didn't intend to make.
- Example / Diagram

  - User is currently logged into site (for example their bank)
  - The target site stores a _cookie_ in the user's browser to track authentication state. Whenever the user visits the target site and performs actions (for example, a money transfer), the browser sends that cookie along with the HTTP request. The _server_ then uses that cookie to determine that the user is authenticated.

- How to protect against CSRF
  - CSRF token (best)
  - Same-Site cookies
  - Disable CORS
