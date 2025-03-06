'use client';

import { useState, useEffect } from 'react';
import { ModelState } from '../types';

const useModelLoader = (): ModelState => {
  const [modelState, setModelState] = useState<ModelState>({
    tf: null,
    model: null,
    status: 'loading', // 'loading', 'ready', 'error'
    error: null
  });
  
  useEffect(() => {
    let isMounted = true;
    
    async function initialize() {
      try {
        // Load TensorFlow
        const tf = await import('@tensorflow/tfjs');
        
        if (!isMounted) return;
        
        // Load model
        try {
          // Enable debug mode to see model information
          tf.enableDebugMode();
          
          // Use the provided Google Storage URL instead of the local path
          const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json';
          const model = await tf.loadLayersModel(MODEL_URL);
          
          if (!isMounted) return;
          
          // Check model information
          console.log('Model loaded successfully:', model);
          console.log('Model summary:', model.summary());
          console.log('Input shape:', model.inputs[0].shape);
          console.log('Output shape:', model.outputs[0].shape);
          
          setModelState({
            tf,
            model,
            status: 'ready',
            error: null
          });
        } catch (modelError) {
          console.error('Failed to load model:', modelError);
          if (isMounted) {
            setModelState(prev => ({
              ...prev,
              tf,
              status: 'error',
              error: 'Failed to load the digit recognition model. Please check your network connection.'
            }));
          }
        }
      } catch (tfError) {
        console.error('Failed to load TensorFlow:', tfError);
        if (isMounted) {
          setModelState(prev => ({
            ...prev,
            status: 'error',
            error: 'Failed to load TensorFlow.js. Please check your network connection or try a different browser.'
          }));
        }
      }
    }
    
    initialize();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return modelState;
};

export default useModelLoader;