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
This will use a different background, perhaps an image of a barracks interior or something similar. The idea is a darker image so that the UI for the builder stands out a bit more.

### Leaderboards
The original idea was that this would pull information from the game in real time as the websocket requirement but this may need to be reworked. I'll CSS the page up anyways.
I will probably be removing this page eventually in favor of some other websocket implementation. A chat feature that pairs with the builder so that people can workshop builds together might be cool. It would simplify the site as well which I can only see as a good thing in this case.