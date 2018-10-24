const FIELD_DIMENSION = 3;

export const PlayerTools = {
    NOUGHT: 0,
    CROSS: 1,
}

export const CellStates = {
  EMPTY: -1,
  NOUGHT: PlayerTools.NOUGHT,
  CROSS: PlayerTools.CROSS,
};

export const CellStateClasses = {
    [CellStates.EMPTY]: 'empty-cell',
    [CellStates.NOUGHT]: 'nought-cell',
    [CellStates.CROSS]: 'cross-cell',
}

export const COLUMNS_NUMBER = FIELD_DIMENSION;
export const ROWS_NUMBER = FIELD_DIMENSION;
