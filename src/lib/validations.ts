/**
 * Validation utilities for authentication
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationError | null {
  if (!email) {
    return { field: "email", message: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: "email", message: "Email is invalid" };
  }

  return null;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationError | null {
  if (!password) {
    return { field: "password", message: "Password is required" };
  }

  if (password.length < 6) {
    return {
      field: "password",
      message: "Password must be at least 6 characters",
    };
  }

  return null;
}

/**
 * Validate login credentials
 */
export function validateLoginCredentials(
  email: string,
  password: string,
): ValidationResult {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Parse Supabase auth errors to user-friendly messages
 */
export function parseAuthError(error: { message?: string }): string {
  const message = error.message?.toLowerCase() || "";

  if (message.includes("invalid login credentials")) {
    return "Invalid email or password";
  }

  if (message.includes("email not confirmed")) {
    return "Please confirm your email before logging in";
  }

  if (message.includes("user not found")) {
    return "User not found";
  }

  if (message.includes("password")) {
    return "Password error";
  }

  return "An error occurred during login. Please try again.";
}
