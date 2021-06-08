const db =require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = async id => {
  const result = await db('accounts')
      .where('id', id).first();
  return result;
}

const create = async ( {name, budget }) => {
  const [id] = await db('accounts')
    .insert({name, budget})
    return getById(id);
}

const updateById = (id, { name, budget }) => {
  return db('accounts')
    .where('id', id)
    .update({ name, budget })
    .then(() => {
      return getById(id);
    })
}

const deleteById = async id => {
  const deleted = await getById(id);
  await db('accounts')
    .where({ id })
    .del()

    return deleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
