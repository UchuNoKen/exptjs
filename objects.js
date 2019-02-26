/*
    Expert JavaScript
    Objects and Prototyping
    5/14/18
----------------------------------------------------------------------------------
*/

// Object.create()
//  - method that creates a new object, assigning the first argument as the
//      prototype
//  - optional second argument describes additional properties of the new object
var character = {
    name: '',
    age: 0
}

var hero = Object.create(character, {
    name: {value: 'Ichigo', writable: false, enumerable: true, configurable: true},
    age: {value: 15, writable: false, enumerable: true, configurable: true},
    occupation: {value: 'student', writable: true, enumerable: true, configurable: true},
    powers: {value: 'substitute soul reaper', writable: true, enumerable: true, configurable: true},
    town: {value: 'Karakura Town', writable: true, enumerable: true, configurable: true},
});

hero.name; // 'Ichigo'
hero.age; // 15
hero.occupation; // 'student'
hero.powers; // 'substitute soul reaper'
hero.town; // 'Karakura Town'

// Data Property Attributes:      
//      configurable
//      |_ true: prop can be deleted from parent obj, decriptor can be modded later
//      |_ false: descriptor sealed from further modifications

var car = {};

// A car can have any number of doors
Object.definedProperty(car, 'doors', {
    configurable: true,
    value: 4
});

// A car must have only four wheels
Object.defineProperty(car, 'wheels', {
    configurable: false,
    value: 4
});

Object.defineProperty(car, 'transmission', {
    configurable: false,
    value: '6 speed'
});

Object.defineProperty(car, 'make', {
    configurable: false,
    value: 'BMW'
});

Object.defineProperty(car, 'model', {
    configurable: false,
    value: 'M5'
});

delete car.doors;
console.log(car.doors); // undefined

delete car.wheels;
console.log(car.wheels); // 4, wheels cannot be deleted while config is false

//  enumerable
//      |_ true: props can be iterated over with for/in loop
//      |_ false: props cannot be iterated over

var car = {};

Object.defineProperty(car, 'doors', {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 4
});

Object.defineProperty(car, 'wheels', {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 4
});

Object.defineProperty(car, 'secretTrackingDeviceEnabled', {
    enumerable: false,
    value: true
});

for(var x in car){
    console.log(x);
}

console.log(Object.keys(car));  // doors, wheels
console.log(Object.getOwnPropertyNames(car)); // doors, wheels...
console.log(car.propertyIsEnumerable('secretTrackingDeviceEnabled')); // false
console.log(car.secretTrackingDeviceEnabled); // true

//  writable
//  |_ true: value of associated property can be changed
//  |_ false: the value remains constant

var car = {};

Object.defineProperty(car, 'wheels', {
    value: 4,
    writable: false
});

console.log(car.wheels);

car.wheels = 18;
console.log(car.wheels);

// Inspecting Objects......................................................

// Object.getOwnPropertyDescriptor()
// Object.getOwnPropertyDescriptors()
//    - gives a detailed description of attributes for any property of an object

var vehicle = {make: 'BMW'};

Object.getOwnPropertyDescriptor(vehicle, 'BMW');
// {value: "BMW", writable: true, enumerable: true, configurable: true}

// Object.getOwnPropertyNames() 
//    - returns all prop names of an obj, even nonenumerable props

var box = Object.create({}, {
    openLid: {
        value: function(){
            return 'nothing';
        },
        enumerable: true
    },
    openSecretCompartment: {
        value: function(){
            return 'treasure';
        },
        enumerable: false
    }
});

console.log(Object.getOwnPropertyNames(box).sort());

box.openLid();  // 'nothing'
box.openSecretCompartment();  // 'treasure'

// Object.getPrototypeOf() 
//    - returns the proto of a particular obj
//    - does not set the proto, only way to set is with __proto__
Object.getPrototypeOf(hero);
Object.getPrototypeOf(hero) === person && person === hero.__proto__;

