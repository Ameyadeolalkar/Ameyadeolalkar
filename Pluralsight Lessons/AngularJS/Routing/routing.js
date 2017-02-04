1. URL based routing

ngRoute

$routeProvider and $routeParams - refer route service in the services project

Hashbangand HTML5 Modes

HTML5 Mode

 Must be configured using $locationProvider
 No # except in older browsers
 Links with # are rewritten without the # in modern browsers
 Server must rewrite links to application entry point


HashbangMode
 Default behavior
 All URLs will contain #
 Links are not rewritten
 No server-side configuration required

E.g. refer to exercise-2 app.js and index.html


2. State based routing 

UI-Router
Provides state based routing and is built on ngRoute. not fundamentally different from ngRoute

State: place in the site which is not dependent on the URL

Getting UI-Router
bower install angular-ui-router#0.2.15
npminstall angular-ui-router@0.2.15
https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js
http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js

ui-view is analogous to ng-view

ui-sref is used in place of href in the html like ngRouter
$state.current accesses the current state

Additional features are added in $stateParams 
1. /:id is declared as /{id} - makes it possible to enter a regular expression rule
2. can declare as
params:{
	value:42	
}

resolve property stops state transition before the promise is resolved


Advanced ui-routing

1. nested states
a. to create a child state, syntax is parentState.childState
b. properties of parent state in inherited by child
c. ui-view will be on the parent view, child views will insert here
2. abstract states
a. cannot be activated, cannot create a state, it will be activated when one of its child states is activated
3. multiple name views
a. views property is set, each object is created for each view