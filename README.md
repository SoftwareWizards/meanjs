
                 LINK TO DEPLOYED PAGE	  		 	    

The My-Ladder app can be found via Heroku at [http://my-ladder.herokuapp.com/]
							
            Credited People and Organizations 		    

We would like to thank:

- MIT [The MIT License](LICENSE.md)
- The Mean JS Org for the MEAN boilerplate,
- Twitter for Bootstrap and Bower.
	
	  Features implemented            		    
													
- Unregistered users can sign up

<a href="url"><img src="http://seanboisselle.com/files/Signin.png" align="left" width="300"></a>

- Users can log in and out

![Sign-in page](http://seanboisselle.com/files/Signin.png "Sign-in Page Screenshot")

![Sign-out functionality](http://seanboisselle.com/files/Signout.png "Sign-out functionality Screenshot")

- Users can update profile information including passwords

![Edit Profile functionality](http://seanboisselle.com/files/EditProfile.png "Edit Profile")

- Access limited by user type (builders/climbers can only access certain pages)

- Builders can create tasks

![Create Task functionality](http://seanboisselle.com/files/CreateTask.png "Create Task Functionality")

- Climbers can view the list of tasks

![List Task functionality](http://seanboisselle.com/files/TaskList.png "List Task Functionality")

- App adjusts to different size windows

Small:
![Responsive-small functionality](http://seanboisselle.com/files/ResponsiveSmall.png "Responsive Large")

Large:
![Responsive-large functionality](http://seanboisselle.com/files/ResponsiveLarge.png "Responsive Large")

- Paypal API was included so the money submitted by the climber can easily be tranferred to builder once task is complete.

![Payments functionality](http://seanboisselle.com/files/PayPal.png "Pay Pal API")

Landing Page:

![Landing Page](http://seanboisselle.com/files/landing.png "Landing Page Screenshot")

														
            How to run the project locally			    
													

First, make sure you have Node and NPM installed. You will also
want to install Grunt. You can find how to do this at the following links:

https://www.npmjs.com/get-npm
https://gruntjs.com/getting-started

Next, clone this repository (https://github.com/SoftwareWizards/meanjs) make sure it is on branch Backup.

Then navigate to it on your local machine.

Open up the Terminal if you are on Mac or the Command Prompt if you are on Windows.

Type in node server.js

Then, open up the browser of your choice and type in localhost:3000

Hit enter and your app should be running locally!
														
   	 How to update database and server connections      														
The My-Ladder project has used MLab for the underlying database technology.

From the root folder, navigate to server -> config -> config.js

In this file, you will find a code snippet in which you should put your database and server information in
the following form:

module.exports = {
  db: {
    uri: 'mongodb://<database username>:<database password>@<Mlab Specifier>',
  },
  port: 3000
};

The MLab Specifier can be found by logging on to your MLab account and clicking on your database.
On the top of the page, instructions for connection to the mongo shell will be given, followed by
your unique specifier. Copy and paste that after the @ symbol.

In addition, modifying the port number will change the server port.
For local instances, port 3000 is recommended.




