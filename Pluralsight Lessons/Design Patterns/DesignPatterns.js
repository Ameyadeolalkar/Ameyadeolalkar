/* THis file has all the JavaScript design patterns at taught by the Pluralsight course 
Practical Design Patterns in JavaScript*/

//1. Creational Design Patterns
/*1a. Constructor Pattern: Enables to create one object from another object. Uses the new keyword. creates a new 'this' 
  and binds it to the object scope. allows to create a function and pass a parameter called a Constructor. this is 
  automatically asigned to the Constructor. the new keyword will always return 'this'*/

 /* var Task = function(name){
  	this.name = name;
  	this.completed = false;

  	this.complete = function(){
  		console.log('completing task:' + this.name)
  		return this.completed=true
  	}

  	this.save = function(){
  		console.log('saving task:' + this.name);
  	}
  } 

  var task1 = new Task('create new demo for Constructors');
  var task2 = new Task('create new demo for modules');
  var task3 = new Task('create new demo for singletons');
  var task4 = new Task('create new demo for prototype');

  task1.complete();
  task2.save();
  task3.save();
  task4.save();*/

  /*Drawback with this is that there are 4 instances of save() and complete() that are created everytime the constructor is called
  this is not efficient behavior. To solve this, we use a concept called Prototypes
  Prototypes: An encapsulation of properties that an object links to. 
  Structure is, classname.prototype.methodname = function(){}
  The above code now changes to the one below. Now, instead of creating a new instance of the functions in the constructor,
  the new constructor will refer to the properties mentioned in the prototype instead of creating a copy of the function
  thus making things more efficient*/

  

  /*var Task = function(name){
  	this.name = name;
  	this.completed = false;
  }

  Task.prototype.complete = function(){
  	console.log('completing task:' + this.name);
  	return this.completed=true;
  }

  Task.prototype.save = function(){
  	console.log('saving task:' + this.name);
  }

  var task1 = new Task('create new demo for Constructors');
  var task2 = new Task('create new demo for modules');
  var task3 = new Task('create new demo for singletons');
  var task4 = new Task('create new demo for prototype');

  task1.complete();
  task2.save();
  task3.save();
  task4.save();*/

  /* in a node environment, the Task constructor and the prototypes will be in a separate file called task.js. The constructor
  and prototypes will be made available using module.export. the 'new' keyword and calls to the functions will be in another
  module e.g. main.js which will access the constructor using require('./task')*/

  /*EcmaScript 2015: EcmaScript 2015 has classes. Node allows to use classes only using 'strict' mode. using classes
  changes the code. the Task constructor which was a function, now becomes a class with a constructor function in it.
  the prototypes are not required, the save() and complete() methods are specified in the class. This can also be
  achieved using Babel*/

  /*'use strict'

  class Task{
	  constructor(name){
	  	this.name = name;
	  	this.completed = true
	  }
	  complete(){
	  	console.log('completing task:' + this.name);
	  	return this.completed=true;
	  }
	  save(){
	  	console.log('saving task:' + this.name);
	  }
  }

  var task1 = new Task('create new demo for Constructors');
  var task2 = new Task('create new demo for modules');
  var task3 = new Task('create new demo for singletons');
  var task4 = new Task('create new demo for prototype');

  task1.complete();
  task2.save();
  task3.save();
  task4.save();*/

  /*Creational design pattern in Angularjs can be found in plnkr http://plnkr.co/edit/LQepAH?p=preview.
  In angular, most of the times we get data from an API in a json with multiple objects, we iterate over them and
  dump them on the screen. this results in a lot of unmanaged code, very big controllers and is not very efficient.
  So, we add some objects. refer to task.js in the plnkr. as in the plnkr, the task.js file is an angular module with
  the name 'Task' that is performing the same task as the task.js in node. now, in the script.js, where every new
  task was an array of objects, there can be just one array of new constructors where the name and completed
  attributes are specified. the ng.click in the index.html can now call the complete() in the 'Task' constructor*/


