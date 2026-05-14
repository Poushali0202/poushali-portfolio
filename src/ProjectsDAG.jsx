import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ArrowDownRight, ArrowDownLeft, ArrowUpRight, ArrowUpLeft } from 'lucide-react';

const nodeDefs = [
  { id: 'start', position: { x: 50, y: 200 }, data: { label: 'Current Horizon' }, type: 'input' },
  { id: 'p1', position: { x: 250, y: 200 }, data: { label: 'Text-to-Pipeline (May 2026)' } },
  { id: 'p3', position: { x: 450, y: 200 }, data: { label: 'QuickBooks AI (April 2026)' } },
  { id: 'p6', position: { x: 650, y: 200 }, data: { label: 'Serverless Lakehouse (April 2026)' } },
  { id: 'p2', position: { x: 850, y: 200 }, data: { label: 'DemonChain.ai (Feb 2026)' } },
  { id: 'p5', position: { x: 850, y: 350 }, data: { label: 'Chameleon Dungeons (Feb 2026)' } },
  { id: 'p4', position: { x: 650, y: 350 }, data: { label: 'One-stop-Story (Nov 2025)' } },
  { id: 'p7', position: { x: 450, y: 350 }, data: { label: 'Media Pipeline (Sept 2025)' } },
  { id: 'end', position: { x: 250, y: 350 }, data: { label: 'Career Inception' }, type: 'output' },
];

const edgeDefs = [
  { id: 'e1', source: 'start', target: 'p1' },
  { id: 'e2', source: 'p1', target: 'p3' },
  { id: 'e3', source: 'p3', target: 'p6' },
  { id: 'e4', source: 'p6', target: 'p2' },
  { id: 'e5', source: 'p2', target: 'p5' },
  { id: 'e6', source: 'p5', target: 'p4' },
  { id: 'e7', source: 'p4', target: 'p7' },
  { id: 'e8', source: 'p7', target: 'end' },
];

const sequence = ['start', 'p1', 'p3', 'p6', 'p2', 'p5', 'p4', 'p7', 'end'];

const projectDetails = {
  p7: {
    title: "Distributed Media Pipeline",
    subtitle: "High-Performance Orchestration",
    timeline: "September 2025",
    stack: ["FastAPI", "Celery", "Redis", "Kubernetes"],
    points: [
      "Built a large-scale distributed system with autoscaling and queue-based workload distribution.",
      "Demonstrated high-performance computing principles and operational reliability.",
      "Optimized infrastructure-heavy operations for burst-load scenarios."
    ]
  },
  p4: {
    title: "One-stop-Story",
    subtitle: "Trauma-Informed Mobile Intake",
    timeline: "November 2025",
    stack: ["React Native", "Google Document AI", "Vertex AI", "Node.js"],
    points: [
      "Developed a mobile-first intake platform for the California Homeless Youth Project.",
      "Implemented voice-to-JSON mapping using Google Speech-to-Text and Vertex AI.",
      "Built a privacy-first 'consent slicing' system allowing users to choose specific data to share with agencies.",
      "Automated agency PDF generation using pdf-lib and Google Document AI for master schema mapping."
    ]
  },
  p5: {
    title: "Chameleon of the Dungeons",
    subtitle: "Agentic Honeypot System",
    timeline: "February 2026",
    stack: ["FastAPI", "Redis", "Llama", "GPT-4", "RAG"],
    points: [
      "Built a self-evolving complex ML system generating operational rules in real time.",
      "Engineered a multi-agent LLM system with multi-model orchestration.",
      "Secured top-3 finish among 60+ teams at WeaveHacks 3."
    ]
  },
  p2: {
    title: "DemonChain.ai",
    subtitle: "Autonomous GenAI Supply Chain Center",
    timeline: "February 2026",
    stack: ["Amazon Bedrock", "Neo4j", "Datadog MCP", "Claude 3"],
    points: [
      "Built an autonomous command center for supply chain resilience using Amazon Bedrock and Claude 3 Sonnet.",
      "Engineered a live news scraper that parses global news streams to detect disruptions instantly.",
      "Utilized Neo4j Graph Database to map 'blast radius' and downstream dependency impacts.",
      "Integrated Datadog MCP to log critical business alerts and incidents directly into NOC dashboards."
    ]
  },
  p6: {
    title: "Serverless Data Lakehouse",
    subtitle: "Medallion Architecture",
    timeline: "April 2026",
    stack: ["PySpark", "Apache Iceberg", "AWS S3", "Docker"],
    points: [
      "Architected a Bronze-Silver-Gold Medallion Lakehouse on AWS S3-compatible infrastructure.",
      "Engineered end-to-end PySpark pipeline ingesting 3M+ geospatial records.",
      "Implemented Apache Iceberg for ACID transactions, schema evolution, and Time Travel queries."
    ]
  },
  p3: {
    title: "QuickBooks AI Clone",
    subtitle: "AI-Powered Finance Dashboard",
    timeline: "April 2026",
    stack: ["FastAPI", "React", "LangChain", "PostgreSQL"],
    points: [
      "Architected an end-to-end financial intelligence platform with real-time transaction categorization.",
      "Built a natural language query engine using LangChain to allow users to ask questions about their spending.",
      "Implemented automated financial forecasting using historical data and GPT-4 reasoning.",
      "Integrated Neon PostgreSQL for serverless database scalability and high availability."
    ]
  },
  p1: {
    title: "Text-to-Pipeline AI Agent",
    subtitle: "LLM-Driven OSS Application",
    timeline: "May 2026",
    stack: ["GPT-4o", "LangChain", "RocketRide", "Streamlit"],
    points: [
      "Architected a natural language to live pipeline agent using GPT-4o and LangChain on the RocketRide OSS engine.",
      "Enabled users to generate and deploy fully functional AI pipelines from English sentences.",
      "Built end-to-end execution pipeline with real-time visual DAG animation in VS Code."
    ]
  }
};

