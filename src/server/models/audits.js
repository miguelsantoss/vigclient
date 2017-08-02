import moment from 'moment';
import bookshelf from '../bookshelf';
import Scan from './scan';
import WebScan from './webscan';

export default bookshelf.Model.extend({
  tableName: 'audits',
  scans: function() {
    return this.hasMany(Scan, 'audit_id');
  },
  webScans: function() {
    return this.hasMany(WebScan, 'audit_id');
  },
  toJSON: function() {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    attrs.created_at = moment(this.get('created_at')).format('YYYY-MM-DD');
    attrs.closed_at = attrs.closed_at ? moment(this.get('closed_at')).format('YYYY-MM-DD') : '';
    return attrs;
  },
});
