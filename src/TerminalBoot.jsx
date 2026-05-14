import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';

const logs = [
  "Initializing system kernel...",
  "Mounting distributed file system...",
  "Starting Data Engineering protocol...",
  "Connecting to Snowflake cluster... [OK]",
  "Establishing Kafka streams... [OK]",
  "Deploying Agentic AI models...",
  "Loading neural pathways...",
  "System ready."
];

export default function TerminalBoot({ onComplete }) {
  const [currentLogs, setCurrentLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        setCurrentLogs(prev => [...prev, logs[logIndex]]);
        setProgress(Math.floor(((logIndex + 1) / logs.length) * 100));
        logIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Wait a bit before unmounting
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="tb-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="tb-window">
        <div className="tb-header">
          <span>PDP_OS Setup</span>
          <span>v2.0.26</span>
        </div>

        <div className="tb-content">
          <h2 className="tb-title">Loading Poushali's Portfolio</h2>

          <div className="tb-progress-container">
            <div className="tb-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="tb-progress-text">{progress}% Complete</div>

          <div className="tb-log-box">
            {currentLogs.map((log, i) => (
              <div key={i} className="mono tb-log-line">
                <span style={{ color: '#ffffff', opacity: 0.7 }}>&gt;</span> {log}
              </div>
            ))}
            {progress < 100 && (
              <div className="mono tb-log-line">
                <span style={{ color: '#ffffff', opacity: 0.7 }}>&gt;</span> <span className="cursor-blink">_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
