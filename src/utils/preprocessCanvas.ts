"use client";

import * as tf from "@tensorflow/tfjs";

function preprocessCanvas(
  sourceCanvas: HTMLCanvasElement,
  tf: typeof import("@tensorflow/tfjs"),
): Promise<tf.Tensor> {
  return new Promise((resolve) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) {
      resolve(tf.zeros([1, 28, 28, 1]));
      return;
    }

    tempCtx.fillStyle = "black";
    tempCtx.fillRect(0, 0, 28, 28);

    const sourceCtx = sourceCanvas.getContext("2d");
    if (!sourceCtx) {
      resolve(tf.zeros([1, 28, 28, 1]));
      return;
    }

    const imageData = sourceCtx.getImageData(
      0,
      0,
      sourceCanvas.width,
      sourceCanvas.height,
    );
    const { data, width, height } = imageData;

    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let foundPixel = false;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        const r = data[index + 0];
        if (alpha !== undefined && alpha > 0 && r !== undefined && r > 0) {
          foundPixel = true;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    if (!foundPixel) {
      const emptyTensor = tf.zeros([1, 28, 28, 1]);
      resolve(emptyTensor);
      return;
    }

    const padding = 4;
    const boxWidth = maxX - minX + 2 * padding;
    const boxHeight = maxY - minY + 2 * padding;

    const scale = Math.min(20 / boxWidth, 20 / boxHeight);

    const offsetX = (28 - boxWidth * scale) / 2;
    const offsetY = (28 - boxHeight * scale) / 2;

    tempCtx.save();
    tempCtx.translate(offsetX, offsetY);
    tempCtx.scale(scale, scale);
    tempCtx.drawImage(
      sourceCanvas,
      minX - padding,
      minY - padding,
      boxWidth,
      boxHeight,
      0,
      0,
      boxWidth,
      boxHeight,
    );
    tempCtx.restore();

    const tensor = tf.browser.fromPixels(tempCanvas, 1);

    const normalized = tensor.div(tf.scalar(255));

    const reshaped = normalized.expandDims(0);

    resolve(reshaped);
  });
}

export default preprocessCanvas;
