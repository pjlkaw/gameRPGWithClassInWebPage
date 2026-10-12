const levels = [
    { level: 1, levelName: "Peasant", xp: 0 },
    { level: 2, levelName: "Warrior", xp: 3 },
    { level: 3, levelName: "Mage", xp: 5 },
    { level: 4, levelName: "Knight", xp: 8 },
    { level: 5, levelName: "Veteran", xp: 10 },
    { level: 6, levelName: "Master", xp: 20 },
    { level: 7, levelName: "Champion", xp: 30 },
    { level: 8, levelName: "Legendary", xp: 40 },
    { level: 9, levelName: "Mythical", xp: 55 },
    { level: 10, levelName: "God of War", xp: 100 }
];

function registerLog(message) {
    const log = document.getElementById("log-text");
    log.textContent += `${message}\n`;
}

class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.status = true;
        this.damage = 20;
        this.xp = 0;
        this.level = levels[0].levelName;
    }

    attackTarget(monster) {
        monster.health -= this.damage;
        if (monster.health < 0) monster.health = 0;
    }

    addXp(amount) {
        this.xp += amount;
        this.checkLevel();
        const xpLog = `Level: ${this.level} - XP: ${this.xp}`;
        registerLog(xpLog);
    }

    heal() {
        this.health += 10;
    }

    checkLevel() {
        for (let i = 0; i < levels.length; i++) {
            if (this.xp >= levels[i].xp) {
                this.level = levels[i].levelName;
            }
        }
    }
}

// Create player
const player = new Player("kaw");
registerLog(`Name: ${player.name}`);
registerLog(`Level: ${player.level} - XP: ${player.xp}`);

const separatorLog = "========================\n";
registerLog(separatorLog);

class Monster {
    constructor(name) {
        this.name = name;
        this.health = 50;
        this.damage = 5;
        this.status = true;
    }

    attackTarget(player) {
        player.health -= this.damage;
    }
}

function combat() {
    // Create monster
    const monster = new Monster("Zombie");

    while (monster.health > 0) {
        playerDamage(monster);
        if (monster.status) {
            monsterDamage(player, monster);
        }
    }

    if (player.health <= 0) {
        document.getElementById("modal-died-container").style.display = "flex";
    }

    levelUp();
}

// Player attacks the target
function playerDamage(target) {
    let currentMonsterHealth = target.health;
    registerLog(`${target.name}'s current health: ${currentMonsterHealth}`);

    player.attackTarget(target);
    registerLog(`${target.name} took ${player.damage} damage from ${player.name}`);

    currentMonsterHealth = target.health;
    registerLog(`${target.name}'s health after the attack: ${currentMonsterHealth}`);

    if (target.health <= 0) {
        target.status = false;
        registerLog(`${target.name} died`);
    }

    registerLog(separatorLog);
}

// Monster attacks the player
function monsterDamage(player, monster) {
    let currentPlayerHealth = player.health;
    registerLog(`${player.name}'s current health: ${currentPlayerHealth}`);

    registerLog(`${player.name} took ${monster.damage} damage from ${monster.name}`);
    monster.attackTarget(player);

    currentPlayerHealth = player.health;
    registerLog(`${player.name}'s health after the attack: ${currentPlayerHealth}`);

    registerLog(separatorLog);
}

function levelUp() {
    const amount = 2;
    registerLog(`${player.name} gained ${amount} XP`);
    player.addXp(amount);

    const playerHealthStats = document.getElementById("player-health");
    const playerLevelStats = document.getElementById("player-level");

    playerHealthStats.textContent = "Health: " + player.health;
    playerLevelStats.textContent = "Level: " + player.level + " - XP: " + player.xp;
}

function initializeApplication() {
    document.getElementById("attack-button").addEventListener("click", () => {
        document.getElementById("log-text").textContent = "";
        combat();
        registerLog(separatorLog);
    });

    document.getElementById("heal-button").addEventListener("click", () => {
        player.heal();
        registerLog(`${player.name} healed for 10 health`);
        document.getElementById("player-health").textContent = "Health: " + player.health;
    });

    document.getElementById("player-health").textContent = "Health: " + player.health;

    document.querySelector(".restart-button").addEventListener("click", () => {
        location.reload();
    });
}

initializeApplication();