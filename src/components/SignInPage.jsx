import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './AuthPages.css';

const SignInPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </div>
  );
};

export default SignInPage;
