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
      "Architected and deployed enterprise-grade ML infrastructure by designing Agentic AI-powered ETL pipelines. Integrated RAG (Retrieval-Augmented Generation) frameworks and advanced AI guardrails to process and validate terabytes of unstructured and distributed data. This ecosystem significantly improved data reliability for downstream consumer analytics.",
      "Spearheaded comprehensive LLM evaluation and optimization initiatives, leveraging fine-tuning methodologies and knowledge distillation cycles. By rigorously validating pipeline outputs against established production baselines, the system achieved a 30% reduction in data validation failures, directly contributing to over $75K in annual operational savings.",
      "Engineered high-performance data warehousing solutions within Snowflake. Redesigned core data models and optimized complex SQL retrieval workflows for high-volume, concurrent querying, successfully cutting query execution latency by 35% without compromising engineering rigor.",
      "Orchestrated the containerization and cloud deployment of on-demand microservices using Docker and Kubernetes. Implemented robust CI/CD pipelines to automate testing and deployment across distributed computing clusters, which enhanced system scalability and reduced critical production downtime incidents by 40%."
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
      "Designed and implemented high-throughput, automated backend data pipelines to replace legacy manual workflows. By transitioning to event-driven architectures supporting large-scale, AI-driven financial data systems, manual processing efforts were reduced by 50%, ensuring continuous operational reliability.",
      "Led a critical database refactoring initiative, redesigning complex relational schemas and query execution plans. Engineered and deployed automated data validation and sanitization pipelines that improved overall data quality by 40%, providing highly reliable and pristine data feeds critical for downstream predictive ML models.",
      "Optimized distributed processing workflows and enhanced multithreaded backend services to resolve critical data bottleneck issues. This deep-dive performance tuning across the large-scale distributed systems environment resulted in a 30% sustained increase in overall system throughput."
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
      "Spearheaded the strategic migration of legacy, high-latency batch CSV workflows into a modern, real-time streaming data architecture utilizing Apache Kafka, Flink, and Delta Lake. Successfully ingested millions of telemetry data points from industrial hardware sensors.",
      "Integrated live sensor feeds into real-time telemetry dashboards, dramatically reducing anomaly detection latency for critical factory floor equipment from several hours to under 60 seconds, preventing potential hardware failures.",
      "Developed, trained, and validated sophisticated predictive maintenance machine learning models using survival analysis algorithms and time-series feature engineering. This approach achieved 30% faster fault detection and significantly minimized false alarm rates compared to existing rule-based threshold systems."
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
