import { createSelector } from 'reselect';

const sitesSelector = state => state.sites;
const catalogSelector = state => state.catalog;
const librarySelector = state => state.library;
const chaptersSelector = state => state.chapters;
const pagesSelector = state => state.pages;
const siteIdSelector = (state, props) => props.siteId;
const linkSelector = (state, props) => props.link;
const mangaIdSelector = (state, props) => props.mangaId;
const chapterIdSelector = (state, props) => props.chapterId;
const siteSelector = createSelector(
  [sitesSelector, siteIdSelector],
  (sites, siteId) => sites.find(site => site.id === siteId)
);
const libraryAsArraySelector = createSelector(
  librarySelector,
  library => Object.keys(library).map(id => library[id])
);
const mangaSelector = createSelector(
  [librarySelector, mangaIdSelector],
  (library, mangaId) => library[mangaId]
);
const siteIdOfMangaSelector = createSelector(
  mangaSelector,
  manga => manga.siteId
);
const siteOfMangaSelector = createSelector(
  [sitesSelector, siteIdOfMangaSelector],
  (sites, siteId) => sites.find(site => site.id === siteId)
);
const chaptersOfMangaSelector = createSelector(
  [chaptersSelector, mangaIdSelector],
  (chapters, mangaId) => chapters[mangaId]
);
const chapterSelector = createSelector(
  [chaptersOfMangaSelector, chapterIdSelector],
  (chapters, chapterId) => chapters.find(chapter => chapter.id === chapterId)
);
const pagesOfChapterSelector = createSelector(
  [pagesSelector, chapterSelector],
  (pages, chapter) => pages[chapter.id]
);

export const selectSites = createSelector(
  sitesSelector,
  sites => ({ sites })
);

export const selectCatalog = createSelector(
  [catalogSelector, siteSelector],
  (catalog, site) => ({ catalog, site })
);

export const selectInfo = createSelector(
  [linkSelector, catalogSelector, siteSelector],
  (link, catalog, site) => ({ link, catalog, site })
);

export const selectLibrary = createSelector(
  libraryAsArraySelector,
  library => ({ library })
);

export const selectManga = createSelector(
  [chaptersOfMangaSelector, mangaSelector, siteOfMangaSelector],
  (chapters, manga, site) => ({ chapters, manga, site })
);

export const selectPages = createSelector(
  [mangaSelector, chapterSelector, pagesOfChapterSelector],
  (manga, chapter, pages) => ({ manga, chapter, pages })
);
