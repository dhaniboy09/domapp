![Build Status](https://travis-ci.org/andela-dhaniabelega/domapp.svg?branch=staging)  [![codecov](https://codecov.io/gh/andela-dhaniabelega/domapp/branch/staging/graph/badge.svg)](https://codecov.io/gh/andela-dhaniabelega/domapp)  <a href="https://codeclimate.com/github/codeclimate/codeclimate"><img src="https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg" /></a>  [![Coverage Status](https://coveralls.io/repos/github/andela-dhaniabelega/domapp/badge.svg)](https://coveralls.io/github/andela-dhaniabelega/domapp)
# Domapp

Document Management App
Domapp is a free, web-based, open source document management system (DMS) written in Javascript designed to comply with world standards for document management. It features web based access, fine grained control of access to files as well as users. Please have a look around and if you have any questions, contact us!

## Functionalities

* Document Management: Create, Read, Update and Delete Documents
* Granular Access: Assign Roles to Documents and Users
* User Management: Manage User roles and user accounts

## Limitations

* Domapp only supports two user roles: Admin and Fellow
* Domapp doesn't have email verification
* Admin users cannot modify fellow profiles/documents
* Admin cannot change user roles e.g. upgrade a fellow to an admin or vice versa

## Getting Started

The following instructions will get Domapp up and running on your local machine for development and testing purposes. 

### Prerequisites

To install Domapp on your local machine you need to be running at least node v7.9.0. 

### Installation

The following steps are required to install the app:
* Clone the repo into a local directory
(Optionally) You can fork the repo and then clone your forked repo locally.

```
git clone git@github.com:andela-dhaniabelega/domapp.git

```

* Next, cd into that directory and simply run the following commands.

	```
	cd domapp
	npm install
	npm run start:dev

	```

### Usage 

* Fire up your browser and navigate to ```http://localhost:8000/```
* Sign up to start using the app. No email verification is required.

## Built With
* [REACTJS](https://facebook.github.io/react/) 	- The Technology used
* [REDUX](redux.js.org) 		- The architecture used
* [BABEL](http://www.babeljs.io/docs/) 				- The Compiler Used
* [WEBPACK](https://webpack.github.io/docs/) 		- The Module Bundler used
* [EXPRESS](https://expressjs.com/) 				- The Server used
* [NPM](https://www.npmjs.org/) 					- Dependency Management
* [MOCHA](https://mochajs.org/) 					- The Testing Framework Used
* [CHAI](https://chaijs.com/) 						- The Assertion Library Used
* [ENZYME](https://github.com/airbnb/enzyme) 		- A ReactJS Test Utility
* [AXIOS](https://www.npmjs.com/package/axios) 		- The HTTP Cient Library used.

## Contributing

* Fork it!
* Create your feature branch: `git checkout -b my-new-feature`
* Commit your changes: `git commit -am 'Add some feature'`

We recommend that commit messages have a Header, Body and Footer. 

```
feature(): This feature addresses some particular issue(s)
- implements functionality A.
- implements functionality B.
[Delivers #STORY_ID]

```
* Push to the branch: `git push origin my-new-feature`
* Submit a pull request :D
We recommend that pull requests follow this convention:

```
- Describe what this PR does
- How should this be manually tested?
- Any background context you want to provide?
- Screenshots (if appropriate)
- Questions:

```

## Credits

All Andela Fellows

## License

This project is licensed under the MIT License


