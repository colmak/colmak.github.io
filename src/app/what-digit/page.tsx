"use client";

import React, { useState, useCallback } from "react";
import DigitCanvas from "~/components/Digit/DigitCanvas";
import PredictionResult from "~/components/Digit/PredictionResult";
import PredictionHistory from "~/components/Digit/PredictionHistory";
import LoadingState from "~/components/Digit/LoadingState";
import ErrorState from "~/components/Digit/ErrorState";
import Footer from "~/components/Digit/Footer";
import useModelLoader from "~/hooks/useModelLoader";
import preprocessCanvas from "~/utils/preprocessCanvas";
import type { PredictionState, HistoryItem } from "~/types";
// Using explicit non-type import for TensorFlow
import * as tf from "@tensorflow/tfjs";

export default function DigitRecognizer(): JSX.Element {
  const modelState = useModelLoader();

  const [prediction, setPrediction] = useState<PredictionState>({
    digit: null,
    confidence: null,
    processing: false,
  });

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handlePredict = useCallback(
    async (canvas: HTMLCanvasElement) => {
      const { tf, model, status } = modelState;

      if (status !== "ready" || !tf || !model) {
        return;
      }

      setPrediction((prev) => ({ ...prev, processing: true }));

      try {
        const processedInput = await preprocessCanvas(canvas, tf);

        console.log("Processed input shape:", processedInput.shape);

        const output = model.predict(processedInput) as tf.Tensor;

        const probabilities = await output.data();

        console.log("Raw probabilities:", Array.from(probabilities));

        const softmax = tf.softmax(output);
        const softmaxData = await softmax.data();

        const predictedDigit = Array.from(softmaxData).indexOf(
          Math.max(...softmaxData),
        );

        const confidence =
          predictedDigit !== -1 &&
          softmaxData &&
          predictedDigit < softmaxData.length &&
          softmaxData[predictedDigit] !== undefined
            ? Math.round(softmaxData[predictedDigit] * 100)
            : 0;

        setHistory((prev) => [
          { digit: predictedDigit, confidence, timestamp: new Date() },
          ...prev.slice(0, 4),
        ]);

        setPrediction({
          digit: predictedDigit,
          confidence,
          processing: false,
        });

        tf.dispose([processedInput, output, softmax]);
      } catch (error) {
        console.error("Prediction error:", error);
        setPrediction({
          digit: null,
          confidence: null,
          processing: false,
        });
      }
    },
    [modelState],
  );

  if (modelState.status === "loading") {
    return <LoadingState />;
  }

  if (modelState.status === "error") {
    return <ErrorState error={modelState.error} />;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "32px",
            background: "linear-gradient(45deg, #3498db, #8e44ad)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "8px",
          }}
        >
          MNIST Digit Recognizer
        </h1>
        <p style={{ color: "#666" }}>
          Draw a digit (0-9) in the box below and click Recognize
        </p>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DigitCanvas onPredict={handlePredict} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <PredictionResult prediction={prediction} />

          <PredictionHistory history={history} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
