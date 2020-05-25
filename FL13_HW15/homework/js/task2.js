'use strict'
function Vehicle(color, engine) {
  this.color = color;
  this.engine = engine;
  this.maxSpeed = 70;
  this.maxSpeedDuringTheDrive = 0;
  this.timerIdDrive = 0;
  this.currentSpeed = 0;
  this.timerIdStop = 0;
}
Vehicle.prototype.getInfo = function() {
  return {
    engine: this.engine,
    color: this.color,
    maxSpeed: this.maxSpeed,
    model: this.model || 'unknown model'
  }
}
Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
  if (this.timerIdDrive === 0 && this.timerIdStop === 0) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
  } else {
    console.log(`You can't upgrade engine while vehicle is driving.`);
  }
}
Vehicle.prototype.drive = function() {
  if (this.timerIdStop !== 0) {
    clearInterval(this.timerIdStop);
    this.timerIdStop = 0;
  }
  if (this.timerIdDrive === 0) {
    this.timerIdDrive = setInterval(() => {
      this.currentSpeed += 20;
      console.log(this.currentSpeed);
      if (this.currentSpeed > this.maxSpeed) {
        console.log('speed is too high, SLOW DOWN!');
      }
      if (this.currentSpeed > this.maxSpeedDuringTheDrive) {
        this.maxSpeedDuringTheDrive = this.currentSpeed;
      }
    }, 2000);
  } else {
    console.log('Already drive');
  }
}
Vehicle.prototype.stop = function() {
  clearInterval(this.timerIdDrive);
  this.timerIdDrive = 0;
  if (this.timerIdStop === 0) {
    this.timerIdStop = setInterval(() => {
      this.currentSpeed -= 20;
      console.log(this.currentSpeed); 
      if (this.currentSpeed <= 0) {
        console.log(`Vehicle is stopped. Maximum speed during the drive was ${this.maxSpeedDuringTheDrive}`);
        clearInterval(this.timerIdStop);
        this.maxSpeedDuringTheDrive = 0;
      }     
    }, 1500);
  } else {
    console.log('Already slows down');
  }
}

// Car
function Car(model, color, engine) {
  Vehicle.call(this, color, engine);
  this.model = model;
  this.maxSpeed = 80;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.stop = function() {
  clearInterval(this.timerIdDrive);
  this.timerIdDrive = 0;
  if (this.timerIdStop === 0) {
    this.timerIdStop = setInterval(() => {
      this.currentSpeed -= 20;
      console.log(this.currentSpeed); 
      if (this.currentSpeed <= 0) {
        console.log(`Car ${this.model}  is stopped. Maximum speed during the drive was ${this.maxSpeedDuringTheDrive}`);
        clearInterval(this.timerIdStop);
        this.maxSpeedDuringTheDrive = 0;
      }     
    }, 1500);
  } else {
    console.log('Already slows down');
  }
}
Car.prototype.changeColor = function(newColor) {
  if (this.color === newColor) {
    console.log('The selected color is the same  as the previous, please choose another one');
  } else {
    this.color = newColor;
  }
}

// Motorcycle
function Motorcycle(model, color, engine) {
  Vehicle.call(this, color, engine);
  this.model = model;
  this.maxSpeed = 90;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
Motorcycle.prototype.drive = function() {
  if (this.timerIdStop !== 0) {
    clearInterval(this.timerIdStop);
    this.timerIdStop = 0;
  }
  if (this.timerIdDrive === 0) {
    console.log(`Let's drive`);
    this.timerIdDrive = setInterval(() => {
      this.currentSpeed += 20;
      console.log(this.currentSpeed);
      if (this.currentSpeed > this.maxSpeed) {
        console.log('speed is too high, SLOW DOWN!');
      }
      if (this.currentSpeed > this.maxSpeedDuringTheDrive) {
        this.maxSpeedDuringTheDrive = this.currentSpeed;
      }
      if (this.currentSpeed - this.maxSpeed >= 30 ) {
        console.log('Engine overheating!');
        this.stop();
      }
    }, 2000);
  } else {
    console.log('Already drive');
  }
}
Motorcycle.prototype.stop = function() {
  clearInterval(this.timerIdDrive);
  this.timerIdDrive = 0;
  if (this.timerIdStop === 0) {
    this.timerIdStop = setInterval(() => {
      this.currentSpeed -= 20;
      console.log(this.currentSpeed); 
      if (this.currentSpeed <= 0) {
        console.log(`Motorcycle ${this.model} is stopped. Good drive.`);
        clearInterval(this.timerIdStop);
        this.maxSpeedDuringTheDrive = 0;
      }     
    }, 1500);
  } else {
    console.log('Already slows down');
  }
}