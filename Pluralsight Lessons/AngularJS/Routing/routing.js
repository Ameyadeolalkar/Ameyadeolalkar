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