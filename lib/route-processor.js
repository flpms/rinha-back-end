'use strict';

const exists = i => i.filter(Boolean);

module.exports = (dependencies) => {
  const {
    router,
    controll,
    rqValidation,
    schemas,
  } = dependencies;

  return routes => {
    Object.keys(routes).forEach(k => {
      const controller = controll[k];
      const method = routes[k].method;
      const path = routes[k].path;
      const rqVal = schemas[method];

      const [schema] = exists([rqVal])
        .map(() => rqVal[k]);

      const [vald] = exists([routes[k].validate])
        .map(() => rqValidation(schema));

      const middlewares = exists([path, vald, controller]);

      [
        path,
        method,
        controller,
      ].filter(item => !item)
        .forEach((item) => {
          throw new ReferenceError('Missing proper param to initialize route');
        });

      router[method].apply(router, middlewares);
    });

    return router;
  };
};
