import { CONFIG } from './config.js';

export class GameRenderer {
    constructor(canvasId, background) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = this.canvas.width / CONFIG.GRID_SIZE;
        this.background = background;
    }

    draw(gameState) {
        this.clear();
        if (this.background) {
            this.ctx.drawImage(this.background.getCanvas(), 0, 0);
        }
        this.drawFruit(gameState.apple);
        this.drawSnake(gameState.snake, gameState.direction);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawFruit(apple) {
        const cx = apple.x * this.cellSize + this.cellSize / 2;
        const cy = apple.y * this.cellSize + this.cellSize / 2;
        const radius = this.cellSize / 2 - 2;
        const fruitType = CONFIG.COLORS.FRUITS[(apple.x + apple.y) % CONFIG.COLORS.FRUITS.length];

        this.ctx.fillStyle = fruitType.body;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy + 1, radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(cx - radius/3, cy - radius/3, radius/4, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#5D4037';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - radius + 1);
        this.ctx.quadraticCurveTo(cx + 2, cy - radius - 4, cx + 4, cy - radius - 5);
        this.ctx.stroke();

        this.ctx.fillStyle = fruitType.leaf;
        this.ctx.beginPath();
        this.ctx.ellipse(cx + 4, cy - radius - 3, 4, 2, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSnake(snake, direction) {
        for (let i = snake.length - 1; i > 0; i--) {
            const segment = snake[i];
            const x = segment.x * this.cellSize;
            const y = segment.y * this.cellSize;

            this.ctx.fillStyle = CONFIG.COLORS.SNAKE_BODY;
            this.roundRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2, 7);
            this.ctx.fill();

            this.ctx.fillStyle = CONFIG.COLORS.SNAKE_BELLY;
            this.ctx.beginPath();
            if (direction.x !== 0) {
                this.ctx.ellipse(x + this.cellSize / 2, y + this.cellSize / 2, 6, 3, 0, 0, Math.PI * 2);
            } else {
                this.ctx.ellipse(x + this.cellSize / 2, y + this.cellSize / 2, 3, 6, 0, 0, Math.PI * 2);
            }
            this.ctx.fill();
        }
        this.drawSnakeHead(snake[0], direction);
    }

    drawSnakeHead(head, direction) {
        const x = head.x * this.cellSize;
        const y = head.y * this.cellSize;
        const cx = x + this.cellSize / 2;
        const cy = y + this.cellSize / 2;

        this.ctx.fillStyle = CONFIG.COLORS.SNAKE_HEAD;
        this.roundRect(x, y, this.cellSize, this.cellSize, 9);
        this.ctx.fill();

        let fwd = { x: direction.x, y: direction.y };
        let right = { x: -direction.y, y: direction.x };

        const faceDist = 4, eyeSpread = 4, blushSpread = 7;
        const faceCx = cx + fwd.x * faceDist;
        const faceCy = cy + fwd.y * faceDist;

        // Румянец
        this.ctx.fillStyle = CONFIG.COLORS.SNAKE_BLUSH;
        const blush1 = { x: faceCx - right.x * blushSpread - fwd.x * 2, y: faceCy - right.y * blushSpread - fwd.y * 2 };
        const blush2 = { x: faceCx + right.x * blushSpread - fwd.x * 2, y: faceCy + right.y * blushSpread - fwd.y * 2 };
        this.ctx.beginPath();
        this.ctx.ellipse(blush1.x, blush1.y, 3, 2, Math.atan2(fwd.y, fwd.x), 0, Math.PI * 2);
        this.ctx.ellipse(blush2.x, blush2.y, 3, 2, Math.atan2(fwd.y, fwd.x), 0, Math.PI * 2);
        this.ctx.fill();

        // Глаза
        const eye1 = { x: faceCx - right.x * eyeSpread, y: faceCy - right.y * eyeSpread };
        const eye2 = { x: faceCx + right.x * eyeSpread, y: faceCy + right.y * eyeSpread };
        const eyeRadius = 3.5;

        this.ctx.fillStyle = CONFIG.COLORS.SNAKE_EYE;
        this.ctx.beginPath();
        this.ctx.arc(eye1.x, eye1.y, eyeRadius, 0, Math.PI * 2);
        this.ctx.arc(eye2.x, eye2.y, eyeRadius, 0, Math.PI * 2);
        this.ctx.fill();

        const pupilOffset = { x: fwd.x * 1.5, y: fwd.y * 1.5 };
        this.ctx.fillStyle = CONFIG.COLORS.SNAKE_PUPIL;
        this.ctx.beginPath();
        this.ctx.arc(eye1.x + pupilOffset.x, eye1.y + pupilOffset.y, eyeRadius * 0.7, 0, Math.PI * 2);
        this.ctx.arc(eye2.x + pupilOffset.x, eye2.y + pupilOffset.y, eyeRadius * 0.7, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = CONFIG.COLORS.SNAKE_CATCHLIGHT;
        this.ctx.beginPath();
        this.ctx.arc(eye1.x + pupilOffset.x - 1, eye1.y + pupilOffset.y - 1, 1.2, 0, Math.PI * 2);
        this.ctx.arc(eye2.x + pupilOffset.x - 1, eye2.y + pupilOffset.y - 1, 1.2, 0, Math.PI * 2);
        this.ctx.fill();

        // Язычок
        if ((Date.now() % 1000) < 300) {
            const tongueBase = { x: faceCx + fwd.x * 6, y: faceCy + fwd.y * 6 };
            const tongueTip = { x: faceCx + fwd.x * 10, y: faceCy + fwd.y * 10 };

            this.ctx.strokeStyle = CONFIG.COLORS.SNAKE_TONGUE;
            this.ctx.lineWidth = 1.5;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(tongueBase.x, tongueBase.y);
            this.ctx.lineTo(tongueTip.x, tongueTip.y);
            this.ctx.stroke();

            const tipLeft = { x: tongueTip.x + right.x * 2 + fwd.x * 2, y: tongueTip.y + right.y * 2 + fwd.y * 2 };
            const tipRight = { x: tongueTip.x - right.x * 2 + fwd.x * 2, y: tongueTip.y - right.y * 2 + fwd.y * 2 };
            this.ctx.beginPath();
            this.ctx.moveTo(tongueTip.x, tongueTip.y);
            this.ctx.lineTo(tipLeft.x, tipLeft.y);
            this.ctx.moveTo(tongueTip.x, tongueTip.y);
            this.ctx.lineTo(tipRight.x, tipRight.y);
            this.ctx.stroke();
        }
    }

    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
}