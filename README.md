# CSCE 315 - Project 3 Codebase

<p align="center">
    <img src="https://api.dineoncampus.com/files/images/a31426be-eca1-4a2d-b170-35bc0d2975f0.png" width=300>
</p>

This readme gives an overview of our project dependencies and explains how to run the project. It also provides some great external resources to use.

### **[Project Management (Jira)](https://mjanczak.atlassian.net/jira/software/projects/MJ/)**

# Table of Contents
1. [Dependencies](#dependencies)
2. [Building the Project](#building-the-project)
    1. [Locally](#testing-locally)
    2. [Production](#pushing-to-production)
3. [Project Requirements](#project-requirements)
4. [Workflow Guides](#workflow-guides)
5. [External Resources](#external-resources)
    1. [Backend](#backend-frameworks)
        1. [Node](#nodejs)
        2. [NextJS](#nextjs)
        3. [Prisma](#prisma)
        4. [Redux](#redux-state-management)
        5. [Passport](#passportjs)
    2. [Frontend](#frontend-frameworks)
        1. [React](#reactjs)
        2. [Bootstrap](#bootstrap-and-react-bootstrap)
    3. [Testing](#testing-and-linting)
        1. [Jest](#jest)
        2. [ESLint](#eslint)
    4. [Deployment](#deployment)
        1. [Heroku](#heroku)

# Dependencies
- `NextJS` for routing, api, and react integration
- `React` for UI implementation
- `React Bootstrap` to use bootstrap within react
- `Redux Toolkit` for state management within react
- `Prisma` for querying from PostgreSQL database
- `Passport` for authentication (local and google oauth)
- `Jest` for testing
- `ESLint` for linting

Possible dependencies for use in the future
- `SWR` (stale while revalidate) for managing view updates efficiently
- `dotenv` to load and use environment variables
- `bcrypt` to compute and compare password hashes


# Building the Project

## Testing Locally

Make sure you've created the prisma client by running the following command. This ensures that you can connect and query from the database. **YOU ONLY NEED TO DO THIS ONCE**:
```
npx prisma generate
```

Run the development server using the following command

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can edit pages by modifying them in the `pages` folder. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Pushing to production
todo

# Project Requirements
todo

# Workflow Guides
## Pull Requests
Before creating a pull request:
1. rebase your branch (resolve any conflicts locally)
2. make sure all tests are passing
3. commit any changes to the branch. 
After all of your changes have been committed, you can open a pull request on the Project GitHub page.

**Please follow the Pull Request template and tag your pull request with the correct tags.** Also make sure to add reviewers to your pull request. A breakdown of all of the tags can found [here](https://github.tamu.edu/EVANBURRIOLA12/Project2/labels)

## Commits
When you make commits make sure you aren't committing unecessary files. If you make new files but don't want to commit them (like test files) you can add them to the gitignore list. If you do this, make sure you commit the gitignore file changes before you commit changes to any other file.

If you're assigned an issue and you are making a commit that resolves that issue, put the issue number in the commit message. Here is an example:
```
git commit -m "UPDATE: resolved #13"
```
This references issue #13 and will automatically close the issue once the branch is merged with main. It also creates a link in the issue itself that links to your commit. **ONLY DO THIS ONCE YOU HAVE COMPLETELY RESOLVED AN ISSUE**

# External Resources

## Backend Frameworks
### NodeJS:
- [Installation](https://nodejs.org/en/)
- [Search for Packages](https://www.npmjs.com/)
- [Environment Variables](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)

### NextJS:
- [About](https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs)
- [Creating Pages](https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs)
- [Using CSS (Modules)](https://nextjs.org/learn/basics/assets-metadata-css/css-styling)
- [Embedding Images](https://nextjs.org/learn/basics/assets-metadata-css/assets)
- [API routes](https://nextjs.org/docs/api-routes/introduction)
- [Dynamic Pages & Data on Pages](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data)

### Prisma
- [Setup](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-node-postgres)
- [How does it work?](https://www.prisma.io/docs/concepts/overview/what-is-prisma#how-does-prisma-work)
- [Performing Queries](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
- [Docs](https://www.prisma.io/docs/concepts)

### Redux (State Management)
- [Basics](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- [What are actions?](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions)
- [What are reducers?](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#reducers)
- [What are stores?](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#store)
- [Using Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide#store-setup)

### PassportJS
- [Google OAuth](https://www.passportjs.org/packages/passport-google-oauth2/)

## Frontend Frameworks
### ReactJS
- [Basics](https://www.w3schools.com/REACT/react_getstarted.asp)
- [Designing React UIs](https://beta.reactjs.org/learn/thinking-in-react)
- [What is JSX?](https://reactjs.org/docs/introducing-jsx.html)
- [Functional Components vs Class Components](https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/)
- [Interactivity in React](https://beta.reactjs.org/learn/responding-to-events)
- [States in React](https://beta.reactjs.org/learn/managing-state)
- [Hooks and how they are used](https://www.w3schools.com/react/react_hooks.asp)

### Bootstrap and React Bootstrap
- [Bootstrap Basics](https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/)
- [Bootstrap Docs](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- [React Bootstrap Docs](https://react-bootstrap.github.io/components/alerts)

## Testing and Linting
### Jest
- todo

### ESLint
- todo

## Deployment
### Heroku
- todo
