var SECONDS=1000;
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
      setTimeout(()=>{
        localStorage.clear();
    },  60 * 30* SECONDS)//60 * 30
    } catch {
      // ignore write errors
    }
  };