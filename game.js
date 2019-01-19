window.addEventListener("load", startGame, false);
var centerX = 250,
    centerY = 200,
    radius = 15,
    ballColor = "red"
dx = 5,
dy = 5,
score = 0;
gameWidth = 300,
gameHeight = 500,
 racketWidth = 100,
racketHeight = 25,
racketLeft = 100,
racketTop = 475,
animation;
function startGame() {
    animation = setInterval(newGame, 30);
}

function newGame() {
    if (centerY - radius > gameHeight) {
        document.getElementById("score").innerHTML = "<p>Game over! Your score is:" + score;
        document.getElementById("score").style.border = "2px solid red";
                   clearInterval(animation);
    }
    else {
        document.getElementById("span").innerHTML = score;
        var canvas = document.getElementById("gameCanvas"),
            context = canvas.getContext("2d");
        //Каждый раз при отрисовке - очищаем холст
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Прорисовка мяча
        context.beginPath();    
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        context.stroke();
        context.fillStyle = ballColor;
        context.fill();

        //Перемещение мяча
        if (centerX + radius === gameWidth || centerX - radius === 0) {
            dx = -dx;
            score++;
        }
        if (centerY - radius < 0) {
            dy = -dy;
            score++;
        }

        centerX = centerX + dx;
        centerY = centerY + dy;

        //Прорисовка ракетки
        context.fillStyle = "blue";
        context.fillRect(racketLeft, racketTop, racketWidth, racketHeight);

        //Проверка столкновения мяча с ракеткой
        checkCollision();
        function checkCollision() {
            if ((centerY + radius == racketTop) && (centerX >= racketLeft) && (centerX < (racketLeft + racketWidth))) {
                dy = -dy;
            }
        }
        //Движение ракетки производим с помощью укравляющих клавиш (left, right)
        document.onkeydown = function () {
            switch (window.event.keyCode) {
                case 37:
                    racketLeft -= 20;
                    if (racketLeft < 0) {
                        racketLeft = 0;
                    }
                    break;
                case 39:
                    racketLeft += 20;
                    if (racketLeft + racketWidth > gameWidth) {
                        racketLeft = gameWidth - racketWidth;
                    }
                    break;
            }
        };
    }
}