// Object.hasOwnProperty() 
//    - returns all props that are present on an object instance
var character = {
    hero: true,
};

var hero1 = Object.create(character, {
    name: {
        value: "Ichigo",
        enumerable: true,
        writable: true,
        configurable: true
    }
});

for(var x in hero1){
    console.log(x);
}

var heroProps = Object.getOwnPropertyNames(hero1).map(function(i){
    return hero1.hasOwnProperty(i) ? i : undefined;
});

console.log(heroProps);

// Object.keys() 
//    - returns a list of only the enumerable props of an object
var box = Object.create({}, {
    openLid: {
      value: function () {
        return "nothing";
      },
      enumerable: true
    },
    openSecretCompartment: {
      value: function () {
        return 'treasure';
      },
      enumerable: false
    }
});

console.log(Object.keys(box));

// Object.isFrozen() 
//    - returns true if obj can't be extended and props can't be modified
//    - returns false otherwise

var bombPop = {
    wrapping: 'plastic',
    flavors: ['Cherry', 'Lime', 'Blue Raspberry'],
    price: 1.00
};

console.log(Object.isFrozen(bombPop));

delete bombPop.price;

console.log(bombPop.price);  // undefined

Object.freeze(bombPop); // freeze to prevent further modifications

delete bombPop.flavors;

console.log(bompPop);  // no change, flavors not deleted

console.log(Object.isFrozen(bombPop));  // true

// Object.isPrototypeOf()
//    - checks every link in a proto chain for the existence of another obj

Object.prototype.isPrototypeOf([]); // true
Function.prototype.isPrototypeOf(()=>{}); // true
Function.prototype.isPrototypeOf(function(){}); // true
Object.prototype.isPrototypeOf(function(){}); // true
Array.prototype.isPrototypeOf([]);  // true

// Object.isExtensible()
//    - new objs extensible by default, new props can be added
//    - checks if an obj is extensible

var ride = {
    doors: 4
};

console.log(Object.isExtensible(ride) === true);  // true

Object.preventExtensions(ride); 

console.log(Object.isExtensible(ride) === true); // false

// Object.isSealed()
//    - returns false if obj is extensible
//    - returns true if obj is nonextensible and all props are nonconfigurable

var zipLock = {};

console.log(Object.isSealed(zipLock) === true);  // false

console.log(Object.isExtensible(zipLock));  // true

Object.seal(zipLock);

console.log(Object.isSealed(zipLock) === true);  // true
console.log(Object.isExtensible(zipLock));  // false

// Object.valueOf()
//    - used to describe an object with a primitive value
//    - a stub meant to be overidden by a custom function later

var Car = function(name){
    this.name = name;
}

var tesla = Object.create(Car.prototype, {
    name: {
        value: "Tesla"
    }
});

console.log(tesla.valueOf());  // not [Object object] for some reason

Car.prototype.valueOf = function(){
    return this.name;
}

tesla.valueOf();  // "Tesla"

// Object.is() ES6
//    - determines whether two arguments have the same value without the need
//        for coercion
//    - do not confuse with strict equality ===

Object.is('true', 'true');  // true, same chars and length
Object.is('True', 'true');  // false, case is different
Object.is(!function(){}(), true); // true, function coerced to true
Object.is(undefined, Math.prototype);  // true, Math obj has no prototype, thus und

// Modifying Objects......................................................

// Object.freeze()
//    - prevents objs from being changed again
//    - frozen objs cannot except new props
//    - frozen objs cannot have existing props deleted
//    - frozen objs cannot have their value changed

var bombPop = {
        wrapping: 'plastic',
        flavors: ['Cherry', 'Lime', 'Blue Raspberry']
    };


console.log(Object.isFrozen(bombPop));  // false

Object.freeze(bombPop);

delete bombPop.flavors;

console.log(bombPop.flavors);  // unchanged, obj is frozen

