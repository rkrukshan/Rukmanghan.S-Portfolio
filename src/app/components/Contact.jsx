"use client";

import React, { useState } from "react";
import { CONTACT } from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import styles from "../styles/Contact.module.css";

// Define colors as constants
const COLORS = {
  address: "#60a5fa",
  phone: "#4ade80",
  email: "#a78bfa"
};

// Define corresponding action icons for each type
const ACTION_ICONS = {
  maps: FaMapMarkerAlt,
  tel: FaPhoneAlt,
  email: FaEnvelope
};

const ContactItem = ({ icon: Icon, label, value, actionType, isCopied, onCopy }) => {
  const color = COLORS[label.toLowerCase()] || "#60a5fa";
  const ActionIcon = ACTION_ICONS[actionType] || FaMapMarkerAlt;

  // Create style object
  const itemStyle = {
    '--item-color': color
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={styles.contactItem}
      style={itemStyle}
    >
      <div className={styles.iconContainer}>
        <Icon className={styles.iconMain} style={{ color }} />
      </div>

      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>

      <div className={styles.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (actionType === "email") window.location.href = `mailto:${value}`;
            else if (actionType === "tel") window.location.href = `tel:${value}`;
            else if (actionType === "maps") window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, '_blank', 'noopener,noreferrer');
          }}
          className={`${styles.actionBtn} ${styles.primary}`}
          aria-label={`Open ${label}`}
        >
          <ActionIcon className={styles.iconAction} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCopy(value, label.toLowerCase())}
          className={`${styles.actionBtn} ${styles.secondary}`}
          aria-label={`Copy ${label}`}
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <FaCheck className={styles.iconCheck} style={{ color }} />
              </motion.div>
            ) : (
              <FaCopy className={styles.iconCopy} />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const [copiedField, setCopiedField] = useState(null);
  const currentYear = new Date().getFullYear();

  const handleCopy = async (text, field) => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.container}>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.2 }}
        className="text-3xl sm:text-4xl text-white text-center my-5 sm:mb-30"
      >
        Get in Touch
      </motion.h2>

      <div className={styles.contactGrid}>
        <ContactItem
          icon={FaMapMarkerAlt}
          label="Address"
          value={CONTACT.address}
          actionType="maps"
          isCopied={copiedField === "address"}
          onCopy={handleCopy}
        />

        <ContactItem
          icon={FaPhoneAlt}
          label="Phone"
          value={CONTACT.phoneNo}
          actionType="tel"
          isCopied={copiedField === "phone"}
          onCopy={handleCopy}
        />

        <ContactItem
          icon={FaEnvelope}
          label="Email"
          value={CONTACT.email}
          actionType="email"
          isCopied={copiedField === "email"}
          onCopy={handleCopy}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={styles.footer}
      >
        <span className={styles.copyright}>
          © {currentYear} {CONTACT.copywrite}
        </span>
      </motion.div>

      <AnimatePresence>
        {copiedField && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={styles.toast}
          >
            <FaCheck className={styles.toastIcon} />
            <span>Copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}