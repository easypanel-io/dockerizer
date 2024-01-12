import { createRequire } from 'node:module';

const __require = createRequire(import.meta.url);
let inspector;
function setupInspect(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const isEnabled = config.inspect || config.inspectBrk;
  if (isEnabled) {
    inspector = __require("node:inspector");
    const isOpen = inspector.url() !== void 0;
    if (!isOpen) {
      inspector.open();
      if (config.inspectBrk)
        inspector.waitForDebugger();
    }
  }
  const isIsolatedSingleThread = config.pool === "threads" && ((_b = (_a = config.poolOptions) == null ? void 0 : _a.threads) == null ? void 0 : _b.isolate) === false && ((_d = (_c = config.poolOptions) == null ? void 0 : _c.threads) == null ? void 0 : _d.singleThread);
  const isIsolatedSingleFork = config.pool === "forks" && ((_f = (_e = config.poolOptions) == null ? void 0 : _e.forks) == null ? void 0 : _f.isolate) === false && ((_h = (_g = config.poolOptions) == null ? void 0 : _g.forks) == null ? void 0 : _h.singleFork);
  const keepOpen = config.watch && (isIsolatedSingleFork || isIsolatedSingleThread);
  return function cleanup() {
    if (isEnabled && !keepOpen && inspector)
      inspector.close();
  };
}

export { setupInspect as s };
