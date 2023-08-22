const PessoasRepos = dependencies => {
  const {
    db,
    collsNm: { pessoas }
  } = dependencies;

  const col = db.open(pessoas);

  console.log('COLLECTION OPENED', pessoas);

  return ({
    insertOne: p => col('insertOne', p),
    findOne: q => col('findOne', q),
    find: async p => {
      const result = await col('find', p);
      return result.toArray();
    },
    countDocuments: () => col('countDocuments')
  });
}

module.exports = PessoasRepos;
