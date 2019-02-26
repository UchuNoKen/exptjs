// Functions.................................................................

// Blocks
//    - the most basic control structure in JS

// Function arguments
//    - passing by reference vs. passing by value

var testObj = {
    foo: 'bar'
},
num = 1;

// pass by reference
;!function(obj){
    obj.foo = 'baz';
}(testObj);

console.log(testObj);  // {foo: 'baz'}

// pass by value
;!function(num){
    num = 2;
}(num);

console.log(num);  // 1

// Winning arguments
//    - arguments obj acts like a wildcard that allows you to access any number
//       of supplied arguments by iterating over this special obj like an array
//    - arguments.length returns only the number of arguments passed to it


var sum = function(){
    var len = arguments.length, total = 0;
    for(var x = 0; 0 < len; x++){
        total += arguments[x];
    }
    return total;
};

console.log(sum(1, 2, 3));

// using other array methods will fail

// Default Parameters (ES6) - ES6 for humans
// Allows for choosing default values for arguments in the method signature


// ES5 way
function getSum(a, b){
    a = (a !== undefined) ? a : 1;
    b = (b !== undefined) ? b : 31;
    
    console.log(a + b);
}

getSum();  // 32
getSum(1, 2);  // 3
getSum(10);  // 41
getSum(null, 6);  // 6

// ES6 way
var join = function(foo = 'foo', baz = (foo === 'foo') ? join(foo + "!") : 'baz'){
    return foo + ":" + baz;
}

console.log(join("hi", "there"));  // hi:there

console.log(join("hi"));  // use default parameter when not supplied

console.log(join(undefined, "there")); // use default param when undef supplied

console.log(join('foo')); // use expression which has access to current set of args

// ES6 version of getSum() using default parameters
var getSum2 = function(a = 1, b = 31){
    console.log(a + b);
}

getSum2();  // 32
getSum2(1, 2); // 3
getSum2(10);  // 41
getSum2(null, 6);  // 6

// * if no arg is supplied when funct called, default params used

var getAnswer = function(number = 42, item = " the universe"){
    console.log(number + " is the answer to " + item);
}

getAnswer(undefined, "life");  // 42 is the answer to life
getAnswer("life", undefined);  // life is the answer to the universe 

// Access other variables in the expression used as the default value
var defaultName = "John";

var getName = function(firstName = defaultName, lastName = "Doe"){
    console.log(firstName + " " + lastName);  // 'John Doe'
    console.log(arguments.length);  // 1
}

var getPrice = function(quantity = price, price = 5) {
    console.log(quantity + ", " + price);
}

getPrice(); // ReferenceError: price is not defined

// Default parameters work even when creating a dynamic function
var getNumber = new Function("number = 42", "return number;");
console.log(getNumber());  // 42

// Rest Operator
//  - ...precedes a named parameter
//  - parameter becomes an array that will gather up all remaining parameters
//     passed to the function

var showCollections = function(id, ...collection){
    console.log(collection instanceof Array);
}

showCollections(42, "movies", "music");  // true

// displaying the contents and length of arguments when using rest operator
var showCollections = function(id, ...collection){
    console.log(collection);
    console.log(showCollections.length);  // 1
};

showCollections(42, 'movies', 'music');  // ['movies', 'music']

// the length property ignores the rest parameter, only counting the parameters
//  excluding the rest parameter

var showCollections = function(id, ...collection){
    console.log(arguments.length);
};

showCollections(123, 'movies', 'music');  // 3

// arguments.length refers back to the original function call and three is the 
// number of arguments passed to the function

// the rest operator can be used in a function constructor

var getFirst = new Function('...args', 'return args[0]');
console.log(getFirst(1, 2));  // 1

// the above constructor has a rest parameter and returns the very first arg
// that is passed to it

// Rest Parameters (Understand ECMAScript 6)

