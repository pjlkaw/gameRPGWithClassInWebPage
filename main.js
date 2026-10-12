const levels = [
    { level: 1, levelName: "Campones", xp: 0 },
    { level: 2, levelName: "Guerreiro", xp: 3 },
    { level: 3, levelName: "Mago", xp: 5 },
    { level: 4, levelName: "Cavaleiro", xp: 8 },
    { level: 5, levelName: "Veterano", xp: 10 },
    { level: 6, levelName: "Mestre", xp: 20 },
    { level: 7, levelName: "Campeão", xp: 30 },
    { level: 8, levelName: "Lendário", xp: 40 },
    { level: 9, levelName: "Mítico", xp: 55 },
    { level: 10, levelName: "Deus da Guerra", xp: 100 }
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
        const xpLog = `Nível: ${this.level} - XP: ${this.xp} \n`;
        registerLog(xpLog);
    }

    heal() {
        this.health += 10
    }

    checkLevel() {
        for (let i = 0; i < levels.length; i++) {
            if (this.xp >= levels[i].xp) {
                this.level = levels[i].levelName;
            }
        }
    }
}

// Create Player
const player = new Player("kaw");
const playerNameLog = `Nome: ${player.name} `;
registerLog(playerNameLog);

const playerLevelLog = `Nível: ${player.level} - XP: ${player.xp} `;
registerLog(playerLevelLog);

const separatorLog = `========================\n`;
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
    const monster = new Monster("Zumbi");

    while (monster.health > 0) {
        playerDamage(monster);
        if (monster.status) {
            monsterDamage(player, monster);
        }
    }
    if (player.health <= 0 ) {
        document.getElementById("modal-died-container").style.display = "flex"
    }
    levelUp()
}

// Player applies damage
function playerDamage(target) {
    let currentMonsterHealth = target.health;
    const monsterCurrentHealthLog = `vida atual de ${target.name}: ${currentMonsterHealth}`;
    registerLog(monsterCurrentHealthLog);
    
    player.attackTarget(target);
    const monsterDamageTakenLog = `${target.name} recebeu ${player.damage} de dano de ${player.name}`;
    registerLog(monsterDamageTakenLog);
    
    currentMonsterHealth = target.health;
    const monsterHealthAfterAttackLog = `vida atual de ${target.name}: ${currentMonsterHealth}\n`;
    registerLog(monsterHealthAfterAttackLog);
    
    if (target.health <= 0) {
        target.status = false;
        const monsterDeathLog = `${target.name} morreu\n`;
        registerLog(monsterDeathLog);
    }
    registerLog(separatorLog);
}

// Player receives damage
function monsterDamage(player, monster) {
    let currentPlayerHealth = player.health;
    const playerCurrentHealthLog = `vida atual de ${player.name}: ${currentPlayerHealth}`;
    registerLog(playerCurrentHealthLog);

    const playerReceivesDamageLog = `${player.name} recebeu ${monster.damage} de dano do ${monster.name}`;
    registerLog(playerReceivesDamageLog);
    monster.attackTarget(player);

    currentPlayerHealth = player.health;
    const playerHealthAfterAttackLog = `vida atual de ${player.name}: ${currentPlayerHealth} \n`;
    registerLog(playerHealthAfterAttackLog);

    registerLog(separatorLog);
}

function levelUp() {
    const amount = 2
    const playerXpGainLog = `${player.name} ganhou ${amount} de XP`;
    registerLog(playerXpGainLog);
    player.addXp(amount);

    const playerHealthStats = document.getElementById("player-health");
    const playerLevelStats = document.getElementById("player-level");

    playerHealthStats.textContent = "Vida: " + player.health;
    playerLevelStats.textContent = "Level: " + player.level + " - XP: " + player.xp;
}

function initializeApplication() {
    document.getElementById('attack-button').addEventListener('click', () => {
        document.getElementById("log-text").innerHTML = "";
        combat();
        registerLog(separatorLog);
    });

    document.getElementById("heal-button").addEventListener('click', () => {
        player.heal()
        registerLog(`${player.name} Curou 10 de vida`)
        document.getElementById("player-health").textContent = "Vida: " + player.health;
    })
    
    const playerHealth = document.getElementById('player-health');
    playerHealth.textContent = "Health: " + player.health;

    document.querySelector(".restart").addEventListener("click", () => {
    location.reload();
});
}
initializeApplication();