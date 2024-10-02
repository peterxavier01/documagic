import { create } from "zustand";

interface EditorStateStore {
  isEditorEmpty: boolean;
  setIsEditorEmpty: (isEditorEmpty: boolean) => void;
}

export const useEditorStateStore = create<EditorStateStore>((set) => ({
  isEditorEmpty: true,
  setIsEditorEmpty: (isEditorEmpty: boolean) => set({ isEditorEmpty }),
}));
