import { LocalComment } from '../types';

const COMMENTS_KEY = 'fln-local-comments';

export function getStoredComments(): LocalComment[] {
  try {
    const data = localStorage.getItem(COMMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveComment(comment: LocalComment): void {
  const comments = getStoredComments();
  comments.push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

export function getCommentsForPurveyor(purveyorId: number): LocalComment[] {
  return getStoredComments().filter((c) => c.purveyorId === purveyorId);
}
