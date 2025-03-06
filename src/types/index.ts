export interface ModelState {
    tf: typeof import('@tensorflow/tfjs') | null;
    model: import('@tensorflow/tfjs').LayersModel | null;
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