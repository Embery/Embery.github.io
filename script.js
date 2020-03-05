const spans = {
    record: document.getElementById("record"),
    shot: document.getElementById("shot"),
    hit: document.getElementById("hit"),
    dead: document.getElementById("dead"),
    header: document.querySelector(".header")
};

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
    ships: [{
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        },
        {

            location: ['11', '12', '13'],
            hit: ['', '', '']
        },
        {


            location: ['69', '79'],
            hit: ['', '']
        },
        {

            location: ['32'],
            hit: ['']
        }
    ],
}

const init = () => {
    enemy.addEventListener("click", fire);
    play.render();
    again.addEventListener("click", () => {
        location.reload();
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
    if (event.offsetX >= 0 && event.offsetX <= 30 && event.offsetY >= 0 && event.offsetY <= 30) {
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