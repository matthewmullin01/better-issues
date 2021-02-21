# Better Issues | Github Issues Viewer

Better Issues taps into the Github API to provide a nice UI for you to view any issues in your various repositories.

Live Demo - https://better-issues.web.app/

![ScreenShot](https://i.imgur.com/6Ry8fko.png)

## Stack

1. React
2. ChakraUI
2. React Context API
3. GitHub API
3. Firebase (Auth and Hosting)
## Getting Started

1. Install dependencies with `yarn` or `npm install`
2. Start local server with `yarn start` or `npm start`
3. Check the terminal for the port (usually http://localhost:3000/)

## Running Test Suite

`yarn test` - Launches the test runner in the interactive watch mode.

## Future Improvements

### Technical Improvements

#### Custom Server
Currently Better Issues is using the Firebase stack. This is great to get started with due to the simplicity and scalability. For example the auth session is completely managed by Firebase. We only have to store the GitHub oAuth token for the user after logging in.

If we would want more flexibility (manage sessions ourselves, simpler backend <-> frontend functionality) we should consider running a server alongside the frontend that manages this. It will handle authentication and session management, and also it could handle the external API calls to GitHub and reformat the response to better suit the UI.

#### Server Rendering
To improve performance and help our SEO we could look into server side rendering using something like Next.js.

#### Import/Export Grouping
Where it makes sense we could add `index.ts` files to certain folders to group shared imports into a single file. This will clean up the large number of imports we have at the top of most files.

#### Extract more components to a shared UI lib or folder
Eg - The headers, the issue supplementary info, etc

### UI/UX Improvements

#### Animate the IssueDetails expanding into view.
#### Add ordering, and filtering to the various lists (repos, issues)
#### Add search to the to the various lists (repos, issues)
#### General Animation and Transition Timings
Currently some animations are a bit janky due to there not being sufficient fade times. General navigation could also be imoroved by reducing sudden changes in the interface and layouts.


