import { LocalComment, ListingImprovement, ListingClaim } from '../types';

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

const IMPROVEMENTS_KEY = 'fln-listing-improvements';

export function getStoredImprovements(): ListingImprovement[] {
  try {
    const data = localStorage.getItem(IMPROVEMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveImprovement(improvement: ListingImprovement): void {
  const improvements = getStoredImprovements();
  improvements.push(improvement);
  localStorage.setItem(IMPROVEMENTS_KEY, JSON.stringify(improvements));
}

export function getImprovementsForPurveyor(purveyorId: number): ListingImprovement[] {
  return getStoredImprovements().filter((i) => i.purveyorId === purveyorId);
}

const CLAIMS_KEY = 'fln-listing-claims';

export function getStoredClaims(): ListingClaim[] {
  try {
    const data = localStorage.getItem(CLAIMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveClaim(claim: ListingClaim): void {
  const claims = getStoredClaims();
  claims.push(claim);
  localStorage.setItem(CLAIMS_KEY, JSON.stringify(claims));
}

export function getClaimForPurveyor(purveyorId: number): ListingClaim | undefined {
  return getStoredClaims().find((c) => c.purveyorId === purveyorId);
}
