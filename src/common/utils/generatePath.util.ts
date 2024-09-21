export const generatePath = (path: string, params: { [key: string]: string }) => {
   let newPath = path;
   for (const key in params) {
      newPath = newPath.replace(`:${key}`, params[key]);
   }
   return newPath;
};