export default function ProjectsDAG() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [pipelineState, setPipelineState] = useState(sequence.length);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState('idle'); // 'idle', 'flowing', 'reading'
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentNodeDefs = React.useMemo(() => {
    if (isMobile) {
      return [
        { id: 'start', position: { x: 100, y: 150 }, data: { label: 'Current Horizon' }, type: 'input' },
        { id: 'p1', position: { x: 100, y: 270 }, data: { label: 'Text-to-Pipeline (May 2026)' } },
        { id: 'p3', position: { x: 100, y: 390 }, data: { label: 'QuickBooks AI (April 2026)' } },
        { id: 'p6', position: { x: 100, y: 510 }, data: { label: 'Serverless Lakehouse (April 2026)' } },
        { id: 'p2', position: { x: 100, y: 630 }, data: { label: 'DemonChain.ai (Feb 2026)' } },
        { id: 'p5', position: { x: 100, y: 750 }, data: { label: 'Chameleon Dungeons (Feb 2026)' } },
        { id: 'p4', position: { x: 100, y: 870 }, data: { label: 'One-stop-Story (Nov 2025)' } },
        { id: 'p7', position: { x: 100, y: 990 }, data: { label: 'Media Pipeline (Sept 2025)' } },
        { id: 'end', position: { x: 100, y: 1110 }, data: { label: 'Career Inception' }, type: 'output' },
      ];
    }
    return nodeDefs;
  }, [isMobile]);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setPipelineState(0); // Start at 'Data Ingestion'
    setStep('flowing');
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!isRunning) return;

    const delay = step === 'flowing' ? 1000 : 4000;

    const timer = setTimeout(() => {
      if (step === 'flowing') {
        const nextIdx = pipelineState + 1;
        setPipelineState(nextIdx);
        setStep('reading');

        const currentId = sequence[nextIdx];
        if (currentId !== 'start' && currentId !== 'end') {
          setSelectedProject(projectDetails[currentId]);
        }
      } else {
        if (pipelineState >= sequence.length - 1) {
          setIsRunning(false);
          setStep('idle');
          setSelectedProject(null);
        } else {
          setStep('flowing');
          setSelectedProject(null);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isRunning, pipelineState, step]);

  const displayNodes = currentNodeDefs.map((n, index) => {
    const isPast = index < pipelineState;
    const isAt = index === pipelineState;
    const isReading = isAt && step === 'reading';
    const isActive = isPast || isReading;
    const isCurrent = isReading && n.id !== 'start' && n.id !== 'end';

    let background = '#161b22';
    let borderColor = '#30363d';
    let color = '#8b949e';
    let opacity = isActive ? 1 : 0.3;
    let boxShadow = 'none';

    if (isActive) {
      if (n.id === 'start' || n.id === 'end') {
        borderColor = '#f8fafc';
        color = '#f8fafc';
      } else {
        background = 'rgba(6, 182, 212, 0.1)';
        borderColor = '#06b6d4';
        color = '#06b6d4';
      }
    }

    if (isCurrent) {
      boxShadow = '0 0 20px rgba(6, 182, 212, 0.8)';
      borderColor = '#fff';
      color = '#fff';
      background = 'rgba(6, 182, 212, 0.3)';
    }

    return {
      ...n,
      style: {
        background,
        border: `1px solid ${borderColor}`,
        color,
        opacity,
        boxShadow,
        borderRadius: '8px',
        padding: '12px 20px',
        fontWeight: 'bold',
        transition: 'all 0.5s ease'
      }
    };
  });

  const displayEdges = edgeDefs.map((e, index) => {
    const isPast = index < pipelineState - (step === 'reading' ? 0 : 0);
    const isFlowing = index === pipelineState && step === 'flowing';
    const isActive = isPast || isFlowing;

    return {
      ...e,
      type: 'smoothstep',
      animated: isActive,
      style: {
        stroke: isActive ? '#06b6d4' : '#30363d',
        strokeWidth: isActive ? 2 : 1,
        transition: 'stroke 0.5s ease'
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: isActive ? '#06b6d4' : '#30363d'
      }
    };
  });

  const onNodeClick = useCallback((event, node) => {
    if (projectDetails[node.id]) {
      setSelectedProject(projectDetails[node.id]);
    } else {
      setSelectedProject(null);
    }
  }, []);

  return (
    <div className="dag-container">
      {(!isRunning) && (
        <div className="run-pipeline-cta">
          <div className="cta-converge-wrapper">
            <motion.div
              animate={{ x: [-10, 0, -10], y: [-10, 0, -10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="cta-arrow tl"
            ><ArrowDownRight size={28} /></motion.div>
            <motion.div
              animate={{ x: [10, 0, 10], y: [-10, 0, -10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="cta-arrow tr"
            ><ArrowDownLeft size={28} /></motion.div>
            <motion.div
              animate={{ x: [-10, 0, -10], y: [10, 0, 10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="cta-arrow bl"
            ><ArrowUpRight size={28} /></motion.div>
            <motion.div
              animate={{ x: [10, 0, 10], y: [10, 0, 10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="cta-arrow br"
            ><ArrowUpLeft size={28} /></motion.div>

            <button className="run-pipeline-btn glass-panel" onClick={runPipeline}>
              <Play size={18} fill="currentColor" />
              {pipelineState === sequence.length ? 'RUN PROJECT PIPELINE' : 'RESUME PIPELINE'}
            </button>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="dark-flow"
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        preventScrolling={false}
      >
        <Background color="#ffffff" gap={20} opacity={0.03} />
      </ReactFlow>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="project-sidebar glass-panel"
          >
            <div className="sidebar-header">
              <h3 className="mono" style={{ color: 'var(--accent-cyan)' }}>Task Execution Log</h3>
              {!isRunning && (
                <button onClick={() => setSelectedProject(null)} className="close-btn">
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="sidebar-metadata">
              <span className="log-badge">TIMELINE: {selectedProject.timeline}</span>
              <span className="log-badge">STATUS: COMPLETED</span>
            </div>

            <div className="sidebar-content">
              <h2 className="sidebar-title">{selectedProject.title}</h2>
              <p className="sidebar-subtitle mono">{selectedProject.subtitle}</p>

              <div className="tech-stack-row">
                {selectedProject.stack.map(tech => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>

              <div className="log-entries">
                {selectedProject.points.map((point, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.5 }}
                    key={idx}
                    className="log-entry"
                  >
                    <span className="log-timestamp mono">[{`0${idx + 1}`}:00]</span>
                    <p className="log-text">{point}</p>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: selectedProject.points.length * 0.5 }}
                  className="log-entry"
                  style={{ marginTop: '16px' }}
                >
                  <span className="log-timestamp mono" style={{ color: 'var(--accent-green)' }}>[SUCCESS]</span>
                  <p className="log-text mono" style={{ color: 'var(--accent-green)', fontSize: '12px' }}>Pipeline stage executed.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
