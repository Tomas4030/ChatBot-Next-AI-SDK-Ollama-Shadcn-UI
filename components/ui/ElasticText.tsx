import React from "react";

type ElasticTextProps = {
  text: string;
  className?: string;
};

export default function ElasticText({ text, className = "" }: ElasticTextProps) {
  return (
    <span className={`elastic-text ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i}>{char === " " ? "\u00A0" : char}</span>
      ))}
    </span>
  );
}
