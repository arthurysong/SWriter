import { useSelector } from 'react-redux';

export default function useSelectActiveNote() {
  return useSelector(state => state.user.notebooks[state.notePosition.notebook]?.notes[state.notePosition.note]);
}