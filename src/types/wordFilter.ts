export enum TWordsFilterLearned {
  NOT_LEARNED,
  LEARNED,
  ALL,
}

export type TWordsFilter = {
  tags: string[];
  learnedFilter: TWordsFilterLearned;
};
