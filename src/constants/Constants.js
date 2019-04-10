export const INITIAL_DIMENSION = 3;
export const MIN_DIMENSION = 1;

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
