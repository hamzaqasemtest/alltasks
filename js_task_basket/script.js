window.onload = function() {
    const ball = document.getElementById('ball');
    const gameArea = document.getElementById('gameArea');
    let bounceCount = 0;
    let direction = 1; // 1 for down, -1 for up
    let speed = 25; 
    let intervalId;
    let maxTopPosition = 0; 
    let targetPosition = 0; 
  
    function moveBall() {
        let ballPosition = ball.offsetTop;
        let gameAreaHeight = gameArea.offsetHeight;
  

        if ((ballPosition <= targetPosition || ballPosition <= maxTopPosition) && direction === -1) {
            direction = 1;
            bounceCount++;

            speed *= (1 - bounceCount * 0.25); 
            maxTopPosition += gameAreaHeight * 0.5;
        }
  
        // If the ball hits the bottom
        if (ballPosition + ball.offsetHeight >= gameAreaHeight && direction === 1) {
            direction = -1;
            ball.style.transform = 'scale(1)'; // Reset scale
        }
  
        
        if (bounceCount === 3) {
            clearInterval(intervalId);
            return;
        }

        ball.style.top = (ballPosition + speed * direction) + 'px';
        

        if (direction === 1) { 
            let scale = 1 - (ballPosition / gameAreaHeight);
            ball.style.transform = `scale(${Math.max(scale, 0.5)})`;
        }
    }
  
    gameArea.addEventListener('click', function(e) {
        const xPosition = e.clientX - gameArea.getBoundingClientRect().left;
        const yPosition = e.clientY - gameArea.getBoundingClientRect().top - (ball.clientHeight / 2);
  
        ball.style.left = xPosition + 'px';
        ball.style.top = gameArea.offsetHeight - ball.offsetHeight + 'px'; 
  
        bounceCount = 0;
        direction = -1; 
        speed = 25;
        maxTopPosition = 0;
        targetPosition = yPosition
  
       
        if (intervalId) {
          clearInterval(intervalId);
        }
        intervalId = setInterval(moveBall, 10); 
    });
}
