import { CONFIG, DIRECTIONS } from './config.js';
import { SnakeGame } from './game.js';
import { GameRenderer } from './renderer.js';

class GameApp {
    constructor() {
        this.game = new SnakeGame();
        this.canvas = document.getElementById('gameCanvas');
        
        // DOM элементы
        this.modeSelection = document.getElementById('modeSelection');
        this.btnWinter = document.getElementById('btnWinter');
        this.btnNight = document.getElementById('btnNight');
        this.scoreElement = document.getElementById('score');
        this.finalScoreElement = document.getElementById('finalScore');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.restartBtn = document.getElementById('restartBtn');
        this.changeModeBtn = document.getElementById('changeModeBtn');

        this.renderer = null;
        this.background = null;
        this.lastMoveTime = 0;
        this.animationFrameId = null;

        this.initEventListeners();
    }

    initEventListeners() {
        // Выбор режима
        this.btnWinter.addEventListener('click', () => this.startGame('winter'));
        this.btnNight.addEventListener('click', () => this.startGame('night'));

        // Управление
        document.addEventListener('keydown', (e) => {
            // Игнорируем нажатия, если рендерер еще не создан или открыт экран выбора
            if (!this.renderer || this.game.isGameOver || !this.modeSelection.classList.contains('hidden')) return;
            switch (e.key) {
                case 'ArrowUp': this.game.setDirection(DIRECTIONS.UP); e.preventDefault(); break;
                case 'ArrowDown': this.game.setDirection(DIRECTIONS.DOWN); e.preventDefault(); break;
                case 'ArrowLeft': this.game.setDirection(DIRECTIONS.LEFT); e.preventDefault(); break;
                case 'ArrowRight': this.game.setDirection(DIRECTIONS.RIGHT); e.preventDefault(); break;
            }
        });

        // Перезапуск и смена режима
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.changeModeBtn.addEventListener('click', () => this.showModeSelection());
    }

    async startGame(mode) {
        console.log(`Загрузка режима: ${mode}`);
        this.modeSelection.classList.add('hidden');
        
        try {
            let BackgroundClass;
            // ИМЕНА ФАЙЛОВ ЗДЕСЬ: zima.js и noch.js
            if (mode === 'winter') {
                const module = await import('./zima.js');
                BackgroundClass = module.WinterBackground;
            } else if (mode === 'night') {
                const module = await import('./noch.js');
                BackgroundClass = module.NightBackground;
            }

            console.log('Модуль загружен, создаем фон...');
            this.background = new BackgroundClass(this.canvas.width, this.canvas.height);
            this.renderer = new GameRenderer('gameCanvas', this.background);
            console.log('Фон и рендерер созданы, запускаем игру...');

            this.restartGame();
        } catch (error) {
            console.error('Ошибка при загрузке режима:', error);
            alert('Не удалось загрузить фон. Проверьте консоль (F12).');
            this.modeSelection.classList.remove('hidden'); // Возвращаем экран выбора при ошибке
        }
    }

    showModeSelection() {
        cancelAnimationFrame(this.animationFrameId);
        this.gameOverScreen.classList.add('hidden');
        this.modeSelection.classList.remove('hidden');
        this.renderer = null; // Сбрасываем рендерер, чтобы нельзя было играть
    }

    restartGame() {
        this.game.reset();
        this.updateScoreUI();
        this.gameOverScreen.classList.add('hidden');
        this.lastMoveTime = 0;
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    gameLoop(currentTime) {
        if (this.game.isGameOver) { this.handleGameOver(); return; }
        if (this.lastMoveTime === 0) this.lastMoveTime = currentTime;
        const deltaTime = currentTime - this.lastMoveTime;

        if (deltaTime >= CONFIG.MOVE_INTERVAL) {
            this.game.update();
            this.renderer.draw(this.game); // Рендерер точно есть, так как игра запущена
            this.updateScoreUI();
            this.lastMoveTime = currentTime;
        }

        if (!this.game.isGameOver) {
            this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
        } else {
            this.handleGameOver();
        }
    }

    updateScoreUI() { this.scoreElement.textContent = this.game.score; }

    handleGameOver() {
        this.finalScoreElement.textContent = this.game.score;
        this.gameOverScreen.classList.remove('hidden');
        cancelAnimationFrame(this.animationFrameId);
    }
}

window.addEventListener('DOMContentLoaded', () => { new GameApp(); });