# Today I Learned

Today I Learned is responsive React web application that was used to begin my React learning process. This app allows users to post random facts that they find interesting and want to share along with a trustworthy source. These facts are placed into categories that users can use to filter results from. Users are also allowed vote on fact posts and mark certain posts as `DISPUTED` if they believe the fact is false.

# Live Demo

<https://todayilearned-emmanuel.netlify.app>

# Built With
[![My Skills](https://skillicons.dev/icons?i=js,react,html,css,supabase,netlify)](https://skillicons.dev)


# Getting Started

### Installation

1. Clone the repo
2. Install all the NPM Packages
   ```
   npm install
   ```
3. Sign up for Supabase and make a new database called `facts`
4. Set up `facts` table with the following fields:
   - id
   - created_at
   - text
   - source
   - category
   - votesInteresting
   - votesMindblowing
   - votesFalse
5. Enter your unique API URL and KEY in `config.json`
6. Run Applicaiton
   ```
   npm start
   ```
7. Open browser at <http://localhost:3000>

# TODO

Features I would like to implement in the future:

- [x] Add a new React Component that renders an error message on the screen instead of logging it to the console.
  - [x] When users don't have all the required fields when sharing new fact
  - [x] Source url is not correctly formatted
  - [x] Error loading facts from database
  - [x] Error uploading facts to database
- [ ] Add ability to delete a fact from the database
- [x] Add date created to facts posts
- [ ] Add ability to sort facts list by date created
- [ ] Add ability to sort facts lists by specific votes
