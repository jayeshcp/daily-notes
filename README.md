# Notes App

[![Maintainability](https://api.codeclimate.com/v1/badges/e4052af8762eb425821a/maintainability)](https://codeclimate.com/github/jayeshcp/daily-notes/maintainability)

## Wireframe Design

https://imgur.com/a/m5wDNnc

## How to deploy to [Vercel](https://vercel.com/)

From terminal, run: 

```shell
npm run build
vercel
```

Enter your credentials for vercel login.

Follow the prompts to deploy your project to vercel.


## Change Log:

25 March 2020:

- Converted project to use TypeScript
- Moved code into GitHub repo
- Setup auto deploy on commit to `master` branch to https://daily-notes.surge.sh
- Added surge deployment status badge in this README.md file

9 June 2019:

- Refactored reducers code and moved reducers to separate folder
- Refactored localStorage use with state

31 Aug 2018:

- Added react-intl plural
  13 June 2018:
- Added markdown support using https://github.com/rexxars/react-markdown package

08 June 2018:

- Added 'Show More' button for the notes list and only 10 entries show on first page load. Clicking on this button increments page size by 10.
