export const CONFIG = {
    GRID_SIZE: 20,
    MOVE_INTERVAL: 150,
    COLORS: {
        SNAKE_HEAD: '#4CAF50',
        SNAKE_BODY: '#2E7D32',
        SNAKE_BELLY: '#81C784',
        SNAKE_EYE: '#FFFFFF',
        SNAKE_PUPIL: '#1A1A1A',
        SNAKE_CATCHLIGHT: '#FFFFFF',
        SNAKE_BLUSH: 'rgba(255, 105, 180, 0.6)',
        SNAKE_TONGUE: '#FF3B30',

        // Зимняя палитра
        FOREST: {
            GROUND_1: '#E3F2FD',
            GROUND_2: '#BBDEFB',
            SNOW_WHITE: '#FFFFFF',
            PINE_1: '#004D40',
            PINE_2: '#00695C',
            PINE_3: '#009688',
            TREE_TRUNK: '#4E342E',
            SHADOW: 'rgba(0, 0, 0, 0.1)',
            ICE: '#B3E5FC'
        },

        // Ночная палитра
        NIGHT: {
            GROUND_1: '#1A237E',
            GROUND_2: '#283593',
            LEAF_1: '#004D40',
            LEAF_2: '#00695C',
            LEAF_3: '#009688',
            TREE_TRUNK: '#2C3E50',
            SHADOW: 'rgba(0, 0, 0, 0.5)',
            WATER: '#00E5FF'
        },

        FRUITS: [
            { body: '#FF3B30', leaf: '#34C759' },
            { body: '#FF9500', leaf: '#34C759' },
            { body: '#AF52DE', leaf: '#34C759' },
            { body: '#FFCC00', leaf: '#34C759' }
        ]
    }
};

export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};