/*Services help to
1. have reusable code
2. components are better defined and easier to handle change requests

Creating angular service

1. provider: function that allows you to create a provider function that is internally called by other functions
2. factory function allows
3. service function calls the factory function that calls the provider function
4. value forms a wrapper over the factory function
5. constant is a unique type of service creation function that neither calls the factory nor calls the provider 

services are designed to be injected in another object. there must first be a provider to know how to create a service. 
the $provide service does that. the provide service creates a provider that has a function that creates a service

provider function:

A provider function is declared as 

$provide.provider('books', function ()
 	{this.$get= function ()              //there must always be a $get function. service is the object returned by the $get
 			{
 				var appName= 'Book Logger';
 				return {
 					appName: appName
 				};
 		}
 	}); 

'books' is the name of the service here. it can be injected the controller as a parameter like ControllerName(book)
the properties in the book service can be called from the controller as

vm = this; //where vm is short for view model
vm.appName = books.appName

the appName can be injected to the view as 

<div ng-controller = "BooksController" as "book">
	<h1> {{book.appName}} </h1> //this will show the appName in the service i.e 'Book Logger'
</div>

provider is an in built function in a module and can be called as app.provider

this way, $provide does not have to be injected in app.config. insted, the name of the service can be injected as 
serviceName+Provider in this case bookProvider. this is because the provider function adds 'Provider' to the name of the
service

the provider function is lower level and is not ofter used. the factory function is a wrapper over the provider function
however, the provider function can be usedwhen there is some additional functionality requierd in the service

2. Factory function

function factory(name, factoryFn, enforce) 
	{
	return provider(name, {    //calls the provider function and passes the result of the $get to the factoryFn enforce 
							   //ensures that the function passed to it actually returns an object
		$get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
	});
}




3. service function:
thin wrapper around the factory function

function service(name, constructor) 
	{return factory(name, ['$injector', function($injector) //function will be passed as a constructor
															// and will be initiated using the new operator
															//$injector uses the instantiate to call the service function
															//instantiate will then use the new operator to execute
															//this function that creates a service
		{
			return $injector.instantiate(constructor);
		}]
	);
}

e.g of factory and service method - refer to the services in the services folder of the 
BookLogger app. use of the factory and service functions has been called out with comments

another example of service function 

function usecaseHandlerService($http) {  //example of singleton design pattern where the
										 //usecaseHandlerService is the object used by different
										 //modules
    // AngularJS will instantiate a singleton by calling "new" on this function
    var usecases = [];

    return {		
        getAllUsecases: function() {
            return $http.get('api/getUsecases');
        },
        addToUsecase: function(usecaseId, nodeId) {
            return $http.post('api/addToUsecase/' + usecaseId, { nodes: [nodeId] });
        },
        removeFromUsecase: function(usecaseId, nodeId) {},
        createUsecase: function(name, descr) {},
        deleteUsecase: function(usecaseId) {}
    }
}

angular.module('mismoWorkbenchApp')
    .service('usecaseHandler', usecaseHandlerService); //usercasehandlerService is passed as a 
    												   //constructor to the service function
    												   //is executed behind the scenes when
    												   //$injector uses instantiate()



example of factory function

angular.module('websiteService', [])

.factory('Website', function($http) { //the service function is declared in the factory declaration itself which
									  //will be executed behind the scenes using the provider function

	// create a new object
	var websiteFactory = {};

	// get a single website
	websiteFactory.get = function(id) {
		return $http.get('/api/website/' + id);
	};
	

	// get all websites
	websiteFactory.all = function() {
		return $http.get('/api/website/');
	};

	
	// return our entire websiteFactory object
	return websiteFactory;

});

Constant services
1.Simply registers service with injector, no factory/provider calls
2.Can be injected into a module configuration function
3.Cannot be overridden by an AngularJSdecorator

Value Services
1.Shorthand
2.Cannot be injected into a module configuration function
3.Can be overridden by an AngularJSdecorator

e.g. constantService example in the BookLogger app

Dependency Annotations
3 techniques
1. implicitly from function parameter names - will break during minification
2. $inject assign array or object to inject
3. use inline array notation - safest option for minification



Common Built in services

promises and $ service- In Javascript, promises are objects which represent the pending result of an asynchronous operation
						(Refer to the pdf in the exercise folder)


e.g. refer to the dataService and BooksController files in the exercise

Routing

$route and $RouteProvider are built in services for routing. behind the scenes, a provider called '$route' is
created which is saved as $RouteProvider as providers are normally saved. we will hence have to inject $RouteProvider
in our module.config

$routeProvider applies properties when a certain route is accessed. main properties are templateUrl,controller,controllerAs
the .otherwise routes to a certain route when the route angular was looking for was not found

$routeParams helps to get the parameters from the route specified

ngRoute is the name of the angular module and it has to be injected separetely. the angular file that contains routes
is also different and needs to be called in the index.html separately as angular-routes.js

$routeProvider will inject the template view in the div that has ng-view

routes added to the client side (created as a link using <a></a> should start with #/) so a route created on the client
side as AddNewBook will be #/AddNewBook. but in routeProvider it will be declared as /AddNewBook


$route Events -

1. Events related to route changes broadcast on $rootScope
2.Inject $rootScopeto define event handlers
3. Use $rootScope.$on() to specify event types to listen for
4. $route defines four events
5. $routeChangeStart
6. $routeChangeSuccess
7. $routeChangeError
8. $routeUpdate

E.g. refer to the app.js file in the BookLogger application in exercise-3

$cookies and $cookiesStore

Available in the ngCookiesmodule

1. Use $cookies to read/write simple strings as properties on the service

2. Use $cookieStore to read/write objects

3. Serialized/deserializedto and from JSON
- get(key);
- put(key, value);
- remove(key);


$log 
Simple wrapper around common console functions
-log();
-info();
-warn();
-error();
-debug();

Output with debug() is configurable with $logProvider



4. Networking

$http service


$http Configuration Object
 method
 url
 params
 data
 headers
 cache



Response Object

Parameter passed to the “then” functions on the $http promise
 Contains following properties
- data: data passed throught the http response, usually a json object
- status: http status codes, 200, 404, etc.
- statusText: http status message
- headers: http response headers 
- config: config object that was passed to the http request. allows to view the request along with the response

it is good to encapsulate the $http call in the dataService rather than exposing the call with all its parameters. rather,
it is good to share only the response of $http with the user 


E.g refer to dataService in exercise -4

$http shortcuts

 GET
- $http.get(url, [config])
 DELETE
- $http.delete(url, [config])
 POST
- $http.post(url, data, [config])
 PUT
- $http.put(url, data, [config])

Transformation request and response

read the data from each service and puts it in the format the client understands

Interceptors

Similar to transformations, can be added to the $http object to control requests and responses

E.g. bookLoggerInterceptor.js, app.js and dataService.js in BookLogger app in exercise-4

$resource service

 GET
-$http.get(url, [config])
 DELETE
-$http.delete(url, [config])
 POST
-$http.post(url, data, [config])
 PUT
-$http.put(url, data, [config])

good way for simple crud operations that do no require a lot if configuration
$resource is in a different angular file called angular-resource

E.g. BookResource.js, EditBookController.js in BookLogger app in exercise-4


5. Caching and sharing data

increases performance by caching network requests

$cacheFactory service. using with the $http service gives the most benefit

Using Cache Objects
 put ( key, value )
 get ( key )
 remove ( key )
 removeAll( )
 destroy ( )
 info ( )

E.g. refer to dataService.js in BookLogger app in exercise-5

$http cache

Set with cache property
Added to $http cache object by default
URL is the cache key
Response object is the cache value
Promises resolved with cached response objects

http calls will not be repeated and will be served from the cache. especially
useful for repetitive calls


E.g. refer to dataService.js in BookLogger app in exercise-5


sharing data

used to share data between two controllers. similar concept to cookies, except data is
stored in a service instead of cookies

6. Service decorators

add functionality to built in services

add $provider to the config and call $provide.decorator. pass $delegate to the decorator function which will be the
service in the original form, the function will then add more functionality

Eg. refer to app.js in BookLogger app in exercise-6*/