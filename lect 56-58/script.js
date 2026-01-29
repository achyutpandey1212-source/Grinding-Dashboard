// DAY 58 QUESTION BANK 1 - SOLVED
// ___________________________________________________________________________________________________________________________________


// SECTION 1: Objects and OOPS Thinking (Foundation)

// 	1.	Create a user object that stores name and email and has a login method which prints “User logged in”.
// 	2.	Imagine you now have 5 users.
// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.
// 	3.	Create a product object that stores name and price and has a method which returns the final price after discount.

// The goal of this section is to understand why keeping data and behavior together makes code easier to manage.


// PART 1&2
// // APPROACH 1
// let user1 = {
//     name: "harsh",
//     email: "h@h.h",
//     login(){
//         console.log("User logged in");
//     }
// }

// let user2 = {
//     name: "harshal",
//     email: "b@b.b",
//     login(){
//         console.log("User logged in");
//     }
// }

// let user3 = {
//     name: "hllw",
//     email: "j@j.k",
//     login(){
//         console.log("User logged in");
//     }
// }

// let user4 = {
//     name: "max",
//     email: "m@m.m",
//     login(){
//         console.log("User logged in");
//     }
// }

// let user5 = {
//     name: "kash",
//     email: "n@n.n",
//     login(){
//         console.log("User logged in");
//     }
// }

// APPROACH 2
// class User{
//     constructor(name, email){
//         this.name = name;
//         this.email = email;
//     }

//     login(){
//         console.log("User logged in");
//     }
// }


// const p1 = new User("adarsh", "h@h.h");
// const p2 = new User("m", "m@m.m");
// const p3 = new User("k","k@k.k");
// const p4 = new User("j","j@j.j");
// const p5 = new User("n","n@n.n");

// PART 3

// let product = {
//     name: "sam",
//     price: 2934,
//     discount(){
//         let finPrice = product.price - 0.1*product.price;
//         // console.log(`Final price after discount = ${finPrice}`);
//         return finPrice;
//     }
// }
// ----------------------------------------------------------------------

// ⸻

// SECTION 2: Classes and Objects
// 	4.	Create a Car class with the following:
// brand
// speed
// a drive method that prints the car brand and speed
// 	5.	Create two different car objects from the same class and verify that their data is different.
// 	6.	Answer this in your own words:
// If classes did not exist, how would you write this logic and what problems might occur when the project becomes large?

// ANSWER ->
// class Car{
//     constructor(brand, speed){
//         this.brand = brand;
//         this.speed = speed;
//     }

//     drive(){
//         console.log(this.brand, this.speed);
//     }
// }


// const p1 = new Car("bmw", 294);
// const p2 = new Car("mercedes", 200);


// _____________________________________________________________________________________________________


// ⸻

// SECTION 3: Constructor and this keyword
// 	7.	Create a Student class whose constructor accepts name and roll number.
// Add a method introduce that prints both values.
// 	8.	Inside the constructor, set values using this.
// Then try removing this and notice what error occurs and why.
// 	9.	Create an object with two methods:
// One method using a normal function
// One method using an arrow function

// Inside both, print this and observe the difference.

// The goal is to clearly understand how this works and when it changes.


// PART-I
// class Student {
//     constructor(name, rollNum){
//         this.name = name;
//         this.rollNum = rollNum;
//     }

//     introduce(){
//         console.log(this.name, this.rollNum);
//     }
// }

// const s1 = new Student("adarsh", 25);

// PART-II

// let obj = {
//     func1: function(){
//         console.log(this); // logs the parent object, in this case "obj"
//     },

//     func2: ()=>{
//         console.log(this); // logs window object
//     } 
// }

// obj.func1();
// obj.func2();

// ⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻


// ⸻

// SECTION 4: Constructor Functions and Prototypes
// 	10.	Create a User constructor function (do not use class syntax).
// 	11.	Add a login method in two ways:
// First, inside the constructor
// Then, move the method to the prototype
// 	12.	Create two User objects and compare their login methods using equality.
// Explain why the result is true or false.

// The purpose here is to understand how prototypes help share behavior efficiently.


// PART 10-11

// function User(name, email){
//     this.name = name;
//     this.email = email;

//     this.login = function (){
//         console.log("user logged in");
//     }
// }

// const u1 = new User("sam", "s@s.s");
// const u2 = new User("max", "m@m.m");

// console.log(u1.login === u2.login); //False.... Because every time you call new User(...), the constructor runs again and creates a brand-new this.login function, so u1.login and u2.login point to different function objects in memory.

// PART 12

// function User(name, email){
//     this.name = name;
//     this.email = email;
// }

// User.prototype.login = function (){
//         console.log("user logged in");
//     }

// const u1 = new User("sam", "s@s.s");
// const u2 = new User("max", "m@m.m");

// console.log(u1.login === u2.login); //True... When a function is used with new, the created object’s internal prototype is User.prototype, so both objects resolve login from the same shared prototype function.
// ⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

// ⸻

// SECTION 5: call, apply, bind
// 	13.	Create a function that prints this.name.
// 	14.	Create an object that contains a name property.

// Use call to run the function using the object
// Use apply to run the function using the object
// Use bind to create a new function and then call it
// 	15.	Borrow a method from one object and run it for another object using call.

// The goal is to understand how this can be manually controlled.


// PART 13

// function printName(a, b){
//     console.log(`hello! ${this.name}`, a+b);
// }

// printName(5, 6); //prints sam for some reason :/

// // PART 14

// let obj = {
//     name: "adarsh",
// }
// printName.call({name: "adarsh"}, 7, 9); //prints "hello! adarsh NaN"
// printName.apply({name: "adarsh"}, [1,2]); //prints "hello! adarsh 3"

// let f1 = printName.bind({name: "adarsh"}, 5,6);
// f1(); // prints "hello! adarsh 11"


// let obj1 = {
//     name : "sam",
//     age: 25,
//     method: function(){
//         console.log(`${this.name} user logged in`)
//     }
// }

// let obj2 = {
//     name: "max",
//     age: 26
// }

// obj1.method.call(obj2);
// obj1.method()



// ⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻
