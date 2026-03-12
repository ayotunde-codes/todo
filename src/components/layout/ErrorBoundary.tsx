"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex items-center justify-center px-5 bg-[#080808]">
          <div className="w-full max-w-[480px]">
            <div className="rounded-[14px] border border-[rgba(255,69,58,0.25)] bg-[#111111] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff453a]" />
                <span className="text-[13px] font-semibold text-[#f5f5f7] tracking-wide">
                  Application Error
                </span>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <p className="text-[14px] text-[#a1a1a6] leading-relaxed">
                  {this.state.error?.message ?? "An unexpected error occurred."}
                </p>
                {this.state.error?.stack && (
                  <pre className="text-[11px] text-[#636366] font-mono bg-[#0a0a0a] rounded-[8px] p-3.5 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-[#1f1f1f]">
                    {this.state.error.stack}
                  </pre>
                )}
                <button
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.reload();
                  }}
                  className="self-start h-9 px-4 rounded-[8px] bg-[#1a1a1a] border border-[#2c2c2e] text-[13px] font-medium text-[#f5f5f7] hover:bg-[#222] transition-colors"
                >
                  Reload page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
