export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_DIFFICULTY = 'SELECT_DIFFICULTY';
export const SELECT_TYPE = 'SELECT_TYPE';

export const selectCategory = (category) => ({ type: SELECT_CATEGORY, category });

export const selectDifficulty = (difficulty) => ({ type: SELECT_DIFFICULTY, difficulty });

export const selectType = (value) => ({ type: SELECT_TYPE, value });
