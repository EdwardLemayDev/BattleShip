export const tw = (...classes: (string | false)[]) => classes.filter((v) => v !== false).join(' ');
