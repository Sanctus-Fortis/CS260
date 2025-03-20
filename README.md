# Torchlight Publicity Page and Wiki

This web application will be a combination publicity page, wiki and build guide for the RPG coop dungeon crawler being developed by Addison and a small team under the WIP name Torchlight. THe idea is that the site will host information about the comany and publicity media for the game in addition to several useful tools for players of the game. This will include a wiki for the game that covers aspects of the game as well as a character planner / builder that lets users plan and theorize builds while out of game.

> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Often a video game hosts a lot of important information about the game in multiple places. This application will make it easy to host all the important information for the WIP game Torchlight including both media material, information about the company and game, a wiki and a built in character build application that lets players theorize and try things out even when not in game. This makes it easy to maintain and offers ways for players to engage with the game even when not actively playing.

### Design

![Design image](samplelayout.png)

The part of the site that is most complex will be the character build page. Users will be able to save builds to their accounts to easily access and edit builds as well as share them with others. The server will host a database containing several tables, including all the various character building options as well as a table that contains player builds associated with the player's account ID. When they log in their build names are pulled from the database to populate their page. Selecting a build will load a page with the full details of the build and allow for edits.

```mermaid
sequenceDiagram
    actor You
    actor Website
    You->>Website: Request page
    Website->>You: Build names
    You->>Website: Select Build
    Website->>You:Redirect to build page
```

### Key features

- A page hosting publicity and media content for the game
- An open wiki with in game information
- An interactive character build page

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Creation of pages and basic navigation.
- **CSS** - Style and consistency across multiple devices.
- **React** - Power the character building page.
- **Service** - Service allowing login, build retrieval, build saving and build sharing.
- **DB/Login** - Stores users, builds and build options in a database. 
- **WebSocket** - When a user chooses to they can share their build publicly or with specific users.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - I created and organized every page I need for the website to function.
- [X] **Proper HTML element usage** - I used good practice to create readable html documents.
- [X] **Links** - All pages have a nav bar at the top with links to other pages.
- [X] **Text** - Pages have necessary text
- [X] **3rd party API placeholder** - This is only mentioned in one place (rubric) without any information on what exactly is meant by this. I can use the Google API to allow sign in if that's what is meant.
- [X] **Images** - Index.html has an image. I may add more but it's hard to know what I will want until I'm working on the CSS.
- [X] **Login placeholder** - It's there. Not much to say.
- [X] **DB data placeholder** - Builds will be populated from database. Users and logins will also be stored.
- [X] **WebSocket placeholder** - Leaderboard will be populated via a websocket that updates from games played.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Header, footer, and main content body** - I did complete this part of the deliverable.
- [X] **Navigation elements** - I did complete this part of the deliverable.
- [X] **Responsive to window resizing** - I did complete this part of the deliverable.
- [X] **Application elements** - I did complete this part of the deliverable.
- [X] **Application text content** - I did complete this part of the deliverable.
- [X] **Application images** - I did complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - I did complete this part of the deliverable.
- [X] **Components** - I did complete this part of the deliverable.
- [X] **Router** - I did complete this part of the deliverable.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - I did complete this part of the deliverable.
- [X] **Hooks** - I did complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Node.js/Express HTTP service** - I did complete this part of the deliverable.
- [X] **Static middleware for frontend** - index.js
- [X] **Calls to third party endpoints** - Random fact on the login page grabbed via third party API
- [X] **Backend service endpoints** - in index.js but you already know that
- [X] **Frontend calls service endpoints** - app.jsx, register, login, builder

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **User registration** - register.jsx
- [X] **User login and logout** - login.jsx, logout.jsx
- [X] **Stores data in MongoDB** - I did complete this part of the deliverable.
- [X] **Stores credentials in MongoDB** - I did complete this part of the deliverable.
- [X] **Restricts functionality based on authentication** - builder restricts based on login

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
