import type { ScenarioId } from './types/tour';

// The umrah demo is selected by its own subdomain (demoum.*), by the /umroh path, or by ?scenario=umroh
const UMRAH_PATH = /^\/(umroh|umrah)(\/|$)/;

const detectScenario = (): { id: ScenarioId; basePath: string } => {
  if (typeof window === 'undefined') return { id: 'japan', basePath: '' };
  const { hostname, pathname, search } = window.location;

  if (hostname.startsWith('demoum.')) return { id: 'umrah', basePath: '' };
  const pathMatch = pathname.match(UMRAH_PATH);
  if (pathMatch) return { id: 'umrah', basePath: `/${pathMatch[1]}` };
  if (/[?&]scenario=(umroh|umrah)/.test(search)) return { id: 'umrah', basePath: '/umroh' };
  return { id: 'japan', basePath: '' };
};

const detected = detectScenario();

// Fixed for the lifetime of the page: switching scenario is a full navigation
export const scenario: ScenarioId = detected.id;

// Prefix for in-app paths when the scenario is selected by path rather than by hostname
export const scenarioBasePath: string = detected.basePath;

// The current path without the scenario prefix, e.g. '/umroh/demo' -> '/demo'
export const scenarioPathname = (): string => {
  if (typeof window === 'undefined') return '/';
  const { pathname } = window.location;
  return scenarioBasePath && pathname.startsWith(scenarioBasePath)
    ? pathname.slice(scenarioBasePath.length) || '/'
    : pathname;
};
