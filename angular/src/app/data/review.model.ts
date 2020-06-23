import { Lodging } from './lodging.model';

/**
 * Represents the _Review_ model
 *
 * ```yaml
 * id: string;
 * accountId: string;
 * lodgingId: string;
 * comment: string;
 * dateCreated: Date;
 * rating: number;
 * ```
 */
export interface Review {
  id: string;
  accountId: string;
  lodgingId: string;
  lodging: Lodging;
  comment: string;
  dateCreated: Date;
  rating: number;
}
