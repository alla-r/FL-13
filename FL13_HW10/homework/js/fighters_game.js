class Fighter {
  constructor(obj) {
    this._name = obj.name;
    this._damage = obj.damage;
    this._strength = obj.strength;
    this._agility = obj.agility;
    this._hp = obj.hp;
    this.totalHp = obj.hp;
    this.amountOfWins = 0;
    this.amountOfLosses = 0;
  }
  getName() {
    return this._name;
  }

  getDamage() {
    return this._damage;
  }

  getStrength() {
    return this._strength;
  }

  getAgility () {
    return this._agility;
  }

  getHealth() {
    return this._hp;
  }

  attack(obj) {
    const probabilityOfSuccess = 100 - (obj._strength + obj._agility);
    const randomSuccess = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    
    //console.log('2: ', randomSuccess);
    if ( probabilityOfSuccess >= randomSuccess ) {
      obj._hp = obj._hp - this._damage;
      console.log(`${this._name} makes ${this._damage} damage to ${obj._name}`);
     // console.log(`Defender hp: ${obj._hp}`);
    } else {
      console.log(`${this._name} attack missed`);
    }
  }

  logCombatHistory() {
    console.log(`Name: ${this._name}, Wins: ${this.amountOfWins}, Losses: ${this.amountOfLosses}`);
  }

  heal (healthPoints) {
    this._hp += healthPoints;
    if ( this._hp > this.totalHp ) {
      this._hp = this.totalHp;
    }

   // console.log('totalHp: ', this._hp)
  }

  dealDamage (healthPoints) {
    this._hp -= healthPoints;
    if ( this._hp < 0 ) {
      this._hp = 0;
    }

   // console.log('totalHp: ', this._hp)
  }

  addWin () {
    this.amountOfWins++;
    console.log('Wins++ ', this.amountOfWins);
  }

  addLoss () {
    this.amountOfLosses++;
    console.log('Loss++ ', this.amountOfLosses);
  }
}

const battle = function (fighter1, fighter2) {
  if ( fighter1.getHealth() === 0 ) {
    console.log(`${fighter1._name} is dead and can't fight.`);
    return void 0;
  }
  if ( fighter2.getHealth() === 0 ) {
    console.log(`${fighter2._name} is dead and can't fight.`);
    return void 0;
  }

  fighter1.attack(fighter2);
  console.log('victim name: ', fighter2._name);
  if ( fighter2._hp <= 0 ) {
    fighter1.addWin();
    fighter2.addLoss();
    console.log(`${fighter1._name} has won!`);
  } else {
    battle(fighter2, fighter1);
  }
}

let fighter1 = new Fighter({name: 'Maximus', damage: 20, strength: 20, agility: 15, hp: 100});
let fighter2 = new Fighter({name: 'Commodus', damage: 25, strength: 25, agility: 20, hp: 90});

battle(fighter1, fighter2);