import type { Process, Route } from '@lifi/sdk';
import microdiff from 'microdiff';

export const isRouteCompleted = (route: Route) => {
  return route.steps.every((step) => step.execution?.status === 'DONE');
};

export const isRouteFailed = (route: Route) => {
  return route.steps.some((step) => step.execution?.status === 'FAILED');
};

export const isRouteActive = (route?: Route) => {
  if (!route) {
    return false;
  }
  const isDone = isRouteCompleted(route);
  const isFailed = isRouteFailed(route);
  const alreadyStarted = route.steps.some((step) => step.execution);
  return !isDone && !isFailed && alreadyStarted;
};

export const getUpdatedProcess = (
  currentRoute: Route,
  updatedRoute: Route,
): Process | undefined => {
  const processDiff = microdiff(currentRoute, updatedRoute).find((diff) =>
    diff.path.includes('process'),
  );
  if (!processDiff) {
    return undefined;
  }
  // e.g. ['steps', 0, 'execution', 'process', 0]
  const process = processDiff.path
    .slice(0, processDiff.path.findIndex((path) => path === 'process') + 2)
    .reduce((obj, path) => obj[path], updatedRoute as any) as Process;
  return process;
};
