const dino = document.querySelector('.dino ');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 200) {
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            //Subir
            position += 20;

            dino.style.bottom = position + 'px';
        }
    }, 20);
}

//Cactus
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1400;
    let randomTime = Math.random() * 7500;


    cactus.classList.add('cactus');
    cactus.style.left = 1200 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        } else {
            cactusPosition -= 5;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)
    setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp);