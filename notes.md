# Notes For Website Creation
And thus I said unto myself; "This is the place. I shall keep all the knowledge of html, css and javascript here upon mine Github. And nations will flock unto it and drink of the well of web programming."

## HTML
For the html files I started by plotting out the structure of the site. I had some issues with how I would fill the websocket requirement but I have narrowed it does to two options, either display a live feed of saved builds in the character builder application, or display a live feed of some kind of in game data. I want to preserve the privacy of players so displaying any identifiable Steam information would not be ideal. There should be a simple way around this and I am leaning towards this option.

### 404 Page
I started with the 404 page and created a simple message with a link back to index.html. 

### index.html
Contains a simple explanation of what the site is for as well as links. All other pages will have the same set of links so you can get anywhere from anywhere, though if you are not signed in then the builder page will redirect to login.

### informational pages
The about and media kit pages are very barebones right now, but will get filled out. This has to do with a seperate personal project (the actual game) I plan to use this site for long term and thus these pages will probably not have full information during this semester. For the purposes of this class I consider them complete html-wise.

### important lessons
I had to relearn how to structure an html file. That means relearning what <body> <nav> <main> and <footer> are for as well as how to render tables in html. I hadn't realized how rusty I am.

## CSS
I first tried to determine the feel I want. I made the image from the home page a background on all non application pages and gave the navbar some style. The login and register forms got moved into boxes and cleaned up as well.

### Character Builder
This will use a different background eventually, perhaps an image of a barracks interior or something similar. The idea is a darker image so that the UI for the builder stands out a bit more. However the kind of image I want is proving incredibly hard to find or even generate with AI. candles abound and I need darkness.

### Leaderboards
The original idea was that this would pull information from the game in real time as the websocket requirement but this may need to be reworked. I'll CSS the page up anyways.
I will probably be removing this page eventually in favor of some other websocket implementation. A chat feature that pairs with the builder so that people can workshop builds together might be cool. It would simplify the site as well which I can only see as a good thing in this case.

## React Phase 1
There were some changed to the structure of the site this time. Home has been removed and the new landing page is the about section. I had a lot of pages and the home page was rather vestigial.

### Challenges
The Simon practice set me up really well for porting my server over and I didn't have any serious issues. There was some trouble with implementing the new nav which resulted in the removal of the home page.

## React Service / DB
Because my application relies heavily on database functionality to work I'm doing this and the db part of the project at the same time. It just wouldn't make sense otherwise.

The application is an rpg character building tool that lets you select your class, race, ability scores, and proficiencies and calculate damage values as well as damage and mana modifiers. Races, classes, abilities, proficiencies, weapons, and armor are stored in the database in their own tables. Each entry has associated information needed for that weapons calculations meaning that adding a new weapon is as simple as adding an entry to the database for that weapon.

### Notable Changes
- Login and Registration work now
- The Builder page is fully functional and you can play with it to your heart's content.
- Session tokens are stored in local storage. This is insecure but I'm not messing with it until I get going on the next phase.
- As of now the leaderboard page is still there but I will probably scrap it by the next phase.

### What's next
For the WebSocket phase I'm planning to add a chatbox to the build app that lets people communicate about builds. Users will of course have to be signed in since they can't access the build tool without being signed in anyways.

### Challenges
Oh my did I have challenges. Because I skipped ahead (assuming prior knowledge from other web dev classes would be enough) I missed some of the instruction and information that I needed. I met with the professor after my first big roadblock and we were able to get the project sorted out. I'm reading ahead now so I don't make the same mistake again.