import React from 'react';
import { AgentView } from '../agent/AgentView';
import { OperatorView } from '../operator/OperatorView';
import { TravellerView } from '../traveller/TravellerView';
import { M3Icon } from '../m3/M3Icon';

export const SplitView: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Live Sync Banner */}
      <div className="p-3 rounded-m3-lg bg-primary-container text-on-primary-container flex items-center justify-between text-xs border border-primary/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="font-bold">
            Tri-Party Live Outbound Sync Active
          </span>
          <span className="hidden sm:inline text-on-primary-container/80">
            • Any action taken in one column (e.g. airport checkpoint, schedule delay, SOS) updates the others simultaneously.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-on-primary px-2 py-0.5 rounded-m3-full">
          Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Column 1: Agent Command Center */}
        <div className="xl:col-span-4 bg-surface rounded-m3-xl p-4 border border-outline-variant/60 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/40">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
              <M3Icon name="corporate_fare" filled size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Agent HQ (Jakarta)</h3>
              <p className="text-[11px] text-on-surface-variant">Seller & Compliance Oversight</p>
            </div>
          </div>
          <AgentView />
        </div>

        {/* Column 2: Ground DMC Operator */}
        <div className="xl:col-span-5 bg-surface rounded-m3-xl p-4 border border-outline-variant/60 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/40">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <M3Icon name="commute" filled size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Ground DMC (Tokyo)</h3>
              <p className="text-[11px] text-on-surface-variant">Field Ops, Chauffeur & Guides</p>
            </div>
          </div>
          <OperatorView />
        </div>

        {/* Column 3: Traveller Mobile Digital Pass */}
        <div className="xl:col-span-3 bg-surface-container-low rounded-m3-xl p-4 border border-outline-variant/60 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant/40">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center">
              <M3Icon name="smartphone" filled size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface">Traveller Pass (Mobile)</h3>
              <p className="text-[11px] text-on-surface-variant">Guest Offline-Ready PWA</p>
            </div>
          </div>
          <div className="max-w-sm mx-auto">
            <TravellerView />
          </div>
        </div>
      </div>
    </div>
  );
};
