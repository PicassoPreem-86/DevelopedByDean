import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-hero flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-6xl font-extrabold text-accent/30">Oops</p>
            <h1 className="mt-4 text-2xl font-extrabold text-white">
              Something went wrong
            </h1>
            <p className="mt-3 text-white/60 max-w-sm mx-auto">
              An unexpected error occurred. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
