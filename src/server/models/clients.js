import bookshelf from '../bookshelf';
import Contacts from './contacts';

export default bookshelf.Model.extend({
  tableName: 'clients',
  contacts: function () { // eslint-disable-line func-names, object-shorthand
    return this.hasMany(Contacts, 'client_id');
  },
});

