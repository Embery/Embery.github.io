const spans = {
    record: document.getElementById("record"),
    shot: document.getElementById("shot"),
    hit: document.getElementById("hit"),
    dead: document.getElementById("dead")
};

const enemy = document.getElementById("enemy");
const again = document.getElementById("again");

const play = {
    record: 0,
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

const init = () => {
    enemy.addEventListener("click", fire);
}

const show = {
    hit() {},
    miss(elem) {
        this.changeClass(elem, "miss");
    },
    dead() {},
    changeClass(elem, newClass) {
        elem.className = newClass;
    }
};

const fire = (event) => {
    if (event.offsetX >= 0 && event.offsetX <= 30 && event.offsetY >= 0 && event.offsetY <= 30) {
        const target = event.target;
        if (target.className.length == 0) {
            show.miss(target);
            play.updateData = "shot";
        }
    }
}

init();