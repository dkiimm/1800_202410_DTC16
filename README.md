# Project Title

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ... 

## 2. Names of Contributors
List team members and/or short bio's here... 
* My name is João, which english speakers struggle to pronounce, so you can call me "Jao"
* Myung Kyu (Daniel) Kim. I am excited to start this project.

	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)s
* Firebase 8.0 (BAAS - Backend as a Service)
* Google Fonts
* Google Icons
* JQuery

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Simply sign up and explore the app. When you get logged in, you will be directed to the main events page, where you can see all the events happening near you. 
Find an event that interests you? Click on the event and join! If you want to create an event, go to the create page and create your event. You can also add other users as friends by clicking on their username and adding them as a friend. Hope you enjoy our app!
* ...
* ...

## 5. Known Bugs and Limitations
Here are some known bugs:
* Even if an event is from the past, it is still visible to other users until the host deletes the event. 
* When creating an event, users can select a date from the past.
* 

## 6. Features for Future
What we'd like to build in the future:
* We would like to have a map feature. Currently, users can view the events in a list format. We would like to have a map feature where you can see the events on a map.
* Although we do have filters on our front end, they do not work. We would like to make it so that users can search and filter events to find what they're looking for. 
* We would like to implement a friend request feature where instead of adding a person as a friend, a user needs to send a request and be approved before becoming friends.
* We would like to add a feature where users can add their own sports when creating an event if their desired sport is not in the dropdown menu.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── login.html               # login html file. This is what the user sees when they click log in from the index.html file
└── main.html                # main page HTML file. This is page when the user logs into our app
└── create.html              # This is what the user sees when they want to create an event
└── event.html               # This is what the user sees when they click on an event card to see more details about a specific event
└── friends.html             # This is where the user can see who their friends are
└── profile.html             # This is the page that displays the user's hosted events
└── README.md


It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /soccer.png              # source: freepik.com
├── scripts                  # Folder for scripts
    /authentication.js       # js file for login page and user authentication
    /create.js               # js file for create.html. Responsible for retreiving user input from form and sending it to Firebase
    /event.js                # js file for event.html. 
    /filters.js              # js file for filters.html. Does not currently function.
    /firebaseAPI_TEAMDTC16.js# js file for Firebase API key
    /friends.js              # js file for friends.html. Responsible for displaying friends card
    /main.js                 # js file for main.html. Responsible for fetching data from Firebase and dynamically uploading event card
    /profile.js              # js file for profile.js Responsible for fetching data from Firebase for events user created and displaying those events
    /script.js               # js file responsible for logging a user out
    /skeleton.js             # js file responsible for displaying footer
├── styles                   # Folder for styles
    /style.css               # css file that provides the standard design for our app
└── text                     # Folder for templates
    /eventCard.html          # Template for event cards
    /filters.html            # Template for filters
    /footer.html             # Template for footer
```