console.log(Object.isFrozen(bombPop));  // true

// Object.valueOf()
//    - allows new props to be defined or existing props to be modified

var transportation = {};

Object.defineProperties(car, {
    'wheels': {
        writable: true,
        configurable: true,
        enumerable: true,
        value: 4
    },
    'doors': {
        writable: true,
        configurable: true,
        enumerable: true,
        value: '2'
    }
});

console.log(car.doors); // 2
console.log(car.wheels); // 4

// Object.defineProperty()
//    - allows single prop to be added to obj or an existing prop to be modified

var car = {};

Object.defineProperty(car, 'seats', {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 5
});

// Object.preventExtensions()
//    - prevents new props from being added to existing obj
//    - obj can still be reduced by removing props

var car = {
    doors: 4
};

console.log(Object.isExtensible(car) === true); // true

Object.preventExtensions(car);

console.log(Object.isExtensible(car));  // false

console.log(car.doors);  // 4
delete car.doors;  // prop can be deleted

console.log(car.doors);  // undefined

car.tires = 4;

console.log(car.doors);  // undefined, obj can't be extended by adding props

// Object.prototype()
//    - sets the prototype of an obj

var Dog = function (){};

// set speak method on the prototype of Dog
Dog.prototype.speak = function(){
    return 'Woof';
};

// define an cat constructor function and define speak method on prototype of Cat
var Cat = function (){};
Cat.prototype.speak = function(){
    return "meow";
};

var Tabby = function(){};
Tabby.prototype = new Cat();  // set Tabby prototype to new Cat() constructor

var tabbyCat = new Tabby();  // initialize a tabbyCat variable with new Tabby() constructor

console.log(tabbyCat.speak());  // 'meow'

console.log(tabbyCat.prototype); // undefined

tabbyCat.prototype = new Dog();

console.log(tabbyCat.prototype); // Dog {speak: function}

console.log(tabbyCat.speak()); // meow

// Object.seal()
//    - makes an obj immutable, new props can't be added
//    - existing props marked as nonconfigurable
//    - not the same as freezing an object

var envelope = {
    letter: 'To whom it may concern'
};

Object.isSealed(envelope);  // false

Object.seal(envelope);

envelope.letter = 'Oh Hai';
envelope.stamped = true;

console.log(envelope.letter); // 'Oh Hai', letter is updated

console.log(envelope.stamped);  // undefined, no new props added to sealed obj

// Calling Objects..............................................................

// call() - accepts an argument list
// apply() - single array of arguments

var friend = {
    warmth: 0,
    useSweater: function (level){
        this.warmth = level;
    }
};

var me = {
    warmth: 0,
    isWarm: function(){
        return this.warmth === 100;
    }
};

console.log(me.isWarm());  // false

try{
    me.useSweater(100);
} catch (e) {
    console.log(e.message);
}

friend.useSweater.call(me, 100);

console.log(me.isWarm());  // true

me.warmth = 0;

console.log(me.isWarm());  // false

friend.useSweater.apply(me, [100]);

console.log(me.isWarm());  // true

// Creating Objects..............................................................

// Literals

var fool = {
    name: 'Donald Trump'
};

var fool2 = Object.create(Object.prototype, {
    name:{    
        writable: true,
        configurable: true,
        value: 'Devin Nunes'
    }
});

console.log(fool.name);
console.log(fool2.name);
//----------------------------------------------------------------------
var foo = new Object();
var bar = {};

console.log(typeof(foo));  // object
console.log(typeof(bar));  // object

// results in unexpected behavior that can be hard to trace
window.Object = function (){arguments.callee.call() };

// new operator
//    - creates an instance of an object on demand
//    - accepts a constructor function and series of optional arguments
//    - inherits from the constructor functions proto upon creation

var Animal, cat, dog;

Animal = function (inLove){
    this.lovesHumans = inLove || false;
};

cat = new Animal();
dog = new Animal(true);

