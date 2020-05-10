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

  attack(defender) {
    const probabilityOfSuccess = 100 - (defender._strength + defender._agility);
    const randomSuccess = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    
    if ( probabilityOfSuccess >= randomSuccess ) {
      defender._hp = defender._hp - this._damage;
      console.log(`${this._name} makes ${this._damage} damage to ${defender._name}`);
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
  }

  dealDamage (healthPoints) {
    this._hp -= healthPoints;
    if ( this._hp < 0 ) {
      this._hp = 0;
    }
  }

  addWin () {
    this.amountOfWins++;
  }

  addLoss () {
    this.amountOfLosses++;
  }
}

const battle = function (fighter1, fighter2) {
  // Validation
  if ( fighter1.getHealth() === 0 ) {
    console.log(`${fighter1._name} is dead and can't fight.`);
    return void 0;
  }
  if ( fighter2.getHealth() === 0 ) {
    console.log(`${fighter2._name} is dead and can't fight.`);
    return void 0;
  }

  // Fight
  fighter1.attack(fighter2);
  if ( fighter2._hp <= 0 ) {
    fighter1.addWin();
    fighter2.addLoss();
    console.log(`${fighter1._name} has won!`);
  } else {
    battle(fighter2, fighter1);
  }
}