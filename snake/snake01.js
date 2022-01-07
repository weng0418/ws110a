var cvs = document.getElementById("snake")
var ctx = cvs.getContext("2d")

// 導入地圖圖片
var ground = new Image()
ground.src = "img/ground.png"

var foodImg = new Image()
foodImg.src = "img/food.png"

// 創建地圖格子
var box = 32;
// 創建蛇 (數組)
var snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}
// 創建食物
var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
// 得分
var score = 0;

// 控制方向
var d;
document.addEventListener("keydown", direction)
function direction(event) {
    var key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

// 撞到自己時
function conllision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false
}

// 繪製地圖
function draw() {
    ctx.drawImage(ground, 0, 0)

    for (var i = 0; i < snake.length; i++) {
        //fillStyle填充顏色 是頭部就綠色 尾部就白色
        //fillRect  位置  xy軸  大小
        ctx.fillStyle = (i == 0) ? "green" : "white"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);

    }
    ctx.drawImage(foodImg, food.x, food.y);

    ctx.fillStyle = "white"//字體顏色
    ctx.font = "45px Changa one"
    ctx.fillText(score, 2 * box, 1.6 * box);//對象  位置

    // 記錄蛇的原位置
    var snakeX = snake[0].x;
    var snakeY = snake[0].y

    //轉方向
    //蛇再 y軸走時 左減 右加
    if (d == "LEFT") snakeX -= box
    if (d == "RIGHT") snakeX += box

    //蛇再 X軸走時 上減 下加
    if (d == "UP") snakeY -= box
    if (d == "DOWN") snakeY += box

    //如果吃到食物
    //即頭部與食物 的位置相同
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop()//刪除並返回數組最後一個元素
    }

    //蛇的新位置
    var newHead = {
        x: snakeX,
        y: snakeY
    }

    //Game Over
    //撞到牆或者撞到自己
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || conllision(newHead, snake)) {
        clearInterval(game)
    }

    snake.unshift(newHead)//向數組頭部添加新元素並返回長度
}
game = setInterval(draw, 150)
