import { Component, OnInit, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-running-game',
  templateUrl: './running-game.component.html',
  styleUrls: ['./running-game.component.css']
})
export class RunningGameComponent implements OnInit {

  constructor (private toastrService: ToastrService) {}

  playerY = 0;
  jumpHeight = 100;
  isJumping = false;

  obstacleX = 500;
  obstacleSpeed = 5;

  score = 0;
  gameOver = false;
  gameInterval: any;

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      if (!this.gameOver) {
        this.moveObstacle();
        this.checkCollision();
        this.score++;
      }
    }, 20);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.jump();
    }
  }

  jump() {
    if (this.isJumping) return;
    this.isJumping = true;

    let upInterval = setInterval(() => {
      if (this.playerY >= this.jumpHeight) {
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (this.playerY <= 0) {
            this.playerY = 0;
            this.isJumping = false;
            clearInterval(downInterval);
          } else {
            this.playerY -= 5;
          }
        }, 20);
      } else {
        this.playerY += 5;
      }
    }, 20);
  }

  moveObstacle() {
    this.obstacleX -= this.obstacleSpeed;
    if (this.obstacleX < -30) {
      this.obstacleX = 500;
    }
  }

  checkCollision() {
    if (this.obstacleX >= 50 && this.obstacleX <= 80 && this.playerY < 30) {
      this.gameOver = true;
      clearInterval(this.gameInterval);
      this.toastrService.success('Game Over! Your score: ' + this.score);
      const restart = confirm('\nDo you want to play again?');
    if (restart) {
      this.resetGame();
    }
    }
  }

  resetGame() {
    this.playerY = 0;
    this.isJumping = false;
    this.obstacleX = 500;
    this.score = 0;
    this.gameOver = false;
    this.startGame();
  }

}
