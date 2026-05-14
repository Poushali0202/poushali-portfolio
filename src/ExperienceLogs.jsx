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
      "Architected and deployed enterprise-grade ML infrastructure using Agentic AI-powered ETL pipelines, integrating RAG frameworks and advanced AI guardrails to process and validate terabytes of unstructured and distributed data, improving downstream data reliability by over 30%.",
      "Spearheaded comprehensive LLM evaluation and optimization initiatives, leveraging fine-tuning methodologies and knowledge distillation cycles to rigorously validate pipeline outputs against established production baselines, contributing to $75K+ in annual operational savings.",
      "Engineered high-performance data warehousing solutions within Snowflake by redesigning core data models and optimizing complex SQL retrieval workflows for high-volume, concurrent querying, successfully cutting query execution latency by 35%.",
      "Orchestrated the containerization and cloud deployment of on-demand microservices using Docker and Kubernetes via robust CI/CD pipelines, significantly enhancing system scalability and reducing critical production downtime incidents by 40%."
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
      "Designed and implemented high-throughput, automated backend data pipelines to replace legacy manual workflows, transitioning to event-driven architectures that supported large-scale, AI-driven financial systems and reduced manual processing efforts by 50%.",
      "Led a critical database refactoring initiative, redesigning complex relational schemas and engineering automated data sanitization pipelines that improved pristine data quality by 40%, ensuring reliable feeds for downstream predictive ML models.",
      "Resolved critical data bottlenecks by optimizing distributed processing workflows and multithreaded backend services, resulting in a 30% sustained increase in overall system throughput across the large-scale computing environment."
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
      "Spearheaded the strategic migration of legacy, high-latency batch CSV workflows into a modern, real-time streaming data architecture utilizing Apache Kafka, Flink, and Delta Lake to successfully ingest millions of telemetry data points.",
      "Integrated live hardware sensor feeds into real-time operational telemetry dashboards, dramatically reducing anomaly detection latency for critical factory floor equipment from several hours to under 60 seconds.",
      "Developed, trained, and validated sophisticated predictive maintenance machine learning models using survival analysis algorithms and time-series feature engineering, achieving 30% faster fault detection compared to rule-based systems."
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
