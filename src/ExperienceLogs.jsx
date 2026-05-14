import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Terminal, ChevronRight } from 'lucide-react';

const workData = [
  {
    id: 1,
    period: "JAN 2023 - JUL 2025",
    role: "Data Engineer",
    company: "Deloitte",
    location: "India",
    type: "FULL_TIME",
    status: "COMPLETED",
    highlights: [
      "Architected enterprise-grade ML infrastructure using Agentic AI-powered ETL pipelines.",
      "Integrated RAG frameworks and AI guardrails to process terabytes of unstructured, distributed data.",
      "Improved data reliability for downstream consumer analytics by over 30%.",
      "Led comprehensive LLM evaluation, fine-tuning, and knowledge distillation optimization cycles.",
      "Validated outputs against production baselines, contributing to $75K+ in annual operational savings.",
      "Engineered high-performance data models in Snowflake, cutting query execution latency by 35%.",
      "Orchestrated containerized microservices (Docker, Kubernetes) via automated CI/CD pipelines.",
      "Enhanced system scalability and reduced critical production downtime incidents by 40%."
    ]
  },
  {
    id: 2,
    period: "JUN 2021 - JUL 2022",
    role: "Backend & Data Engineer",
    company: "HighRadius Technologies",
    location: "India",
    type: "FULL_TIME",
    status: "COMPLETED",
    highlights: [
      "Designed high-throughput, automated backend data pipelines to replace legacy manual workflows.",
      "Transitioned to event-driven architectures supporting large-scale financial data systems.",
      "Reduced manual processing efforts by 50% while ensuring continuous operational reliability.",
      "Redesigned complex relational database schemas and optimized SQL query execution plans.",
      "Deployed automated data sanitization pipelines, improving overall pristine data quality by 40%.",
      "Resolved data bottlenecks by optimizing multithreaded backend distributed services.",
      "Achieved a 30% sustained increase in overall system throughput across the environment."
    ]
  },
  {
    id: 5,
    period: "JUN 2020 - AUG 2020",
    role: "Data Engineering Intern",
    company: "TATA Steel – TISCO",
    location: "India",
    type: "INTERNSHIP",
    status: "COMPLETED",
    highlights: [
      "Spearheaded the migration of legacy batch CSV workflows into a real-time streaming architecture.",
      "Utilized Apache Kafka, Flink, and Delta Lake to ingest millions of hardware sensor telemetry points.",
      "Integrated live sensor feeds into real-time operational telemetry dashboards.",
      "Reduced anomaly detection latency for factory floor equipment from several hours to under 60 seconds.",
      "Trained predictive maintenance ML models using survival analysis and time-series feature engineering.",
      "Achieved 30% faster fault detection and minimized false alarm rates compared to rule-based systems."
    ]
  }
];

const educationData = [
  {
    id: 3,
    period: "2025 - 2027",
    role: "MS in Applied Data Intelligence",
    company: "San Jose State University",
    location: "San Jose, CA",
    type: "EDUCATION",
    status: "ACTIVE",
    highlights: [
      "Relevant Courses: Data Warehousing and Pipeline Development, Data Visualization, Distributed Systems, Machine Learning, Deep Learning."
    ]
  },
  {
    id: 4,
    period: "2018 - 2022",
    role: "B.Tech in Computer Science & Engineering",
    company: "SRM Institute of Science & Technology",
    location: "India",
    type: "EDUCATION",
    status: "COMPLETED",
    highlights: [
      "Relevant Courses: Data Structures and Algorithms, Operating Systems, Network Security, Data Mining, DBMS, and Advanced Programming."
    ]
  }
];

const LogEntry = ({ exp, index }) => (
  <motion.div
    key={exp.id}
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="log-entry-wrapper"
  >
    <div className={`timeline-dot ${exp.status === 'ACTIVE' ? 'active-pulse' : ''}`}></div>

    <div className="log-entry-card glass-panel">
      <div className="log-header">
        <div className="log-meta">
          <span className="log-timestamp mono">[{exp.period}]</span>
          <span className={`log-level mono ${exp.status === 'ACTIVE' ? 'info' : 'success'}`}>
            {exp.status === 'ACTIVE' ? 'INFO' : 'SUCC'}
          </span>
        </div>
        <div className="log-type mono">{exp.type}</div>
      </div>

      <div className="log-body">
        <div className="log-title-row">
          <h3 className="role-title">{exp.role}</h3>
          <div className="company-info">
            <span className="company-name">@ {exp.company}</span>
          </div>
        </div>

        <div className="log-location mono">
          <MapPin size={12} /> {exp.location}
        </div>

        <div className="log-highlights">
          {exp.highlights.map((item, i) => (
            <div key={i} className="highlight-item">
              <ChevronRight size={14} className="accent-cyan" />
              <span className="highlight-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="log-footer">
        <div className="status-label mono">
          STATUS: <span className={exp.status === 'ACTIVE' ? 'text-cyan' : 'text-success'}>{exp.status}</span>
        </div>
        <div className="system-tag mono">SYS_LOG_V{exp.id}.0</div>
      </div>
    </div>
  </motion.div>
);

export const WorkLogs = () => {
  return (
    <div className="experience-timeline">
      <div className="timeline-track"></div>
      <div className="logs-container">
        {workData.map((exp, index) => (
          <LogEntry key={exp.id} exp={exp} index={index} />
        ))}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="timeline-end mono">
        </motion.div>
      </div>
    </div>
  );
};

export const EducationLogs = () => {
  return (
    <div className="experience-timeline">
      <div className="timeline-track"></div>
      <div className="logs-container">
        {educationData.map((exp, index) => (
          <LogEntry key={exp.id} exp={exp} index={index} />
        ))}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="timeline-end mono">
        </motion.div>
      </div>
    </div>
  );
};
