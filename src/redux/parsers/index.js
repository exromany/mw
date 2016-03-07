import readmanga, { parsers as readmangaParsers } from './readmanga';
import mintmanga, { parsers as mintmangaParsers } from './mintmanga';

export default [
  readmanga,
  mintmanga,
];

export const parsers = {
  [readmanga.id]: readmangaParsers,
  [mintmanga.id]: mintmangaParsers,
};
