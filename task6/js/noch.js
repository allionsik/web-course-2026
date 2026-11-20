import { CONFIG } from './config.js';

export class NightBackground {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cellSize = width / CONFIG.GRID_SIZE;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');

        this.generate();
    }

    generate() {
        this.drawGround();
        this.drawPond();
        this.drawTreesAndBushes();
        this.drawStars();
    }

    drawGround() {
        this.ctx.fillStyle = CONFIG.COLORS.NIGHT.GROUND_1;
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const radius = Math.random() * 20 + 10;
            this.ctx.fillStyle = Math.random() > 0.5 ? CONFIG.COLORS.NIGHT.GROUND_2 : 'rgba(0,0,0,0.2)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawPond() {
        this.ctx.fillStyle = CONFIG.COLORS.NIGHT.WATER;
        this.ctx.beginPath();
        this.ctx.ellipse(this.width * 0.8, this.height * 0.85, this.cellSize * 2.5, this.cellSize * 1.5, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(this.width * 0.75, this.height * 0.8, this.cellSize * 1, this.cellSize * 0.5, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawTreesAndBushes() {
        const treePositions = [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 18, y: 1 }, { x: 18, y: 2 },
            { x: 1, y: 18 }, { x: 1, y: 17 }, { x: 18, y: 18 }
        ];
        treePositions.forEach(pos => this.drawNightTree(pos.x * this.cellSize, pos.y * this.cellSize));

        for (let i = 0; i < 15; i++) {
            this.drawNightBush(Math.random() * this.width, Math.random() * this.height);
        }
    }

    drawNightTree(x, y) {
        const r = this.cellSize;
        const cx = x + r / 2;
        
        this.ctx.fillStyle = CONFIG.COLORS.NIGHT.SHADOW;
        this.ctx.beginPath();
        this.ctx.ellipse(cx, y + r * 0.9, r * 0.4, r * 0.15, 0, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = CONFIG.COLORS.NIGHT.TREE_TRUNK;
        this.ctx.fillRect(cx - r * 0.08, y + r * 0.4, r * 0.16, r * 0.5);

        const leaves = [
            { dx: 0, dy: -0.2, radius: 0.45, color: CONFIG.COLORS.NIGHT.LEAF_1 },
            { dx: -0.2, dy: 0, radius: 0.35, color: CONFIG.COLORS.NIGHT.LEAF_2 },
            { dx: 0.2, dy: 0, radius: 0.35, color: CONFIG.COLORS.NIGHT.LEAF_3 }
        ];

        leaves.forEach(leaf => {
            this.ctx.fillStyle = leaf.color;
            this.ctx.beginPath();
            this.ctx.arc(cx + r * leaf.dx, y + r * (0.5 + leaf.dy), r * leaf.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawNightBush(x, y) {
        this.ctx.fillStyle = CONFIG.COLORS.NIGHT.LEAF_2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, Math.PI * 2);
        this.ctx.arc(x + 6, y + 2, 5, 0, Math.PI * 2);
        this.ctx.arc(x - 4, y + 3, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawStars() {
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height * 0.6;
            const radius = Math.random() * 1.5 + 0.5;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    getCanvas() { return this.canvas; }
}