'use client';

import * as tf from '@tensorflow/tfjs';

// Modified preprocessing function to better match MNIST format
function preprocessCanvas(sourceCanvas: HTMLCanvasElement, tf: typeof import('@tensorflow/tfjs')): Promise<tf.Tensor> {
  return new Promise((resolve) => {
    // Create a temporary canvas at exact MNIST dimensions
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      resolve(tf.zeros([1, 28, 28, 1]));
      return;
    }
    
    // Fill with black background (MNIST expects white digits on black background)
    tempCtx.fillStyle = 'black';
    tempCtx.fillRect(0, 0, 28, 28);
    
    // First, detect the bounding box of the drawing
    const sourceCtx = sourceCanvas.getContext('2d');
    if (!sourceCtx) {
      resolve(tf.zeros([1, 28, 28, 1]));
      return;
    }
    
    const imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const { data, width, height } = imageData;
    
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let foundPixel = false;
    
    // Find the bounding box of the digit
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3]; // Alpha channel
        const r = data[(y * width + x) * 4]; // Red channel
        if (alpha > 0 && r > 0) { // Check if pixel is not black and visible
          foundPixel = true;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    
    // If no pixel is found, return a tensor of zeros
    if (!foundPixel) {
      // Return a tensor with all zeros (black) with the correct shape for the model
      const emptyTensor = tf.zeros([1, 28, 28, 1]);
      resolve(emptyTensor);
      return;
    }
    
    // Calculate the bounding box dimensions with padding
    const padding = 4;
    const boxWidth = maxX - minX + 2 * padding;
    const boxHeight = maxY - minY + 2 * padding;
    
    // Calculate scale to maintain aspect ratio
    const scale = Math.min(20 / boxWidth, 20 / boxHeight);
    
    // Calculate centering offsets to place the digit in the center of 28x28 canvas
    const offsetX = (28 - boxWidth * scale) / 2;
    const offsetY = (28 - boxHeight * scale) / 2;
    
    // Draw the digit, centered and scaled
    tempCtx.save();
    tempCtx.translate(offsetX, offsetY);
    tempCtx.scale(scale, scale);
    tempCtx.drawImage(
      sourceCanvas,
      minX - padding, minY - padding, boxWidth, boxHeight,
      0, 0, boxWidth, boxHeight
    );
    tempCtx.restore();
    
    // Convert to tensor and normalize
    const tensor = tf.browser.fromPixels(tempCanvas, 1);
    
    // Normalize to 0-1 range (MNIST expects white digits on black background, value 0-1)
    const normalized = tensor.div(tf.scalar(255));
    
    // Reshape to match model input shape [1, 28, 28, 1]
    const reshaped = normalized.expandDims(0);
    
    resolve(reshaped);
  });
}

export default preprocessCanvas;