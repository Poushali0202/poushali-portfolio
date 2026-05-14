import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal, TerminalSquare } from 'lucide-react';

const accomplishments = [
  {
    id: 0,
    title: "CRLA Level 1 Certified Tutor",
    event: "Intl. Tutor Training Program Certification (ITTPC)",
    icon: <Award size={24} />,
    color: "cyan"
  },
  {
    id: 1,
    title: "Microsoft Sponsorship Award",
    event: "Green AI Hackathon @ Stanford University",
    icon: <Trophy size={24} />,
    color: "purple"
  },
  {
    id: 2,
    title: "3rd Place Overall Winner",
    event: "WeaveHacks 3 @ San Francisco",
    icon: <Medal size={24} />,
    color: "green"
  },
  {
    id: 3,
    title: "Three-Time Spot Award Winner",
    event: "Deloitte Consulting",
    icon: <Star size={24} />,
    color: "cyan"
  },
  {
    id: 4,
    title: "More achievements compiling...",
    event: "Awaiting next runtime execution",
    icon: <TerminalSquare size={24} />,
    color: "muted"
  }
];

export default function Accomplishments() {
  return (
    <section className="section-container" style={{ paddingBottom: '100px' }}>
      <div className="section-header">
        <h2 className="mono section-title">AWARDS & RECOGNITION</h2>
        <div className="section-line"></div>
      </div>

      <div className="accomplishments-grid">
        {accomplishments.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className={`accomplishment-card border-${item.color}`}
          >
            <div className={`icon-container bg-${item.color}`}>
              {item.icon}
            </div>
            <div className="accomplishment-details">
              <h3 className="accomplishment-title">{item.title}</h3>
              <p className="accomplishment-event mono">{item.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
