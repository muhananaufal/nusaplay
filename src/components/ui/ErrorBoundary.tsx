'use client';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Opsional: tampilan custom saat error. Default: null (silent). */
  fallback?: ReactNode;
  /** Label untuk debugging di console */
  name?: string;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary — mencegah crash lokal di komponen berat (Three.js, Leaflet)
 * agar tidak merobohkan seluruh halaman.
 *
 * Dipakai di RootLayers.tsx untuk membungkus CanvasContainer dan MapView.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    const label = this.props.name ?? 'ErrorBoundary';
    console.error(`[${label}] Caught error:`, error);
    console.error(`[${label}] Component stack:`, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