// Inspecting the arguments object
function pick(object){
    let result = Object.create(null);

    // start at the second parameter
    for(let i = 1, len = arguments.length; i < len; i++){ // start at argmnts[1]
        result[arguments[i]] = objects[arguments[i]];
    }

    return result;
}

let book = {
    title: "Understanding ES6",
    author: "Zakas",
    year: 2016
};

let bookData = pick(book, "author", "year");

console.log(bookData.author); // "Zakas"
console.log(bookData.year);  // 2016

// pick method the ES6 way using rest parameters

function pick(object, ...keys){
    let result = Object.create(null);

    for(let i = 0, len = keys.length; i < len; i++){
        result[keys[i]] = object[keys[i]];
    }

    return result;
}

// keys is a rest parameter that contains all parameters passed after object, unlike
// arguments, which contains even the first parameter
// This allows for iterating over keys without worry

// Use arguments object to retrieve the extra arguments of rest
function retrieve(a, b){
    var args = Array.prototype.slice.call(arguments, retrieve.length);

    console.log(args);
}

retrieve(1, 2, 3, 4, 5);  // 3, 4, 5

// ES6 way...

function retrieve(a, b, ...args){
    console.log(args); // 3, 4, 5
}

retrieve(1, 2, 3, 4, 5); // 3, 4, 5

// Converting arguments object to an array 

// Rest parameter restrictions
//   1 - there can only be one rest parameter, and it must appear last
//   2 - cannot be used in an object literal setters as they are restricted to a
//       single argument

// How rest works with arguments

function checkArgs(...args){
    console.log(args.length);
    console.log(arguments.length);
    console.log(args[0], arguments[0]);
    console.log(args[1], arguments[1]);
}

checkArgs("a", "b");

// arguments always correctly reflects the parameters that were passed into a
// function regardless of rest parameter usage

// Spread Operator
//  ... precedes an array
//  - does essentially the reverse of a rest operator
//  - spreads out an array and passes the values into a function

let values = [200, 300, 400];
let newSet = [100, ...values, 500];

console.log(newSet);  // [100, 200, 300, 400, 500]
console.log(newSet.length);  // 5

// in this format, the spread operator is used like a concatentation or insertion
// mechanism where the values array is inserted in between existing values to assign
// the newly formed array to newSet

// rest: combine multiple arguments into a single array
// spread: specify an array that can be split into separate arguments and passed to a funct or method
let numbers = [-25, 100, 42, -1000];
console.log(Math.max(...numbers, 900));  // 900

// Math.max() is passed five arguments, and 900 is the max among them

// The above shows that spread operator spreads out the values of an array as 
// arguments in a function call.

// The spread operator can be used in a constructor function as well

// Using spread with missing parameters, parameters considered undefined
function printInput(...input){
    console.log(input);
}

let input = [,,];

printInput(...input);  // [undefined, undefined]


// Spread operator (Learning ES6)

// ES5 Providing the values of an array as function argument
function myFunction(a, b){
    return a + b;
}

var data = [1, 4];
var result = myFunction.apply(null, data);

console.log(result); // 5

// ES6 way to do the above
function myFunction(a, b){
    return a + b;
}

let data = [1, 4];
let result = myFunction(...data);

console.log(result); // 5

// Use spread to make array values a part of another array
let array1 = [2, 3, 4];
let array2 = [1, ...array1, 5, 6, 7];

console.log(array2);  // 1, 2, 3, 4, 5, 6, 7

// Use spread to push value of an array into another array

// ES5 way
var array1 = [2, 3, 4];
var array2 = [1];

Array.prototype.push.apply(array2, array1);

console.log(array2);  // 1, 2, 3, 4

// ES6 way

var array1 = [2, 3, 4];
var array2 = [1];

array2.push(...array1);

// Spreading multiple arrays

let array1 = [1];
let array2 = [2];
let array3 = [...array1, ...array2, ...[3, 4]];
let array4 = [5];
let array5 = [];

function mySpread(a, b, c, d, e){
    return a + b + c + d + e;
}

let result = mySpread(...array3, ...array4);
console.log(result);

