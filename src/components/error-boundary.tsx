import { Component } from "react";

import DefaultError from "./default-error";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service like Sentry
    // ErrorReporting.logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || DefaultError;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
