// types/votes.ts
export type VoteEntry = {
  translationId: string;
  voterDid: string;
  value: 1 | -1;
  createdAt: string;
};
