const spans = {
    record: document.getElementById("record"),
    shot: document.getElementById("shot"),
    hit: document.getElementById("hit"),
    dead: document.getElementById("dead"),
    header: document.querySelector(".header")
};

const poleX = 10; //Количество строк
const poleY = 10; //Количество столбцов
const fieldW = 30; //Ширина клетки в разметки потому что я проверяю на клик внутри клетки как не очень умная
const forbW = 1; // Размер запретной зоны - 1 клетка вокруг корабля

const enemy = document.getElementById("enemy");
const again = document.getElementById("again");

const play = {
    record: (!!localStorage.getItem("seaBattleRecord")) ? localStorage.getItem("seaBattleRecord") : 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data]++;
        this.render();
    },
    render() {
        spans.shot.textContent = play.shot;
        spans.record.textContent = play.record;
        spans.hit.textContent = play.hit;
        spans.dead.textContent = play.dead;
    }
};

const game = {
    ships: [],
    optionShip: {
        count: [1, 2, 3, 4],
        size: [4, 3, 2, 1]
    },
    collision: new Set(),
    generateShip() {
        for (let i = 0; i < this.optionShip.count.length; ++i) {
            for (let j = 0; j < this.optionShip.count[i]; ++j) {
                const size = this.optionShip.size[i];
                const ship = this.generateOptionsShip(size);
                this.ships.push(ship);
            }
        }
    },
    generateOptionsShip(shipSize) {
        const ship = {
            hit: [],
            location: []
        }
        const direction = Math.random() < 0.5; //true-horizontal, false - vertical
        let x, y;
        if (direction) {
            x = Math.floor(Math.random() * poleX);
            y = Math.floor(Math.random() * (poleY - shipSize));
        } else {
            y = Math.floor(Math.random() * poleY);
            x = Math.floor(Math.random() * (poleX - shipSize));
        }
        for (let i = 0; i < shipSize; i++) {
            if (direction) {
                ship.location.push(x + '' + y++);
            } else {
                ship.location.push(x++ + '' + y);
            }
            ship.hit.push('');
        }

        if (this.checkCollision(ship.location)) {
            return this.generateOptionsShip(shipSize);
        }

        this.addCollision(ship.location);
        return ship;
    },
    checkCollision(location) {
        for (const coord of location) {
            if (this.collision.has(coord)) {
                return true;
            }
        }
        return false;
    },
    addCollision(location) {
        for (let i = 0; i < location.length; ++i) {
            const startX = location[i][0] - forbW;
            const startY = location[i][1] - forbW;
            const tx = 2 * forbW + 1; // длина запретной полоски - 2 ширины "зоны отчуждения" + сама клетка
            for (let j = 0; j < tx; ++j) {
                for (let k = 0; k < tx; ++k) {
                    if ((startX + j) >= 0 && (startY + k) >= 0 && ((startX + j) < poleX) && ((startY + k) < poleY))
                        this.collision.add((startX + j) + '' + (startY + k));
                }
            }
        }
    }
}

const init = () => {
    enemy.addEventListener("click", fire);
    play.shot = 0;
    play.hit = 0;
    play.dead = 0;
    play.render();
    game.ships = [];
    game.collision = new Set();
    game.generateShip();
    for (elem of document.querySelectorAll(".miss")) {
        elem.classList.remove("miss");
    }
    for (elem of document.querySelectorAll(".hit")) {
        elem.classList.remove("hit");
    }
    for (elem of document.querySelectorAll(".dead")) {
        elem.classList.remove("dead");
    }
    again.addEventListener("click", init);
    spans.record.addEventListener("dblclick", () => {
        play.record = 0;
        localStorage.clear();
        play.render();
    })
}

const show = {
    hit(elem) {
        this.changeClass(elem, "hit");
    },
    miss(elem) {
        this.changeClass(elem, "miss");
    },
    dead(elem) {
        this.changeClass(elem, "dead");
    },
    changeClass(elem, newClass) {
        elem.className = newClass;
    }
};

const fire = (event) => {
    if (event.offsetX >= 0 && event.offsetX <= fieldW && event.offsetY >= 0 && event.offsetY <= fieldW) {
        const target = event.target;
        if (target.className.length > 0) {
            return;
        }
        show.miss(target);
        play.updateData = "shot";
        for (let i = 0; i < game.ships.length; ++i) {
            const ship = game.ships[i];
            const index = ship.location.indexOf(target.id);
            if (index >= 0) {
                show.hit(target);
                play.updateData = "hit";
                ship.hit[index] = 'x';
                if (ship.hit.indexOf('') < 0) {
                    play.updateData = "dead";
                    for (const cell of ship.location) {
                        show.dead(document.getElementById(cell));
                    }
                    if (spans.dead.textContent == game.ships.length) {
                        spans.header.textContent = "Game over >_<";
                        spans.header.style.color = "red";
                        enemy.removeEventListener("click", fire);
                        if (play.record > play.shot || !play.record) {
                            localStorage.setItem("seaBattleRecord", play.shot);
                            play.record = play.shot;
                            play.render();
                        }
                    }
                }
            }
        }
    }
}

init();