// Create: components/universal-map-wrapper.tsx
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

interface MapWrapperProps {
  componentPath: string;
  loadingHeight?: string;
  loadingMessage?: string;
}

export function createMapWrapper(componentPath: string, loadingHeight = "400px", loadingMessage = "Loading map...") {
  return dynamic(() => import(componentPath), {
    ssr: false,
    loading: () => (
      <div className={`h-[${loadingHeight}] bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    )
  });
}

// Pre-created wrappers for common map components
export const CityMapWrapper = createMapWrapper("@/components/city-map", "400px", "Loading traffic map...");
export const ViolationMapWrapper = createMapWrapper("@/components/violation-map", "400px", "Loading violation map...");
export const SignalControlMapWrapper = createMapWrapper("@/components/signal-control-map", "400px", "Loading signal control map...");

// Usage example:
// import { SignalControlMapWrapper } from "@/components/universal-map-wrapper";
// Then use <SignalControlMapWrapper /> in your page