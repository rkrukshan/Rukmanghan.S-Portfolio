"use client";
import React, { useState, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, XCircle, Check, X } from "lucide-react";
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 },
  },
};

const Form = () => {
  const [result, setResult] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]*$/.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    if (message.trim().length > 1000) return "Message cannot exceed 1000 characters";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "message":
        return validateMessage(value);
      default:
        return "";
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    return !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validateMessage(formData.message);
  };

  // Character counter for message
  const messageLength = formData.message.trim().length;

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    const newErrors = {
      name: nameError,
      email: emailError,
      message: messageError
    };

    setIsSubmitting(true);
    setResult({ message: "Sending your message...", type: "sending" });

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);
    formDataToSend.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    );
    formDataToSend.append(
      "subject",
      process.env.NEXT_PUBLIC_WEB3FORMS_SUBJECT
    );
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success"
        });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: "", email: "", message: "" });
      } else {
        setResult({
          message: data.message || "Something went wrong. Please try again.",
          type: "error"
        });
      }
    } catch (error) {
      setResult({
        message: "Network error. Please check your connection and try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const getResultStyles = () => {
    switch (result.type) {
      case "success":
        return "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-l-4 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
      case "error":
        return "bg-gradient-to-r from-rose-500/20 to-red-500/20 border-l-4 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.15)]";
      case "sending":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-l-4 border-blue-500";
      default:
        return "bg-stone-800/60 border-l-4 border-stone-600";
    }
  };

  const getIcon = () => {
    switch (result.type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-rose-400" />;
      case "sending":
        return <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />;
      default:
        return null;
    }
  };

  // Get input border color based on validation state
  const getInputBorderColor = (fieldName) => {
    if (!touched[fieldName]) return "border-stone-700";
    if (errors[fieldName]) return "border-rose-500";
    if (formData[fieldName] && !errors[fieldName]) return "border-emerald-500";
    return "border-stone-700";
  };

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.2 }}
        className="text-3xl sm:text-4xl text-white text-center my-12 sm:my-20"
      >
        Contact Me
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
        className="w-full max-w-3xl mx-auto bg-stone-900/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-stone-700/50"
      >
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <label className="block text-stone-300 text-sm font-medium mb-2">
              Name
              {touched.name && !errors.name && formData.name && (
                <span className="ml-2 text-emerald-400 text-xs">
                  <Check className="inline w-3 h-3" /> Valid
                </span>
              )}
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full rounded-lg bg-stone-800/60 border ${getInputBorderColor("name")} px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-white placeholder-stone-500`}
              placeholder="Your name"
            />

            {/* Validation Toast for Name */}
            <AnimatePresence>
              {errors.name && touched.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 flex items-center gap-2 bg-linear-to-r from-rose-900/30 to-rose-800/20 border border-rose-700/50 rounded-lg p-3 shadow-lg"
                >
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-rose-200 text-sm">{errors.name}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <label className="block text-stone-300 text-sm font-medium mb-2">
              Email
              {touched.email && !errors.email && formData.email && (
                <span className="ml-2 text-emerald-400 text-xs">
                  <Check className="inline w-3 h-3" /> Valid
                </span>
              )}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full rounded-lg bg-stone-800/60 border ${getInputBorderColor("email")} px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-white placeholder-stone-500`}
              placeholder="you@example.com"
            />

            {/* Validation Toast for Email */}
            <AnimatePresence>
              {errors.email && touched.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 flex items-center gap-2 bg-linear-to-r from-rose-900/30 to-rose-800/20 border border-rose-700/50 rounded-lg p-3 shadow-lg"
                >
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-rose-200 text-sm">{errors.email}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-2">
              <label className="block text-stone-300 text-sm font-medium">
                Message
                {touched.message && !errors.message && formData.message && (
                  <span className="ml-2 text-emerald-400 text-xs">
                    <Check className="inline w-3 h-3" /> Valid
                  </span>
                )}
              </label>
              <div className={`text-xs ${messageLength > 10000 ? 'text-rose-400' : 'text-stone-400'}`}>
                {messageLength}/1000
              </div>
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="5"
              className={`w-full rounded-lg bg-stone-800/60 border ${getInputBorderColor("message")} px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-white placeholder-stone-500 resize-none`}
              placeholder="Your message here..."
            ></textarea>

            {/* Validation Toast for Message */}
            <AnimatePresence>
              {errors.message && touched.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 flex items-center gap-2 bg-linear-to-r from-rose-900/30 to-rose-800/20 border border-rose-700/50 rounded-lg p-3 shadow-lg"
                >
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-rose-200 text-sm">{errors.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className={`group relative rounded-lg bg-linear-to-r ${isFormValid() ? 'from-blue-950 to-cyan-950 hover:from-blue-900 hover:to-cyan-900' : 'from-stone-800 to-stone-900 cursor-not-allowed'} px-8 py-3 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 hover:cursor-pointer`}
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </span>
              {isFormValid() && (
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-400/0 via-white/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:via-white/10 group-hover:to-cyan-400/10 transition-all duration-500" />
              )}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {result.message && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-6 rounded-lg p-4 ${getResultStyles()}`}
            >
              <div className="flex items-start gap-3">
                {getIcon()}
                <p className={`text-sm flex-1 ${result.type === "success" ? "text-emerald-100" :
                  result.type === "error" ? "text-rose-100" :
                    result.type === "sending" ? "text-blue-100" :
                      "text-stone-300"
                  }`}>
                  {result.message}
                </p>
              </div>

              {result.type === "success" && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 2, ease: "easeInOut" }}
                  className="mt-3 h-0.5 bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 rounded-full"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default memo(Form);