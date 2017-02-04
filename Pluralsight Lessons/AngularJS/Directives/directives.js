1. Creating directives

.directive() is called on the angular app e.g. app.directive()

the name of the directive is declared using camel case in the directive() function e.g. userInfoDirective. this name is
then specified by separating with hyphens in the html tag. eg. <div user-info-directive></div>

the contents in that div can be specified in the directive by using the template attribute like:
function(){
	return{
		template:"Have a nice day!"
	}
}

the restrict attribute specifies the format of the directive, this is used as

function(){
	return{
		template:"Have a nice day!",
		restrict: "A" //'A' stands for attribute. there are others, e.g. 'E' - element, 'C'-class, 'M'-comment
	}
}

bindings

it is possible to bind the directive to the controller. data from the current scope can be placed in the html template

refer to exercise-1


2. Events, scopes and controllers

scopes
1. shared scope: parent and directive Have same scope
2. inherited scope: the child will have a different scope but will inherit the parent property
	a. Two inherited scopes will have the same parent scope and will overwrite the same element
	b. Inherited scopes are used when different directives perform different actions on the same element
	refer ex-2, inherited-scope.zip for example. 
3. isolated scope: data in the child scope is not visible to parent scope. there can be a custom binding
to view objects in parent scope
	a. the scope attribute can be used to link the directive to the controller object. 
		e.g. scope:{
				user:'='
			 }  
			 sets the scope of the directive object 'user' to be equal to a object in the controller
			 the html will now have
			 <div directive-name user=user1></div> //where user1 is the name of the object in the controller

	b. isolated scope can take two parameters in the form of simple values and function parameters
	c. '@' sign passes a simple value as a string. if the name of the parameter declared on the html
	div is suffixed after the @ sign, then the name referenced in the html can be bound to a new name
	in the directive. e.g. refer to ex-2, isolated-scope-simple-values.zip
	d. e.g refer to isolated-scope-function-parameter.zip and the example below from usability testing

	<iframe ng-src="{{url}}" iframe-watch callback-fn="testload(arg1)" width=100% height=500px frameBorder="0" id="app-frame-id"></iframe>
        </div>
    </div>
    <script>

    app.controller('loadcontroller', ['$rootScope', '$scope', '$http', '$sce',  function($rootScope, $scope, $http, $sce) {
        $scope.testload = function(data){
                $http.get("http://localhost:8080/api/website/" + url[0] + "/tests/testByUrl/" + data).then(function (response) {
                    $scope.test = response.data.instruction;
                });
        };
    }]);

    app.directive('iframeWatch', function($analytics, $http) {
        return {
            restrict: 'EA',
            replace: 'true',
            scope: { 
                someCtrlFn: '&callbackFn'  //isolated scope with function parameter is prefixe by '&'
                						   //here the callbackFn declared in html is bound to someCtrlFn
                						   //the call-back-fn declared in the html calls the function in the controller
            },      
                  

            link: function(scope, element, attrs) {
                element.on('load', function() {
                var testurl = element[0].contentWindow.document.location.href;
                tu = testurl.slice(22,testurl.length);
                t = tu.replace(/\//g,"-").replace(/\?/g,"-").replace(/&/g,"-");
                scope.someCtrlFn({arg1:t}); //the someCtrlFn as declared in the isolated scope can be used in the
                							//rest of the directive and can also pass arguments. any arguments passed to this function will
                						    //be bound to the function declared in the html
                $analytics.pageTrack(element[0].contentWindow.document.location.href);
                    element[0].contentWindow.document.body.addEventListener('click', function() {
        
                        
                    }, false);
                })

            },
        }
    });

Decorator directives

		e.g. ng-app, ng-controller, ng-click, ng-hide

		link function: takes in 3 attributes - scope,element and attribute where attribute is the attribute on that element.
		the link function can be used to manipulate an element using these three paramaters. 

		e.g. refer to spacebar-support.zip in m3-exercises. and the e.g. below from usability prototype

		app.directive('iframeWatch', function($analytics, $http) {
		        return {
		            restrict: 'EA',
		            replace: 'true',
		            scope: { 
		                someCtrlFn: '&callbackFn'
		            },      
		                  

		            link: function(scope, element, attrs) {
		                element.on('load', function() {
		                var testurl = element[0].contentWindow.document.location.href;
		                tu = testurl.slice(22,testurl.length);
		                t = tu.replace(/\//g,"-").replace(/\?/g,"-").replace(/&/g,"-");
		                scope.someCtrlFn({arg1:t});
		                $analytics.pageTrack(element[0].contentWindow.document.location.href);
		                    element[0].contentWindow.document.body.addEventListener('click', function() {
		        
		                        
		                    }, false);
		                })

		            },
		        }
		    });

		 scope attribute is used to access a function outside the directive

		 having two directives with isolated scope on the same element may break the system since the
		 behavior of one directive impacts the behavior of the other. attribute passed a as a parameter in
		 a link function can access the function passed during the directive declaration in the html.
		 it can be accessed as attribute[nameOfDrirective]. However, in order to access a function that
		 is outside the scope of the directive e.g. a function that resides in the controller which is
		 usually linked to a directive using isolated scope, the $parse service is used. 
		 $parse(attribute[nameOfDrirective]) will go and find the external function that was passed to
		 the directive declaration in the html. if this is passed to a variable, that variable is now
		 the function which is linked to the external function. this is similar to a function declared in
		 scope{} while creating an isolated scope. e.g if the attribute[nameOfDrirective] is passed to 
		 a variable fn

		 var fn = $parse(attribute[nameOfDrirective])
		 then fn can be to call the function just like scope.someCtrlFn in called in the example above.
		 this will look like fn(scope, {arg1:foo}). this argument will then be passed to the html call 
		 to the function in the controller which will also have this argument. this technique solves the
		 problem of having an isolated scope for every small function in the controller that the directive wants
		 to access

		 angular's two way databinding works because of a watch service that observes changes on the model and reflects
		 the same on the view and vice versa. it is possible to implement a custom watch function by using the watch service
		 like $watch(attributeToBeWatched,function(){with functionality on the attribute})

		 a list of arguments can be passed in a directive declaration, something like
		 <directive-name directiveValue=someValue oneMore another yetAnother><directive-name>

		 this will then be accessed as parms = attribute[directiveName].split(' ')
		 parms will then be an array [someValue,oneMore,another,yetAnother]
		 this technique can be used to insert these parameters into a function that is created in the directive to add
		 functionality to the element

 Transclusion

		 Transclusion helps a directive to have its own display within a display that is bound to the scope of its controller. 
		 the transclude property is added to the directive template as ng-transclude. the directive template will be inserted
		 in the place where the directive is declared in the html and any contents within the directive declared on the html will
		 be incapsulated in the directive template and will have functionality as specified in the directive. this is particularly
		 useful when a view has to be bound to both a directive and a controller with two separate scopes/inherited scopes. 

		 It is important to have inherited scopes while working with transclusion to prevent the directive overwriting the data
		 set by the controller on the transcluded view. If there is another controller for the transcluded view, this controller 
		 gets a completely different scope. the contents of the transcluded view bypass their controller's scope in its inheritance
		 chain this is to prevent it from overwriting contents in the transcluded view

		 in directive scopes, @ indicates one way binding, = indicates two way binding. when there is a one way binding,
		 the value in a directive is set using ={{Value}}. when there is a two way binding it is specified as ='Value'
		 event.stopPropagation() prevents an event on an element to propoagate to the container that hosts the element


Structural directives

		to avoid specifying ng-transclude in the html, transclude can be set as element in the directive. the transclude
		function can then specify where to insert the transcluded view

		the transclude function is passed as an argument in the link function. it provides the ability to specify where
		the transclusion has to be inserted. the function looks like this

		transclude(scope,function(clone){}) where clone is the clone of the DOM node that the directive is on. If the
		transclude function is not used and transclude=true is not set, the transcluded view is logged as a -comment
		in the DOM. the cloned DOM can be inserted after this comment using el.after(clone).

		setting the priority attribute in the directive allows to specify when an element should be rendered. priority
		is set when the transclude function is called on an element

Controllers and Nested directives

		Controllers in directives transform directives into a mini angular app which is reusable. controllers can be
		specified on a directive just like any other controller is specified in angular. controllerAs can be used to
		assign the controller to a variable like vm which is referenced in the view. another way to do this is by 
		setting bindingController = true so that  $scope.vm = this. if the directive has child directives, the
		views of the child directive need to have vm specified in their calls to the properties in the parent controller