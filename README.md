# API endpoint that returns the number of stars for a given Github repository

#### Requirements:

Build an API endpoint that:

Implements a GET request with a sensible path (for example, /github/repo_info)

Takes in a parameter of "repo_name" (or repoName, if you prefer)

This should be the organization/owner name, and then the repo name

Example: "facebook/react"

Queries the Github API for that repo name

Parses the response, and then returns (as JSON):

Repo name (same as passed in)

Repo Description

Number of stars

Return a 404 if the given repository is not found

Add tests

Extend it to take in (and return) an array of repos, or simply an owner/organization name, and return the above data for all of their repos.

>[Link to postman docs](https://documenter.getpostman.com/view/9775449/Uz5MFE8P)

## QUICK START INSTRUCTIONS

```
** run yarn to install dependences

** add a .env file and provide the details in the .env.example file.

** `yarn compile` to compile

** `yarn dev` to spin up the server.

** `yarn test` to run the required tests
```