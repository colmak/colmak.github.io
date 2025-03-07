import type { LayersModel } from '@tensorflow/tfjs';
import type * as tf from '@tensorflow/tfjs';

export interface ModelState {
    tf: typeof tf | null;
    model: LayersModel | null;
    status: 'loading' | 'ready' | 'error';
    error: string | null;
  }
  
  export interface PredictionState {
    digit: number | null;
    confidence: number | null;
    processing: boolean;
  }
  
  export interface HistoryItem {
    digit: number;
    confidence: number;
    timestamp: Date;
  }