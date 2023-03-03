// Crea el objeto de lienzo para el juego
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Variables del juego
var player = {
  x: 50,
  y: 50,
  width: 32,
  height: 32,
  speed: 5,
  velX: 0,
  velY: 0,
  jumping: false
};

var keys = [];
var friction = 0.8;
var gravity = 0.3;

// Función de actualización del juego
function update() {
  // Maneja el movimiento horizontal del jugador
  if (keys[39]) {
    if (player.velX < player.speed) {
      player.velX++;
    }
  }

  if (keys[37]) {
    if (player.velX > -player.speed) {
      player.velX--;
    }
  }

  player.velX *= friction;
  player.x += player.velX;

  // Maneja el movimiento vertical del jugador
  if (keys[38] && !player.jumping) {
    player.velY = -player.speed * 2;
    player.jumping = true;
  }

  player.velY += gravity;
  player.y += player.velY;

  // Verifica las colisiones con los bordes del canvas
  if (player.x >= canvas.width - player.width) {
    player.x = canvas.width - player.width;
  } else if (player.x <= 0) {
    player.x = 0;
  }

  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.jumping = false;
  }

  // Dibuja el jugador en el canvas
  context.fillStyle = '#ff0000';
  context.fillRect(player.x, player.y, player.width, player.height);
}

// Función de bucle del juego
function loop() {
  // Actualiza el juego
  update();

  // Vuelve a llamar la función de bucle
  requestAnimationFrame(loop);
}

// Maneja los eventos de teclado
document.body.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

// Comienza el juego
loop();
