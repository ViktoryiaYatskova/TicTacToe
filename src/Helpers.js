import { ROWS_NUMBER } from './constants/Constants';

export function convertCellIndexToCoordinated(index) {
    const x = index % ROWS_NUMBER;
    const y = (index - x) / ROWS_NUMBER;
    return { x, y };
}
