# Music Streaming App
This is a music streaming platform created as a final project for CS4550 at Northeastern University.

## Table of Contents

- [Configuration](#setup)
- [Roles](#roles)
  - [Listener ](#listener)
  - [Artist](#artist)
  - [Artist Pro](#artist-pro)
- [Example Roles](#example-roles)
  - [alice/alice](#alicealice)
  - [bob/bob](#bobbob)
  - [charlie/charlie](#charliecharlie)
  - [admin/admin](#adminadmin)
- [Use Cases](#use-cases)
  - [Follow Artist](#follow-artist)
  - [Search by Song Title](#search-by-song-title)
  - [Navigate to Song](#navigate-to-song)
  - [View Liked Songs](#view-liked-songs)
  - [View Song Stream](#view-song-stream)
  - [Like a Song](#like-a-song)
  - [Add Song to Playlist](#add-song-to-playlist)
  - [Admin Create](#admin-create)
  - [Admin Read](#admin-read)
  - [Admin Update](#admin-update)
  - [Admin Delete](#admin-delete)
- [Design](#design)
  - [Class Diagram](#class-diagram)
  - [Sequence Diagram](#sequence-diagram)
- [External API Twitter](#external-api-twitter)

## Configuration
Start the Client on http://localhost:3000
```
cd final-project
npm install
npm start
```
Start the Server on http://localhost:4000
```
cd server
npm install
npm start
```

# Roles

Aside from annonymous and administrator roles, there are 3 main roles for the users: Listener, Artist, and Artist Pro. 

### Listener

A listener can follow like, repost, and share songs. A listener can also follow artists and view artist profile pages. A listener is the most basic form of user on the website - they are not able to upload music, but they can edit their profile and view their liked tracks.

### Artist

An artist can perform all the actions a listener can. In addition, they have the ability to upload songs. An artist is restricted to only the basic features of uploading, editing, and deleting songs.

### Artist Pro

Artist pro has access to an advanced features than an artist or listener. This includes editing their display name and adding credits to their songs. Artist pro usernames are rendered with a special star next to them to indicate their pro status.

# Example Users

These are examples of users in our project database. They can be logged in as:

username/password

### alice/alice

Alice is a Listener. As a listener, you have the ability to interact with the songs in your stream. You can follow other users by clicking on their tracks or profiles. You can also like or share tracks. You can navigate to your profile by clicking no the navigation pane at the top of your page. Here, you can edit your basic profile information, such as your password.

### bob/bob

Bob is an Artist. When logged in as an artist, you can perform all the basic functions of a listener such as liking and sharing tracks. Ina addition, an artist has the ability to create songs by clicking the upload button on the main navigation bar. This takes you to a page where you can edit the song information and publish it to the app.

### charlie/charlie

When using the app as an artist pro, you have access to a additional features when you edit songs and your profile. If you navigate to your profile, you can change your display name to be something other than your username. When you are editing songs, you can add artist credits to your songs.

### admin/admin

When logged in as the administrator, you have the ability to create, read, update, and delete users. Instead of a profile, the administrator has access to a special panel where all the platform users are rendered. You can then click on any user to edit their information, or remove them from the app.

# Use Cases

### Follow Artist

Use Case 1: Logged in as alice (Listener). Click on a song artist. In their profile, click "follow". You have now followed this artist. Following an artist is a user-to-user use case. 

### Search by Song Title

Use Case 2: You can search for domain objects by typing into the search bar. You do not have to be logged in. Type "Better With You" into the search bar and view the results. You should see the song result below.

### Navigate to Song

Use Case 3: Clicking on a song title in the stream or in search results will bring you to the song's page. This is an example of navigation to a domain object

### View Liked Songs

Use Case 4: Logged in as alice (Listener). Go to your profile by clicking the top right "profile" button, or navigate to /profile. Click "likes" to view liked songs. Your songs tracks will be displayed as a list.

### View Song Stream

Use Case 5: As any user, navigate to the home page by clicking on the logo on the top left of the page. This will render your stream of songs from other users.

### Like a Song

Use Case 6: Logged in as alice (Listener). Find a song on your stream and click the heart. This will add the song to your liked tracks. Liked tracks are viewable on the /profile page

### Add Song to Playlist

Use Case 7: 

### Admin Create

Use Case 8: Logged in as admin. Navigate to /admin. This will render a list of all the users in the database. At the top of the page, there are forms that allow you to enter the details for a new user. Once the details are filled out, click "create" to add a new user to the database.

### Admin Read

Use Case 9: Logged in as admin. Navigate to /admin. This page will read all the users in the database and render them into a viewable list.

### Admin Update

Use Case 10: Logged in as admin. Navigate to /admin. In the list of users, click the "edit" button. This will allow you to enter new data for a user. Press "save" when completed, and the user will be updated in the database.

### Admin Delete

Use Case 11: Logged in as admin. Navigate to /admin. Next to each rendered user, there will be a button labeled "delete". Use this button to delete the user from the database.

# Design

### Class Diagram
![Class Diagram](https://i.imgur.com/17evE8q.png) 

### Sequence Diagram
![Sequence Diagram](https://i.imgur.com/FFmd0pE.png)

# External API Twitter

We used Twitter as an external API. Twitter allows users to tweet their favorite tracks.
