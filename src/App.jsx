import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, GitBranch, ArrowRight, Terminal, Menu, Server } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.6 4.9 4.9 0 0 0-.12-3.55s-1.14-.37-3.73 1.39a12.04 12.04 0 0 0-6.8 0C6.27 1.63 5.13 2 5.13 2a4.9 4.9 0 0 0-.12 3.55A5.2 5.2 0 0 0 3.6 9.15c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
    <path d="M9 19c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import TerminalBoot from './TerminalBoot';
import ProjectsDAG from './ProjectsDAG';
import { WorkLogs, EducationLogs } from './ExperienceLogs';
import ContactForm from './ContactForm';
import Accomplishments from './Accomplishments';
import './index.css';

function App() {
  const [booting, setBooting] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        {booting && <TerminalBoot key="boot" onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <motion.div
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Background Elements */}
          <div className="bg-grid"></div>
          <div className="glow-orb cyan"></div>
          <div className="glow-orb purple"></div>

          {/* Modern Navigation */}
          <nav className="nav">
            <div className="logo">
              PDP<span style={{ color: 'var(--accent-cyan)' }}>.</span>
            </div>

            <div className="glass-panel nav-links">
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#projects" className="nav-link">Pipelines</a>
              <a href="#skills" className="nav-link">Stack</a>
            </div>

            <motion.a
              href="/Resume_Poushali_DataEngineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="nav-button"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              View Resume
            </motion.a>

            <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="mobile-menu glass-panel">
              <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Pipelines</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Stack</a>
              <a href="/Resume_Poushali_DataEngineer.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)' }}>View Resume</a>
            </div>
          )}

          {/* Hero Section */}
          <section className="section-container hero-section">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-content"
            >
              <div className="hero-layout">
                <div className="hero-text-col">
                  {/* Status Badges */}
                  <motion.div variants={itemVariants} className="badge-wrapper">
                    <div className="badge">
                      <span className="badge-dot">●</span>
                      <span className="mono">System Status: Online</span>
                    </div>
                    <div className="mono role-tag">Data Engineer</div>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1 variants={itemVariants} className="hero-title">
                    Architecting <br />
                    <span className="text-gradient-cyan">Intelligence</span> &<br />
                    <span className="text-gradient">Data Infrastructure.</span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p variants={itemVariants} className="hero-subtitle">
                    Hi, I'm <strong style={{ color: 'white', fontWeight: 600 }}>Poushali</strong>. I build large-scale distributed systems,
                    Agentic AI-powered pipelines, and high-performance machine learning architecture.
                  </motion.p>

                  {/* Calls to Action */}
                  <motion.div variants={itemVariants} className="action-row">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="primary-btn"
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore Projects <ArrowRight size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="secondary-btn"
                      onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Terminal size={18} /> SSH to Profile
                    </motion.button>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <motion.a
                        whileHover={{ scale: 1.1, color: 'var(--accent-cyan)' }}
                        className="social-btn"
                        href="https://github.com/poushali0202"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                      >
                        <GithubIcon size={22} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, color: 'var(--accent-cyan)' }}
                        className="social-btn"
                        href="https://www.linkedin.com/in/poushalidebp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                      >
                        <LinkedinIcon size={22} />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="hero-image-col">
                  <div className="operator-profile large-profile" title="Operator: Poushali">
                    <img src="/headshot.png" alt="Poushali" className="operator-avatar" />
                  </div>
                </motion.div>
              </div>

              {/* Tech Stats Header */}
              <motion.div variants={itemVariants} className="mono text-muted" style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '13px', letterSpacing: '1px' }}>
                [ CORE COMPETENCIES ]
              </motion.div>

              {/* Tech Stats Cards */}
              <motion.div variants={itemVariants} className="hero-stats" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <motion.div whileHover={{ y: -8 }} className="glass-panel stat-box">
                  <div className="icon-wrapper cyan"><Database size={24} color="var(--accent-cyan)" /></div>
                  <div>
                    <div className="stat-value">Distributed Systems</div>
                    <div className="stat-label">Snowflake, Spark, Kafka</div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -8 }} className="glass-panel stat-box">
                  <div className="icon-wrapper purple">
                    <GitBranch size={24} color="var(--accent-purple)" />
                  </div>
                  <div>
                    <div className="stat-value">Agentic AI Workflows</div>
                    <div className="stat-label">RAG, LLM Orchestration</div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -8 }} className="glass-panel stat-box">
                  <div className="icon-wrapper cyan" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                    <Server size={24} color="#38bdf8" />
                  </div>
                  <div>
                    <div className="stat-value">Cloud Infrastructure</div>
                    <div className="stat-label">AWS, Kubernetes, Docker</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* Placeholders for Next Sections */}
          <section id="experience" className="section-container">
            <h2 className="section-title">Professional Experience <span className="mono section-title-muted"></span></h2>
            <WorkLogs />
          </section>

          <section id="education" className="section-container">
            <h2 className="section-title">Academic Records <span className="mono section-title-muted">[Education]</span></h2>
            <EducationLogs />
          </section>

          <section id="projects" className="section-container placeholder-section">
            <h2 className="section-title">Projects <span className="mono section-title-muted">[Pipeline DAG]</span></h2>
            <ProjectsDAG />
          </section>

          <Accomplishments />

          <section id="contact" className="section-container">
            <h2 className="section-title">Message Dispatch <span className="mono section-title-muted">[Contact]</span></h2>
            <ContactForm />
          </section>

          <footer className="footer-simple mono">
            <div className="footer-line"></div>
            <div className="footer-content">
              <span>© 2026 POUSHALI DEB PURKAYASTHA</span>
              <span className="status-indicator">SYSTEM_ONLINE_V2.0</span>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;
