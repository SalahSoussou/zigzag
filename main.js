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
    contains(player) {
        const left = this.x + player.radius,
            right = this.x + this.width - player.radius,
            top = this.y + player.radius,
            bottom = this.y + this.height - player.radius;
        return (
            player.x >= left &&
            player.x <= right &&
            player.y >= top &&
            player.y <= bottom)
    }
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player {
    constructor(x, y, radius,speed=2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.direction = 'right'
        this.speed= speed
    }

    mov() {
        if (this.direction == 'right') {
            this.x += this.speed
        } else {
            this.y += this.speed
        }
    }

    changeDirection() {
        this.direction = this.direction == 'right' ? 'down' : 'right'
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
animate()
function animate() {
    player.mov()
    let isOnTrack = false;
    for (const rect of rectangles) {
        if (rect.contains(player)) {
            isOnTrack=true
        }
    }
    ctx.clearRect(0,0,cnv.width,cnv.height)
    rectangles.forEach(rectangle => rectangle.draw(ctx));
    player.draw(ctx);
    requestAnimationFrame(animate)
}

// for (let i = 0; i < rectangles.length; i++) {
//     const rectangle = rectangles[i];
//     if(player.x > rectangle.x && player.x < rectangle.x + rectangle.width && player.y > rectangle.y && player.y < rectangle.y + rectangle.height) {
//         isOnTrack = true;
//         console.log('is on track');
//     }
// }

