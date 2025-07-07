// src/app/shared/api-error.util.ts

export function extractApiErrors(error: any): { [key: string]: string } {
  const result: { [key: string]: string } = {};
  debugger;
  // 1. RFC 7807/9110 Problem Details validation error
  if (error?.error?.errors && typeof error.error.errors === 'object' && !Array.isArray(error.error.errors)) {
    // error.error.errors is a dictionary: { field: [messages] }
    for (const key of Object.keys(error.error.errors)) {
      // Take the first error message for each field
      result[key.toLowerCase()] = error.error.errors[key][0];
    }
    return result;
  }

  // 2. Custom array of error objects with message property (e.g. { errors: [{ message: "...", ... }] })
  if (error?.error?.errors && Array.isArray(error.error.errors)) {
    error.error.errors.forEach((e: any) => {
      const key = (e.field || e.metadata?.field || e.propertyName || 'general error').toLowerCase();
      result[key] = e.errorMessage || e.message || JSON.stringify(e);
    });
    return result;
  }

  
  // 3. Simple string error
  if (typeof error?.error?.errors === 'string') {
    result['general error'] = error.error.errors;
    return result;
  }
  
  if (typeof error?.error === 'object') {
    result['general error'] = error.error[0].message;
    return result;
  }

  // 4. Fallback: try to get a generic message
  if (typeof error?.error === 'string') {
    result['general error'] = error.error;
    return result;
  }
  if (typeof error?.message === 'string') {
    result['general error'] = error.message;
    return result;
  }

  result['general error'] = 'An unknown error occurred.';
  return result;
}
