import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './AuthPages.css';

const SignUpPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </div>
  );
};

export default SignUpPage;
