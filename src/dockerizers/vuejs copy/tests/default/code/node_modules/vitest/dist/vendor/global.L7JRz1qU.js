function getWorkerState() {
  const workerState = globalThis.__vitest_worker__;
  if (!workerState) {
    const errorMsg = 'Vitest failed to access its internal state.\n\nOne of the following is possible:\n- "vitest" is imported directly without running "vitest" command\n- "vitest" is imported inside "globalSetup" (to fix this, use "setupFiles" instead, because "globalSetup" runs in a different context)\n- Otherwise, it might be a Vitest bug. Please report it to https://github.com/vitest-dev/vitest/issues\n';
    throw new Error(errorMsg);
  }
  return workerState;
}
function getCurrentEnvironment() {
  const state = getWorkerState();
  return state == null ? void 0 : state.environment.name;
}

export { getCurrentEnvironment as a, getWorkerState as g };
