"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getSupabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import {
  validateLoginCredentials,
  parseAuthError,
  type ValidationError,
} from "../../lib/validations";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

  const getErrorForField = (field: string): string | undefined => {
    return errors.find((e) => e.field === field)?.message;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setGeneralError("");
    setLoading(true);

    // Validate inputs
    const validation = validateLoginCredentials(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabase();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setGeneralError(parseAuthError(error));
        setLoading(false);
        return;
      }

      // Wait a moment for cookies to be set
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Success - redirect to admin
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setGeneralError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute blob w-96 h-96 bg-blue-500/10 -top-48 -left-48" />
      <div className="absolute blob w-96 h-96 bg-accent/5 -bottom-48 -right-48" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        {/* Logo/Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition"
          >
            <span>←</span>
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 md:p-10 border border-border-color">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/50">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent">
                Admin Access
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-text-secondary">
              Connect your account to continue building
            </p>
          </div>

          {/* Error Alert */}
          {generalError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex gap-3"
            >
              <span className="flex-shrink-0 text-lg">⚠️</span>
              <p className="text-red-200 text-sm">{generalError}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-3 bg-surface-light rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition border ${
                  getErrorForField("email")
                    ? "border-red-500/50"
                    : "border-border-color"
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
              {getErrorForField("email") && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2 flex items-center gap-1"
                >
                  <span>⚠</span>
                  {getErrorForField("email")}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`w-full px-4 py-3 bg-surface-light rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition border ${
                  getErrorForField("password")
                    ? "border-red-500/50"
                    : "border-border-color"
                }`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              {getErrorForField("password") && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2 flex items-center gap-1"
                >
                  <span>⚠</span>
                  {getErrorForField("password")}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full px-6 py-3 mt-6 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">◌</span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-text-tertiary text-xs mt-8 text-center">
            Secured by{" "}
            <span className="text-text-secondary font-medium">
              Supabase Auth
            </span>
          </p>
        </div>

        {/* Additional Info */}
        <p className="text-center text-text-tertiary text-xs mt-6">
          Only admin team members can access this area
        </p>
      </motion.div>
    </div>
  );
}
