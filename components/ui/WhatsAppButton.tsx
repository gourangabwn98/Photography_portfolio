"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { photographer } from "@/data";

export default function WhatsAppButton() {
  const url = `https://wa.me/${photographer.whatsapp}?text=Hi%20RK%2C%20I%27d%20love%20to%20discuss%20a%20photography%20session.`;
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={22} className="text-white fill-white" />
    </motion.a>
  );
}
