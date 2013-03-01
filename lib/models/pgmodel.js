// Generated by IcedCoffeeScript 1.4.0a
(function() {
  var hash, iced, model, pg, print, __iced_k, __iced_k_noop,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  pg = require('pg');

  iced = require('../myiced');

  iced.util.pollute(global);

  model = require('./basemodel');

  print = function(cb) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      console.log(args);
      return cb.apply(this, args);
    };
  };

  hash = (function() {
    var crypto;
    crypto = require('crypto');
    return function(key) {
      return crypto.createHash('md5').update(key).digest('base64');
    };
  })();

  module.exports = function(connectionString) {
    var Asap, AsapList, Inbox, Information, Note, PGObject, Project, Task, Transaction, listen, query, queryMany, queryNone, queryOne, _class;
    listen = function(channel, cb, finishcb) {
      var client, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      client = new pg.Client(connectionString);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "src/models/pgmodel.iced",
          funcname: "listen"
        });
        client.connect(__iced_deferrals.defer({
          lineno: 20
        }));
        __iced_deferrals._fulfill();
      })(function() {
        client.on('notification', function(msg) {
          return cb(null, msg);
        });
        client.query("LISTEN " + channel + ";");
        return typeof finishcb === "function" ? finishcb(function() {
          return client.end();
        }) : void 0;
      });
    };
    Transaction = (function() {

      function Transaction() {
        this.rollback = __bind(this.rollback, this);
        this.commit = __bind(this.commit, this);
        this.begin = __bind(this.begin, this);        return _class.apply(this, arguments);
      }

      _class = func(function(autocb) {
        var ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = autocb;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "src/models/pgmodel.iced",
            funcname: "Transaction"
          });
          pg.connect(connectionString, __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                return __slot_1.client = arguments[0];
              };
            })(_this),
            lineno: 29
          }));
          __iced_deferrals._fulfill();
        })(function() {
          autocb(_this.begin());
          return;
        });
      });

      Transaction.prototype.begin = function() {
        return this.client.query('begin');
      };

      Transaction.prototype.commit = function(autocb) {
        var ___iced_passed_deferral, __iced_deferrals, __iced_k;
        __iced_k = autocb;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "src/models/pgmodel.iced",
          funcname: "Transaction.commit"
        });
        this.client.query('commit').on('end', __iced_deferrals.defer({
          lineno: 36
        }));
        __iced_deferrals._fulfill();
      };

      Transaction.prototype.rollback = function() {
        return this.client.query('rollback');
      };

      Transaction.prototype.query = func(function(autocb, config) {
        var request,
          _this = this;
        config.name = hash(config.text);
        request = this.client.query(config);
        request.on('error', function(error) {
          return request.error = {
            msg: 'pgerror',
            pgerror: error,
            query: config
          };
        });
        autocb(request);
        return;
      });

      Transaction.prototype.queryMany = func(function(cb, config) {
        var callback, callbackb, request, res, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        if (config.cb != null) {
          callbackb = config.cb;
          delete config.cb;
        } else {
          callback = function(row, res) {
            return res.addRow(row);
          };
        }
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "src/models/pgmodel.iced",
            funcname: "Transaction"
          });
          _this.query(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return request = arguments[0];
              };
            })(),
            lineno: 60
          }), config);
          __iced_deferrals._fulfill();
        })(function() {
          request.on('row', callback);
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "src/models/pgmodel.iced",
              funcname: "Transaction"
            });
            request.on('end', addNull(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return res = arguments[0];
                };
              })(),
              lineno: 63
            })));
            __iced_deferrals._fulfill();
          })(function() {
            if (request.error != null) return throwError(request.error);
            return cb(res.rows);
          });
        });
      });

      Transaction.prototype.queryOne = func(function(autocb, config) {
        var res, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = autocb;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "src/models/pgmodel.iced",
            funcname: "Transaction"
          });
          _this.queryMany(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return res = arguments[0];
              };
            })(),
            lineno: 67
          }), config);
          __iced_deferrals._fulfill();
        })(function() {
          if (res[0] == null) {
            throwError('queryOne got no result.', {
              config: config
            });
          }
          autocb(res[0]);
          return;
        });
      });

      Transaction.prototype.queryNone = func(function(autocb, config) {
        var res, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = autocb;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "src/models/pgmodel.iced",
            funcname: "Transaction"
          });
          _this.queryMany(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return res = arguments[0];
              };
            })(),
            lineno: 72
          }), config);
          __iced_deferrals._fulfill();
        })(function() {
          autocb(null);
          return;
        });
      });

      return Transaction;

    })();
    query = func(function(autocb, config) {
      var res, result, t, transaction, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      transaction = config.transaction;
      (function(__iced_k) {
        if (transaction != null) {
          return __iced_k(t = transaction);
        } else {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "src/models/pgmodel.iced"
            });
            t = new Transaction(__iced_deferrals.defer({
              lineno: 83
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        }
      })(function() {
        catchCB(function(cb, err) {
          if (transaction == null) t.rollback();
          return cb(err);
        });
        (function(__iced_k) {
          if (config.before != null) {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/models/pgmodel.iced"
              });
              config.before.call(_this, __iced_deferrals.defer({
                lineno: 88
              }), config, t);
              __iced_deferrals._fulfill();
            })(__iced_k);
          } else {
            return __iced_k();
          }
        })(function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "src/models/pgmodel.iced"
            });
            t[config.func](__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return res = arguments[0];
                };
              })(),
              lineno: 89
            }), {
              text: config.text,
              values: config.values != null ? config.values : []
            });
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              if (config.after != null) {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "src/models/pgmodel.iced"
                  });
                  config.after.call(_this, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return result = arguments[0];
                      };
                    })(),
                    lineno: 93
                  }), res, t);
                  __iced_deferrals._fulfill();
                })(function() {
                  return __iced_k(typeof result !== "undefined" && result !== null ? res = result : void 0);
                });
              } else {
                return __iced_k();
              }
            })(function() {
              (function(__iced_k) {
                if (transaction == null) {
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "src/models/pgmodel.iced"
                    });
                    t.commit(addNull(__iced_deferrals.defer({
                      lineno: 95
                    })));
                    __iced_deferrals._fulfill();
                  })(__iced_k);
                } else {
                  return __iced_k();
                }
              })(function() {
                autocb(res);
                return;
              });
            });
          });
        });
      });
    });
    queryNone = function(cb, transaction, config) {
      config.transaction = transaction;
      config.func = 'queryNone';
      return query(cb, config);
    };
    queryOne = function(cb, transaction, config) {
      config.transaction = transaction;
      config.func = 'queryOne';
      return query(cb, config);
    };
    queryMany = function(cb, transaction, config) {
      config.transaction = transaction;
      config.func = 'queryMany';
      return query(cb, config);
    };
    PGObject = (function(_super) {

      __extends(PGObject, _super);

      function PGObject(id) {
        this.id = id;
      }

      return PGObject;

    })(model.ModelObject);
    Information = (function(_super) {

      __extends(Information, _super);

      function Information(id) {
        var tempType;
        this.id = id;
        tempType = this.constructor.name.toLowerCase();
        if (tempType !== 'information') this.type = tempType;
      }

      Information.prototype.create = function(cb, status, referencing, t) {
        var _this = this;
        if (status == null) status = 'default';
        if (referencing == null) referencing = null;
        return queryOne(cb, t, {
          text: 'INSERT INTO information (status) VALUES ($1) RETURNING id;',
          values: [status],
          after: func(function(autocb, res, transaction) {
            var ___iced_passed_deferral, __iced_deferrals, __iced_k;
            __iced_k = autocb;
            ___iced_passed_deferral = iced.findDeferral(arguments);
            _this.id = res.id;
            (function(__iced_k) {
              if (referencing != null) {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "src/models/pgmodel.iced"
                  });
                  _this.addReference(__iced_deferrals.defer({
                    lineno: 141
                  }), referencing, transaction);
                  __iced_deferrals._fulfill();
                })(__iced_k);
              } else {
                return __iced_k();
              }
            })(function() {
              autocb(_this.id);
              return;
            });
          })
        });
      };

      Information.prototype.addReference = function(cb, reference, t) {
        return queryNone(cb, t, {
          text: 'INSERT INTO "references" (id, referenceid) VALUES ($1, $2);',
          values: [this.id, reference.id]
        });
      };

      Information.prototype.removeReference = function(cb, reference, t) {
        return queryNone(cb, t, {
          text: 'DELETE FROM "references" WHERE id=$1 AND referenceid=$2',
          values: [this.id, reference.id]
        });
      };

      Information.prototype.getType = func(function(cb, t) {
        var _this = this;
        if (this.type != null) {
          return cb(this.type);
        } else {
          return queryOne(catchNull(cb), t, {
            text: 'SELECT type FROM type WHERE id=$1;',
            values: [this.id],
            after: func(function(autocb, res) {
              if (res != null) {
                autocb(_this.type = res.type);
                return;
              } else {
                autocb(throwError('Couldnt get Type.', {
                  id: _this.id
                }));
                return;
              }
            })
          });
        }
      });

      Information.prototype.get = function(cb, t) {
        var _this = this;
        return queryOne(cb, t, {
          text: "SELECT getInformation($1) as info;",
          values: [this.id],
          after: func(function(autocb, res, t) {
            var key, value;
            res = JSON.parse(res.info);
            for (key in res) {
              value = res[key];
              _this[key] = value;
            }
            autocb(res);
            return;
          })
        });
      };

      Information.prototype.setStatus = function(cb, status, t) {
        return queryNone(cb, t, {
          text: 'UPDATE information SET status=$2 WHERE id=$1;',
          values: [this.id, status]
        });
      };

      Information.prototype.setDelay = function(cb, delay, t) {
        return queryNone(cb, t, {
          text: "UPDATE information SET status='inbox', delay=$2 WHERE id=$1;",
          values: [this.id, delay != null ? delay.toISOString() : null]
        });
      };

      Information.prototype.attach = function(cb, file, t) {
        return queryNone(cb, t, {
          text: 'INSERT INTO attachments (id, fileid) VALUES ($1, $2);',
          values: [this.id, file.id]
        });
      };

      Information.prototype.detach = function(cb, file, t) {
        return queryNone(cb, t, {
          text: 'DELETE FROM attachments WHERE id=$1 AND fileid=$2);',
          values: [this.id, file.id]
        });
      };

      Information.prototype._set = func(function(autocb, table, map, allowed, t) {
        var answers, errors, key, value, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = autocb;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        answers = {};
        errors = {};
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "src/models/pgmodel.iced",
            funcname: "Information"
          });
          for (key in map) {
            value = map[key];
            if ((allowed == null) || __indexOf.call(allowed, key) >= 0) {
              queryNone(__iced_deferrals.defer({
                lineno: 202
              }), t, {
                text: "UPDATE " + table + " SET $2=$3 WHERE id=$1;",
                values: [_this.id, key, value]
              });
            }
          }
          __iced_deferrals._fulfill();
        })(function() {
          autocb(null);
          return;
        });
      });

      Information.prototype.getReferences = function(cb, t) {
        var _this = this;
        return queryMany(cb, t, {
          text: 'SELECT referenceid FROM "references" WHERE id=$1;',
          values: [this.id],
          after: func(function(autocb, res) {
            var row, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = res.length; _i < _len; _i++) {
              row = res[_i];
              _results.push(row.referenceid);
            }
            autocb(_results); return;
          })
        });
      };

      Information.prototype.getAttachments = function(cb, t) {
        var _this = this;
        return queryMany(cb, t, {
          text: 'SELECT fileid FROM attachments WHERE id=$1;',
          values: [this.id],
          after: func(function(autocb, res) {
            var row, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = res.length; _i < _len; _i++) {
              row = res[_i];
              _results.push(row.fileid);
            }
            autocb(_results); return;
          })
        });
      };

      Information.prototype._store = function(values) {
        return this.change(values);
      };

      Information.getAllIDs = function(cb, t) {
        var _this = this;
        return queryOne(cb, t, {
          text: "select array_to_json(array_agg(id)) as list from " + (this.name.toLowerCase()) + ";",
          after: func(function(autocb, res) {
            if (res.list != null) {
              autocb(JSON.parse(res.list));
              return;
            } else {
              autocb([]);
              return;
            }
          })
        });
      };

      Information.getAll = function(cb, t) {
        return queryOne(cb, t, {
          text: "SELECT array_to_json(array_agg(getInformation(id))) as list FROM " + (this.name.toLowerCase()) + ";",
          after: func(function(autocb, res) {
            if (res.list != null) {
              autocb(JSON.parse(res.list));
              return;
            } else {
              autocb([]);
              return;
            }
          })
        });
      };

      /*
      	class File extends PGObject
      
      		create: (cb, name, t) ->
      			@queryOne cb, t,
      				text: 'INSERT INTO file (name) VALUES ($1) RETURNING id;'
      				values: [name]
      				after: func (autocb, res) -> @id = res.id
      			
      		getName: (cb, t) ->
      			@queryOne cb, t,
      				text: 'SELECT name FROM file WHERE id=$1;'
      				values: [@id]
      				after: func (autocb, res) -> res.name
      
      		delete: (cb, t)->
      			@queryNone cb, t,
      				text: 'DELETE FROM file WHERE id=$1'
      				values: [@id]
      */


      return Information;

    })(PGObject);
    Note = (function(_super) {

      __extends(Note, _super);

      function Note() {
        return Note.__super__.constructor.apply(this, arguments);
      }

      Note.prototype.create = function(cb, content, t) {
        var _this = this;
        return queryNone(cb, t, {
          before: func(function(autocb, config, t) {
            var ___iced_passed_deferral, __iced_deferrals, __iced_k;
            __iced_k = autocb;
            ___iced_passed_deferral = iced.findDeferral(arguments);
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/models/pgmodel.iced"
              });
              Information.prototype.create.call(_this, __iced_deferrals.defer({
                lineno: 258
              }), 'inbox', null, t);
              __iced_deferrals._fulfill();
            })(function() {
              autocb(config.values = [_this.id, content]);
              return;
            });
          }),
          text: 'INSERT INTO note (id, content) VALUES ($1, $2);',
          after: func(function(autocb) {
            autocb(_this.id);
            return;
          })
        });
      };

      Note.prototype.setContent = function(cb, content, t) {
        return queryNone(cb, t, {
          text: 'UPDATE note SET content=$2 WHERE id=$1',
          values: [this.id, content]
        });
      };

      return Note;

    })(Information);
    Task = (function(_super) {

      __extends(Task, _super);

      function Task() {
        return Task.__super__.constructor.apply(this, arguments);
      }

      Task.prototype.create = function(cb, description, referencing, parent, t) {
        var _this = this;
        if (referencing == null) referencing = null;
        if (parent == null) parent = null;
        return queryNone(cb, t, {
          before: func(function(autocb, config, t) {
            var ___iced_passed_deferral, __iced_deferrals, __iced_k;
            __iced_k = autocb;
            ___iced_passed_deferral = iced.findDeferral(arguments);
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/models/pgmodel.iced"
              });
              Information.prototype.create.call(_this, __iced_deferrals.defer({
                lineno: 274
              }), 'default', referencing, t);
              __iced_deferrals._fulfill();
            })(function() {
              autocb(config.values = [_this.id, description, parent != null ? parent.id : null]);
              return;
            });
          }),
          text: 'INSERT INTO task (id, description, parent) VALUES ($1, $2, $3);',
          after: func(function(autocb) {
            autocb(_this.id);
            return;
          })
        });
      };

      Task.prototype.done = function(cb, t) {
        return queryNone(cb, t, {
          text: 'UPDATE task SET completed=CURRENT_TIMESTAMP WHERE id=$1',
          values: [this.id]
        });
      };

      Task.prototype.undo = function(cb, t) {
        return queryNone(cb, t, {
          text: 'UPDATE task SET completed=NULL WHERE id=$1',
          values: [this.id]
        });
      };

      Task.prototype.setParent = function(cb, parent, t) {
        return queryNone(cb, t, {
          text: 'UPDATE task SET parent=$2 WHERE id=$1;',
          values: [this.id, parent != null ? parent.id : null]
        });
      };

      Task.prototype.setDeadline = function(cb, deadline, t) {
        return queryNone(cb, t, {
          text: "UPDATE task SET deadline=$2 WHERE id=$1;",
          values: [this.id, deadline != null ? deadline.toISOString() : null]
        });
      };

      Task.prototype.setDescription = function(cb, description, t) {
        return queryNone(cb, t, {
          text: 'update task set description=$2 where id=$1',
          values: [this.id, description]
        });
      };

      return Task;

    })(Information);
    Project = (function(_super) {

      __extends(Project, _super);

      function Project() {
        return Project.__super__.constructor.apply(this, arguments);
      }

      Project.prototype.create = function(cb, description, referencing, parent, t) {
        var _this = this;
        if (referencing == null) referencing = null;
        if (parent == null) parent = null;
        return queryNone(cb, t, {
          before: func(function(autocb, config, t) {
            var ___iced_passed_deferral, __iced_deferrals, __iced_k;
            __iced_k = autocb;
            ___iced_passed_deferral = iced.findDeferral(arguments);
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/models/pgmodel.iced"
              });
              Task.prototype.create.call(_this, __iced_deferrals.defer({
                lineno: 310
              }), description, referencing, parent, t);
              __iced_deferrals._fulfill();
            })(function() {
              autocb(config.values = [_this.id]);
              return;
            });
          }),
          text: 'INSERT INTO project (id) VALUES ($1);',
          after: func(function(autocb) {
            autocb(_this.id);
            return;
          })
        });
      };

      Project.prototype.collapse = function(cb, t) {
        return queryNone(cb, t, {
          text: 'UPDATE project SET collapsed=TRUE WHERE id=$1;',
          values: [this.id]
        });
      };

      Project.prototype.uncollapse = function(cb, t) {
        return queryNone(cb, t, {
          text: 'UPDATE project SET collapsed=FALSE WHERE id=$1;',
          values: [this.id]
        });
      };

      return Project;

    })(Task);
    Asap = (function(_super) {

      __extends(Asap, _super);

      function Asap() {
        return Asap.__super__.constructor.apply(this, arguments);
      }

      Asap.prototype.create = function(cb, description, list, referencing, project, t) {
        var _this = this;
        if (referencing == null) referencing = null;
        if (project == null) project = null;
        return queryNone(cb, t, {
          before: func(function(autocb, config, t) {
            var ___iced_passed_deferral, __iced_deferrals, __iced_k;
            __iced_k = autocb;
            ___iced_passed_deferral = iced.findDeferral(arguments);
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/models/pgmodel.iced"
              });
              Task.prototype.create.call(_this, __iced_deferrals.defer({
                lineno: 330
              }), description, referencing, project, t);
              __iced_deferrals._fulfill();
            })(function() {
              autocb(config.values = [_this.id, list.id]);
              return;
            });
          }),
          text: 'INSERT INTO asap (id, asaplist) VALUES ($1, $2);',
          after: func(function(autocb) {
            autocb(_this.id);
            return;
          })
        });
      };

      Asap.prototype.setList = function(cb, list, t) {
        return queryNone(cb, t, {
          text: 'UPDATE asap SET asaplist=$2 WHERE id=$1;',
          values: [this.id, list.id]
        });
      };

      return Asap;

    })(Task);
    AsapList = (function(_super) {

      __extends(AsapList, _super);

      function AsapList() {
        return AsapList.__super__.constructor.apply(this, arguments);
      }

      AsapList.prototype.create = function(cb, name, t) {
        var _this = this;
        return queryNone(cb, t, {
          before: func(function(autocb, config, t) {
            var ___iced_passed_deferral, __iced_deferrals, __iced_k;
            __iced_k = autocb;
            ___iced_passed_deferral = iced.findDeferral(arguments);
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/models/pgmodel.iced"
              });
              Information.prototype.create.call(_this, __iced_deferrals.defer({
                lineno: 345
              }), 'default', null, t);
              __iced_deferrals._fulfill();
            })(function() {
              debug(name);
              autocb(config.values = [_this.id, name]);
              return;
            });
          }),
          text: 'INSERT INTO asaplist (id, name) VALUES ($1, $2);',
          after: func(function(autocb) {
            autocb(_this.id);
            return;
          })
        });
      };

      AsapList.prototype.rename = function(cb, name, t) {
        return queryNone(cb, t, {
          text: 'UPDATE asaplist SET name=$2 WHERE id=$1;',
          values: [this.id, name]
        });
      };

      AsapList.prototype["delete"] = function(cb, t) {
        return queryNone(cb, t, {
          text: 'DELETE FROM asaplist WHERE id=$1;',
          values: [this.id]
        });
      };

      /*
      	class SocialEntity extends Information
      
      		create: (cb) ->
      			super()
      			queryOne
      				text: 'INSERT INTO social_entity (id) VALUES ($1);'
      				values: [@id]
      			@id
      			
      	class Circle extends SocialEntity
      
      		create: (name) ->
      			super()
      			queryOne
      				text: 'INSERT INTO circle (id, name) VALUES ($1, $2);'
      				values: [@id, name]
      			@id
      
      		@getByName: (name) =>
      			answer = queryOne
      				text: 'SELECT id FROM circle WHERE name=$1;'
      				values: [name]
      			new @ answer.id
      
      		rename: (name) ->
      			queryOne
      				text: 'UPDATE circle SET name=$2 WHERE id=$1;'
      				values: [@id, name]
      
      	class Contact extends SocialEntity
      
      		create: (nameMap) ->
      			super()
      			queryOne
      				text: 'INSERT INTO contact (id) VALUES ($1);'
      				values: [@id]
      			setValues nameMap
      			@id
      
      		setValues: (nameMap) ->
      			@_set 'contact', nameMap, ['name', 'first_name', 'middle_names', 'title', 'prefix', 'suffix', 'nickname', 'birthname', 'birthday']
      
      		addAccount: (account, description=null, priority=0) ->
      
      		removeAccount: (account) ->
      		addAddress: (place, description=null) ->
      
      		removeAddress: (place) ->
      		enterCircle: (circle) ->
      		leaveCircle: (circle) ->
      
      	class Place extends Information
      
      		create: (valueMap) ->
      
      		setValues: (valueMap) ->
      		setParent: (place) ->
      		removeParent: ->
      
      	class Appointment extends Information
      
      		create: (description, date, time=null, length=null, referencing=null) ->
      			super 'default', referencing
      			queryOne
      				text: 'INSERT INTO appointment (id, description, startdate, enddate, time, length) VALUES ($1, $2, $3, $4, $5, $6);'
      				values: [@id, description, date, date, time, length]
      			@id
      
      		setValues: (valueMap) ->
      		
      		setPlace: (place) ->
      
      		addException: (appointment, exceptionMove='no') ->
      		removeException: (appointment) ->
      
      		addFilter: (type, value) ->
      		removeFilter: (type, value) ->
      
      		addParticipant: (participant) ->
      		removeParticipant: (participant) ->
      
      	class Protocol extends PGEntry
      		@find: (name) ->
      		delete: ->
      	
      	class Server extends PGEntry
      		@find: (name, protocol) ->
      		delete: ->
      
      	class Communicator extends Information
      		create: (username, server) ->
      		changeServer: (server) ->
      		setValues: (valueMap) ->
      
      	class Account extends Communicator
      		create: (username, server) ->
      		@find: (username, server) ->
      		join: (room, role=null) ->
      		leave: (room, role=null) ->
      	
      	class UserAccount extends Account
      
      		setValues: ->
      		create: (account) ->
      		downGrade: ->
      		@getAll: ->
      
      	class Room extends Communicator
      		create: (name) ->
      		setMOTD: (motd) ->
      	
      	class Communication extends Information
      		create: (from, time=new Date()) ->
      		setSender: (from) ->
      		setTime: (time=new Date()) ->
      		send: ->
      		sent: ->
      		draft: ->
      		addRecipient: (recipient, mode, resource=null) ->
      		removeRecipient: (recipient, mode) ->
      		getToSend: (from) ->
      
      	class Message extends Communication
      		create: (from, subject=null, body=null, time=new Date()) ->
      		setValues: (valueMap) ->
      
      	class Presence extends Communication
      		create: (from, time=new Date()) ->
      		addResource: (resource) ->
      
      	class Resource extends PGEntry
      		create: (name, status, message) ->
      		delete: ->
      	
      	class Daemon extends PGEntry
      		registrate: (name, status) ->
      		setStatus: (status) ->
      		setMessage: (message) ->
      		deregistrate: ->
      		@getAll: ->
      	
      	class Maybe extends PGObject
      
      		getSize: ->
      		getList: ->
      			queryMany
      				text: 'SELECT * FROM maybe ORDER BY last_edited;'
      				values: []
      */


      return AsapList;

    })(Information);
    Inbox = (function(_super) {

      __extends(Inbox, _super);

      function Inbox() {
        this.getFirst = __bind(this.getFirst, this);
        this.getSize = __bind(this.getSize, this);        return Inbox.__super__.constructor.apply(this, arguments);
      }

      Inbox.prototype.getSize = function(cb, t) {
        var _this = this;
        return queryOne(cb, t, {
          text: 'SELECT count(*) FROM inbox;',
          after: func(function(autocb, res) {
            autocb(res.count);
            return;
          })
        });
      };

      Inbox.prototype.getFirst = function(cb, t) {
        var _this = this;
        return queryMany(cb, t, {
          text: 'SELECT id FROM inbox ORDER BY "createdAt" LIMIT 1;',
          after: func(function(autocb, res) {
            var _ref;
            if (((_ref = res[0]) != null ? _ref.id : void 0) != null) {
              autocb(new Information(res[0].id));
              return;
            } else {
              autocb(null);
              return;
            }
          })
        });
      };

      Inbox.prototype.get = func(function(autocb, t) {
        var answer, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = autocb;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        answer = {};
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "src/models/pgmodel.iced",
            funcname: "Inbox"
          });
          _this.getSize(__iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                return __slot_1.size = arguments[0];
              };
            })(answer),
            lineno: 525
          }), t);
          _this.getFirst(__iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                return __slot_1.first = arguments[0];
              };
            })(answer),
            lineno: 526
          }), t);
          __iced_deferrals._fulfill();
        })(function() {
          autocb(answer);
          return;
        });
      });

      return Inbox;

    })(PGObject);
    /*
    	
    	class Urgent extends PGObject
    
    		getSize: ->
    		getList: ->
    */

    return model.extend({
      Note: Note,
      Asap: Asap,
      Information: Information,
      Task: Task,
      Project: Project,
      AsapList: AsapList,
      /*	
      		File: File
      		Circle:Circle
      		Contact:Contact
      		Place:Place
      		Appointment:Appointment
      		Protocol:Protocol
      		Server:Server
      		Account:Account
      		Room:Room
      		Message:Message
      		Presence:Presence
      		Resource:Resource
      		maybe:new Maybe
      		urgent:new Urgent
      */

      inbox: new Inbox,
      listen: listen
    });
  };

}).call(this);