"use client";

import { useState } from "react";

interface CalloutProps {
  type: "info" | "tip" | "warning" | "success";
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
}

const getCalloutStyles = (type: string) => {
  switch (type) {
    case "info":
      return {
        container:
          "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20",
        icon: "ℹ️",
        iconColor: "text-blue-600 dark:text-blue-400",
        titleColor: "text-blue-800 dark:text-blue-200",
        textColor: "text-blue-700 dark:text-blue-300",
      };
    case "tip":
      return {
        container:
          "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20",
        icon: "💡",
        iconColor: "text-green-600 dark:text-green-400",
        titleColor: "text-green-800 dark:text-green-200",
        textColor: "text-green-700 dark:text-green-300",
      };
    case "warning":
      return {
        container:
          "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20",
        icon: "⚠️",
        iconColor: "text-yellow-600 dark:text-yellow-400",
        titleColor: "text-yellow-800 dark:text-yellow-200",
        textColor: "text-yellow-700 dark:text-yellow-300",
      };
    case "success":
      return {
        container:
          "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20",
        icon: "✅",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        titleColor: "text-emerald-800 dark:text-emerald-200",
        textColor: "text-emerald-700 dark:text-emerald-300",
      };
    default:
      return {
        container:
          "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800",
        icon: "📝",
        iconColor: "text-gray-600 dark:text-gray-400",
        titleColor: "text-gray-800 dark:text-gray-200",
        textColor: "text-gray-700 dark:text-gray-300",
      };
  }
};

export function Callout({
  type,
  title,
  children,
  collapsible = false,
}: CalloutProps) {
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  const styles = getCalloutStyles(type);

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles.container}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-lg ${styles.iconColor}`}>{styles.icon}</span>
          <h4 className={`font-semibold ${styles.titleColor}`}>{title}</h4>
        </div>
        {collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-xl ${styles.iconColor} hover:opacity-70`}
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}
      </div>
      {isExpanded && (
        <div className={`mt-3 text-sm ${styles.textColor}`}>{children}</div>
      )}
    </div>
  );
}

// Export individual callout types for convenience
export function InfoCallout({
  title,
  children,
  collapsible,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="info" title={title} collapsible={collapsible}>
      {children}
    </Callout>
  );
}

export function TipCallout({
  title,
  children,
  collapsible,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="tip" title={title} collapsible={collapsible}>
      {children}
    </Callout>
  );
}

export function WarningCallout({
  title,
  children,
  collapsible,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="warning" title={title} collapsible={collapsible}>
      {children}
    </Callout>
  );
}

export function SuccessCallout({
  title,
  children,
  collapsible,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="success" title={title} collapsible={collapsible}>
      {children}
    </Callout>
  );
}