//1b. Module patterns

  /*A module pattern is like creating a toolbox. it encapsulates a group of like methods. e.g. service for db calls,
  service for http calls. Below, we are going to do all the db calls and keep them all in a module. 
  Note: in order to keep everything in one file, the constructor declaration, module and calls are listed together.
  ideally, they should all be in separate files communicating using module.exports and require statements. 

  In this example, the task is to create a module for getting data from a database and saving data back to the database
  Since the module pattern is good for grouping functions catering to a particular serivce, the get and save functions
  are grouped using this pattern in another function called repo. the get and the save functions will each have their
  own properties and tasks that will be local to the function. for getting the tasks from the database, the repo.get()
  function can be passed to the Task constructor while creating a new Task. the new task will be created with the name
  and completed properties initialized. then, when the completed function is called, the completed function will refer
  to the object passed with the constructor which in this case is repo.get(). the constructor will then refer to the
  repo.get function, and get the name of the task that the function returns. if implemented in an API, the repo.get()
  function will include queries to the database based on the id that was passed. the result from the database will be
  returned as the name, which will be then passed to this.name in the Task.prototype.complete function, thereby logging
  'completing task: "value returned from the db"' on the console

  when the save() is called, the the Task will be initialized with the new name (which is the associated task name passed 
  as a json object with the new Task intialization) and completed attributes. since save() has been called, 
  Task.prototype.save() will be invoked. now, the task here is to save the name to the name to the db. the this passed in
  the repo.save() function, refers to the name passed with the task initialization. the task passed in the repo.save() 
  function now refers to the new task name and hence will log the name of the task. in an API operation, the code for saving
  the name will go in the repo.save() function.

  In order to keep the repo() clean, the function declarations are made as variables and the function calls are passed as
  a return object */

  /*var Task = function(data){
  	this.name = data.name;
  	this.completed = false;
  }

  Task.prototype.complete = function(){
  	console.log('completing task:' + this.name);
  	this.completed=true;
  }

  Task.prototype.save = function(){
  	repo().save(this);
  }

  var repo = function(){
  	var get = function(id){
  		console.log('Getting task:' + id);
  		return{
  			name:'new task from db'
  		}
   	}
  	var save = function(task){
  		console.log('saving ' + task.name + 'to the db');
  	}
  	return {
  		get: get,
  		save: save
  	}
  }

  var task1 = new Task(repo().get(1));
  var task2 = new Task({name:'create new demo for modules'});
  var task3 = new Task({name:'create new demo for singletons'});
  var task4 = new Task({name:'create new demo for prototype'});

  task1.complete();
  task2.save();
  task3.save();
  task4.save();*/

  /*module pattern is used in services in angularjs. the service is where all the database calls are inserted which will
  be the repo() in this example. the service is then passed to the task.js file that was created in the creational design
  pattern mentioned above. the functionality is similar to the example above. code for use of module pattern in angularjs
  can be found in the taskrepo.js file in the plnkr referred to above. */


  //1c. Factory pattern

  /* Simplify object creation. The factory pattern is good for creating objects based on needs. consider an application
  there are multiple files that are required so something like

  require('./taskrepo')
  require('./userrepo')
  require ('./projectrepo')

  a factory can be created that will handle all these require statements. this will look something like


 var repoFactory = function(){
	this.getRepo = function (repoType){
			if(repoType === 'task') {
					var taskrepo = require('./taskrepo')();
					return taskrepo;	
			}
			if(repoType === 'user') {
					var userrepo = require('./userrepo')();
					return userrepo;
			}
			if(repoType === 'project') {
					var projectrepo = require('./projectrepo')();
					return projectrepo;
			}
	}
 }
 module.exports = new repoFactory;		

 now, if taskrepo had code

 var repo = function(){
  	var get = function(id){
  		console.log('Getting task:' + id);
  		return{
  			name:'new task from db'
  		}
   	}

 TaskRepo = require('./taskrepo') would point to the function above and the get call would look like
 var task1 = new Task(TaskRepo.get(1));

 eliminating the need for the require statement, the code in the taskrepo can be called through the factory

 var repoFactory = require(./repoFactory);
 var task1 = new Task(repoFactory.getRepo('task').get(1))

 now the repoFactory will go to the task repo and get data from the database corresponding to id=1

 A better way to simplify both the repoFactory creation and calling the repoFactory will be to leverage objects. 
 something like this

 var repoFactory = function(){
	var repos = this;
	var repoList = [{name:'task',source:'./taskrepo'},
					{name:'user',source:'./userrepo'},
					{name:'project',source:'./projectrepo'}]
	repoList.forEach(function(repo){
		repos[repo.name] = require(repo.source)();
	})
 }

 module.exports = new repoFactory
		
 the repos object will now look something like this

 repos['task'] = require('./taskrepo')
 repos['user'] = require('./useerrepo')
 repos['project'] = require('./projectrepo')

 so now, the call can be

 task1 = new Task(repoFactory.task.get(1))

 repoFactory refers to the repos object and .task tells the repoFactory which repository to point to.

 Use of the factory pattern helps to combine similar functionality into one factory so that the main code is simple and
 readable

 */

 //1d. singleton pattern

 /* single use of object accross the code. 

 Node:

 consider there is a repository with only one function save

 var repo = function(){
	var called = 0;

	var save = function (task){
			called++;
			console.log('saving '+ task + 'called ' + called + ' times');
	}
	console.log('newing up task repo');
	return{
			save:save
	}
 }
 module.exports = repo;

 this repo is used by multiple modules. e.g a task handler

 var repo = require('./repo');
 var myrepo = repo();

 var taskHandler = function(){
	return {
		save: function(){
			myrepo.save('hi from task handler')
		}
	}
 }

 module.exports = taskHandler();

 while calling this function from a main.js file ------------

 var repo = require('./repo');
 var taskHandler = require('./taskHandler')
 var myrepo = repo();

 myrepo.save('from Main');
 myrepo.save('from Main');
 myrepo.save('from Main');
 taskHandler.save();
 taskHandler.save();
 taskHandler.save();

 this will output

 saving from Main called 1 times
 saving from Main called 2 times
 saving from Main called 3 times
 saving from taskHandler called 1 times
 saving from taskHandler called 2 times
 saving from taskHandler called 3 times

 there are a few problems with this approach. first, the function is called 6 times so it should output
 called 1,.....,called 6. Also, the repository is called twice in the whole exercise by different files.
 singleton allows the use of the save() object in the repo to be used through out the code as a single
 object not required to be called multiple times. this is possible because nodejs uses commonjs which
 caches a module after a require statement is executed. hence, when require('./repo') is executed, the
 repo() is stored in the cache and can be used from there. if the require('./repo') is run multiple times,
 it will cache the new repo everytime and create a new instance

 instead, if the repo() is executed in the module.exports, the cache will save only one instance of the
 function which will be called everytime require('./repo') is called. so, the './repo' will export
 repo(), so the export above will change to

 module.exports = repo()

 now, the myrepo.repo() is not required to be called in the main and taskHandler modules separately. 
 instead, myrepo = require('./repo') will call the repo() function in the cache thereby using a single
 instance of the object which is called a singleton

 the output now will be

 saving from Main called 1 times
 saving from Main called 2 times
 saving from Main called 3 times
 saving from taskHandler called 4 times
 saving from taskHandler called 5 times
 saving from taskHandler called 6 times

 just the way it should be. singletons are used in expressjs, mongoose and many other packages 

 Angular: in Angular, all services are singletons */


 //2. Structural design patterns

 /* concerned with how obejcts are made up and how objects are related with each other. in creational
 patterns it was mainly about creating a new object. the only instance where there was relationship
 between objects was in the factory	pattern.

 2a. Decorator pattern: used to add a new functionality to an object without being obtrusive

 more complete inheritance of objects. the decorator pattern wraps an object with some additional features
 without changing the original object. there will be a decorated object without changing the original
 object. consider a task object as defined below 
*/

  /*var Task = function(name){
  	this.name = name;
  	this.completed = false;
  }

  Task.prototype.complete = function(){
  	console.log('completing task:' + this.name);
  	this.completed=true;
  }

  Task.prototype.save = function(){
  	console.log('saving task:' + this.name)
  }


  var mytask = new Task('Legacy Task');

  mytask.complete();
  mytask.save(); */

  /*Now, add another task called urgent task. JavaScript allows the user to add properties to the object
  at any time. a property like priority can be added with value 2 and also a function like notify can be
  added that performs a task */

  /* var urgenttask = new Task('Urgent Task');
  urgenttask.priority = 2;
  urgenttask.notify = function(){
  	console.log('notify important people')
  }

  urgenttask.complete(); */

  /*it is now possible to enhance the original save function to perfom additional tasks while retaining
  the same properties. here, a new function save can be created which calls the notify and uses the original
  prototype.save() with the urgenttask object by using 'call'. call allows the user to pass the 'this'
  keyword to the prototype.save where the this refers to the urgenttask. hence, the original save method
  has been decorated by adding more functionality while retaining the original properties of the Task
  object*/

  /*urgenttask.save = function(){
  	this.notify();
  	Task.prototype.save.call(this)
  }
  urgenttask.save(); */

  /* instead of creating new task using the same technique above which is time consuming if there are many
  tasks, it is possible to create a sub task that wraps the original Task */

  /*var urgenttask = function(name,priority) {
  	Task.call(this,name); //passes the urgenttask to the Task object with property name
  	this.priority = priority; //assigns property priority to urgenttask which is not in the original Task
  } */

  
  /*however, the problem now is that there is no prototype.complete() from the original Task. It is possible
  to say urgenttask.prototype = Task.prototype, but now if urgenttask.prototype is changed, Task.prototype
  will change too. In this case, it is possible to create a new object which wraps around the Task.prototype.
  something like this: */

  /*urgenttask.prototype	= Object.create(Task.prototype); //creates new object with Task.prototype */

  /*it is possible to modify the save function and add the notify function as prototypes of the urgenttask constructor*/

  /*urgenttask.prototype.notify = function(){
  	console.log('notify important people')
  }

  urgenttask.prototype.save = function(){
  	this.notify();
  	Task.prototype.save.call(this)
  }
  var ut = new urgenttask('Urgent Task',1)
  console.log(ut); //which will output ({name:'Urgent Task',completed:'false',priority:1})
  ut.complete(); //inherits the complete() from the Task constructor
  ut.save(); //uses the save() declared in the urgenttask.prototype */

  /*urgenttask is truly inheriting Task and is a completely new constructor */

  /* Angular:

  urgentTask.js in the plnk will have similar code as the one mentioned above. it will inherit the Task.prototype, the 
  complete() function will be as is, and the save function will be modified similar to the one mentioned above

  Decorating services: Angular has a decorator method that is attached to the module. this will decorate the original
  TaskRepository function. the decorator should always be below the original function in the index.html script. this allows
  the user to add more functionality to the exisitng service without taking apart the original service. the original service
  is passed to the decorator using $delegate. the original save method in the TaskRepository service can be changed by saying

  $delegate.save = function(){}

  the original save can be reused by saving the original save function in the TaskRepository to a new variable like

  oldsave = $delegate.save which is the save function from the original TaskRepository

  the new save, $delegate.save = function(){} can now call the original save */


  //2b. Facade Pattern

  /*gives a way to easily interact with a complex api or service. the facade hides the complexity of the backend by using a
  simplified interface. eg. is jquery that gives a simple interface to deal with the DOM. Facade pattern also wraps the
  original constructor, but it does not change the functionality like the decorator pattern but just provides an interface */

  var Task = function(data){
  	this.name = data.name;
  	this.completed = data.completed;
  	this.priority = data.priority;
  	this.project = data.project;
  	this.user = data.user;
  }
  
  var taskService = function(){
  	return{
  		complete: function(){/*some activity*/}
  		notify: function(){/*some activity*/}
  	}
  }();

  var mytask = new Task({
  	//properties
  	complete:true
  })

  taskService.complete(mytask);
  /*some additional complex code*/
  if(mytask.complete == true){
  	taskService.complete(...);
  	taskService.notify(...);
  }
  /*The code structure is complex and not clean with one off function calls for each function	defined	in the taskService.
  this will create	difficulty while calling the api because every function will be called separately. instead of this,
  the complete additional code can be included in a wrapper*/


  var taskServiceWrapper = function(){
  		var completeAndNotify = function(task){ //wrapper that will use the complete and notify functions
		    taskService.complete(mytask);
	  		/*some additional complex code*/
	  		if(mytask.complete == true){
	  			taskService.complete(...);
	  			taskService.notify(...);
	  		}
  		}
 		return	{
 			completeAndNotify:completeAndNotify	
 		}
  }(); /*executes the function so that taskServiceWrapper is just an object that returns completeAndNotify. normally, this
		will sit in a separate file and module.exports will return the executed function*/

  taskServiceWrapper.complete(mytask);

  /*Angular:

  the same pattern can be used on the angular side to wrap complex code in services. create a new service which passes in
  the original service and wraps it. this way, the controller can just call the function that the wrapper service returns*/