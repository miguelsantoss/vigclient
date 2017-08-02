import moment from 'moment';
import bookshelf from '../bookshelf';
import Scans from './scans';
import WebScans from './webscans';

export default bookshelf.Model.extend({
  tableName: 'audits',
  scans: function () { // eslint-disable-line func-names, object-shorthand
    return this.hasMany(Scans, 'audit_id');
  },
  webScans: function () { // eslint-disable-line func-names, object-shorthand
    return this.hasMany(WebScans, 'audit_id');
  },
  toJSON: function () { // eslint-disable-line func-names, object-shorthand
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    attrs.created_at = moment(this.get('created_at')).format('YYYY-MM-DD');
    attrs.closed_at = attrs.closed_at ? moment(this.get('closed_at')).format('YYYY-MM-DD') : '';
    return attrs;
  },
});
