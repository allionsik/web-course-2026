import { CONFIG, DIRECTIONS } from './config.js';

export class SnakeGame {
    constructor() { this.reset(); }

    reset() {
        this.snake = [ { x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 } ];
        this.direction = { ...DIRECTIONS.RIGHT };
        this.nextDirection = { ...DIRECTIONS.RIGHT };
        this.score = 0;
        this.isGameOver = false;
        this.apple = { x: 0, y: 0 };
        this.spawnApple();
    }

    setDirection(newDir) {
        if (this.isGameOver) return;
        if (newDir.x !== 0 && this.direction.x === 0) this.nextDirection = newDir;
        else if (newDir.y !== 0 && this.direction.y === 0) this.nextDirection = newDir;
    }

    update() {
        if (this.isGameOver) return;
        this.direction = { ...this.nextDirection };
        const head = this.snake[0];
        const newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };

        if (newHead.x < 0 || newHead.x >= CONFIG.GRID_SIZE || newHead.y < 0 || newHead.y >= CONFIG.GRID_SIZE) {
            this.isGameOver = true; return;
        }
        if (this.checkCollision(newHead)) { this.isGameOver = true; return; }

        this.snake.unshift(newHead);

        if (newHead.x === this.apple.x && newHead.y === this.apple.y) {
            this.score++;
            this.spawnApple();
        } else {
            this.snake.pop();
        }
    }

    checkCollision(position) {
        return this.snake.some(segment => segment.x === position.x && segment.y === position.y);
    }

    spawnApple() {
        let freeCells = [];
        for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
            for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
                if (!this.snake.some(segment => segment.x === x && segment.y === y)) {
                    freeCells.push({ x, y });
                }
            }
        }
        if (freeCells.length === 0) { this.isGameOver = true; return; }
        this.apple = freeCells[Math.floor(Math.random() * freeCells.length)];
    }
}