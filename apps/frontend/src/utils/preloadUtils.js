// Preloading utilities for lazy components
const componentCache = new Map();

// Preload a component without showing loading state
export const preloadComponent = (componentImport) => {
  if (componentCache.has(componentImport)) {
    return componentCache.get(componentImport);
  }

  const promise = componentImport();
  componentCache.set(componentImport, promise);
  return promise;
};

// Preload specific components
export const preloadRates = () => preloadComponent(() => import('../pages/Rates'));
export const preloadQuiz = () => preloadComponent(() => import('../pages/PreQualQuiz'));
export const preloadComponentDemo = () => preloadComponent(() => import('../pages/ComponentDemo'));

// Preload on hover
export const preloadOnHover = (preloadFunction) => {
  let timeout;
  
  return {
    onMouseEnter: () => {
      timeout = setTimeout(() => {
        preloadFunction();
      }, 200); // 200ms delay to avoid unnecessary preloading
    },
    onMouseLeave: () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  };
};

// Preload on focus (for accessibility)
export const preloadOnFocus = (preloadFunction) => {
  return {
    onFocus: () => {
      preloadFunction();
    }
  };
};

// Preload multiple components
export const preloadAllLazyComponents = () => {
  preloadRates();
  preloadQuiz();
  preloadComponentDemo();
}; 