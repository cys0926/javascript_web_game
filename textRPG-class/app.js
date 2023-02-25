const $startScreen = document.getElementById("start-screen");
const $startButton = document.getElementById("start");
const $heroState = document.getElementById("hero-stat");
const $heroName = document.getElementById("hero-name");
const $heroLevel = document.getElementById("hero-level");
const $heroHP = document.getElementById("hero-hp");
const $heroXP = document.getElementById("hero-xp");
const $heroAtt = document.getElementById("hero-att");
const $gameMenu = document.getElementById("game-menu");
const $battleMenu = document.getElementById("battle-menu");
const $monsterName = document.getElementById("monster-name");
const $monsterHP = document.getElementById("monster-hp");
const $monsterAtt = document.getElementById("monster-att");
const $message = document.getElementById("message");

let game = null;

class Game {
  constructor(name) {
    this.hero = null;
    this.monster = null;
    this.startGame(name);
    this.monsterList = [
      { name: "슬라임", hp: 25, att: 10, xp: 10 },
      { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
      { name: "마왕", hp: 150, att: 35, xp: 50 },
    ];
    $gameMenu.addEventListener("submit", this.onGameInput.bind(this));
    $battleMenu.addEventListener("submit", this.onBattleInput.bind(this));
  }

  startGame = (name) => {
    this.hero = new Hero(name);
    this.drawHeroState();
    this.drawScreen("game");
  };

  onGameInput(event) {
    const input = event.target["menu-input"].value;
    event.preventDefault();

    const healHero = () => {
      this.hero.hp = this.hero.maxHp;
      this.drawHeroState();
      this.drawMessage("HP가 회복되었습니다.");
    };

    switch (input) {
      case "1":
        const monster =
          this.monsterList[Math.floor(Math.random() * this.monsterList.length)];
        this.monster = new Monster(
          monster.name,
          monster.hp,
          monster.xp,
          monster.att
        );
        this.drawScreen("battle");
        this.drawMonsterState();
        break;
      case "2":
        healHero();
        break;
      case "3":
        break;
    }
  }

  onBattleInput = (event) => {
    const input = event.target["battle-input"].value;
    event.preventDefault();
    if (!["1", "2", "3"].includes(input)) {
      alert("1, 2, 3 중 하나만 입력가능합니다.");
      return;
    }

    const attackMonster = () => {
      this.hero.attack(this.monster);
      this.monster.attack(this.hero);
      if (this.hero.hp <= 0) {
        this.drawMessage(
          `${this.hero.level} 레벨에서 전사. 새 주인공을 생성하세요.`
        );
        this.quit();
      } else if (this.monster.hp <= 0) {
        this.drawMessage(
          `${this.monster.name}을 잡아 ${this.monster.xp} 경험치를 얻었습니다.`
        );
        this.hero.getXP(this.monster.xp);
        this.monster = null;
        this.drawScreen("game");
      } else {
        this.drawMessage(
          `${this.hero.att}의 데미지를 주고, ${this.monster.att}의 데미지를 받았습니다.`
        );
      }
      this.drawHeroState();
      this.drawMonsterState();
    };

    const healHero = () => {
      this.hero.hp = Math.min(this.hero.maxHp, this.hero.hp + 20);
      this.monster.attack(this.hero);
      this.drawMessage(
        `체력을 20 회복하고 ${this.monster.att}의 데미지를 받았습니다.`
      );
      this.drawHeroState();
    };

    const run = () => {
      this.drawScreen("game");
      this.drawMessage(`${this.monster.name}으로부터 도망쳤습니다.`);
      this.monster = null;
      this.drawMonsterState();
    };

    switch (input) {
      case "1":
        attackMonster();
        break;
      case "2":
        healHero();
        break;
      case "3":
        run();
        break;
    }
  };

  quit() {
    this.hero = null;
    this.monster = null;
    this.drawHeroState();
    this.drawMonsterState();
    $gameMenu.removeEventListener("submit", this.onGameInput);
    $battleMenu.removeEventListener("submit", this.onBattleInput);
    this.drawScreen("start");
    game = null;
  }

  drawScreen(screen) {
    if (screen === "start") {
      $startScreen.style.display = "block";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "none";
    } else if (screen === "game") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block";
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";
    }
  }

  drawHeroState() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = "";
      $heroLevel.textContent = "";
      $heroHP.textContent = "";
      $heroXP.textContent = "";
      $heroAtt.textContent = "";
      return;
    }
    $heroName.textContent = `"${hero.name}"님!`;
    $heroLevel.textContent = `Lv : ${hero.level}`;
    $heroHP.textContent = `HP : ${hero.hp} / ${hero.maxHp}`;
    $heroXP.textContent = `경험치 : ${hero.xp} / ${hero.level * 15}`;
    $heroAtt.textContent = `공격력 : ${hero.att}`;
  }

  drawMonsterState() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = "";
      $monsterHP.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHP.textContent = `HP : ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent = `공격력 : ${monster.att}`;
  }

  drawMessage(message) {
    $message.textContent = message;
  }
}

class Unit {
  constructor(name, hp, xp, att) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.xp = xp;
    this.att = att;
  }

  attack = (target) => {
    target.hp -= this.att;
  };
}

class Hero extends Unit {
  constructor(name) {
    super(name, 100, 0, 10);
    this.level = 1;
    this.name = name;
  }

  getXP = (xp) => {
    this.xp += xp;
    if (this.xp >= this.level * 15) {
      this.xp -= this.level * 15;
      this.level += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
    }
  };
}

class Monster extends Unit {
  constructor(name, hp, xp, att) {
    super(name, hp, xp, att);
  }
}

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  game = new Game(name);
});
