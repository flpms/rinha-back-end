'use strict';

const ks = obj => Object.keys(obj);

const genScmObj = templateMethods => schema =>
  ks(schema).forEach(key =>
    ks(schema[key]).forEach(method =>
      templateMethods[method][key] = schema[key][method]
    ))

module.exports = scmas => templateMethods => {
  scmas.forEach(scm => genScmObj(templateMethods)(scm));
  return templateMethods;
}