console.log(cat.lovesHumans);  // false

console.log(dog.lovesHumans);  // true

// 'new' is essentially doing this
dog = {};
dog.lovesHumans = true;
dog = new Animal(true);

// Object.create()
//    - creates a new object

var Car = {
    drive: function (miles){
        return this.odometer += miles;
    }
};

var tesla = Object.create(Car, {
    'odometer': {
        value: 0,
        enumerable: true
    }
});

console.log(tesla.drive(10));

// Understanding Prototypes........................................................

// Reading the prototype

var Car = function (wheelCount){
    this.odometer = 0;
    this.wheels = wheelCount || 4;
};

Car.prototype.drive = function(miles){
    this.odometer += miles;
    return this.odometer;
};

var tesla = new Car();

console.log(Object.getPrototypeOf(tesla) === Car.prototype);

console.log(tesla.__proto__ === Car.prototype);

// Behavior of attempting to set a property on prototype

console.log(tesla.wheels);  // 4

var isetta = new Car(3);
console.log(isetta.wheels);  // 3

isetta.drive = function(miles){
    this.odometer -= miles;
    return this.odometer;
};

console.log(isetta.drive(10));  // -10

console.log(tesla.drive(10));  // 10

Car.prototype.drive = function(miles){  // changes to proto propogate down the chain
    this.odometer += miles * 2;
    return this.odometer;
};

Car.prototype.odometer = 0; // cannot propogate changes to props in the constructor

// no change, local funct obscures proto's new version
console.log(isetta.drive(10)); // -20 
console.log(tesla.drive(10));  // 30 

// changing odometer on the prototype

var Car = function(wheelCount){
    this.wheels = wheelCount || 4;
};

Car.prototype.odometer = 0;
Car.prototype.drive = function(miles){
    this.odometer += miles;
    return this.odometer;
};

var tesla = new Car();

Car.prototype.odometer = 200;  // assign odometer a new value

console.log(tesla.drive(10));  // 210

Car.prototype.odometer = 2000;  // assign another value
// assignment fails because drive() set a local var for odometer as it runs

console.log(tesla.drive(10));  // 220

// Class by convention............................................................
//   class-based lang: state carried by instance, methods carried by classes, and
//     inheritance is only of structure and behavior.
//   js: state and methods carried by objects, while structure, behavior, and state
//     are all inherited

// Constructors
//    - constructors are nothing more than functions that when used with the new
//      operator return an instance of an object, initialized with sensible defaults

//    * rule of thumb: define only the properties and functions needed by all instances
//      that are derived from the constructor

var Car = function(){
    // instance property
    this.running = false;

    // instance method
    this.start = function(){
        return this.running = true;
    }
}

var tesla = new Car();

console.log(tesla.running); // false

console.log(tesla.start()); // true

// Instance Properties
//    - publicly accessible variable that describes a quality of the object instance
//    - instance props vary from obj to obj

// Instance Methods
//    - provide functionality useful to the object instance
//    - has access to instance properties
//    - can be defined two ways:
//          1) extending the instance by referencing the this keyword
//          2) setting the property directly to the prototype chain

var Car = function(){
    // instance property
    this.running = false;

    // instance method
    this.start = function(){
        return this.running = true;
    }
}

Car.prototype.stop = function(){
    return this.running = false;
}

var tesla = new Car();

console.log(tesla.running);  // false
console.log(tesla.start());  // true
console.log(tesla.stop());   // false

// Class properties
//    - variables that belong to the class object itself
//    - useful for properties that will never change

var Cake = function(){};
Cake.isTasty = true;

// Class Methods
//    - sometimes called static functions, are functions available only to the class
//    - can access class methods, but not properties of an object instance
//    - typically utility functions

// add a reverse class method to the built-in string object
String.reverse = function(s){
    return s.split('').reverse().join("");
};

console.log(String.reverse("egassem terces"));  // secret message













