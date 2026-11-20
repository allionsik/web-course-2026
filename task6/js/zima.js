import { CONFIG } from './config.js';

export class WinterBackground {
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
        this.drawSnowflakes();
    }

    drawGround() {
        this.ctx.fillStyle = CONFIG.COLORS.FOREST.GROUND_1;
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const radius = Math.random() * 20 + 10;
            this.ctx.fillStyle = Math.random() > 0.5 ? CONFIG.COLORS.FOREST.GROUND_2 : 'rgba(255,255,255,0.4)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawPond() {
        this.ctx.fillStyle = CONFIG.COLORS.FOREST.ICE;
        this.ctx.beginPath();
        this.ctx.ellipse(this.width * 0.8, this.height * 0.85, this.cellSize * 2.5, this.cellSize * 1.5, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.beginPath();
        this.ctx.ellipse(this.width * 0.75, this.height * 0.8, this.cellSize * 1, this.cellSize * 0.5, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawTreesAndBushes() {
        const treePositions = [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 18, y: 1 }, { x: 18, y: 2 },
            { x: 1, y: 18 }, { x: 1, y: 17 }, { x: 18, y: 18 }
        ];
        treePositions.forEach(pos => this.drawPineTree(pos.x * this.cellSize, pos.y * this.cellSize));

        for (let i = 0; i < 15; i++) {
            this.drawSnowBush(Math.random() * this.width, Math.random() * this.height);
        }
    }

    drawPineTree(x, y) {
        const r = this.cellSize;
        const cx = x + r / 2;
        
        this.ctx.fillStyle = CONFIG.COLORS.FOREST.SHADOW;
        this.ctx.beginPath();
        this.ctx.ellipse(cx, y + r * 0.95, r * 0.45, r * 0.1, 0, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = CONFIG.COLORS.FOREST.TREE_TRUNK;
        this.ctx.fillRect(cx - r * 0.08, y + r * 0.85, r * 0.16, r * 0.15);

        const triangles = [
            { baseY: y + r * 0.85, width: r * 0.9, height: r * 0.35, color: CONFIG.COLORS.FOREST.PINE_1 },
            { baseY: y + r * 0.55, width: r * 0.65, height: r * 0.35, color: CONFIG.COLORS.FOREST.PINE_2 },
            { baseY: y + r * 0.25, width: r * 0.4, height: r * 0.35, color: CONFIG.COLORS.FOREST.PINE_3 }
        ];

        triangles.forEach(tri => {
            const topY = tri.baseY - tri.height;
            
            this.ctx.fillStyle = tri.color;
            this.ctx.beginPath();
            this.ctx.moveTo(cx, topY);
            this.ctx.lineTo(cx + tri.width / 2, tri.baseY);
            this.ctx.lineTo(cx - tri.width / 2, tri.baseY);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.fillStyle = CONFIG.COLORS.FOREST.SNOW_WHITE;
            this.ctx.beginPath();
            this.ctx.moveTo(cx, topY);
            this.ctx.lineTo(cx + tri.width / 5, topY + r * 0.12);
            this.ctx.lineTo(cx - tri.width / 5, topY + r * 0.12);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    drawSnowBush(x, y) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, 0, Math.PI * 2);
        this.ctx.arc(x + 8, y + 2, 6, 0, Math.PI * 2);
        this.ctx.arc(x - 6, y + 3, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSnowflakes() {
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const radius = Math.random() * 2 + 1;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    getCanvas() { return this.canvas; }
}