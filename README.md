# FaithTech Insights Dashboard Prototype

Insights dashboard prototype for FaithTech Create

![MIT License](https://badgen.net/badge/license/MIT/blue)
![Discern](https://badgen.net/badge/stage/discern/gray)

<!--
Other 4D cycle badges
![Discover](https://badgen.net/badge/stage/discover/orange)
![Discern](https://badgen.net/badge/stage/discern/gray)
![Develop](https://badgen.net/badge/stage/develop/blue)
![Demonstrate](https://badgen.net/badge/stage/demonstrate/green)
-->

Tech stack:

- Server: [NestJS](https://nestjs.com/)
- Client: [Vite + React + TypeScript](https://vitejs.dev/)
- Database: PostgreSQL

## 📋 Requirements

[Node.js](https://nodejs.org/en/) 18.0+ or 20.0+ 

## 🚀 Getting Started

These are the instructions for setting up a local development environment.

### Installation

Clone this repository

Set up your server environment variables:

1. Go to the `server` directory under the root of this project.
1. Copy `.env.template` to `.env`
1. Set GITHUB_TOKEN to a GitHub Personal Access Token you create with the following permissions:
   - `repo`, `admin:org/read:org,` `read:project`, `read:discussion`

Install the server:
```bash
$ cd <PROJECT-ROOT>/server
$ npm install
```

Install the client:
```bash
$ cd <PROJECT-ROOT>/client
$ npm install
```

### Running the app

Start up the database

```bash
$ docker-compose up -d
```

Start the server

```bash
$ cd <PROJECT-ROOT>/server
$ npm run start:dev
```

Start the client

```bash
$ cd <PROJECT-ROOT>/client
$ npm run dev
```

**Note:** The prototype hardcodes GitHub organizations to fetch insights from. You can customize this for your own testing to match orgs you own. The orgs are hardcoded in `server/src/github/github.controller.ts`.

## 🗓️ How to Participate

- We chat async on FaithTech Slack | [#prj-our-project][slack]
- We meet online every Friday at 2PM ET | [conference link][online-meeting]
- We meet in-person every third Thursday of the month | [events calendar][inperson-meeting]

[online-meeting]: https://us02web.zoom.us/j/89709636052?pwd=ZmlHWjlUY2pPOFVYK3c2VGtOZHFjQT09
[inperson-meeting]: https://faithtechhub.slack.com/archives/C06QZ6T7VUJ
[slack]: https://faithtechhub.slack.com/archives/C06QZ6T7VUJ

## 👏 How to Contribute

Details on how to get involved with the project.

### [Code of Conduct][code]

We have adopted a Code of Conduct that we expect project participants to adhere to.
Please read the [full text][code] so that you can understand what actions will and will not be tolerated.

[code]: https://github.com/FaithTechInternal/.github/blob/main/CODE_OF_CONDUCT.md

### Contributing Guide

Here are the steps to contribute to this project.

1. Create a fork of this repo.
1. Clone your private fork locally.
1. Follow the steps to set up a local development environment for this project.
1. Create a local branch.
1. Make your changes in your local branch.
1. Test your changes.
1. Push your changes to your fork.
1. Make a pull request so your changes can be reviewed.
1. Make any review changes and if accepted, your code will be merged by a repo admin.

## 📄 License

Project is MIT licensed, as found in the [LICENSE][license] file.

[license]: ./LICENSE
