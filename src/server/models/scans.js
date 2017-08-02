import moment from 'moment';
import bookshelf from '../bookshelf';
import Machines from './machines';

export default bookshelf.Model.extend({
  tableName: 'scans',
  machines: function () { // eslint-disable-line func-names, object-shorthand
    return this.hasMany(Machines, 'scan_id');
  },
  toJSON: function () { // eslint-disable-line func-names, object-shorthand
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    attrs.created_at = moment(this.get('created_at')).format('YYYY-MM-DD');
    attrs.updated_at = moment(this.get('updated_at')).format('YYYY-MM-DD');
    return attrs;
  },
});
