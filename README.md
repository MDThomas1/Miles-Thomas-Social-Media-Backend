# Miles-Thomas-Social-Media-Backend
## Description
A set of back-end routes using mongoose to set up a social media platform with users and posts (locally called thoughts).

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Credits](#Credits)
* [License](#License)
* [Link to Video](#Link-to-Video)

## Installation
Since this application doesn't currently contain front-end information, the code will have to be downloaded and run through a program like Insomnia. Additionally, once you first download the code, you'll need to run the following command to download the necessary packages.
```bash
npm i
```

## Usage
Once you have the code downloaded to your device, all you have to do is open a command line linked to it and enter the following command.
```bash
node index.js
```

Once you've done this, you have access to five routes available to utilise with both users and thoughts. These are: 
* Viewing all users/thoughts present in the database
* View a singular user/thought from the database through its ID
* Creating a new user/thought (new thoughts are automatically added to an array of a user with the corresponding username)
* Updating an existing user/thought through its ID
* Deleting an existing user/thought through its ID

In addition, you can also use specialised routes to add and deletes friends in relation to users and comments (locally called reactions) in relation to thoughts. It should be noted that, since the routes use were made through mongoose, any routes requiring IDs have the ObjectID component provided so all you need to utilise a route with an ID is the unique string created through MongoDB. All routes are laid out in detail in the [video tutorial](#Link-to-Video) provided below.

## Credits
N/A

## License
N/A

## Link to Video
