// TODO: this should later be defined in a JSON file which also sets it in SCSS
const BREAKPOINTS = { s: 768, m: 1024, l: 1600 };

const getBreakpoint = breakpoints => () => {
  if (window.innerWidth >= breakpoints.l) return 'l';
  if (window.innerWidth >= breakpoints.m) return 'm';
  return 's';
};

export default getBreakpoint(BREAKPOINTS);
