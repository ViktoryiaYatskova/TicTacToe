const FIELD_DIMENSION = 3;

export const CellStates = {
  EMPTY: 0,
  NOUGHT: 1,
  CROSS: 2,
};

export const CellStateClasses = {
    [CellStates.EMPTY]: 'empty-cell',
    [CellStates.NOUGHT]: 'nought-cell',
    [CellStates.CROSS]: 'cross-cell',
}

export const COLUMNS_NUMBER = FIELD_DIMENSION;
export const ROWS_NUMBER = FIELD_DIMENSION;
