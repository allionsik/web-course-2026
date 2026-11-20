import { CONFIG } from './config.js';

let audioCtx;

// Инициализация (должна вызываться после клика пользователя из-за политики браузеров)
export function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Короткий звук для сектора
export function playSound(index) {
    try {
        if (!audioCtx) return;
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = CONFIG.frequencies[index];
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        // Плавное затухание, чтобы не было щелчков
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.4);
        oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
        console.warn("Audio error:", e);
    }
}

// Звук проигрыша
export function playGameOverSound() {
    try {
        if(!audioCtx) return;
        const osc = audioCtx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5);
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    } catch(e) {}
}