export interface NoteType {
  id: number;
  note: string;
  createdDate: number;
};

export type WorkspaceType = 'personal' | 'work';
