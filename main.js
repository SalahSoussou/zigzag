const cnv = document.getElementById('cnv');
const ctx = cnv.getContext('2d');



cnv.width = window.innerWidth;
cnv.height = window.innerHeight;


class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const shortSide = 50,
    longSide = 150,
    N = 10;

let x = 0,
    y = 0;

const rectangles = [];

const player = new Player(
shortSide/2, shortSide/2, shortSide*0.2
)


for (let i = 0; i < N; i++) {
    if(i % 2 === 0) {
        const [width, height] = [longSide, shortSide];
        rectangles.push(new Rectangle(x, y, width, height));
        x += width;
    }else {
        const [width, height] = [shortSide, longSide];
        rectangles.push(new Rectangle(x, y, width, height));
        y += height;
    }
}

let isOnTrack = false;

for (let i = 0; i < rectangles.length; i++) {
    const rectangle = rectangles[i];
    if(player.x > rectangle.x && player.x < rectangle.x + rectangle.width && player.y > rectangle.y && player.y < rectangle.y + rectangle.height) {
        isOnTrack = true;
        console.log('is on track');
    }
}

rectangles.forEach(rectangle => rectangle.draw(ctx));
player.draw(ctx);
