import { HALF_PI, PI } from './math';
// Constants for angles:
//    -- Common (quarters / cardinal):
//        North/Top (0), West/Left (-1/2 PI), East/Right (1/2 PI), South/Bottom (PI)
//
//    -- Intermediates (eights / ordinal / intercardinal) (i.e. cardinal bisects):
//        Northwest/TopLeft (-1/4 PI), etc...
//
//    [Note: The top eight points collectively are called the principal (or main) winds]
//
//    -- Tertiary (sixteenths / half-winds):
//        NNE (North-northeast) (1/8 PI), etc...
export const NORTH = 0;
export const NORTH_NORTHWEST = -1/8 * PI;
export const NORTHWEST = -1/4 * PI;
export const WEST_NORTHWEST = -3/8 * PI;
export const WEST = -HALF_PI;
export const WEST_SOUTHWEST = -5/8 * PI;
export const SOUTHWEST = -3/4 * PI;
export const SOUTH_SOUTHWEST = -7/8 * PI;
export const SOUTH = PI;
export const SOUTH_SOUTHEAST = 7/8 * PI;
export const SOUTHEAST = 3/4 * PI;
export const EAST_SOUTHEAST = 5/8 * PI;
export const EAST = HALF_PI;
export const EAST_NORTHEAST = 3/8 * PI;
export const NORTHEAST = 1/4 * PI;
export const NORTH_NORTHEAST = 1/8 * PI;

export const TOP = NORTH;
export const TOP_BY_TOP_LEFT = NORTH_NORTHWEST;
export const TOP_LEFT = NORTHWEST;
export const LEFT_BY_TOP_LEFT = WEST_NORTHWEST;
export const LEFT = WEST;
export const LEFT_BY_BOTTOM_LEFT = WEST_SOUTHWEST;
export const BOTTOM_LEFT = SOUTHWEST;
export const BOTTOM_BY_BOTTOM_LEFT = SOUTH_SOUTHWEST;
export const BOTTOM = SOUTH;
export const BOTTOM_BY_BOTTOM_RIGHT = SOUTH_SOUTHEAST;
export const BOTTOM_RIGHT = SOUTHEAST;
export const RIGHT_BY_BOTTOM_RIGHT = EAST_SOUTHEAST;
export const RIGHT = EAST;
export const RIGHT_BY_TOP_RIGHT = EAST_NORTHEAST;
export const TOP_RIGHT = NORTHEAST;
export const TOP_BY_TOP_RIGHT = NORTH_NORTHEAST;
