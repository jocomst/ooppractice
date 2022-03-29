'use strict';

const Person = function (name, age) {
  this.name = name;
  this.age = age;

  //never create method inside of constructor
  this.calcBirthYear = function () {
    return 2037 - this.age;
  };
};

const Student = function (name, age, course) {
  Person.call(this, name, age);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

const mike = new Student('Mike', 2020, 'Comp Sci');

Student.prototype.introduce = function () {
  console.log(`My name is ${this.name} and I study ${this.course}`);
};

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
// Student.prototype.constructor = Student;
console.log(mike instanceof Student);
console.log(mike instanceof Person);

console.dir(Student.prototype.constructor);
// 1. new empty object is created
// 2. function is called, this keyword is set to new empty object
// 3. New object is linked to prototype
// 4. Object is returned from constructor

// const matilda = new Person('Matilda', 25);
// const jack = new Person('Jack', 65);
// console.log(matilda, jack);

// console.log(jack instanceof Person);

// class Dog {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getName() {
//     return this.name;
//   }
// }

// const doggo = new Dog('bob', 7);

// console.log(doggo.getName());

// coding challenge

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

function EV(make, speed, battery) {
  Car.call(this, make, speed);
  this.battery = battery;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.battery -= this.battery * 0.01;
  console.log(
    `This ${this.make} is going ${this.speed} km/hr with a charge of ${this.battery}`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`This ${this.make} is going ${this.speed}`);
};

EV.prototype.chargeBattery = function (chargeTo) {
  this.battery = chargeTo;
};

const tesla = new EV('Tesla', 120, 100);
const oldTesla = new EV('Tesla', 40, 72);
oldTesla.chargeBattery(80);

console.log(oldTesla);
