import moment from 'moment';
import bookshelf from '../bookshelf';
import ServicePorts from './scans';
import Vulnerabilities from './vulnerabilities';

export default bookshelf.Model.extend({
  tableName: 'machines',
  servicePorts: function () { // eslint-disable-line func-names, object-shorthand
    return this.hasMany(ServicePorts, 'machine_id');
  },
  vulnerabilities: function () { // eslint-disable-line func-names, object-shorthand
    return this.hasMany(Vulnerabilities, 'machine_id');
  },
  toJSON: function () { // eslint-disable-line func-names, object-shorthand
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    attrs.created_at = moment(this.get('created_at')).format('YYYY-MM-DD');
    attrs.updated_at = moment(this.get('updated_at')).format('YYYY-MM-DD');
    return attrs;
  },
});

