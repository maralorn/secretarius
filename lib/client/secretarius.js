
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"basemodel": function(exports, require, module) {(function() {
  var InfoCache, ModelObject, iced, model,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  window.__iced_k = window.__iced_k_noop = function() {};

  model = exports;

  iced = require('../myiced');

  iced.util.pollute(typeof window !== "undefined" && window !== null ? window : global);

  model.UUID_REG = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

  model.getClassByType = function(type) {
    var class_, name;
    for (name in this) {
      class_ = this[name];
      if (name.toLowerCase() === type) return class_;
    }
  };

  model.extend = function(obj) {
    var key, value;
    for (key in obj) {
      value = obj[key];
      model[key] = value;
    }
    return model;
  };

  model.ModelObject = ModelObject = (function() {
    var cbs;

    function ModelObject() {}

    ModelObject.prototype.on = function(event, cb) {
      if (this._cbs == null) this._cbs = {};
      if (this._cbs[event] == null) this._cbs[event] = [];
      if (__indexOf.call(this._cbs[event], cb) < 0) {
        return this._cbs[event].push(cb);
      }
    };

    ModelObject.prototype.emit = function(event, data) {
      var cb, _i, _len, _ref, _ref1, _results;
      if (((_ref = this._cbs) != null ? _ref[event] : void 0) != null) {
        _ref1 = this._cbs[event];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          cb = _ref1[_i];
          _results.push(cb(data));
        }
        return _results;
      }
    };

    ModelObject.prototype.removeCb = function(event, cb) {
      var elem;
      this._cbs[event] = (function() {
        var _i, _len, _ref, _results;
        _ref = this._cbs[event];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if (elem !== cb) _results.push(elem);
        }
        return _results;
      }).call(this);
      if (this._cbs[event] === []) delete this._cbs[event];
      return debug(event, "callback removed", this.constructor.name);
    };

    ModelObject.prototype.onChanged = function(cb) {
      return this.on("changed", cb);
    };

    ModelObject.prototype.onDeleted = function(cb) {
      return this.on("deleted", cb);
    };

    ModelObject.prototype.change = function(data) {
      return this.emit("changed", data);
    };

    ModelObject.prototype["delete"] = function() {
      return this.emit("deleted");
    };

    cbs = {};

    ModelObject.on = function(event, cb) {
      var obj;
      if (cbs[this.name] == null) cbs[this.name] = {};
      obj = cbs[this.name];
      if (obj[event] == null) obj[event] = [];
      if (__indexOf.call(obj[event], cb) < 0) return obj[event].push(cb);
    };

    ModelObject.emit = function(event, data) {
      var cb, _i, _len, _ref, _ref1, _results;
      if (((_ref = cbs[this.name]) != null ? _ref[event] : void 0) != null) {
        _ref1 = cbs[this.name][event];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          cb = _ref1[_i];
          _results.push(cb(data));
        }
        return _results;
      }
    };

    ModelObject.removeCb = function(event, cb) {
      var elem;
      cbs[this.name][event] = (function() {
        var _i, _len, _ref, _results;
        _ref = cbs[this.name][event];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if (elem !== cb) _results.push(elem);
        }
        return _results;
      }).call(this);
      if (cbs[this.name][event] === []) delete cbs[this.name][event];
      return debug(event, "callback removed", this.name);
    };

    ModelObject.onChanged = function(cb) {
      return this.on("changed", cb);
    };

    ModelObject.onDeleted = function(cb) {
      return this.on("deleted", cb);
    };

    ModelObject.change = function(data) {
      return this.emit("changed", data);
    };

    return ModelObject;

  })();

  InfoCache = (function() {

    function InfoCache() {
      this.infos = {};
    }

    InfoCache.prototype.registerInfo = function(info) {
      return this.infos[info.id] = info;
    };

    InfoCache.prototype["delete"] = function(id) {
      if (this.infos[id] != null) {
        this.infos[id]["delete"]();
        return this.unregisterInfo(this.infos[id]);
      }
    };

    InfoCache.prototype.unregisterInfo = function(info) {
      if ((info.id != null) && (this.infos[info.id] != null)) {
        return delete this.infos[info.id];
      }
    };

    InfoCache.prototype.updateInfo = function(values) {
      return this.storeInfo(values, true);
    };

    InfoCache.prototype.storeInfo = function(values, mustExist) {
      var info;
      if (mustExist == null) mustExist = false;
      if (!(((info = this.infos[values.id]) != null) || mustExist)) {
        info = new (model.getClassByType(values.type))(values.id);
        this.registerInfo(info);
      }
      return info != null ? info._store(values) : void 0;
    };

    InfoCache.prototype.getInformation = singlify(func(function(autocb, id) {
      var values, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      if ((id != null) && model.UUID_REG.test(id)) {
        (function(__iced_k) {
          if (_this.infos[id] == null) {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                funcname: "InfoCache"
              });
              new model.Information(id).get(__iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return values = arguments[0];
                  };
                })(),
                lineno: 103
              }));
              __iced_deferrals._fulfill();
            })(function() {
              return __iced_k(_this.storeInfo(values));
            });
          } else {
            return __iced_k();
          }
        })(function() {
          return __iced_k(_this.infos[id]);
        });
      } else {
        return __iced_k(null);
      }
    }));

    return InfoCache;

  })();

  model.cache = new InfoCache;

}).call(this);
}, "inbox": function(exports, require, module) {(function() {
  var InboxView, iced, model, ui,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  model = require('jsonmodel');

  iced = require('myiced');

  iced.util.pollute(window);

  ui = require('ui');

  InboxView = (function(_super) {

    __extends(InboxView, _super);

    InboxView.registerView(/^inbox$/, InboxView, func(function(autocb) {
      autocb('Inbox');
      return;
    }));

    function InboxView(slot) {
      var innerFlip, outerFlip,
        _this = this;
      this.slot = slot;
      this.draw = __bind(this.draw, this);
      this.size = this.first = null;
      this.context = this.slot.getContentNode();
      this.slot.setContent(require("template/inbox")());
      this.innerslot = new ui.Slot($('.inboxinfo', this.slot.getContentNode()).first(), $('h1', this.slot.getContentNode()).first());
      model.inbox.onChanged(this.draw);
      model.inbox.get(function(err, values) {
        if (err == null) return _this.draw(values);
      });
      innerFlip = new ui.Flippable($('.newasap', this.context), $('.newproject', this.context), 0);
      outerFlip = new ui.Flippable($('.front', this.context), $('.back', this.context), 500);
      outerFlip.addToggler($('.front > button', this.context));
      outerFlip.addToggler($('.back > button', this.context));
      $('button[name=asap]', this.context).click(innerFlip.showFront);
      $('button[name=project]', this.context).click(innerFlip.showBack);
      this.asapCreator = new ui.AsapCreator($('.newasap', this.context));
      this.projectCreator = new ui.ProjectCreator($('.newproject', this.context));
    }

    InboxView.prototype["delete"] = function() {
      return model.inbox.removeCb('changed', this.draw);
    };

    InboxView.prototype.draw = function(values) {
      if (this.size !== values.size) {
        this.slot.setTitle("Inbox (" + (this.size = values.size) + ")");
      }
      if (this.first !== values.first) {
        this.first = values.first;
        this.asapCreator.setReference(this.first);
        this.projectCreator.setReference(this.first);
        if (this.first != null) {
          return this.innerslot.setView("" + this.first.type + ":" + this.first.id);
        } else {
          return this.innerslot.clear();
        }
      }
    };

    return InboxView;

  })(ui.View);

}).call(this);
}, "info": function(exports, require, module) {(function() {
  var AsapListView, AsapView, InfoView, NoteView, ProjectView, ProjectsView, TaskList, TaskView, iced, model, ui,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  window.__iced_k = window.__iced_k_noop = function() {};

  model = require('jsonmodel');

  ui = require('ui');

  iced = require('myiced');

  iced.util.pollute(window);

  exports.InfoView = InfoView = (function(_super) {

    __extends(InfoView, _super);

    function InfoView(slot, match) {
      var error, info, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.slot = slot;
      this.clean = __bind(this.clean, this);
      this.dirty = __bind(this.dirty, this);
      this.draw = __bind(this.draw, this);
      this["delete"] = __bind(this["delete"], this);
      this.context = this.slot.getContentNode();
      this.id = match[1];
      this.slot.setContent(require("template/infoframe")());
      this.contentNode = $('.infocontent', this.context);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "InfoView"
        });
        model.cache.getInformation(__iced_deferrals.defer({
          assign_fn: (function(__slot_1) {
            return function() {
              error = arguments[0];
              return __slot_1.info = arguments[1];
            };
          })(_this),
          lineno: 13
        }), _this.id);
        __iced_deferrals._fulfill();
      })(function() {
        _this.info.onChanged(_this.draw);
        _this.info.onDeleted(_this.delcb = function() {
          return _this.slot.setView('')();
        });
        info = _this.info;
        $(".setStatus > button", _this.context).click(function(ev) {
          var status;
          ev.preventDefault();
          status = $(this).attr('name');
          if (!(status === 'delete' && !confirm('Really delete?'))) {
            return info.setStatus((function() {}), status);
          }
        });
        (_this.savebutton = $('button[name=save]', _this.context)).hide();
        _this.delayPicker = new ui.TimePicker($('.delay'), {
          name: 'Delay',
          change: function(date) {
            return info.setDelay((function() {}), date);
          }
        });
        _this.savebutton.click(function(ev) {
          ev.preventDefault();
          return _this.clean(true);
        });
        new ui.Uploader($('.upload', _this.context));
        _this.refManager = new ui.ReferenceList($('.references', _this.context), _this.info);
        _this.initContent();
        _this.draw();
        return new ui.Flippable($('.options', _this.context), null).addToggler($('button[name=options]', _this.context));
      });
    }

    InfoView.prototype["delete"] = function() {
      this.info.removeCb('changed', this.draw);
      return this.info.removeCb('deleted', this.delcb);
    };

    InfoView.prototype.draw = function() {
      this.drawTitle();
      this.drawFrame();
      return this.drawContent();
    };

    InfoView.prototype.dirty = function() {
      this.dirtStamp = (new Date().getTime)();
      this.savebutton.show(400);
      return setTimeout(this.clean, 5000);
    };

    InfoView.prototype.clean = function(force) {
      if ((this.dirtStamp != null) && ((new Date().getTime)() - this.dirtStamp >= 5000 || force)) {
        this.save();
        this.dirtStamp = null;
        return this.savebutton.hide(1000);
      }
    };

    InfoView.prototype.drawFrame = function() {
      $(".setStatus > button", this.context).removeClass('active');
      $(".setStatus > button[name=" + this.info.status + "]", this.context).addClass('active');
      $("span.created_at", this.context).attr('x-time', this.info.createdAt);
      $("span.last_edited", this.context).attr('x-time', this.info.lastEdited);
      this.delayPicker.setDate(this.info.delay != null ? new Date(this.info.delay) : null);
      return this.refManager.setList(this.info.references);
    };

    return InfoView;

  })(ui.View);

  NoteView = (function(_super) {

    __extends(NoteView, _super);

    function NoteView() {
      return NoteView.__super__.constructor.apply(this, arguments);
    }

    NoteView.registerView(/^note:(.*)$/, NoteView, func(function(autocb, match) {
      var note, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "NoteView"
        });
        model.cache.getInformation(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return note = arguments[0];
            };
          })(),
          lineno: 65
        }), match[1]);
        __iced_deferrals._fulfill();
      })(function() {
        autocb("Note: " + note.content);
        return;
      });
    }));

    NoteView.prototype.drawTitle = function() {
      return this.slot.setTitle('Note');
    };

    NoteView.prototype.drawContent = function() {
      var ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.area.val(this.info.content);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "NoteView.drawContent"
        });
        setTimeout(__iced_deferrals.defer({
          lineno: 73
        }), 1);
        __iced_deferrals._fulfill();
      })(function() {
        return _this.area.trigger('autosize');
      });
    };

    NoteView.prototype.initContent = function() {
      var _this = this;
      this.contentNode.html(require('template/note')());
      this.area = $('textarea', this.contentNode);
      this.area.autosize({
        append: '\n'
      });
      this.area.keyup(this.dirty);
      return this.area.change(function() {
        _this.dirty();
        return _this.clean(true);
      });
    };

    NoteView.prototype.save = function() {
      var error, msg, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      if (this.info.content !== this.area.val()) {
        msg = ui.message('Saving…');
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            funcname: "NoteView.save"
          });
          _this.info.setContent(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return error = arguments[0];
              };
            })(),
            lineno: 89
          }), _this.area.val());
          __iced_deferrals._fulfill();
        })(function() {
          return __iced_k(typeof error !== "undefined" && error !== null ? msg.html('Save failed!') : msg.html('Saved!'));
        });
      } else {
        return __iced_k();
      }
    };

    return NoteView;

  })(InfoView);

  AsapListView = (function(_super) {

    __extends(AsapListView, _super);

    function AsapListView() {
      return AsapListView.__super__.constructor.apply(this, arguments);
    }

    AsapListView.registerView(/^asaplist:(.*)$/, AsapListView, func(function(autocb, match) {
      var list, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "AsapListView"
        });
        model.cache.getInformation(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return list = arguments[0];
            };
          })(),
          lineno: 97
        }), match[1]);
        __iced_deferrals._fulfill();
      })(function() {
        autocb("ToDo List: " + list.name);
        return;
      });
    }));

    AsapListView.prototype.drawTitle = function() {
      return this.slot.setTitle(this.info.name);
    };

    AsapListView.prototype.drawContent = function() {
      var error, ids, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.newname.val(this.info.name);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "AsapListView.drawContent"
        });
        model.Asap.getAllIDs(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              error = arguments[0];
              return ids = arguments[1];
            };
          })(),
          lineno: 105
        }));
        __iced_deferrals._fulfill();
      })(function() {
        return _this.list.setList(_this.info.asaps);
      });
    };

    AsapListView.prototype.initContent = function() {
      var active, togglebutton,
        _this = this;
      this.contentNode.html(require('template/asaplist')());
      this.contentNode.addClass('hideinactive');
      active = true;
      togglebutton = $('button[name=toggleshow]');
      togglebutton.click(function() {
        if (active) {
          active = false;
          togglebutton.html('Show only active');
          _this.contentNode.removeClass('hideinactive');
        } else {
          active = true;
          togglebutton.html('Show all');
          _this.contentNode.addClass('hideinactive');
        }
        return false;
      });
      this.newname = $('input[name=newname]', this.contentNode);
      $('form', this.contentNode).submit(function(ev) {
        ev.preventDefault();
        return _this.info.rename((function() {}), _this.newname.val());
      });
      new ui.AsapCreator($('.newtodo', this.contentNode), this.info);
      return this.list = new ui.InfoListManager($('tbody', this.contentNode), function(autocb, asap) {
        var create, deadlinePicker, delayPicker, delparent, descFlippable, descform, descinput, desclabel, donebox, entry, last, listPicker, project, refManager, set;
        entry = $(require('template/listentry')());
        refManager = new ui.ReferenceList($('.refs', entry), asap);
        delayPicker = new ui.TimePicker($('.delay', entry), {
          name: '',
          change: function(date) {
            return asap.setDelay((function() {}), date);
          }
        });
        deadlinePicker = new ui.TimePicker($('.deadline', entry), {
          name: '',
          change: function(date) {
            return asap.setDeadline((function() {}), date);
          }
        });
        listPicker = new ui.ListPicker($('td.listsel', entry));
        listPicker.onChanged(function(list) {
          return asap.setList((function() {}), list);
        });
        donebox = $('input[type=checkbox]', entry);
        donebox.click(function() {
          if (donebox.is(':checked')) {
            return asap.done((function() {}));
          } else {
            return asap.undo((function() {}));
          }
        });
        desclabel = $('.desc > span', entry);
        descform = $('.desc > form', entry);
        descinput = $('.desc > form > input', entry);
        descform.submit(function(ev) {
          var error, ___iced_passed_deferral, __iced_deferrals, __iced_k,
            _this = this;
          __iced_k = __iced_k_noop;
          ___iced_passed_deferral = iced.findDeferral(arguments);
          ev.preventDefault();
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral
            });
            asap.setDescription(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return error = arguments[0];
                };
              })(),
              lineno: 148
            }), descinput.val());
            __iced_deferrals._fulfill();
          })(function() {
            if (typeof error === "undefined" || error === null) {
              return descFlippable.showFront();
            }
          });
        });
        descFlippable = new ui.Flippable(desclabel, descform, 0);
        descFlippable.addToggler(desclabel);
        last = $('.last', entry);
        create = $('.create', entry);
        project = $('.project', entry);
        new ui.DropArea(project, function(viewname) {
          var error, id, parent, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
            _this = this;
          __iced_k = __iced_k_noop;
          ___iced_passed_deferral = iced.findDeferral(arguments);
          if ((id = (_ref = /project:(.*)$/.exec(viewname)) != null ? _ref[1] : void 0) != null) {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral
              });
              model.cache.getInformation(__iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    error = arguments[0];
                    return parent = arguments[1];
                  };
                })(),
                lineno: 157
              }), id);
              __iced_deferrals._fulfill();
            })(function() {
              return __iced_k(!((typeof error !== "undefined" && error !== null) || (typeof parent === "undefined" || parent === null)) ? asap.setParent((function() {}), parent) : void 0);
            });
          } else {
            return __iced_k();
          }
        });
        $('td > button[name=delete]', entry).click(function() {
          if (confirm('Really delete?')) {
            return asap.setStatus((function() {}), 'delete');
          }
        });
        delparent = function() {
          return asap.setParent((function() {}), null);
        };
        asap.onChanged(set = function(asap) {
          var error, parent, ___iced_passed_deferral, __iced_deferrals, __iced_k,
            _this = this;
          __iced_k = __iced_k_noop;
          ___iced_passed_deferral = iced.findDeferral(arguments);
          if ((asap.completed != null) || !asap.active) {
            entry.addClass('inactive');
          } else {
            entry.removeClass('inactive');
          }
          if ((asap.completed == null) && asap.overdue) {
            $('.deadline', entry).addClass('overdue');
          } else {
            $('.deadline', entry).removeClass('overdue');
          }
          donebox.prop('checked', asap.completed != null);
          desclabel.html(asap.description);
          descinput.val(asap.description);
          if (asap.references != null) refManager.setList(asap.references);
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              funcname: "set"
            });
            model.cache.getInformation(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return parent = arguments[1];
                };
              })(),
              lineno: 176
            }), asap.parent);
            __iced_deferrals._fulfill();
          })(function() {
            project.html(typeof parent !== "undefined" && parent !== null ? ui.createInfoButton(parent, false, delparent) : '');
            delayPicker.setDate(asap.delay != null ? new Date(asap.delay) : null);
            deadlinePicker.setDate(asap.deadline != null ? new Date(asap.deadline) : null);
            last.attr('x-time', asap.lastEdited);
            create.attr('x-time', asap.createdAt);
            return listPicker.sel(asap.asaplist);
          });
        });
        set(asap);
        autocb(entry);
        return;
      });
    };

    return AsapListView;

  })(InfoView);

  TaskList = (function(_super) {

    __extends(TaskList, _super);

    function TaskList(node) {
      TaskList.__super__.constructor.call(this, node, function(autocb, task) {
        var childrenList, collapsebutton, descFlippable, descform, descinput, desclabel, donebox, draw, drawboth, entry, listid;
        entry = $(require("template/" + task.type)());
        $('button[name=delete]', entry).click(function() {
          if (confirm('Really delete?')) {
            return task.setStatus((function() {}), 'delete');
          }
        });
        donebox = $('input[name=completed]', entry);
        donebox.click(function() {
          if (donebox.prop('checked')) {
            return task.done((function() {}));
          } else {
            return task.undo((function() {}));
          }
        });
        switch (task.type) {
          case 'project':
            collapsebutton = $('button.collapse', entry);
            collapsebutton.click(function(ev) {
              ev.preventDefault();
              if (task.collapsed) {
                return task.uncollapse((function() {}));
              } else {
                return task.collapse((function() {}));
              }
            });
            childrenList = new TaskList($('.children', entry));
            desclabel = $('form > span.name', entry);
            descinput = $('form > input', entry);
            descform = $('form', entry);
            descform.submit(function(ev) {
              var error, ___iced_passed_deferral, __iced_deferrals, __iced_k,
                _this = this;
              __iced_k = __iced_k_noop;
              ___iced_passed_deferral = iced.findDeferral(arguments);
              ev.preventDefault();
              (function(__iced_k) {
                if (descFlippable.flipped) {
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral
                    });
                    task.setDescription(__iced_deferrals.defer({
                      assign_fn: (function() {
                        return function() {
                          return error = arguments[0];
                        };
                      })(),
                      lineno: 209
                    }), descinput.val());
                    __iced_deferrals._fulfill();
                  })(__iced_k);
                } else {
                  return __iced_k();
                }
              })(function() {
                if (typeof error === "undefined" || error === null) {
                  return descFlippable.toggle();
                }
              });
            });
            descFlippable = new ui.Flippable(desclabel, descinput);
            draw = function(project) {
              collapsebutton.html(project.collapsed ? '>' : 'v');
              childrenList.setList(project.collapsed || (project.children == null) ? [] : project.children);
              desclabel.html(project.description);
              return descinput.val(project.description);
            };
            new ui.DropArea($('.projecthandle', entry), function(viewname) {
              var child, error, id, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
                _this = this;
              __iced_k = __iced_k_noop;
              ___iced_passed_deferral = iced.findDeferral(arguments);
              if ((id = (_ref = /(asap|project):(.*)$/.exec(viewname)) != null ? _ref[2] : void 0) != null) {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral
                  });
                  model.cache.getInformation(__iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        error = arguments[0];
                        return child = arguments[1];
                      };
                    })(),
                    lineno: 219
                  }), id);
                  __iced_deferrals._fulfill();
                })(function() {
                  return __iced_k(!((typeof error !== "undefined" && error !== null) || (typeof child === "undefined" || child === null)) ? child.setParent((function() {}), task) : void 0);
                });
              } else {
                return __iced_k();
              }
            });
            new ui.Emitter(desclabel).setViewName("project:" + task.id);
            break;
          case 'asap':
            $('span.description', entry).html(ui.createInfoButton(task));
            listid = null;
            draw = function(asap) {
              var error, list, ___iced_passed_deferral, __iced_deferrals, __iced_k,
                _this = this;
              __iced_k = __iced_k_noop;
              ___iced_passed_deferral = iced.findDeferral(arguments);
              if (listid !== asap.asaplist && (asap.asaplist != null)) {
                listid = asap.asaplist;
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    funcname: "draw"
                  });
                  model.cache.getInformation(__iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        error = arguments[0];
                        return list = arguments[1];
                      };
                    })(),
                    lineno: 229
                  }), listid);
                  __iced_deferrals._fulfill();
                })(function() {
                  return __iced_k($('span.list', entry).html(ui.createInfoButton(list)));
                });
              } else {
                return __iced_k();
              }
            };
        }
        drawboth = function(task) {
          donebox.prop('checked', task.completed != null);
          if (task.active && (task.completed == null)) {
            entry.removeClass('inactive');
          } else {
            entry.addClass('inactive');
          }
          if (task.parent != null) {
            return entry.addClass('hasparent');
          } else {
            return entry.removeClass('hasparent');
          }
        };
        task.onChanged(draw);
        task.onChanged(drawboth);
        draw(task);
        drawboth(task);
        autocb(entry);
        return;
      });
    }

    return TaskList;

  })(ui.InfoListManager);

  TaskView = (function(_super) {

    __extends(TaskView, _super);

    function TaskView() {
      return TaskView.__super__.constructor.apply(this, arguments);
    }

    TaskView.prototype.drawContent = function() {};

    TaskView.prototype.initContent = function() {
      var active, togglebutton,
        _this = this;
      this.contentNode.html(require('template/taskview')());
      this.contentNode.addClass('hideinactive');
      active = true;
      togglebutton = $('button[name=toggleshow]');
      togglebutton.click(function() {
        if (active) {
          active = false;
          togglebutton.html('Show only active');
          _this.contentNode.removeClass('hideinactive');
        } else {
          active = true;
          togglebutton.html('Show all');
          _this.contentNode.addClass('hideinactive');
        }
        return false;
      });
      new ui.DropArea($('.root', this.contentNode), function(viewname) {
        var child, error, id, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
          _this = this;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        if ((id = (_ref = /(asap|project):(.*)$/.exec(viewname)) != null ? _ref[2] : void 0) != null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral
            });
            model.cache.getInformation(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return child = arguments[1];
                };
              })(),
              lineno: 268
            }), id);
            __iced_deferrals._fulfill();
          })(function() {
            return __iced_k(!((typeof error !== "undefined" && error !== null) || (typeof child === "undefined" || child === null)) ? child.setParent((function() {}), null) : void 0);
          });
        } else {
          return __iced_k();
        }
      });
      return new TaskList($('.tasklist', this.contentNode)).setList([this.info.id]);
    };

    return TaskView;

  })(InfoView);

  ProjectView = (function(_super) {

    __extends(ProjectView, _super);

    function ProjectView() {
      return ProjectView.__super__.constructor.apply(this, arguments);
    }

    ProjectView.registerView(/^project:(.*)$/, ProjectView, func(function(autocb, match) {
      var project, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "ProjectView"
        });
        model.cache.getInformation(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return project = arguments[0];
            };
          })(),
          lineno: 275
        }), match[1]);
        __iced_deferrals._fulfill();
      })(function() {
        autocb("Project: " + project.description);
        return;
      });
    }));

    ProjectView.prototype.drawTitle = function() {
      return this.slot.setTitle("Project: " + this.info.description);
    };

    return ProjectView;

  })(TaskView);

  AsapView = (function(_super) {

    __extends(AsapView, _super);

    function AsapView() {
      return AsapView.__super__.constructor.apply(this, arguments);
    }

    AsapView.registerView(/^asap:(.*)$/, AsapView, func(function(autocb, match) {
      var asap, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "AsapView"
        });
        model.cache.getInformation(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return asap = arguments[0];
            };
          })(),
          lineno: 283
        }), match[1]);
        __iced_deferrals._fulfill();
      })(function() {
        autocb("ToDo: " + asap.description);
        return;
      });
    }));

    AsapView.prototype.drawTitle = function() {
      return this.slot.setTitle("To Do");
    };

    return AsapView;

  })(InfoView);

  ProjectsView = (function(_super) {

    __extends(ProjectsView, _super);

    ProjectsView.registerView(/^projects$/, ProjectsView, func(function(autocb) {
      autocb('Projects');
      return;
    }));

    function ProjectsView(slot) {
      var active, creator, togglebutton,
        _this = this;
      this.slot = slot;
      this.contentNode = this.slot.getContentNode();
      this.slot.setTitle("Projects");
      this.contentNode.html(require('template/taskview')());
      this.contentNode.append(creator = $('<div/>'));
      new ui.ProjectCreator(creator);
      this.contentNode.append(creator = $('<div/>'));
      new ui.AsapCreator(creator);
      this.contentNode.append(creator = $('<div/>'));
      new ui.AsapListCreator(creator);
      this.contentNode.addClass('hideinactive hidechildren');
      active = true;
      togglebutton = $('button[name=toggleshow]');
      togglebutton.click(function() {
        if (active) {
          active = false;
          togglebutton.html('Show only active');
          _this.contentNode.removeClass('hideinactive');
        } else {
          active = true;
          togglebutton.html('Show all');
          _this.contentNode.addClass('hideinactive');
        }
        return false;
      });
      this.projectList = new TaskList($('.tasklist', this.contentNode));
      new ui.DropArea($('.root', this.contentNode), function(viewname) {
        var child, error, id, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
          _this = this;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        if ((id = (_ref = /(asap|project):(.*)$/.exec(viewname)) != null ? _ref[2] : void 0) != null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral
            });
            model.cache.getInformation(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return child = arguments[1];
                };
              })(),
              lineno: 318
            }), id);
            __iced_deferrals._fulfill();
          })(function() {
            return __iced_k(!((typeof error !== "undefined" && error !== null) || (typeof child === "undefined" || child === null)) ? child.setParent((function() {}), null) : void 0);
          });
        } else {
          return __iced_k();
        }
      });
      model.Project.getAllIDs(catchNull(this.projectList.setList));
      model.Project.onChanged(this.projectList.setList);
    }

    ProjectsView.prototype["delete"] = function() {};

    return ProjectsView;

  })(ui.View);

}).call(this);
}, "jsonmodel": function(exports, require, module) {(function() {
  var Account, Appointment, Asap, AsapList, Circle, Communication, Communicator, Contact, Daemon, File, Inbox, Information, Maybe, Message, Note, PGObject, Place, Presence, Project, Protocol, Resource, Room, Server, SocialEntity, Task, Urgent, UserAccount, getInfos, iced, model, port, updatecb,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  window.__iced_k = window.__iced_k_noop = function() {};

  module.exports = model = require("basemodel");

  iced = require('myiced');

  iced.util.pollute(window);

  updatecb = function(event) {
    var data;
    data = event.data.data;
    switch (event.data.name) {
      case 'changed':
        return model.cache.updateInfo(data);
      case 'inbox':
        return model.inbox._store((function() {}), data);
      case 'deleted':
        model.cache["delete"](data.id);
        return model.getClassByType(data.type).deleted(data.id);
      case 'new':
        return model.getClassByType(data.type)["new"](data.id);
    }
  };

  port = new SharedWorker('worker.js').port;

  port.addEventListener('message', updatecb);

  port.start();

  getInfos = function(cb, cls, filter, params) {
    if (params == null) params = {};
    params.filter = filter;
    return new cls()._get((function(error, list) {
      var values, _i, _len;
      if (error == null) {
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          values = list[_i];
          model.cache.storeInfo(values);
        }
      }
      return cb(error, list);
    }), params);
  };

  PGObject = (function(_super) {

    __extends(PGObject, _super);

    function PGObject(id) {
      this.id = id;
    }

    PGObject.prototype._get = function(cb, data, url) {
      return this._call(cb, "get", data, url);
    };

    PGObject.prototype._put = function(cb, data, url) {
      return this._call(cb, "put", data, url);
    };

    PGObject.prototype._delete = function(cb, url) {
      return this._call(cb, "delete", url);
    };

    PGObject.prototype._patch = function(cb, data, url) {
      return this._call(cb, "patch", data, url);
    };

    PGObject.prototype._post = function(cb, data, url) {
      return this._call(cb, "post", data, url);
    };

    PGObject.prototype._call = function(cb, type, data, url) {
      var answer, request, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "PGObject._call"
        });
        request = {
          url: url != null ? url : _this._url(),
          type: type,
          success: __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return answer = arguments[0];
              };
            })(),
            lineno: 54
          }),
          dataType: "json"
        };
        if (data != null) request.data = data;
        console.log("" + (type.toUpperCase()) + " " + request.url + " (" + (data != null ? JSON.stringify(data) : "") + ")");
        $.ajax(request);
        __iced_deferrals._fulfill();
      })(function() {
        return cb(null, answer);
      });
    };

    return PGObject;

  })(model.ModelObject);

  Information = (function(_super) {
    var ids;

    __extends(Information, _super);

    function Information(id) {
      var tempType;
      this.id = id;
      tempType = this.constructor.name.toLowerCase();
      if (tempType !== "information") this.type = tempType;
    }

    Information.prototype._create = function(cb, args) {
      var ans, error, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "Information._create"
        });
        _this._post(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              error = arguments[0];
              return ans = arguments[1];
            };
          })(),
          lineno: 67
        }), args);
        __iced_deferrals._fulfill();
      })(function() {
        if (typeof error !== "undefined" && error !== null) {
          cb(error);
          return;
        }
        cb(null, _this.id = ans.id);
        return model.cache.registerInfo(_this);
      });
    };

    Information.prototype.addReference = function(cb, reference) {
      return this._patch(cb, {
        method: "addReference",
        reference: reference.id
      });
    };

    Information.prototype.removeReference = function(cb, reference) {
      return this._patch(cb, {
        method: "removeReference",
        reference: reference.id
      });
    };

    Information.prototype.getType = function(cb) {
      var error, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        if (_this.type == null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              funcname: "Information.getType"
            });
            _this._get(cb, {
              filter: "type"
            }, __iced_deferrals.defer({
              assign_fn: (function(__slot_1) {
                return function() {
                  error = arguments[0];
                  return __slot_1.type = arguments[1].type;
                };
              })(_this),
              lineno: 87
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        } else {
          return __iced_k();
        }
      })(function() {
        return cb(error, _this.type);
      });
    };

    Information.prototype.get = function(cb) {
      var error, values, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        if (_this.values == null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              funcname: "Information.get"
            });
            _this._get(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return values = arguments[1];
                };
              })(),
              lineno: 91
            }));
            __iced_deferrals._fulfill();
          })(function() {
            if (typeof error !== "undefined" && error !== null) {
              cb(error);
              return;
            }
            return __iced_k(_this._store(values));
          });
        } else {
          return __iced_k();
        }
      })(function() {
        return cb(null, _this.values);
      });
    };

    Information.prototype.setStatus = function(cb, status) {
      return this._patch(cb, {
        method: "setStatus",
        status: status
      });
    };

    Information.prototype.setDelay = function(cb, delay) {
      return this._patch(cb, {
        method: "setDelay",
        delay: delay
      });
    };

    Information.prototype.attach = function(cb, file) {
      return this._patch(cb, {
        method: "attach",
        file: file.id
      });
    };

    Information.prototype.detach = function(cb, file) {
      return this._patch(cb, {
        method: "detach",
        file: file.id
      });
    };

    Information.prototype.getReferences = function(cb) {
      return this._get(cb, {
        filter: "references"
      });
    };

    Information.prototype._url = function() {
      return "" + (this.type != null ? this.type : "information") + (this.id != null ? "/" + this.id : "");
    };

    Information.prototype._store = function(values) {
      var key, value;
      this.values = values;
      for (key in values) {
        value = values[key];
        this[key] = value;
      }
      return this.change(values);
    };

    Information.getAll = singlify(func(function(autocb) {
      var all, info, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "Information"
        });
        getInfos(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return all = arguments[0];
            };
          })(),
          lineno: 128
        }), _this, 'all');
        __iced_deferrals._fulfill();
      })(function() {
        autocb(ids[_this.name] = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = all.length; _i < _len; _i++) {
            info = all[_i];
            _results.push(info.id);
          }
          return _results;
        })());
        return;
      });
    }));

    ids = [];

    Information.getAllIDs = singlify(func(function(autocb) {
      var ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        if (ids[_this.name] == null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              funcname: "Information"
            });
            _this.getAll(__iced_deferrals.defer({
              lineno: 134
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        } else {
          return __iced_k();
        }
      })(function() {
        autocb(ids[_this.name]);
        return;
      });
    }));

    Information["new"] = function(id) {
      if (ids[this.name]) {
        ids[this.name].push(id);
        return this.change(ids[this.name]);
      }
    };

    Information.deleted = function(id) {
      var i;
      if (ids[this.name]) {
        ids[this.name] = (function() {
          var _i, _len, _ref, _results;
          _ref = ids[this.name];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i !== id) _results.push(i);
          }
          return _results;
        }).call(this);
        return this.change(ids[this.name]);
      }
    };

    return Information;

  })(PGObject);

  File = (function(_super) {

    __extends(File, _super);

    function File() {
      return File.__super__.constructor.apply(this, arguments);
    }

    File.prototype.create = function(name) {};

    File.prototype.getName = function() {};

    File.prototype["delete"] = function() {};

    return File;

  })(PGObject);

  Note = (function(_super) {

    __extends(Note, _super);

    function Note() {
      return Note.__super__.constructor.apply(this, arguments);
    }

    Note.prototype.create = function(cb, content) {
      return this._create(cb, {
        content: content
      });
    };

    Note.prototype.setContent = function(cb, content) {
      return this._patch(cb, {
        method: "setContent",
        content: content
      });
    };

    return Note;

  })(Information);

  Task = (function(_super) {

    __extends(Task, _super);

    function Task() {
      return Task.__super__.constructor.apply(this, arguments);
    }

    Task.prototype.done = function(cb) {
      return this._patch(cb, {
        method: 'done'
      });
    };

    Task.prototype.undo = function(cb) {
      return this._patch(cb, {
        method: 'undo'
      });
    };

    Task.prototype.setParent = function(cb, parent) {
      return this._patch(cb, {
        parent: parent != null ? parent.id : void 0,
        method: 'setParent'
      });
    };

    Task.prototype.setDeadline = function(cb, deadline) {
      return this._patch(cb, {
        method: "setDeadline",
        deadline: deadline
      });
    };

    Task.prototype.setDescription = function(cb, description) {
      return this._patch(cb, {
        method: "setDescription",
        description: description
      });
    };

    return Task;

  })(Information);

  Project = (function(_super) {

    __extends(Project, _super);

    function Project() {
      return Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.create = function(cb, description, referencing, parent) {
      if (referencing == null) referencing = null;
      if (parent == null) parent = null;
      return this._create(cb, {
        description: description,
        referencing: referencing != null ? referencing.id : void 0,
        parent: parent != null ? parent.id : void 0
      });
    };

    Project.prototype.collapse = function(cb) {
      return this._patch(cb, {
        method: 'collapse'
      });
    };

    Project.prototype.uncollapse = function(cb) {
      return this._patch(cb, {
        method: 'uncollapse'
      });
    };

    return Project;

  })(Task);

  Asap = (function(_super) {

    __extends(Asap, _super);

    function Asap() {
      return Asap.__super__.constructor.apply(this, arguments);
    }

    Asap.prototype.create = function(cb, description, list, referencing, project) {
      if (referencing == null) referencing = null;
      if (project == null) project = null;
      return this._create(cb, {
        description: description,
        list: list.id,
        referencing: referencing != null ? referencing.id : void 0,
        project: project != null ? project.id : void 0
      });
    };

    Asap.prototype.setList = function(cb, list) {
      return this._patch(cb, {
        list: list.id,
        method: 'setList'
      });
    };

    return Asap;

  })(Task);

  AsapList = (function(_super) {

    __extends(AsapList, _super);

    function AsapList() {
      return AsapList.__super__.constructor.apply(this, arguments);
    }

    AsapList.prototype.create = function(cb, name) {
      return this._create(cb, {
        name: name
      });
    };

    AsapList.prototype.rename = function(cb, name) {
      return this._patch(cb, {
        method: "rename",
        name: name
      });
    };

    return AsapList;

  })(Information);

  SocialEntity = (function(_super) {

    __extends(SocialEntity, _super);

    function SocialEntity() {
      return SocialEntity.__super__.constructor.apply(this, arguments);
    }

    SocialEntity.prototype.create = function() {};

    return SocialEntity;

  })(Information);

  Circle = (function(_super) {

    __extends(Circle, _super);

    function Circle() {
      return Circle.__super__.constructor.apply(this, arguments);
    }

    Circle.prototype.create = function(name) {};

    Circle.getByName = function(name) {};

    Circle.prototype.rename = function(name) {};

    return Circle;

  }).call(this, SocialEntity);

  Contact = (function(_super) {

    __extends(Contact, _super);

    function Contact() {
      return Contact.__super__.constructor.apply(this, arguments);
    }

    Contact.prototype.create = function(nameMap) {};

    Contact.prototype.setValues = function(nameMap) {};

    Contact.prototype.addAccount = function(account, description, priority) {
      if (description == null) description = null;
      if (priority == null) priority = 0;
    };

    Contact.prototype.removeAccount = function(account) {};

    Contact.prototype.addAddress = function(place, description) {
      if (description == null) description = null;
    };

    Contact.prototype.removeAddress = function(place) {};

    Contact.prototype.enterCircle = function(circle) {};

    Contact.prototype.leaveCircle = function(circle) {};

    return Contact;

  })(SocialEntity);

  Place = (function(_super) {

    __extends(Place, _super);

    function Place() {
      return Place.__super__.constructor.apply(this, arguments);
    }

    Place.prototype.create = function(valueMap) {};

    Place.prototype.setValues = function(valueMap) {};

    Place.prototype.setParent = function(place) {};

    Place.prototype.removeParent = function() {};

    return Place;

  })(Information);

  Appointment = (function(_super) {

    __extends(Appointment, _super);

    function Appointment() {
      return Appointment.__super__.constructor.apply(this, arguments);
    }

    Appointment.prototype.create = function(description, date, time, length, referencing) {
      if (time == null) time = null;
      if (length == null) length = null;
      if (referencing == null) referencing = null;
    };

    Appointment.prototype.setValues = function(valueMap) {};

    Appointment.prototype.setPlace = function(place) {};

    Appointment.prototype.addException = function(appointment, exceptionMove) {
      if (exceptionMove == null) exceptionMove = 'no';
    };

    Appointment.prototype.removeException = function(appointment) {};

    Appointment.prototype.addFilter = function(type, value) {};

    Appointment.prototype.removeFilter = function(type, value) {};

    Appointment.prototype.addParticipant = function(participant) {};

    Appointment.prototype.removeParticipant = function(participant) {};

    return Appointment;

  })(Information);

  Protocol = (function(_super) {

    __extends(Protocol, _super);

    function Protocol() {
      return Protocol.__super__.constructor.apply(this, arguments);
    }

    Protocol.find = function(name) {};

    Protocol.prototype["delete"] = function() {};

    return Protocol;

  })(PGObject);

  Server = (function(_super) {

    __extends(Server, _super);

    function Server() {
      return Server.__super__.constructor.apply(this, arguments);
    }

    Server.find = function(name, protocol) {};

    Server.prototype["delete"] = function() {};

    return Server;

  })(PGObject);

  Communicator = (function(_super) {

    __extends(Communicator, _super);

    function Communicator() {
      return Communicator.__super__.constructor.apply(this, arguments);
    }

    Communicator.prototype.create = function(username, server) {};

    Communicator.prototype.changeServer = function(server) {};

    Communicator.prototype.setValues = function(valueMap) {};

    return Communicator;

  })(Information);

  Account = (function(_super) {

    __extends(Account, _super);

    function Account() {
      return Account.__super__.constructor.apply(this, arguments);
    }

    Account.prototype.create = function(username, server) {};

    Account.find = function(username, server) {};

    Account.prototype.join = function(room, role) {
      if (role == null) role = null;
    };

    Account.prototype.leave = function(room, role) {
      if (role == null) role = null;
    };

    return Account;

  })(Communicator);

  UserAccount = (function(_super) {

    __extends(UserAccount, _super);

    function UserAccount() {
      return UserAccount.__super__.constructor.apply(this, arguments);
    }

    UserAccount.prototype.setValues = function() {};

    UserAccount.prototype.create = function(account) {};

    UserAccount.prototype.downGrade = function() {};

    UserAccount.getAll = function() {};

    return UserAccount;

  })(Account);

  Room = (function(_super) {

    __extends(Room, _super);

    function Room() {
      return Room.__super__.constructor.apply(this, arguments);
    }

    Room.prototype.create = function(name) {};

    Room.prototype.setMOTD = function(motd) {};

    return Room;

  })(Communicator);

  Communication = (function(_super) {

    __extends(Communication, _super);

    function Communication() {
      return Communication.__super__.constructor.apply(this, arguments);
    }

    Communication.prototype.create = function(from, time) {
      if (time == null) time = new Date();
    };

    Communication.prototype.setSender = function(from) {};

    Communication.prototype.setTime = function(time) {
      if (time == null) time = new Date();
    };

    Communication.prototype.send = function() {};

    Communication.prototype.sent = function() {};

    Communication.prototype.draft = function() {};

    Communication.prototype.addRecipient = function(recipient, mode, resource) {
      if (resource == null) resource = null;
    };

    Communication.prototype.removeRecipient = function(recipient, mode) {};

    Communication.prototype.getToSend = function(from) {};

    return Communication;

  })(Information);

  Message = (function(_super) {

    __extends(Message, _super);

    function Message() {
      return Message.__super__.constructor.apply(this, arguments);
    }

    Message.prototype.create = function(from, subject, body, time) {
      if (subject == null) subject = null;
      if (body == null) body = null;
      if (time == null) time = new Date();
    };

    Message.prototype.setValues = function(valueMap) {};

    return Message;

  })(Communication);

  Presence = (function(_super) {

    __extends(Presence, _super);

    function Presence() {
      return Presence.__super__.constructor.apply(this, arguments);
    }

    Presence.prototype.create = function(from, time) {
      if (time == null) time = new Date();
    };

    Presence.prototype.addResource = function(resource) {};

    return Presence;

  })(Communication);

  Resource = (function(_super) {

    __extends(Resource, _super);

    function Resource() {
      return Resource.__super__.constructor.apply(this, arguments);
    }

    Resource.prototype.create = function(name, status, message) {};

    Resource.prototype["delete"] = function() {};

    return Resource;

  })(PGObject);

  Daemon = (function(_super) {

    __extends(Daemon, _super);

    function Daemon() {
      return Daemon.__super__.constructor.apply(this, arguments);
    }

    Daemon.prototype.registrate = function(name, status) {};

    Daemon.prototype.setStatus = function(status) {};

    Daemon.prototype.setMessage = function(message) {};

    Daemon.prototype.deregistrate = function() {};

    Daemon.getAll = function() {};

    return Daemon;

  })(PGObject);

  Maybe = (function(_super) {

    __extends(Maybe, _super);

    function Maybe() {
      return Maybe.__super__.constructor.apply(this, arguments);
    }

    Maybe.prototype.getSize = function() {};

    Maybe.prototype.getList = function() {};

    return Maybe;

  })(PGObject);

  Inbox = (function(_super) {

    __extends(Inbox, _super);

    function Inbox() {
      return Inbox.__super__.constructor.apply(this, arguments);
    }

    Inbox.prototype.getSize = func(function(autocb) {
      var ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "Inbox"
        });
        _this.get(__iced_deferrals.defer({
          lineno: 333
        }));
        __iced_deferrals._fulfill();
      })(function() {
        autocb(_this.values.size);
        return;
      });
    });

    Inbox.prototype.getFirst = func(function(autocb) {
      var ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "Inbox"
        });
        _this.get(__iced_deferrals.defer({
          lineno: 337
        }));
        __iced_deferrals._fulfill();
      })(function() {
        autocb(_this.values.first);
        return;
      });
    });

    Inbox.prototype.get = singlify(func(function(autocb) {
      var res, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        if (_this.values == null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              funcname: "Inbox"
            });
            _this._get(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return res = arguments[0];
                };
              })(),
              lineno: 342
            }), null, "inbox");
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                funcname: "Inbox"
              });
              _this._store(__iced_deferrals.defer({
                lineno: 343
              }), res);
              __iced_deferrals._fulfill();
            })(__iced_k);
          });
        } else {
          return __iced_k();
        }
      })(function() {
        autocb(_this.values);
        return;
      });
    }));

    Inbox.prototype._store = func(function(autocb, values) {
      var ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.values = values;
      (function(__iced_k) {
        if (_this.values.first != null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              funcname: "Inbox"
            });
            model.cache.getInformation(__iced_deferrals.defer({
              assign_fn: (function(__slot_1) {
                return function() {
                  return __slot_1.first = arguments[0];
                };
              })(_this.values),
              lineno: 347
            }), _this.values.first);
            __iced_deferrals._fulfill();
          })(__iced_k);
        } else {
          return __iced_k();
        }
      })(function() {
        autocb(_this.change(_this.values));
        return;
      });
    });

    return Inbox;

  })(PGObject);

  Urgent = (function(_super) {

    __extends(Urgent, _super);

    function Urgent() {
      return Urgent.__super__.constructor.apply(this, arguments);
    }

    Urgent.prototype.getSize = function() {};

    Urgent.prototype.getList = function() {};

    return Urgent;

  })(PGObject);

  model.extend({
    File: File,
    Note: Note,
    Asap: Asap,
    Task: Task,
    Information: Information,
    Project: Project,
    AsapList: AsapList,
    Circle: Circle,
    Contact: Contact,
    Place: Place,
    Appointment: Appointment,
    Protocol: Protocol,
    Server: Server,
    Account: Account,
    Room: Room,
    Message: Message,
    Presence: Presence,
    Resource: Resource,
    inbox: new Inbox,
    maybe: new Maybe,
    urgent: new Urgent
  });

}).call(this);
}, "main": function(exports, require, module) {(function() {
  var InboxView, iced, model, ui,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  model = require('jsonmodel');

  iced = require('myiced');

  iced.util.pollute(window);

  ui = require('ui');

  InboxView = (function(_super) {

    __extends(InboxView, _super);

    InboxView.registerView(/^$/, InboxView, func(function(autocb) {
      autocb('Secretarius');
      return;
    }));

    function InboxView(slot) {
      this.slot = slot;
      this.slot.setContent(require('template/main')());
      new ui.NoteCreator($('.newnote', this.contentNode));
      new ui.AsapListsList($('.lists', this.contentNode));
      new ui.AsapListCreator($('.newlist', this.contentNode));
    }

    InboxView.prototype["delete"] = function() {};

    return InboxView;

  })(ui.View);

}).call(this);
}, "myiced": function(exports, require, module) {(function() {
  var Deferrals, ErrorHandler, a, addCatcher, addNull, arrayEqual, cb2throw, continuationCatcher, debug, debugOn, errString, exports, pollute, singlify, throw2cb, throwError, __fd, __iced_deferrals, __iced_k,
    __slice = [].slice,
    _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  window.__iced_k = window.__iced_k_noop = function() {};

  a = function(cb) {
    return cb();
  };

  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {});
    a(__iced_deferrals.defer({
      lineno: 1
    }));
    __iced_deferrals._fulfill();
  })(function() {
    module.exports = exports = iced;
    ErrorHandler = (function() {

      function ErrorHandler(cb) {
        this.cb = cb;
        this.catchers = [];
      }

      ErrorHandler.prototype.addCatcher = function(catcher) {
        return this.catchers.push(catcher);
      };

      ErrorHandler.prototype.handle = function(error) {
        var catcher, error, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        (function(__iced_k) {
          var _i, _len, _ref, _results, _while;
          _ref = _this.catchers;
          _len = _ref.length;
          _i = 0;
          _results = [];
          _while = function(__iced_k) {
            var _break, _continue, _next;
            _break = function() {
              return __iced_k(_results);
            };
            _continue = function() {
              return iced.trampoline(function() {
                ++_i;
                return _while(__iced_k);
              });
            };
            _next = function(__iced_next_arg) {
              _results.push(__iced_next_arg);
              return _continue();
            };
            if (!(_i < _len)) {
              return _break();
            } else {
              catcher = _ref[_i];
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  funcname: "ErrorHandler.handle"
                });
                catcher(__iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return error = arguments[0];
                    };
                  })(),
                  lineno: 13
                }), error);
                __iced_deferrals._fulfill();
              })(_next);
            }
          };
          _while(__iced_k);
        })(function() {
          return _this.cb(error);
        });
      };

      return ErrorHandler;

    })();
    exports.throw2cb = throw2cb = function(func) {
      return function() {
        var args, handler, saveHandler;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        saveHandler = this.__errorHandler;
        this.__errorHandler = handler = new ErrorHandler(args[0]);
        args[0] = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return handler.cb.apply(null, [null].concat(args));
        };
        args[0].__errorHandler = handler;
        func.apply(this, args);
        return this.__errorHandler = saveHandler;
      };
    };
    continuationCatcher = function(errorHandler, continuation) {
      return function() {
        var args, saveHandler;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (args[0] == null) args[0] = {};
        saveHandler = this.__errorHandler;
        this.__errorHandler = args[0].__errorHandler = errorHandler;
        continuation.apply(this, args);
        return this.__errorHandler = saveHandler;
      };
    };
    exports.cb2throw = cb2throw = function() {
      var arg, args, cb, handler, _i, _len;
      cb = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      handler = this.__errorHandler;
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        if (arg != null) {
          console.trace();
          throw 'cb2throw can only take one parameter.';
        }
      }
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (args[0] != null) {
          if (handler != null) {
            return handler.handle(args[0]);
          } else {
            throw args[0];
          }
        } else {
          return cb.apply(this, args.slice(1));
        }
      };
    };
    addNull = function(cb) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return cb.apply(this, [null].concat(args));
      };
    };
    exports.addCatcher = addCatcher = function(catcher) {
      var _ref;
      return (_ref = this.__errorHandler) != null ? _ref.addCatcher(catcher) : void 0;
    };
    exports.util = {};
    exports.util.throwError = throwError = function(error) {
      return this.__errorHandler.handle(error);
    };
    __fd = iced.findDeferral;
    iced.findDeferral = function(args) {
      var _ref;
      if (((_ref = args[0]) != null ? _ref.__errorHandler : void 0) != null) {
        return {
          value: __fd(args),
          errorHandler: args[0].__errorHandler
        };
      } else {
        return __fd(args);
      }
    };
    iced.Deferrals = Deferrals = (function(_super) {

      __extends(Deferrals, _super);

      function Deferrals(k, t) {
        var errorHandler, _ref;
        if (((_ref = t.parent) != null ? _ref.errorHandler : void 0) != null) {
          this.__errorHandler = errorHandler = t.parent.errorHandler;
          t.parent = t.parent.value;
          Deferrals.__super__.constructor.call(this, continuationCatcher(errorHandler, k), t);
        } else {
          Deferrals.__super__.constructor.call(this, k, t);
        }
      }

      Deferrals.prototype.defer = function(options) {
        var cb, errorHandler;
        if (this.__errorHandler != null) {
          errorHandler = this.__errorHandler;
          cb = Deferrals.__super__.defer.call(this, options);
          return function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (args[0] != null) {
              return errorHandler.handle(args[0]);
            } else {
              return cb.apply(this, args.slice(1));
            }
          };
        } else {
          return Deferrals.__super__.defer.call(this, options);
        }
      };

      return Deferrals;

    })(iced.Deferrals);
    if (typeof iced.catchExceptions === "function") iced.catchExceptions();
    exports.util.singlify = singlify = function(func) {
      var calls;
      calls = [];
      return function() {
        var args, call, caller, cb, _i, _len;
        cb = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        for (_i = 0, _len = calls.length; _i < _len; _i++) {
          call = calls[_i];
          if (arrayEqual(args, call.args) && call.context === this) {
            return call.cbs.push(cb);
          }
        }
        calls.push(call = {
          args: args,
          cbs: [cb],
          context: this
        });
        caller = function() {
          var args, cl, _j, _len1, _ref, _results;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          calls = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = calls.length; _j < _len1; _j++) {
              cl = calls[_j];
              if (cl !== call) _results.push(cl);
            }
            return _results;
          })();
          _ref = call.cbs;
          _results = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            cb = _ref[_j];
            _results.push(cb.apply(this, args));
          }
          return _results;
        };
        return func.apply(this, [caller].concat(args));
      };
    };
    exports.util.arrayEqual = arrayEqual = function(a, b) {
      var element, index, _i, _len;
      if (a === b) return true;
      if (a.length !== b.length) return false;
      for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
        element = a[index];
        if (element !== b[index]) return false;
      }
      return true;
    };
    debugOn = false;
    exports.util.enableDebugMode = function() {
      return debugOn = true;
    };
    errString = function() {
      var b, e, file, func, i, line, s, time, _i, _len, _ref;
      b = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack) {
        return stack;
      };
      e = new Error;
      Error.captureStackTrace(e, this);
      s = e.stack;
      Error.prepareStackTrace = b;
      time = new Date().toString().match(/\d+:\d+:\d+/)[0];
      file = s[2].getFileName().match(/\/(\w*).\w*$/)[1];
      line = s[2].getLineNumber();
      _ref = s.slice(2);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        func = i.getFunctionName();
        if ((func != null) && !/throw2cb/.test(func)) break;
      }
      func = func.replace(/module.exports./, '');
      return "" + time + " " + func + " in " + file + " at " + line;
    };
    exports.debug = debug = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!debugOn) return;
      return console.log.apply(null, [errString()].concat(args));
    };
    return exports.util.pollute = pollute = function(obj) {
      obj.func = throw2cb;
      obj.catchNull = cb2throw;
      obj.addNull = addNull;
      obj.catchCB = addCatcher;
      obj.throwError = throwError;
      obj.debug = debug;
      return obj.singlify = singlify;
    };
  });

}).call(this);
}, "secretarius": function(exports, require, module) {(function() {
  var ui;

  require("jquery");

  require("jade");

  require("jquery.autosize-min");

  require("date.extensions");

  ui = require('ui');

  $(function() {
    var request, slot, _ref;
    request = (_ref = document.URL.match(/https?:\/\/.*\/(.*)/)) != null ? _ref[1] : void 0;
    return slot = new ui.slots.WindowSlot(request);
  });

}).call(this);
}, "slots": function(exports, require, module) {(function() {
  var WindowSlot, iced, model, ui,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  window.__iced_k = window.__iced_k_noop = function() {};

  model = require('jsonmodel');

  iced = require('myiced');

  iced.util.pollute(window);

  ui = require('ui');

  exports.WindowSlot = WindowSlot = (function(_super) {

    __extends(WindowSlot, _super);

    function WindowSlot(viewname) {
      var $clock, clock, dish, emitter, error, labels, menu, runclock, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.setView = __bind(this.setView, this);
      model.inbox.get(function() {});
      menu = ['', 'inbox', 'projects'];
      labels = {};
      (function(__iced_k) {
        var _i, _len;
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "WindowSlot"
        });
        for (_i = 0, _len = menu.length; _i < _len; _i++) {
          dish = menu[_i];
          ui.label(__iced_deferrals.defer({
            assign_fn: (function(__slot_1, __slot_2) {
              return function() {
                error = arguments[0];
                return __slot_1[__slot_2] = arguments[1];
              };
            })(labels, dish),
            lineno: 11
          }), dish);
        }
        __iced_deferrals._fulfill();
      })(function() {
        var _i, _len;
        $('body').html(require('template/body')({
          menu: (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = menu.length; _i < _len; _i++) {
              dish = menu[_i];
              _results.push(labels[dish]);
            }
            return _results;
          })()
        }));
        new ui.AsapListsList($('#menu'));
        for (_i = 0, _len = menu.length; _i < _len; _i++) {
          dish = menu[_i];
          emitter = new ui.Emitter($("#menu > button:contains('" + labels[dish] + "')"));
          emitter.setViewName(dish);
        }
        $clock = $('#clock');
        $clock.hide();
        clock = function() {
          runclock();
          $('.reltime').each(function() {
            var node;
            node = $(this);
            return node.html(new Date(node.attr('x-time')).toRelativeTime({
              nowThreshold: 1000
            }));
          });
          try {
            $clock.show();
            return $clock.html("" + (new Date().toLocaleString()) + " Inbox:" + model.inbox.values.size);
          } catch (err) {
            return $clock.hide();
          }
        };
        (runclock = function() {
          return setTimeout(clock, 1000 - (new Date().getTime)() % 1000);
        })();
        WindowSlot.__super__.constructor.call(_this, $('#content'), $('#header > h1').first());
        WindowSlot.__super__.setView.call(_this, viewname);
        return new ui.DropArea($('#header > h1').first(), _this.setView);
      });
    }

    WindowSlot.prototype.setView = function(viewname) {
      return window.location.href = "http://" + window.location.host + "/" + viewname;
    };

    WindowSlot.prototype.setTitle = function(title) {
      WindowSlot.__super__.setTitle.apply(this, arguments);
      return document.title = "" + title + " - Secretarius";
    };

    WindowSlot.prototype.close = function() {
      window.open('', '_self', '');
      return window.close();
    };

    return WindowSlot;

  })(ui.Slot);

  /* 
  exports.ContainerViewSlot = class ContainerViewSlot extends Slot
  	constructor: (@container) ->
  		@id = @container.attr "id"
  		@container.data "slot", @
  		@draw()
  
  	draw: ->
  		@container.html require("template/container").render()
  		@title = $ "##{@id} > h1"
  		@content = $ "##{@id} > div"
  		@title.droppable
  			drop: (event, ui) => ui.draggable.data("dragobject").createView(@)
  
  	fixTitleLayout: =>
  		height = @title.height() + 13
  		@content.css("padding-top", height)
  		@content.css("height", @content.parent().innerHeight() - height - 6)
  		
  
  exports.TabViewSlot = class TabViewSlot extends Slot
  	constructor: ->
  		@id = "Tab#{Math.floor Math.random() * 1000000000000000}"
  		$("#tabs > ul").append require("template/tabtitle").render
  			id: @id
  		$("#tabs").append require("template/tab").render
  			id: @id
  		$("#tabs").tabs("refresh")
  		@title = $ "#tabs > ul > li > a[href='##{@id}']"
  		@content = $ "##{@id}"
  		$("#tabs > ul > li > a[href='#close#{@id}']").click =>
  			@destroy()
  			false
  		@content.data "slot", @
  
  	destroy: ->
  		@title.parent().remove()
  		@content.remove()
  
  	clear: ->
  		@title.html "Empty"
  		@content.html ""
  
  	getHeader: ->
  		@title.parent()
  */


}).call(this);
}, "template/asap": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="asap task">To Do:&nbsp; <span class="description"></span>&nbsp;List:&nbsp; <span class="list"></span><span style="float:right;"><input name="completed" type="checkbox"/><button name="delete">X</button></span></div>');
}
return buf.join("");
}}, "template/asapcreator": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form><input name="asap"/>');
 if (list) {
{
buf.push('List:<span class="listsel"></span>');
}
 } if (project) {
{
buf.push('Project:<span class="projectsel"></span>');
}
 }
buf.push('<button>Create ToDo</button></form>');
}
return buf.join("");
}}, "template/asaplist": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<button name="toggleshow">Show all</button><table><thead><tr><th>Done</th><th>Description</th><th>Project</th><th>Deadline</th><th>References</th><th>Last Changed</th><th>Created At</th><th>Delay</th><th>Move To</th><th>Delete</th></tr></thead><tbody></tbody></table><div class="newtodo"></div><form><input name="newname"/><button>Rename</button></form>');
}
return buf.join("");
}}, "template/asaplistcreator": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2>New ToDo List</h2><form name="list"><input name="list"/><button type="submit">New ToDo List</button></form>');
}
return buf.join("");
}}, "template/body": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<p id="msgcontainer"></p><div id="header"><h1>Secretarius</h1><div id="clock">Clock</div><div id="menu">');
// iterate menu
;(function(){
  if ('number' == typeof menu.length) {

    for (var $index = 0, $$l = menu.length; $index < $$l; $index++) {
      var entry = menu[$index];

buf.push('<button>');
var __val__ = entry
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</button>');
    }

  } else {
    var $$l = 0;
    for (var $index in menu) {
      $$l++;      var entry = menu[$index];

buf.push('<button>');
var __val__ = entry
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</button>');
    }

  }
}).call(this);

buf.push('</div></div><div id="content"></div><div id="footer"><p>Copyright 2012</p></div>');
}
return buf.join("");
}}, "template/inbox": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1></h1><div class="inboxinfo"></div><div class="front"><button name="asap">New ToDo</button><button name="project">New Project</button></div><div class="back"><button>Cancel</button><div class="newproject"></div><div class="newasap"></div></div>');
}
return buf.join("");
}}, "template/infobutton": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<span><span class="label"></span>');
 if (del) {
buf.push('<button>x</button>');
 }
buf.push('</span>');
}
return buf.join("");
}}, "template/infoframe": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="infocontent"></div><button name="save">Save</button><div class="options"><div class="setStatus"><button name="delete">Delete</button><button name="default">Normal</button><button name="maybe">Maybe</button><button name="inbox">Inbox</button><button name="urgent">Urgent</button></div><div class="delay"></div><div class="times">Last Change:<span class="reltime last_edited"></span>Created:<span class="reltime created_at"></span></div><div class="references"><h2>References</h2></div><div class="attachments"><h2>Attachments</h2><div class="upload"></div></div></div><button name="options">Toggle Options</button>');
}
return buf.join("");
}}, "template/infolabel": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<span>' + escape((interp = infolabel) == null ? '' : interp) + '</span>');
}
return buf.join("");
}}, "template/listentry": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<tr><td><input type="checkbox"/></td><td class="desc"><span></span><form><input type="text"/><button>Rename</button></form></td><td class="project"></td><td class="deadline"></td><td class="refs"></td><td class="last reltime"></td><td class="create reltime"></td><td class="delay"></td><td class="listsel"></td><td><button name="delete">Delete</button></td></tr>');
}
return buf.join("");
}}, "template/main": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="newnote"></div><h2>ToDo Lists</h2><div class="lists"></div><div class="newlist"></div>');
}
return buf.join("");
}}, "template/msg": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<span>');
var __val__ = msg
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
return buf.join("");
}}, "template/note": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form><textarea placeholder="Note is empty…"></textarea></form>');
}
return buf.join("");
}}, "template/notecreator": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2>New Note</h2><form name="note"><input name="note"/><button type="submit">New Note</button></form>');
}
return buf.join("");
}}, "template/project": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="project task"><div class="projecthandle"><button class="collapse"></button><form><span class="name"></span><input type="text"/><button>Rename</button></form><span style="float:right;"><input name="completed" type="checkbox"/><button name="delete">X</button></span></div><div class="children"></div></div>');
}
return buf.join("");
}}, "template/projectcreator": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form><input name="project"/>');
 if (parent) {
buf.push('Parent:<span class="parentpicker"></span>');
 }
buf.push('<button>Create Project</button></form>');
}
return buf.join("");
}}, "template/taskview": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<button name="toggleshow">Show all</button><div class="tasklist"></div><div class="root">/</div>');
}
return buf.join("");
}}, "template/timepicker": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="front"><button>Set ' + escape((interp = name) == null ? '' : interp) + '</button><span> ');
 if (name != '')	{
buf.push('' + escape((interp = name) == null ? '' : interp) + ':');
 }
buf.push('<span class="reltime"></span><button>Change</button></span></div><div class="back"><form><input name="day" size="2"/>.<input name="month" size="2"/>.<input name="year" size="4"/>&nbsp;&nbsp;&nbsp;<input name="hour" size="2"/>:<input name="minute" size="2"/>:<input name="second" size="2"/></form><button>Abort</button><button name="delete">Delete ' + escape((interp = name) == null ? '' : interp) + '</button><button name="save">Save ' + escape((interp = name) == null ? '' : interp) + '</button></div>');
}
return buf.join("");
}}, "template/upload": function(exports, require, module) {module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<button>Upload new ' + escape((interp = name) == null ? '' : interp) + '</button><form><input type="file"/><button>Cancel</button><button>Upload ' + escape((interp = name) == null ? '' : interp) + '</button></form>');
}
return buf.join("");
}}, "ui": function(exports, require, module) {(function() {
  var AsapCreator, AsapListCreator, AsapListsList, DropArea, Emitter, Flippable, InfoClassListManager, InfoClassPicker, InfoList, InfoListManager, ListManager, ListPicker, NoteCreator, ProjectCreator, ProjectPicker, ReferenceList, Slot, SlotGenerator, TimePicker, Uploader, View, WindowSlotGenerator, createInfoButton, defaultTo, iced, model,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  window.__iced_k = window.__iced_k_noop = function() {};

  iced = require('myiced');

  iced.util.pollute(window);

  model = require('jsonmodel');

  exports.message = function(msg) {
    var lb, msgcontainer, msgnode;
    msgcontainer = $('#msgcontainer');
    (msgnode = $(require('template/msg')({
      msg: msg
    }))).appendTo(msgcontainer);
    (lb = $('<br>')).appendTo(msgcontainer);
    msgnode.hide();
    msgnode.show(1000);
    setTimeout((function() {
      return msgnode.hide(1000, function() {
        msgnode.remove();
        return lb.remove();
      });
    }), 5000);
    return msgnode;
  };

  exports.View = View = (function() {
    var _views;

    function View() {}

    _views = [];

    View.registerView = function(regex, cls, label) {
      return _views.push({
        regex: regex,
        cls: cls,
        label: label
      });
    };

    View.getLabel = func(function(cb, viewname) {
      var params, row, _ref;
      _ref = this._find(viewname), row = _ref[0], params = _ref[1];
      if ((row != null ? row.label : void 0) != null) {
        return row.label(catchNull(cb), params);
      } else {
        return cb(viewname);
      }
    });

    View.create = function(viewname, slot) {
      var params, row, _ref;
      _ref = this._find(viewname), row = _ref[0], params = _ref[1];
      if (row != null) return new row.cls(slot, params);
    };

    View._find = function(viewname) {
      var params, row, _i, _len;
      for (_i = 0, _len = _views.length; _i < _len; _i++) {
        row = _views[_i];
        params = row.regex.exec(viewname);
        if (params != null) return [row, params];
      }
      return [null, null];
    };

    View.test = function(viewname) {
      return this._find(viewname)[0] != null;
    };

    return View;

  })();

  exports.DropArea = DropArea = (function() {

    function DropArea(contentNode, cb) {
      contentNode.bind('dragover', function(ev) {
        return ev.originalEvent.preventDefault();
      });
      contentNode.bind('drop', function(ev) {
        ev.originalEvent.preventDefault();
        return cb(ev.originalEvent.dataTransfer.getData('text/plain'));
      });
    }

    return DropArea;

  })();

  exports.Slot = Slot = (function() {

    function Slot(contentNode, titleNode) {
      this.contentNode = contentNode;
      this.titleNode = titleNode;
      this.clear = __bind(this.clear, this);
      this.setView = __bind(this.setView, this);
      this.emitter = new Emitter(this.getTitleNode());
      this.clear();
    }

    Slot.prototype.setView = function(viewname) {
      if (View.test(viewname)) {
        this.clear();
        this.view = View.create(viewname, this);
        return this.emitter.setViewName(viewname);
      }
    };

    Slot.prototype.setTitle = function(title) {
      return this.getTitleNode().html(title);
    };

    Slot.prototype.setContent = function(html) {
      return this.getContentNode().html(html);
    };

    Slot.prototype.getContentNode = function() {
      return this.contentNode;
    };

    Slot.prototype.getTitleNode = function() {
      return this.titleNode;
    };

    Slot.prototype.clear = function() {
      var _ref;
      if ((_ref = this.view) != null) _ref["delete"]();
      this.getContentNode().empty();
      return this.setTitle('Secretarius');
    };

    return Slot;

  })();

  exports.Emitter = Emitter = (function() {

    function Emitter(node, slotGenerator) {
      var _ref,
        _this = this;
      this.node = node;
      this.slotGenerator = slotGenerator;
      if ((_ref = this.slotGenerator) == null) {
        this.slotGenerator = SlotGenerator.getDefault();
      }
      this.node.attr('draggable', 'true');
      this.node.bind('dragstart', function(ev) {
        ev.originalEvent.dataTransfer.setData('text/plain', _this.getViewName());
        return ev.originalEvent.dataTransfer.setData('text/uri-list', "http://" + window.location.host + "/" + (_this.getViewName()));
      });
      this.node.click(function() {
        return _this.slotGenerator.show(_this.getViewName());
      });
    }

    Emitter.prototype.setViewName = function(viewName) {
      this.viewName = viewName;
    };

    Emitter.prototype.getViewName = function() {
      return this.viewName;
    };

    return Emitter;

  })();

  exports.SlotGenerator = SlotGenerator = (function() {
    var _default;

    function SlotGenerator() {}

    _default = null;

    SlotGenerator.setDefault = function(generator) {
      return _default = generator;
    };

    SlotGenerator.getDefault = function() {
      return _default;
    };

    return SlotGenerator;

  })();

  exports.WindowSlotGenerator = WindowSlotGenerator = (function(_super) {

    __extends(WindowSlotGenerator, _super);

    function WindowSlotGenerator() {
      return WindowSlotGenerator.__super__.constructor.apply(this, arguments);
    }

    WindowSlotGenerator.prototype.show = function(viewname) {
      return window.open("" + (document.URL.match(/https?:\/\/.*\//)[0]) + viewname, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no');
    };

    WindowSlotGenerator.setDefault(new WindowSlotGenerator);

    return WindowSlotGenerator;

  })(SlotGenerator);

  exports.Flippable = Flippable = (function() {

    function Flippable(front, back) {
      var _ref;
      this.front = front;
      this.back = back;
      this.toggle = __bind(this.toggle, this);
      this.showFront = __bind(this.showFront, this);
      this.showBack = __bind(this.showBack, this);
      this.flipped = false;
      if ((_ref = this.back) != null) _ref.addClass('backside');
    }

    Flippable.prototype.showBack = function() {
      var _ref, _ref1;
      if ((_ref = this.front) != null) _ref.addClass('backside');
      return (_ref1 = this.back) != null ? _ref1.removeClass('backside') : void 0;
    };

    Flippable.prototype.showFront = function() {
      var _ref, _ref1;
      if ((_ref = this.front) != null) _ref.removeClass('backside');
      return (_ref1 = this.back) != null ? _ref1.addClass('backside') : void 0;
    };

    Flippable.prototype.toggle = function() {
      if (this.flipped = !this.flipped) {
        return this.showBack();
      } else {
        return this.showFront();
      }
    };

    Flippable.prototype.addToggler = function(toggler) {
      var _this = this;
      return toggler.click(function() {
        _this.toggle();
        return false;
      });
    };

    return Flippable;

  })();

  exports.Uploader = Uploader = (function() {
    var defaults;

    defaults = {
      upload: function() {},
      name: 'File'
    };

    function Uploader(node, options) {
      var flip, links;
      this.node = node;
      this.options = options != null ? options : {};
      defaultTo(this.options, defaults);
      this.node.html(require('template/upload')(this.options));
      links = $('button', this.node);
      flip = new Flippable(links.first(), $('form', this.node));
      flip.addToggler(links);
    }

    return Uploader;

  })();

  exports.TimePicker = TimePicker = (function() {
    var defaults, units;

    units = {
      year: 'FullYear',
      month: 'Month',
      day: 'Date',
      minute: 'Minutes',
      hour: 'Hours',
      second: 'Seconds'
    };

    defaults = {
      change: function() {},
      name: 'Time'
    };

    function TimePicker(node, options) {
      var unit,
        _this = this;
      this.node = node;
      this.options = options;
      this.getDate = __bind(this.getDate, this);
      this.save = __bind(this.save, this);
      this.setDate = __bind(this.setDate, this);
      defaultTo(this.options, defaults);
      this.node.html(require('template/timepicker')(this.options));
      this.node.addClass('timepicker');
      this.outerFlip = new Flippable($('.front', this.node), $('.back', this.node), 0);
      this.innerFlip = new Flippable($('.front > button', this.node), $('.front > span', this.node), 0);
      this.outerFlip.addToggler($('button', this.node));
      this.display = $('span.reltime', this.node);
      for (unit in units) {
        this[unit] = $("input[name='" + unit + "']", this.node);
      }
      this.setDate(this.options.date);
      $('button[name=delete]', this.node).click(function() {
        _this.options.change(null);
        _this.setDate(null);
        return false;
      });
      $('button[name=save]', this.node).click(function() {
        _this.save();
        return false;
      });
    }

    TimePicker.prototype.setDate = function(date) {
      var fn, unit, _results;
      this.date = date;
      date = this.date;
      if (this.date != null) {
        this.innerFlip.showBack();
      } else {
        this.innerFlip.showFront();
        date = new Date;
      }
      this.display.attr('x-time', date);
      _results = [];
      for (unit in units) {
        fn = units[unit];
        _results.push(this[unit].val(date["get" + fn]() + (unit === 'month' ? 1 : 0)));
      }
      return _results;
    };

    TimePicker.prototype.save = function() {
      var date, fn, unit;
      date = new Date;
      try {
        for (unit in units) {
          fn = units[unit];
          date["set" + fn](this[unit].val() - (unit === 'month' ? 1 : 0));
        }
      } catch (error) {
        date = null;
      }
      this.options.change(date);
      return this.setDate(date);
    };

    TimePicker.prototype.getDate = function() {
      return this.date;
    };

    return TimePicker;

  })();

  exports.ListManager = ListManager = (function() {

    function ListManager(node, creator) {
      this.node = node;
      this.creator = creator;
      this.setList = __bind(this.setList, this);
      this.elements = {};
    }

    ListManager.prototype.setList = function(list) {
      var element, id, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        var _i, _len, _ref, _results, _while;
        _ref = list;
        _len = _ref.length;
        _i = 0;
        _results = [];
        _while = function(__iced_k) {
          var _break, _continue, _next;
          _break = function() {
            return __iced_k(_results);
          };
          _continue = function() {
            return iced.trampoline(function() {
              ++_i;
              return _while(__iced_k);
            });
          };
          _next = function(__iced_next_arg) {
            _results.push(__iced_next_arg);
            return _continue();
          };
          if (!(_i < _len)) {
            return _break();
          } else {
            id = _ref[_i];
            if (!(id in _this.elements)) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  funcname: "ListManager.setList"
                });
                _this.creator(__iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return element = arguments[0];
                    };
                  })(),
                  lineno: 202
                }), id);
                __iced_deferrals._fulfill();
              })(function() {
                return _next(!(id in _this.elements) ? (_this.elements[id] = element, id === _this.select ? element.prop('selected', true) : void 0, element.appendTo(_this.node)) : void 0);
              });
            } else {
              return _continue();
            }
          }
        };
        _while(__iced_k);
      })(function() {
        var _ref, _results;
        _ref = _this.elements;
        _results = [];
        for (id in _ref) {
          element = _ref[id];
          if (!(__indexOf.call(list, id) < 0)) continue;
          delete _this.elements[id];
          _results.push(element.remove());
        }
        return _results;
      });
    };

    return ListManager;

  })();

  exports.InfoListManager = InfoListManager = (function(_super) {

    __extends(InfoListManager, _super);

    function InfoListManager(node, creator) {
      InfoListManager.__super__.constructor.call(this, node, function(cb, id) {
        var error, info, ___iced_passed_deferral, __iced_deferrals, __iced_k,
          _this = this;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral
          });
          model.cache.getInformation(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                error = arguments[0];
                return info = arguments[1];
              };
            })(),
            lineno: 215
          }), id);
          __iced_deferrals._fulfill();
        })(function() {
          if (!((typeof error !== "undefined" && error !== null) || (typeof info === "undefined" || info === null))) {
            return creator(cb, info);
          }
        });
      });
    }

    return InfoListManager;

  })(ListManager);

  exports.createInfoButton = createInfoButton = function(info, type, del) {
    var domnode, emitter, labelnode, setLabel;
    if (type == null) type = false;
    domnode = $(require('template/infobutton')({
      del: del != null
    }));
    labelnode = $('.label', domnode);
    if (del != null) {
      $('button', domnode).click(function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return del(info);
      });
    }
    info.onChanged(setLabel = function(info) {
      var label, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "setLabel"
        });
        exports.info2label(catchNull(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return label = arguments[0];
            };
          })(),
          lineno: 227
        })), info);
        __iced_deferrals._fulfill();
      })(function() {
        if (!type) label = (label.split(':')).slice(1).join(':');
        return labelnode.html(label);
      });
    });
    setLabel(info);
    emitter = new Emitter(domnode);
    emitter.setViewName(exports.info2viewname(info));
    return domnode;
  };

  exports.InfoList = InfoList = (function(_super) {

    __extends(InfoList, _super);

    function InfoList(node, type, del) {
      if (type == null) type = false;
      InfoList.__super__.constructor.call(this, node, function(autocb, reference) {
        autocb(createInfoButton(reference, type, del));
        return;
      });
    }

    return InfoList;

  })(InfoListManager);

  exports.ReferenceList = ReferenceList = (function(_super) {

    __extends(ReferenceList, _super);

    function ReferenceList(node, info) {
      new DropArea(node, function(viewname) {
        var error, id, reference, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
          _this = this;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        if ((id = (_ref = /^\w*:(.*)$/.exec(viewname)) != null ? _ref[1] : void 0) != null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral
            });
            model.cache.getInformation(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return reference = arguments[1];
                };
              })(),
              lineno: 244
            }), id);
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              if (!((typeof error !== "undefined" && error !== null) || (typeof reference === "undefined" || reference === null))) {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral
                  });
                  info.addReference(__iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return error = arguments[0];
                      };
                    })(),
                    lineno: 246
                  }), reference);
                  __iced_deferrals._fulfill();
                })(__iced_k);
              } else {
                return __iced_k();
              }
            })(__iced_k);
          });
        } else {
          return __iced_k();
        }
      });
      ReferenceList.__super__.constructor.call(this, node, true, function(reference) {
        return info.removeReference((function() {}), reference);
      });
    }

    return ReferenceList;

  })(InfoList);

  exports.InfoClassListManager = InfoClassListManager = (function(_super) {

    __extends(InfoClassListManager, _super);

    function InfoClassListManager(node, cls, creator) {
      var error, ids, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      InfoClassListManager.__super__.constructor.call(this, node, creator);
      cls.onChanged(this.setList);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "InfoClassListManager"
        });
        cls.getAllIDs(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              error = arguments[0];
              return ids = arguments[1];
            };
          })(),
          lineno: 253
        }));
        __iced_deferrals._fulfill();
      })(function() {
        return _this.setList(ids);
      });
    }

    return InfoClassListManager;

  })(InfoListManager);

  exports.AsapListsList = AsapListsList = (function(_super) {

    __extends(AsapListsList, _super);

    function AsapListsList(node) {
      AsapListsList.__super__.constructor.call(this, node, model.AsapList, function(autocb, list) {
        var listnode;
        listnode = $("<button>" + list.name + "</button>");
        list.onChanged(function(list) {
          return listnode.html(list.name);
        });
        new Emitter(listnode).setViewName("asaplist:" + list.id);
        autocb(listnode);
        return;
      });
    }

    return AsapListsList;

  })(InfoClassListManager);

  exports.InfoClassPicker = InfoClassPicker = (function(_super) {

    __extends(InfoClassPicker, _super);

    function InfoClassPicker(node, cls, defaultoption, cb) {
      this.select = null;
      this.picker = $('<select />');
      node.append(this.picker);
      if (defaultoption != null) {
        this.picker.append($(new Option(defaultoption, '')));
      }
      InfoClassPicker.__super__.constructor.call(this, this.picker, cls, cb);
    }

    InfoClassPicker.prototype.sel = function(id) {
      this.select = id;
      if (id in this.elements) return this.elements[id].prop('selected', true);
    };

    InfoClassPicker.prototype.getInfo = function(cb) {
      return model.cache.getInformation(cb, this.picker.val());
    };

    InfoClassPicker.prototype.onChanged = function(cb) {
      var _this = this;
      return this.picker.change(function() {
        var error, info, ___iced_passed_deferral, __iced_deferrals, __iced_k;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral
          });
          _this.getInfo(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                error = arguments[0];
                return info = arguments[1];
              };
            })(),
            lineno: 286
          }));
          __iced_deferrals._fulfill();
        })(function() {
          return cb(info);
        });
      });
    };

    return InfoClassPicker;

  })(InfoClassListManager);

  exports.ProjectPicker = ProjectPicker = (function(_super) {

    __extends(ProjectPicker, _super);

    function ProjectPicker(node) {
      ProjectPicker.__super__.constructor.call(this, node, model.Project, 'No Project', function(autocb, project) {
        var projectnode;
        projectnode = $(new Option(project.description, project.id));
        project.onChanged(function(project) {
          return projectnode.html(project.description);
        });
        autocb(projectnode);
        return;
      });
    }

    return ProjectPicker;

  })(InfoClassPicker);

  exports.ListPicker = ListPicker = (function(_super) {

    __extends(ListPicker, _super);

    function ListPicker(node) {
      ListPicker.__super__.constructor.call(this, node, model.AsapList, null, function(autocb, list) {
        var listnode;
        listnode = $(new Option(list.name, list.id));
        list.onChanged(function(list) {
          return listnode.html(list.name);
        });
        autocb(listnode);
        return;
      });
    }

    return ListPicker;

  })(InfoClassPicker);

  exports.AsapListCreator = AsapListCreator = (function() {

    function AsapListCreator(node) {
      var list;
      node.html(require('template/asaplistcreator')());
      list = $('input[name=list]', node);
      $('form[name=list]').submit(function(ev) {
        ev.preventDefault();
        return new model.AsapList().create((function(error) {
          if (error == null) return list.val('');
        }), list.val());
      });
    }

    return AsapListCreator;

  })();

  exports.NoteCreator = NoteCreator = (function() {

    function NoteCreator(node) {
      var content;
      node.html(require('template/notecreator')());
      content = $('input[name=note]', node);
      $('form[name=note]', node).submit(function(ev) {
        ev.preventDefault();
        return new model.Note().create((function(error) {
          if (error == null) return content.val('');
        }), content.val());
      });
    }

    return NoteCreator;

  })();

  exports.AsapCreator = AsapCreator = (function() {

    function AsapCreator(node, list, project, reference) {
      var desc, form, listPicker, projectPicker,
        _this = this;
      this.list = list != null ? list : null;
      this.project = project != null ? project : null;
      this.reference = reference != null ? reference : null;
      node.append(form = $(require('template/asapcreator')({
        list: !(this.list != null),
        project: !(this.project != null)
      })));
      desc = $('input[name=asap]');
      projectPicker = new ProjectPicker($('.projectsel', node));
      listPicker = new ListPicker($('.listsel', node));
      form.submit(function(ev) {
        var error, list, project, ___iced_passed_deferral, __iced_deferrals, __iced_k;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        ev.preventDefault();
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral
          });
          if (_this.project != null) {
            project = _this.project;
          } else {
            projectPicker.getInfo(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return project = arguments[1];
                };
              })(),
              lineno: 334
            }));
          }
          if (_this.list != null) {
            list = _this.list;
          } else {
            listPicker.getInfo(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  error = arguments[0];
                  return list = arguments[1];
                };
              })(),
              lineno: 338
            }));
          }
          __iced_deferrals._fulfill();
        })(function() {
          return new model.Asap().create((function() {
            return desc.val('');
          }), desc.val(), list, _this.reference, project);
        });
      });
    }

    AsapCreator.prototype.setList = function(list) {
      this.list = list;
    };

    AsapCreator.prototype.setProject = function(project) {
      this.project = project;
    };

    AsapCreator.prototype.setReference = function(reference) {
      this.reference = reference;
    };

    return AsapCreator;

  })();

  exports.ProjectCreator = ProjectCreator = (function() {

    function ProjectCreator(node, parent, reference) {
      var desc, form, parentPicker,
        _this = this;
      this.node = node;
      this.parent = parent != null ? parent : null;
      this.reference = reference != null ? reference : null;
      node.append(form = $(require('template/projectcreator')({
        parend: !(this.parent != null)
      })));
      desc = $('input[name=project]');
      parentPicker = new ProjectPicker($('.parentpicker', node));
      form.submit(function(ev) {
        var error, parent, ___iced_passed_deferral, __iced_deferrals, __iced_k;
        __iced_k = __iced_k_noop;
        ___iced_passed_deferral = iced.findDeferral(arguments);
        ev.preventDefault();
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral
          });
          if (_this.parent != null) {
                        parent = _this.parent;
            __iced_k();;
          } else {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral
              });
              parentPicker.getInfo(__iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    error = arguments[0];
                    return parent = arguments[1];
                  };
                })(),
                lineno: 357
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
          }
          __iced_deferrals._fulfill();
        })(function() {
          return new model.Project().create((function() {
            return desc.val('');
          }), desc.val(), _this.reference, parent);
        });
      });
    }

    ProjectCreator.prototype.setParent = function(parent) {
      this.parent = parent;
    };

    ProjectCreator.prototype.setReference = function(reference) {
      this.reference = reference;
    };

    return ProjectCreator;

  })();

  exports.defaultTo = defaultTo = function(obj, defaults) {
    var key, value, _results;
    _results = [];
    for (key in defaults) {
      value = defaults[key];
      if (obj[key] == null) {
        _results.push(obj[key] = value);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  exports.id2viewname = func(function(autocb, id) {
    var info, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = autocb;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral
      });
      model.cache.getInformation(__iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return info = arguments[0];
          };
        })(),
        lineno: 366
      }), id);
      __iced_deferrals._fulfill();
    })(function() {
      autocb(exports.info2viewname(info));
      return;
    });
  });

  exports.viewname2id = func(function(autocb, viewname) {
    var id, info, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
      _this = this;
    __iced_k = autocb;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    if ((id = (_ref = /^\w*:(.*)$/.exec(viewname)) != null ? _ref[1] : void 0) != null) {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral
        });
        model.cache.getInformation(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return info = arguments[0];
            };
          })(),
          lineno: 371
        }), id);
        __iced_deferrals._fulfill();
      })(function() {
        return __iced_k(info);
      });
    } else {
      return __iced_k(throwError("No Infoview Name:" + viewname));
    }
  });

  exports.info2label = function(cb, info) {
    return exports.label(cb, exports.info2viewname(info));
  };

  exports.info2viewname = function(info) {
    return "" + info.type + ":" + info.id;
  };

  exports.id2label = func(function(cb, id) {
    var viewname, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral
      });
      exports.id2viewname(__iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return viewname = arguments[0];
          };
        })(),
        lineno: 383
      }), id);
      __iced_deferrals._fulfill();
    })(function() {
      return exports.label(catchNull(cb), viewname);
    });
  });

  exports.label = function(cb, viewname) {
    return View.getLabel(cb, viewname);
  };

  exports.inbox = require('inbox');

  exports.slots = require('slots');

  exports.info = require('info');

  exports.main = require('main');

}).call(this);
}, "date.extensions": function(exports, require, module) {/**
 * Returns a description of this date in relative terms.

 * Examples, where new Date().toString() == "Mon Nov 23 2009 17:36:51 GMT-0500 (EST)":
 *
 * new Date().toRelativeTime()
 * --> 'Just now'
 *
 * new Date("Nov 21, 2009").toRelativeTime()
 * --> '2 days ago'
 *
 * new Date("Nov 25, 2009").toRelativeTime()
 * --> '2 days from now'
 *
 * // One second ago
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime()
 * --> '1 second ago'
 *
 * toRelativeTime() takes an optional argument - a configuration object.
 * It can have the following properties:
 * - now - Date object that defines "now" for the purpose of conversion.
 *         By default, current date & time is used (i.e. new Date())
 * - nowThreshold - Threshold in milliseconds which is considered "Just now"
 *                  for times in the past or "Right now" for now or the immediate future
 * - smartDays - If enabled, dates within a week of now will use Today/Yesterday/Tomorrow
 *               or weekdays along with time, e.g. "Thursday at 15:10:34"
 *               rather than "4 days ago" or "Tomorrow at 20:12:01"
 *               instead of "1 day from now"
 *
 * If a single number is given as argument, it is interpreted as nowThreshold:
 *
 * // One second ago, now setting a now_threshold to 5 seconds
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime(5000)
 * --> 'Just now'
 *
 * // One second in the future, now setting a now_threshold to 5 seconds
 * new Date("Nov 23 2009 17:36:52 GMT-0500 (EST)").toRelativeTime(5000)
 * --> 'Right now'
 *
 */
 Date.prototype.toRelativeTime = (function() {

  var _ = function(options) {
    var opts = processOptions(options);

    var now = opts.now || new Date();
    var delta = now - this;
    var future = (delta <= 0);
    delta = Math.abs(delta);

    // special cases controlled by options
    if (delta <= opts.nowThreshold) {
      return future ? 'Right now' : 'Just now';
    }
    if (opts.smartDays && delta <= 6 * MS_IN_DAY) {
      return toSmartDays(this, now);
    }

    var units = null;
    for (var key in CONVERSIONS) {
      if (delta < CONVERSIONS[key])
        break;
      units = key; // keeps track of the selected key over the iteration
      delta = delta / CONVERSIONS[key];
    }

    // pluralize a unit when the difference is greater than 1.
    delta = Math.floor(delta);
    if (delta !== 1) { units += "s"; }
    return [delta, units, future ? "from now" : "ago"].join(" ");
  };

  var processOptions = function(arg) {
    if (!arg) arg = 0;
    if (typeof arg === 'string') {
      arg = parseInt(arg, 10);
    }
    if (typeof arg === 'number') {
      if (isNaN(arg)) arg = 0;
      return {nowThreshold: arg};
    }
    return arg;
  };

  var toSmartDays = function(date, now) {
    var day;
    var weekday = date.getDay(),
        dayDiff = weekday - now.getDay();
    if (dayDiff == 0)       day = 'Today';
    else if (dayDiff == -1) day = 'Yesterday';
    else if (dayDiff == 1 && date > now)  day = 'Tomorrow';
    else                    day = WEEKDAYS[weekday];
    return day + " at " + date.toLocaleTimeString();
  };

  var CONVERSIONS = {
    millisecond: 1, // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60,     // min   -> hour
    day:    24,     // hour  -> day
    month:  30,     // day   -> month (roughly)
    year:   12      // month -> year
  };
  var MS_IN_DAY = (CONVERSIONS.millisecond * CONVERSIONS.second * CONVERSIONS.minute * CONVERSIONS.hour * CONVERSIONS.day);

  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return _;

})();



/*
 * Wraps up a common pattern used with this plugin whereby you take a String
 * representation of a Date, and want back a date object.
 */
Date.fromString = function(str) {
  return new Date(Date.parse(str));
};
}, "jade": function(exports, require, module) {window.jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});
}, "jquery.autosize-min": function(exports, require, module) {// Autosize 1.15.2 - jQuery plugin for textareas
// (c) 2013 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php
(function(a){var j,b={className:"autosizejs",append:"",callback:!1},c="hidden",d="border-box",e="lineHeight",f='<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',g=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],h="oninput",i="onpropertychange",k=a(f).data("autosize",!0)[0];k.style.lineHeight="99px","99px"===a(k).css(e)&&g.push(e),k.style.lineHeight="",a.fn.autosize=function(e){return e=a.extend({},b,e||{}),k.parentNode!==document.body&&a(document.body).append(k),this.each(function(){function s(){j=b,k.className=e.className,a.each(g,function(a,b){k.style[b]=f.css(b)})}function t(){var a,d,g;j!==b&&s(),n||(n=!0,k.value=b.value+e.append,k.style.overflowY=b.style.overflowY,g=parseInt(b.style.height,10),k.style.width=f.width()+"px",k.scrollTop=0,k.scrollTop=9e4,a=k.scrollTop,a>m?(a=m,d="scroll"):l>a&&(a=l),a+=p,b.style.overflowY=d||c,g!==a&&(b.style.height=a+"px",r&&e.callback.call(b)),setTimeout(function(){n=!1},1))}var n,o,b=this,f=a(b),l=f.height(),m=parseInt(f.css("maxHeight"),10),p=0,q=b.value,r=a.isFunction(e.callback);f.data("autosize")||((f.css("box-sizing")===d||f.css("-moz-box-sizing")===d||f.css("-webkit-box-sizing")===d)&&(p=f.outerHeight()-f.height()),o="none"===f.css("resize")?"none":"horizontal",f.css({overflow:c,overflowY:c,wordWrap:"break-word",resize:o}).data("autosize",!0),m=m&&m>0?m:9e4,i in b?h in b?b[h]=b.onkeyup=t:b[i]=t:(b[h]=t,b.value="",b.value=q),a(window).resize(t),f.bind("autosize",t),t())})}})(window.jQuery||window.Zepto);}, "jquery": function(exports, require, module) {(function(e,t){"use strict";function n(e){var t=e.length,n=st.type(e);return st.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}function r(e){var t=Tt[e]={};return st.each(e.match(lt)||[],function(e,n){t[n]=!0}),t}function i(e,n,r,i){if(st.acceptData(e)){var o,a,s=st.expando,u="string"==typeof n,l=e.nodeType,c=l?st.cache:e,f=l?e[s]:e[s]&&s;if(f&&c[f]&&(i||c[f].data)||!u||r!==t)return f||(l?e[s]=f=K.pop()||st.guid++:f=s),c[f]||(c[f]={},l||(c[f].toJSON=st.noop)),("object"==typeof n||"function"==typeof n)&&(i?c[f]=st.extend(c[f],n):c[f].data=st.extend(c[f].data,n)),o=c[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[st.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[st.camelCase(n)])):a=o,a}}function o(e,t,n){if(st.acceptData(e)){var r,i,o,a=e.nodeType,u=a?st.cache:e,l=a?e[st.expando]:st.expando;if(u[l]){if(t&&(r=n?u[l]:u[l].data)){st.isArray(t)?t=t.concat(st.map(t,st.camelCase)):t in r?t=[t]:(t=st.camelCase(t),t=t in r?[t]:t.split(" "));for(i=0,o=t.length;o>i;i++)delete r[t[i]];if(!(n?s:st.isEmptyObject)(r))return}(n||(delete u[l].data,s(u[l])))&&(a?st.cleanData([e],!0):st.support.deleteExpando||u!=u.window?delete u[l]:u[l]=null)}}}function a(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(Nt,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:wt.test(r)?st.parseJSON(r):r}catch(o){}st.data(e,n,r)}else r=t}return r}function s(e){var t;for(t in e)if(("data"!==t||!st.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function u(){return!0}function l(){return!1}function c(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function f(e,t,n){if(t=t||0,st.isFunction(t))return st.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return st.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=st.grep(e,function(e){return 1===e.nodeType});if(Wt.test(t))return st.filter(t,r,!n);t=st.filter(t,r)}return st.grep(e,function(e){return st.inArray(e,t)>=0===n})}function p(e){var t=zt.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function d(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function h(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function g(e){var t=nn.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function m(e,t){for(var n,r=0;null!=(n=e[r]);r++)st._data(n,"globalEval",!t||st._data(t[r],"globalEval"))}function y(e,t){if(1===t.nodeType&&st.hasData(e)){var n,r,i,o=st._data(e),a=st._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)st.event.add(t,n,s[n][r])}a.data&&(a.data=st.extend({},a.data))}}function v(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!st.support.noCloneEvent&&t[st.expando]){r=st._data(t);for(i in r.events)st.removeEvent(t,i,r.handle);t.removeAttribute(st.expando)}"script"===n&&t.text!==e.text?(h(t).text=e.text,g(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),st.support.html5Clone&&e.innerHTML&&!st.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Zt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function b(e,n){var r,i,o=0,a=e.getElementsByTagName!==t?e.getElementsByTagName(n||"*"):e.querySelectorAll!==t?e.querySelectorAll(n||"*"):t;if(!a)for(a=[],r=e.childNodes||e;null!=(i=r[o]);o++)!n||st.nodeName(i,n)?a.push(i):st.merge(a,b(i,n));return n===t||n&&st.nodeName(e,n)?st.merge([e],a):a}function x(e){Zt.test(e.type)&&(e.defaultChecked=e.checked)}function T(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Nn.length;i--;)if(t=Nn[i]+n,t in e)return t;return r}function w(e,t){return e=t||e,"none"===st.css(e,"display")||!st.contains(e.ownerDocument,e)}function N(e,t){for(var n,r=[],i=0,o=e.length;o>i;i++)n=e[i],n.style&&(r[i]=st._data(n,"olddisplay"),t?(r[i]||"none"!==n.style.display||(n.style.display=""),""===n.style.display&&w(n)&&(r[i]=st._data(n,"olddisplay",S(n.nodeName)))):r[i]||w(n)||st._data(n,"olddisplay",st.css(n,"display")));for(i=0;o>i;i++)n=e[i],n.style&&(t&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=t?r[i]||"":"none"));return e}function C(e,t,n){var r=mn.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=st.css(e,n+wn[o],!0,i)),r?("content"===n&&(a-=st.css(e,"padding"+wn[o],!0,i)),"margin"!==n&&(a-=st.css(e,"border"+wn[o]+"Width",!0,i))):(a+=st.css(e,"padding"+wn[o],!0,i),"padding"!==n&&(a+=st.css(e,"border"+wn[o]+"Width",!0,i)));return a}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=ln(e),a=st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=un(e,t,o),(0>i||null==i)&&(i=e.style[t]),yn.test(i))return i;r=a&&(st.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(a?"border":"content"),r,o)+"px"}function S(e){var t=V,n=bn[e];return n||(n=A(e,t),"none"!==n&&n||(cn=(cn||st("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(cn[0].contentWindow||cn[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=A(e,t),cn.detach()),bn[e]=n),n}function A(e,t){var n=st(t.createElement(e)).appendTo(t.body),r=st.css(n[0],"display");return n.remove(),r}function j(e,t,n,r){var i;if(st.isArray(t))st.each(t,function(t,i){n||kn.test(e)?r(e,i):j(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==st.type(t))r(e,t);else for(i in t)j(e+"["+i+"]",t[i],n,r)}function D(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(lt)||[];if(st.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function L(e,n,r,i){function o(u){var l;return a[u]=!0,st.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||s||a[c]?s?!(l=c):t:(n.dataTypes.unshift(c),o(c),!1)}),l}var a={},s=e===$n;return o(n.dataTypes[0])||!a["*"]&&o("*")}function H(e,n){var r,i,o=st.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((o[r]?e:i||(i={}))[r]=n[r]);return i&&st.extend(!0,e,i),e}function M(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(o in c)o in r&&(n[c[o]]=r[o]);for(;"*"===l[0];)l.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("Content-Type"));if(i)for(o in u)if(u[o]&&u[o].test(i)){l.unshift(o);break}if(l[0]in r)a=l[0];else{for(o in r){if(!l[0]||e.converters[o+" "+l[0]]){a=o;break}s||(s=o)}a=a||s}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function q(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=u[++s];)if("*"!==i){if("*"!==l&&l!==i){if(n=a[l+" "+i]||a["* "+i],!n)for(r in a)if(o=r.split(" "),o[1]===i&&(n=a[l+" "+o[0]]||a["* "+o[0]])){n===!0?n=a[r]:a[r]!==!0&&(i=o[0],u.splice(s--,0,i));break}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(c){return{state:"parsererror",error:n?c:"No conversion from "+l+" to "+i}}}l=i}return{state:"success",data:t}}function _(){try{return new e.XMLHttpRequest}catch(t){}}function F(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function O(){return setTimeout(function(){Qn=t}),Qn=st.now()}function B(e,t){st.each(t,function(t,n){for(var r=(rr[t]||[]).concat(rr["*"]),i=0,o=r.length;o>i;i++)if(r[i].call(e,t,n))return})}function P(e,t,n){var r,i,o=0,a=nr.length,s=st.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qn||O(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:st.extend({},t),opts:st.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qn||O(),duration:n.duration,tweens:[],createTween:function(t,n){var r=st.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(R(c,l.opts.specialEasing);a>o;o++)if(r=nr[o].call(l,e,c,l.opts))return r;return B(l,c),st.isFunction(l.opts.start)&&l.opts.start.call(e,l),st.fx.timer(st.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function R(e,t){var n,r,i,o,a;for(n in e)if(r=st.camelCase(n),i=t[r],o=e[n],st.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=st.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function W(e,t,n){var r,i,o,a,s,u,l,c,f,p=this,d=e.style,h={},g=[],m=e.nodeType&&w(e);n.queue||(c=st._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,f=c.empty.fire,c.empty.fire=function(){c.unqueued||f()}),c.unqueued++,p.always(function(){p.always(function(){c.unqueued--,st.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===st.css(e,"display")&&"none"===st.css(e,"float")&&(st.support.inlineBlockNeedsLayout&&"inline"!==S(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",st.support.shrinkWrapBlocks||p.done(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(r in t)if(o=t[r],Zn.exec(o)){if(delete t[r],u=u||"toggle"===o,o===(m?"hide":"show"))continue;g.push(r)}if(a=g.length){s=st._data(e,"fxshow")||st._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?st(e).show():p.done(function(){st(e).hide()}),p.done(function(){var t;st._removeData(e,"fxshow");for(t in h)st.style(e,t,h[t])});for(r=0;a>r;r++)i=g[r],l=p.createTween(i,m?s[i]:0),h[i]=s[i]||st.style(e,i),i in s||(s[i]=l.start,m&&(l.end=l.start,l.start="width"===i||"height"===i?1:0))}}function $(e,t,n,r,i){return new $.prototype.init(e,t,n,r,i)}function I(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=wn[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function z(e){return st.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var X,U,V=e.document,Y=e.location,J=e.jQuery,G=e.$,Q={},K=[],Z="1.9.0",et=K.concat,tt=K.push,nt=K.slice,rt=K.indexOf,it=Q.toString,ot=Q.hasOwnProperty,at=Z.trim,st=function(e,t){return new st.fn.init(e,t,X)},ut=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,lt=/\S+/g,ct=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ft=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,pt=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,dt=/^[\],:{}\s]*$/,ht=/(?:^|:|,)(?:\s*\[)+/g,gt=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,mt=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,yt=/^-ms-/,vt=/-([\da-z])/gi,bt=function(e,t){return t.toUpperCase()},xt=function(){V.addEventListener?(V.removeEventListener("DOMContentLoaded",xt,!1),st.ready()):"complete"===V.readyState&&(V.detachEvent("onreadystatechange",xt),st.ready())};st.fn=st.prototype={jquery:Z,constructor:st,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:ft.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof st?n[0]:n,st.merge(this,st.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:V,!0)),pt.test(i[1])&&st.isPlainObject(n))for(i in n)st.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=V.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=V,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):st.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),st.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return nt.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=st.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return st.each(this,e,t)},ready:function(e){return st.ready.promise().done(e),this},slice:function(){return this.pushStack(nt.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(st.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:tt,sort:[].sort,splice:[].splice},st.fn.init.prototype=st.fn,st.extend=st.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||st.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(e=arguments[u]))for(n in e)r=s[n],i=e[n],s!==i&&(c&&i&&(st.isPlainObject(i)||(o=st.isArray(i)))?(o?(o=!1,a=r&&st.isArray(r)?r:[]):a=r&&st.isPlainObject(r)?r:{},s[n]=st.extend(c,a,i)):i!==t&&(s[n]=i));return s},st.extend({noConflict:function(t){return e.$===st&&(e.$=G),t&&e.jQuery===st&&(e.jQuery=J),st},isReady:!1,readyWait:1,holdReady:function(e){e?st.readyWait++:st.ready(!0)},ready:function(e){if(e===!0?!--st.readyWait:!st.isReady){if(!V.body)return setTimeout(st.ready);st.isReady=!0,e!==!0&&--st.readyWait>0||(U.resolveWith(V,[st]),st.fn.trigger&&st(V).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===st.type(e)},isArray:Array.isArray||function(e){return"array"===st.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?Q[it.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==st.type(e)||e.nodeType||st.isWindow(e))return!1;try{if(e.constructor&&!ot.call(e,"constructor")&&!ot.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||ot.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||V;var r=pt.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=st.buildFragment([e],t,i),i&&st(i).remove(),st.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=st.trim(n),n&&dt.test(n.replace(gt,"@").replace(mt,"]").replace(ht,"")))?Function("return "+n)():(st.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||st.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&st.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(yt,"ms-").replace(vt,bt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;a>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;a>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:at&&!at.call("\ufeff\u00a0")?function(e){return null==e?"":at.call(e)}:function(e){return null==e?"":(e+"").replace(ct,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?st.merge(r,"string"==typeof e?[e]:e):tt.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(rt)return rt.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else for(;n[o]!==t;)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),u=[];if(s)for(;a>o;o++)i=t(e[o],o,r),null!=i&&(u[u.length]=i);else for(o in e)i=t(e[o],o,r),null!=i&&(u[u.length]=i);return et.apply([],u)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(r=e[n],n=e,e=r),st.isFunction(e)?(i=nt.call(arguments,2),o=function(){return e.apply(n||this,i.concat(nt.call(arguments)))},o.guid=e.guid=e.guid||st.guid++,o):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===st.type(r)){o=!0;for(u in r)st.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,st.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(st(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),st.ready.promise=function(t){if(!U)if(U=st.Deferred(),"complete"===V.readyState)setTimeout(st.ready);else if(V.addEventListener)V.addEventListener("DOMContentLoaded",xt,!1),e.addEventListener("load",st.ready,!1);else{V.attachEvent("onreadystatechange",xt),e.attachEvent("onload",st.ready);var n=!1;try{n=null==e.frameElement&&V.documentElement}catch(r){}n&&n.doScroll&&function i(){if(!st.isReady){try{n.doScroll("left")}catch(e){return setTimeout(i,50)}st.ready()}}()}return U.promise(t)},st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){Q["[object "+t+"]"]=t.toLowerCase()}),X=st(V);var Tt={};st.Callbacks=function(e){e="string"==typeof e?Tt[e]||r(e):st.extend({},e);var n,i,o,a,s,u,l=[],c=!e.once&&[],f=function(t){for(n=e.memory&&t,i=!0,u=a||0,a=0,s=l.length,o=!0;l&&s>u;u++)if(l[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}o=!1,l&&(c?c.length&&f(c.shift()):n?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function r(t){st.each(t,function(t,n){var i=st.type(n);"function"===i?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==i&&r(n)})})(arguments),o?s=l.length:n&&(a=t,f(n))}return this},remove:function(){return l&&st.each(arguments,function(e,t){for(var n;(n=st.inArray(t,l,n))>-1;)l.splice(n,1),o&&(s>=n&&s--,u>=n&&u--)}),this},has:function(e){return st.inArray(e,l)>-1},empty:function(){return l=[],this},disable:function(){return l=c=n=t,this},disabled:function(){return!l},lock:function(){return c=t,n||p.disable(),this},locked:function(){return!c},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!c||(o?c.push(t):f(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},st.extend({Deferred:function(e){var t=[["resolve","done",st.Callbacks("once memory"),"resolved"],["reject","fail",st.Callbacks("once memory"),"rejected"],["notify","progress",st.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return st.Deferred(function(n){st.each(t,function(t,o){var a=o[0],s=st.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&st.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?st.extend(e,r):r}},i={};return r.pipe=r.then,st.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=nt.call(arguments),a=o.length,s=1!==a||e&&st.isFunction(e.promise)?a:0,u=1===s?e:st.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?nt.call(arguments):i,r===t?u.notifyWith(n,r):--s||u.resolveWith(n,r)}};if(a>1)for(t=Array(a),n=Array(a),r=Array(a);a>i;i++)o[i]&&st.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--s;return s||u.resolveWith(r,o),u.promise()}}),st.support=function(){var n,r,i,o,a,s,u,l,c,f,p=V.createElement("div");if(p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=p.getElementsByTagName("*"),i=p.getElementsByTagName("a")[0],!r||!i||!r.length)return{};o=V.createElement("select"),a=o.appendChild(V.createElement("option")),s=p.getElementsByTagName("input")[0],i.style.cssText="top:1px;float:left;opacity:.5",n={getSetAttribute:"t"!==p.className,leadingWhitespace:3===p.firstChild.nodeType,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(i.getAttribute("style")),hrefNormalized:"/a"===i.getAttribute("href"),opacity:/^0.5/.test(i.style.opacity),cssFloat:!!i.style.cssFloat,checkOn:!!s.value,optSelected:a.selected,enctype:!!V.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==V.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===V.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},s.checked=!0,n.noCloneChecked=s.cloneNode(!0).checked,o.disabled=!0,n.optDisabled=!a.disabled;try{delete p.test}catch(d){n.deleteExpando=!1}s=V.createElement("input"),s.setAttribute("value",""),n.input=""===s.getAttribute("value"),s.value="t",s.setAttribute("type","radio"),n.radioValue="t"===s.value,s.setAttribute("checked","t"),s.setAttribute("name","t"),u=V.createDocumentFragment(),u.appendChild(s),n.appendChecked=s.checked,n.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,p.attachEvent&&(p.attachEvent("onclick",function(){n.noCloneEvent=!1}),p.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})p.setAttribute(l="on"+f,"t"),n[f+"Bubbles"]=l in e||p.attributes[l].expando===!1;return p.style.backgroundClip="content-box",p.cloneNode(!0).style.backgroundClip="",n.clearCloneStyle="content-box"===p.style.backgroundClip,st(function(){var r,i,o,a="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",s=V.getElementsByTagName("body")[0];s&&(r=V.createElement("div"),r.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",s.appendChild(r).appendChild(p),p.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=p.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",c=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",n.reliableHiddenOffsets=c&&0===o[0].offsetHeight,p.innerHTML="",p.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",n.boxSizing=4===p.offsetWidth,n.doesNotIncludeMarginInBodyOffset=1!==s.offsetTop,e.getComputedStyle&&(n.pixelPosition="1%"!==(e.getComputedStyle(p,null)||{}).top,n.boxSizingReliable="4px"===(e.getComputedStyle(p,null)||{width:"4px"}).width,i=p.appendChild(V.createElement("div")),i.style.cssText=p.style.cssText=a,i.style.marginRight=i.style.width="0",p.style.width="1px",n.reliableMarginRight=!parseFloat((e.getComputedStyle(i,null)||{}).marginRight)),p.style.zoom!==t&&(p.innerHTML="",p.style.cssText=a+"width:1px;padding:1px;display:inline;zoom:1",n.inlineBlockNeedsLayout=3===p.offsetWidth,p.style.display="block",p.innerHTML="<div></div>",p.firstChild.style.width="5px",n.shrinkWrapBlocks=3!==p.offsetWidth,s.style.zoom=1),s.removeChild(r),r=p=o=i=null)}),r=o=u=a=i=s=null,n}();var wt=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,Nt=/([A-Z])/g;st.extend({cache:{},expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?st.cache[e[st.expando]]:e[st.expando],!!e&&!s(e)},data:function(e,t,n){return i(e,t,n,!1)},removeData:function(e,t){return o(e,t,!1)},_data:function(e,t,n){return i(e,t,n,!0)},_removeData:function(e,t){return o(e,t,!0)},acceptData:function(e){var t=e.nodeName&&st.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),st.fn.extend({data:function(e,n){var r,i,o=this[0],s=0,u=null;if(e===t){if(this.length&&(u=st.data(o),1===o.nodeType&&!st._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>s;s++)i=r[s].name,i.indexOf("data-")||(i=st.camelCase(i.substring(5)),a(o,i,u[i]));st._data(o,"parsedAttrs",!0)}return u}return"object"==typeof e?this.each(function(){st.data(this,e)}):st.access(this,function(n){return n===t?o?a(o,e,st.data(o,e)):null:(this.each(function(){st.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){st.removeData(this,e)})}}),st.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=st._data(e,n),r&&(!i||st.isArray(r)?i=st._data(e,n,st.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=st.queue(e,t),r=n.length,i=n.shift(),o=st._queueHooks(e,t),a=function(){st.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return st._data(e,n)||st._data(e,n,{empty:st.Callbacks("once memory").add(function(){st._removeData(e,t+"queue"),st._removeData(e,n)})})}}),st.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?st.queue(this[0],e):n===t?this:this.each(function(){var t=st.queue(this,e,n);st._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&st.dequeue(this,e)})},dequeue:function(e){return this.each(function(){st.dequeue(this,e)})},delay:function(e,t){return e=st.fx?st.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=st.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};for("string"!=typeof e&&(n=e,e=t),e=e||"fx";s--;)r=st._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var Ct,kt,Et=/[\t\r\n]/g,St=/\r/g,At=/^(?:input|select|textarea|button|object)$/i,jt=/^(?:a|area)$/i,Dt=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,Lt=/^(?:checked|selected)$/i,Ht=st.support.getSetAttribute,Mt=st.support.input;st.fn.extend({attr:function(e,t){return st.access(this,st.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){st.removeAttr(this,e)})},prop:function(e,t){return st.access(this,st.prop,e,t,arguments.length>1)},removeProp:function(e){return e=st.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):" ")){for(o=0;i=t[o++];)0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=st.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");n.className=e?st.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return st.isFunction(e)?this.each(function(n){st(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var i,o=0,a=st(this),s=t,u=e.match(lt)||[];i=u[o++];)s=r?s:!a.hasClass(i),a[s?"addClass":"removeClass"](i);else("undefined"===n||"boolean"===n)&&(this.className&&st._data(this,"__className__",this.className),this.className=this.className||e===!1?"":st._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Et," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=st.isFunction(e),this.each(function(r){var o,a=st(this);1===this.nodeType&&(o=i?e.call(this,r,a.val()):e,null==o?o="":"number"==typeof o?o+="":st.isArray(o)&&(o=st.map(o,function(e){return null==e?"":e+""})),n=st.valHooks[this.type]||st.valHooks[this.nodeName.toLowerCase()],n&&"set"in n&&n.set(this,o,"value")!==t||(this.value=o))});if(o)return n=st.valHooks[o.type]||st.valHooks[o.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(o,"value"))!==t?r:(r=o.value,"string"==typeof r?r.replace(St,""):null==r?"":r)}}}),st.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(st.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&st.nodeName(n.parentNode,"optgroup"))){if(t=st(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=st.makeArray(t);return st(e).find("option").each(function(){this.selected=st.inArray(st(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return e.getAttribute===t?st.prop(e,n,r):(a=1!==s||!st.isXMLDoc(e),a&&(n=n.toLowerCase(),o=st.attrHooks[n]||(Dt.test(n)?kt:Ct)),r===t?o&&a&&"get"in o&&null!==(i=o.get(e,n))?i:(e.getAttribute!==t&&(i=e.getAttribute(n)),null==i?t:i):null!==r?o&&a&&"set"in o&&(i=o.set(e,r,n))!==t?i:(e.setAttribute(n,r+""),r):(st.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(lt);if(o&&1===e.nodeType)for(;n=o[i++];)r=st.propFix[n]||n,Dt.test(n)?!Ht&&Lt.test(n)?e[st.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:st.attr(e,n,""),e.removeAttribute(Ht?n:r)},attrHooks:{type:{set:function(e,t){if(!st.support.radioValue&&"radio"===t&&st.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!st.isXMLDoc(e),a&&(n=st.propFix[n]||n,o=st.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):At.test(e.nodeName)||jt.test(e.nodeName)&&e.href?0:t}}}}),kt={get:function(e,n){var r=st.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?Mt&&Ht?null!=i:Lt.test(n)?e[st.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?st.removeAttr(e,n):Mt&&Ht||!Lt.test(n)?e.setAttribute(!Ht&&st.propFix[n]||n,n):e[st.camelCase("default-"+n)]=e[n]=!0,n}},Mt&&Ht||(st.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return st.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t
},set:function(e,n,r){return st.nodeName(e,"input")?(e.defaultValue=n,t):Ct&&Ct.set(e,n,r)}}),Ht||(Ct=st.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},st.attrHooks.contenteditable={get:Ct.get,set:function(e,t,n){Ct.set(e,""===t?!1:t,n)}},st.each(["width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),st.support.hrefNormalized||(st.each(["href","src","width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),st.each(["href","src"],function(e,t){st.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),st.support.style||(st.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),st.support.optSelected||(st.propHooks.selected=st.extend(st.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),st.support.enctype||(st.propFix.enctype="encoding"),st.support.checkOn||st.each(["radio","checkbox"],function(){st.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),st.each(["radio","checkbox"],function(){st.valHooks[this]=st.extend(st.valHooks[this],{set:function(e,n){return st.isArray(n)?e.checked=st.inArray(st(e).val(),n)>=0:t}})});var qt=/^(?:input|select|textarea)$/i,_t=/^key/,Ft=/^(?:mouse|contextmenu)|click/,Ot=/^(?:focusinfocus|focusoutblur)$/,Bt=/^([^.]*)(?:\.(.+)|)$/;st.event={global:{},add:function(e,n,r,i,o){var a,s,u,l,c,f,p,d,h,g,m,y=3!==e.nodeType&&8!==e.nodeType&&st._data(e);if(y){for(r.handler&&(a=r,r=a.handler,o=a.selector),r.guid||(r.guid=st.guid++),(l=y.events)||(l=y.events={}),(s=y.handle)||(s=y.handle=function(e){return st===t||e&&st.event.triggered===e.type?t:st.event.dispatch.apply(s.elem,arguments)},s.elem=e),n=(n||"").match(lt)||[""],c=n.length;c--;)u=Bt.exec(n[c])||[],h=m=u[1],g=(u[2]||"").split(".").sort(),p=st.event.special[h]||{},h=(o?p.delegateType:p.bindType)||h,p=st.event.special[h]||{},f=st.extend({type:h,origType:m,data:i,handler:r,guid:r.guid,selector:o,needsContext:o&&st.expr.match.needsContext.test(o),namespace:g.join(".")},a),(d=l[h])||(d=l[h]=[],d.delegateCount=0,p.setup&&p.setup.call(e,i,g,s)!==!1||(e.addEventListener?e.addEventListener(h,s,!1):e.attachEvent&&e.attachEvent("on"+h,s))),p.add&&(p.add.call(e,f),f.handler.guid||(f.handler.guid=r.guid)),o?d.splice(d.delegateCount++,0,f):d.push(f),st.event.global[h]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,m=st.hasData(e)&&st._data(e);if(m&&(u=m.events)){for(t=(t||"").match(lt)||[""],l=t.length;l--;)if(s=Bt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=st.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||st.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)st.event.remove(e,d+t[l],n,r,!0);st.isEmptyObject(u)&&(delete m.handle,st._removeData(e,"events"))}},trigger:function(n,r,i,o){var a,s,u,l,c,f,p,d=[i||V],h=n.type||n,g=n.namespace?n.namespace.split("."):[];if(s=u=i=i||V,3!==i.nodeType&&8!==i.nodeType&&!Ot.test(h+st.event.triggered)&&(h.indexOf(".")>=0&&(g=h.split("."),h=g.shift(),g.sort()),c=0>h.indexOf(":")&&"on"+h,n=n[st.expando]?n:new st.Event(h,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=g.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:st.makeArray(r,[n]),p=st.event.special[h]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!st.isWindow(i)){for(l=p.delegateType||h,Ot.test(l+h)||(s=s.parentNode);s;s=s.parentNode)d.push(s),u=s;u===(i.ownerDocument||V)&&d.push(u.defaultView||u.parentWindow||e)}for(a=0;(s=d[a++])&&!n.isPropagationStopped();)n.type=a>1?l:p.bindType||h,f=(st._data(s,"events")||{})[n.type]&&st._data(s,"handle"),f&&f.apply(s,r),f=c&&s[c],f&&st.acceptData(s)&&f.apply&&f.apply(s,r)===!1&&n.preventDefault();if(n.type=h,!(o||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===h&&st.nodeName(i,"a")||!st.acceptData(i)||!c||!i[h]||st.isWindow(i))){u=i[c],u&&(i[c]=null),st.event.triggered=h;try{i[h]()}catch(m){}st.event.triggered=t,u&&(i[c]=u)}return n.result}},dispatch:function(e){e=st.event.fix(e);var n,r,i,o,a,s=[],u=nt.call(arguments),l=(st._data(this,"events")||{})[e.type]||[],c=st.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=st.event.handlers.call(this,e,l),n=0;(o=s[n++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,r=0;(a=o.handlers[r++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(a.namespace))&&(e.handleObj=a,e.data=a.data,i=((st.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u),i!==t&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(i=[],r=0;u>r;r++)a=n[r],o=a.selector+" ",i[o]===t&&(i[o]=a.needsContext?st(o,this).index(l)>=0:st.find(o,this,null,[l]).length),i[o]&&i.push(a);i.length&&s.push({elem:l,handlers:i})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[st.expando])return e;var t,n,r=e,i=st.event.fixHooks[e.type]||{},o=i.props?this.props.concat(i.props):this.props;for(e=new st.Event(r),t=o.length;t--;)n=o[t],e[n]=r[n];return e.target||(e.target=r.srcElement||V),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,i.filter?i.filter(e,r):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,a=n.button,s=n.fromElement;return null==e.pageX&&null!=n.clientX&&(r=e.target.ownerDocument||V,i=r.documentElement,o=r.body,e.pageX=n.clientX+(i&&i.scrollLeft||o&&o.scrollLeft||0)-(i&&i.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(i&&i.scrollTop||o&&o.scrollTop||0)-(i&&i.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?n.toElement:s),e.which||a===t||(e.which=1&a?1:2&a?3:4&a?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return st.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==V.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===V.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=st.extend(new st.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?st.event.trigger(i,null,t):st.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},st.removeEvent=V.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,n,r){var i="on"+n;e.detachEvent&&(e[i]===t&&(e[i]=null),e.detachEvent(i,r))},st.Event=function(e,n){return this instanceof st.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?u:l):this.type=e,n&&st.extend(this,n),this.timeStamp=e&&e.timeStamp||st.now(),this[st.expando]=!0,t):new st.Event(e,n)},st.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u,this.stopPropagation()}},st.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){st.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!st.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),st.support.submitBubbles||(st.event.special.submit={setup:function(){return st.nodeName(this,"form")?!1:(st.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=st.nodeName(n,"input")||st.nodeName(n,"button")?n.form:t;r&&!st._data(r,"submitBubbles")&&(st.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),st._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&st.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return st.nodeName(this,"form")?!1:(st.event.remove(this,"._submit"),t)}}),st.support.changeBubbles||(st.event.special.change={setup:function(){return qt.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(st.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),st.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),st.event.simulate("change",this,e,!0)})),!1):(st.event.add(this,"beforeactivate._change",function(e){var t=e.target;qt.test(t.nodeName)&&!st._data(t,"changeBubbles")&&(st.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||st.event.simulate("change",this.parentNode,e,!0)}),st._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return st.event.remove(this,"._change"),!qt.test(this.nodeName)}}),st.support.focusinBubbles||st.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){st.event.simulate(t,e.target,st.event.fix(e),!0)};st.event.special[t]={setup:function(){0===n++&&V.addEventListener(e,r,!0)},teardown:function(){0===--n&&V.removeEventListener(e,r,!0)}}}),st.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(s in e)this.on(s,n,r,e[s],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=l;else if(!i)return this;return 1===o&&(a=i,i=function(e){return st().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=st.guid++)),this.each(function(){st.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,st(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=l),this.each(function(){st.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){st.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?st.event.trigger(e,n,r,!0):t},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){st.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)},_t.test(t)&&(st.event.fixHooks[t]=st.event.keyHooks),Ft.test(t)&&(st.event.fixHooks[t]=st.event.mouseHooks)}),function(e,t){function n(e){return ht.test(e+"")}function r(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>C.cacheLength&&delete e[t.shift()],e[n]=r}}function i(e){return e[P]=!0,e}function o(e){var t=L.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function a(e,t,n,r){var i,o,a,s,u,l,c,d,h,g;if((t?t.ownerDocument||t:R)!==L&&D(t),t=t||L,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!M&&!r){if(i=gt.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&O(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Q.apply(n,K.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&W.getByClassName&&t.getElementsByClassName)return Q.apply(n,K.call(t.getElementsByClassName(a),0)),n}if(W.qsa&&!q.test(e)){if(c=!0,d=P,h=t,g=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(l=f(e),(c=t.getAttribute("id"))?d=c.replace(vt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=dt.test(e)&&t.parentNode||t,g=l.join(",")}if(g)try{return Q.apply(n,K.call(h.querySelectorAll(g),0)),n}catch(m){}finally{c||t.removeAttribute("id")}}}return x(e.replace(at,"$1"),t,n,r)}function s(e,t){for(var n=e&&t&&e.nextSibling;n;n=n.nextSibling)if(n===t)return-1;return e?1:-1}function u(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return i(function(t){return t=+t,i(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(e,t){var n,r,i,o,s,u,l,c=X[e+" "];if(c)return t?0:c.slice(0);for(s=e,u=[],l=C.preFilter;s;){(!n||(r=ut.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(i=[])),n=!1,(r=lt.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(at," ")}),s=s.slice(n.length));for(o in C.filter)!(r=pt[o].exec(s))||l[o]&&!(r=l[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?a.error(e):X(e,u).slice(0)}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===t.dir,o=I++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,u,l,c=$+" "+o;if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i)if(l=t[P]||(t[P]={}),(u=l[r])&&u[0]===c){if((s=u[1])===!0||s===N)return s===!0}else if(u=l[r]=[c],u[1]=e(t,n,a)||N,u[1]===!0)return!0}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function m(e,t,n,r,o,a){return r&&!r[P]&&(r=m(r)),o&&!o[P]&&(o=m(o,a)),i(function(i,a,s,u){var l,c,f,p=[],d=[],h=a.length,m=i||b(t||"*",s.nodeType?[s]:s,[]),y=!e||!i&&t?m:g(m,p,e,s,u),v=n?o||(i?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r)for(l=g(v,d),r(l,[],s,u),c=l.length;c--;)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f));if(i){if(o||e){if(o){for(l=[],c=v.length;c--;)(f=v[c])&&l.push(y[c]=f);o(null,v=[],l,u)}for(c=v.length;c--;)(f=v[c])&&(l=o?Z.call(i,f):p[c])>-1&&(i[l]=!(a[l]=f))}}else v=g(v===a?v.splice(h,v.length):v),o?o(null,a,v,u):Q.apply(a,v)})}function y(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],a=o||C.relative[" "],s=o?1:0,u=d(function(e){return e===t},a,!0),l=d(function(e){return Z.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>s;s++)if(n=C.relative[e[s].type])c=[d(h(c),n)];else{if(n=C.filter[e[s].type].apply(null,e[s].matches),n[P]){for(r=++s;i>r&&!C.relative[e[r].type];r++);return m(s>1&&h(c),s>1&&p(e.slice(0,s-1)).replace(at,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function v(e,t){var n=0,r=t.length>0,o=e.length>0,s=function(i,s,u,l,c){var f,p,d,h=[],m=0,y="0",v=i&&[],b=null!=c,x=j,T=i||o&&C.find.TAG("*",c&&s.parentNode||s),w=$+=null==x?1:Math.E;for(b&&(j=s!==L&&s,N=n);null!=(f=T[y]);y++){if(o&&f){for(p=0;d=e[p];p++)if(d(f,s,u)){l.push(f);break}b&&($=w,N=++n)}r&&((f=!d&&f)&&m--,i&&v.push(f))}if(m+=y,r&&y!==m){for(p=0;d=t[p];p++)d(v,h,s,u);if(i){if(m>0)for(;y--;)v[y]||h[y]||(h[y]=G.call(l));h=g(h)}Q.apply(l,h),b&&!i&&h.length>0&&m+t.length>1&&a.uniqueSort(l)}return b&&($=w,j=x),v};return r?i(s):s}function b(e,t,n){for(var r=0,i=t.length;i>r;r++)a(e,t[r],n);return n}function x(e,t,n,r){var i,o,a,s,u,l=f(e);if(!r&&1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&!M&&C.relative[o[1].type]){if(t=C.find.ID(a.matches[0].replace(xt,Tt),t)[0],!t)return n;e=e.slice(o.shift().value.length)}for(i=pt.needsContext.test(e)?-1:o.length-1;i>=0&&(a=o[i],!C.relative[s=a.type]);i--)if((u=C.find[s])&&(r=u(a.matches[0].replace(xt,Tt),dt.test(o[0].type)&&t.parentNode||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return Q.apply(n,K.call(r,0)),n;break}}return S(e,l)(r,t,M,n,dt.test(e)),n}function T(){}var w,N,C,k,E,S,A,j,D,L,H,M,q,_,F,O,B,P="sizzle"+-new Date,R=e.document,W={},$=0,I=0,z=r(),X=r(),U=r(),V=typeof t,Y=1<<31,J=[],G=J.pop,Q=J.push,K=J.slice,Z=J.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},et="[\\x20\\t\\r\\n\\f]",tt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",nt=tt.replace("w","w#"),rt="([*^$|!~]?=)",it="\\["+et+"*("+tt+")"+et+"*(?:"+rt+et+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+nt+")|)|)"+et+"*\\]",ot=":("+tt+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+it.replace(3,8)+")*)|.*)\\)|)",at=RegExp("^"+et+"+|((?:^|[^\\\\])(?:\\\\.)*)"+et+"+$","g"),ut=RegExp("^"+et+"*,"+et+"*"),lt=RegExp("^"+et+"*([\\x20\\t\\r\\n\\f>+~])"+et+"*"),ct=RegExp(ot),ft=RegExp("^"+nt+"$"),pt={ID:RegExp("^#("+tt+")"),CLASS:RegExp("^\\.("+tt+")"),NAME:RegExp("^\\[name=['\"]?("+tt+")['\"]?\\]"),TAG:RegExp("^("+tt.replace("w","w*")+")"),ATTR:RegExp("^"+it),PSEUDO:RegExp("^"+ot),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+et+"*(even|odd|(([+-]|)(\\d*)n|)"+et+"*(?:([+-]|)"+et+"*(\\d+)|))"+et+"*\\)|)","i"),needsContext:RegExp("^"+et+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+et+"*((?:-\\d)?\\d*)"+et+"*\\)|)(?=[^-]|$)","i")},dt=/[\x20\t\r\n\f]*[+~]/,ht=/\{\s*\[native code\]\s*\}/,gt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,mt=/^(?:input|select|textarea|button)$/i,yt=/^h\d$/i,vt=/'|\\/g,bt=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,xt=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,Tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{K.call(H.childNodes,0)[0].nodeType}catch(wt){K=function(e){for(var t,n=[];t=this[e];e++)n.push(t);return n}}E=a.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},D=a.setDocument=function(e){var r=e?e.ownerDocument||e:R;return r!==L&&9===r.nodeType&&r.documentElement?(L=r,H=r.documentElement,M=E(r),W.tagNameNoComments=o(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),W.attributes=o(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),W.getByClassName=o(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),W.getByName=o(function(e){e.id=P+0,e.innerHTML="<a name='"+P+"'></a><div name='"+P+"'></div>",H.insertBefore(e,H.firstChild);var t=r.getElementsByName&&r.getElementsByName(P).length===2+r.getElementsByName(P+0).length;return W.getIdNotName=!r.getElementById(P),H.removeChild(e),t}),C.attrHandle=o(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==V&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},W.getIdNotName?(C.find.ID=function(e,t){if(typeof t.getElementById!==V&&!M){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){return e.getAttribute("id")===t}}):(C.find.ID=function(e,n){if(typeof n.getElementById!==V&&!M){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==V&&r.getAttributeNode("id").value===e?[r]:t:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=W.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==V?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i];i++)1===n.nodeType&&r.push(n);return r}return o},C.find.NAME=W.getByName&&function(e,n){return typeof n.getElementsByName!==V?n.getElementsByName(name):t},C.find.CLASS=W.getByClassName&&function(e,n){return typeof n.getElementsByClassName===V||M?t:n.getElementsByClassName(e)},_=[],q=[":focus"],(W.qsa=n(r.querySelectorAll))&&(o(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||q.push("\\["+et+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||q.push(":checked")}),o(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&q.push("[*^$]="+et+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),q.push(",.*:")})),(W.matchesSelector=n(F=H.matchesSelector||H.mozMatchesSelector||H.webkitMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&o(function(e){W.disconnectedMatch=F.call(e,"div"),F.call(e,"[s!='']:x"),_.push("!=",ot)}),q=RegExp(q.join("|")),_=RegExp(_.join("|")),O=n(H.contains)||H.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},B=H.compareDocumentPosition?function(e,t){var n;return e===t?(A=!0,0):(n=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&n||e.parentNode&&11===e.parentNode.nodeType?e===r||O(R,e)?-1:t===r||O(R,t)?1:0:4&n?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var n,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(e===t)return A=!0,0;if(e.sourceIndex&&t.sourceIndex)return(~t.sourceIndex||Y)-(O(R,e)&&~e.sourceIndex||Y);if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===R?-1:l[i]===R?1:0},A=!1,[0,0].sort(B),W.detectDuplicates=A,L):L},a.matches=function(e,t){return a(e,null,null,t)},a.matchesSelector=function(e,t){if((e.ownerDocument||e)!==L&&D(e),t=t.replace(bt,"='$1']"),!(!W.matchesSelector||M||_&&_.test(t)||q.test(t)))try{var n=F.call(e,t);if(n||W.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return a(t,L,null,[e]).length>0},a.contains=function(e,t){return(e.ownerDocument||e)!==L&&D(e),O(e,t)},a.attr=function(e,t){var n;return(e.ownerDocument||e)!==L&&D(e),M||(t=t.toLowerCase()),(n=C.attrHandle[t])?n(e):M||W.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},a.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},a.uniqueSort=function(e){var t,n=[],r=1,i=0;if(A=!W.detectDuplicates,e.sort(B),A){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return e},k=a.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=k(t);return n},C=a.selectors={cacheLength:50,createPseudo:i,match:pt,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xt,Tt),e[3]=(e[4]||e[5]||"").replace(xt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||a.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&a.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return pt.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&ct.test(n)&&(t=f(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(xt,Tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=z[e+" "];return t||(t=RegExp("(^|"+et+")"+e+"("+et+"|$)"))&&z(e,function(e){return t.test(e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=a.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.substr(i.length-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){for(c=m[P]||(m[P]={}),l=c[e]||[],d=l[0]===$&&l[1],p=l[0]===$&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[$,d,p];break}}else if(v&&(l=(t[P]||(t[P]={}))[e])&&l[0]===$)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++p||(v&&((f[P]||(f[P]={}))[e]=[$,p]),f!==t)););return p-=i,p===r||0===p%r&&p/r>=0}}},PSEUDO:function(e,t){var n,r=C.pseudos[e]||C.setFilters[e.toLowerCase()]||a.error("unsupported pseudo: "+e);return r[P]?r(t):r.length>1?(n=[e,e,"",t],C.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,n){for(var i,o=r(e,t),a=o.length;a--;)i=Z.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:i(function(e){var t=[],n=[],r=S(e.replace(at,"$1"));return r[P]?i(function(e,t,n,i){for(var o,a=r(e,null,i,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:i(function(e){return function(t){return a(e,t).length>0}}),contains:i(function(e){return function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:i(function(e){return ft.test(e||"")||a.error("unsupported lang: "+e),e=e.replace(xt,Tt).toLowerCase(),function(t){var n;do if(n=M?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===L.activeElement&&(!L.hasFocus||L.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return yt.test(e.nodeName)},input:function(e){return mt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;t>++r;)e.push(r);return e})}};for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=u(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);S=a.compile=function(e,t){var n,r=[],i=[],o=U[e+" "];if(!o){for(t||(t=f(e)),n=t.length;n--;)o=y(t[n]),o[P]?r.push(o):i.push(o);o=U(e,v(i,r))}return o},C.pseudos.nth=C.pseudos.eq,C.filters=T.prototype=C.pseudos,C.setFilters=new T,D(),a.attr=st.attr,st.find=a,st.expr=a.selectors,st.expr[":"]=st.expr.pseudos,st.unique=a.uniqueSort,st.text=a.getText,st.isXMLDoc=a.isXML,st.contains=a.contains}(e);var Pt=/Until$/,Rt=/^(?:parents|prev(?:Until|All))/,Wt=/^.[^:#\[\.,]*$/,$t=st.expr.match.needsContext,It={children:!0,contents:!0,next:!0,prev:!0};st.fn.extend({find:function(e){var t,n,r;if("string"!=typeof e)return r=this,this.pushStack(st(e).filter(function(){for(t=0;r.length>t;t++)if(st.contains(r[t],this))return!0}));for(n=[],t=0;this.length>t;t++)st.find(e,this[t],n);return n=this.pushStack(st.unique(n)),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=st(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(st.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(f(this,e,!1))},filter:function(e){return this.pushStack(f(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?$t.test(e)?st(e,this.context).index(this[0])>=0:st.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=$t.test(e)||"string"!=typeof e?st(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n.ownerDocument&&n!==t&&11!==n.nodeType;){if(a?a.index(n)>-1:st.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}return this.pushStack(o.length>1?st.unique(o):o)},index:function(e){return e?"string"==typeof e?st.inArray(this[0],st(e)):st.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?st(e,t):st.makeArray(e&&e.nodeType?[e]:e),r=st.merge(this.get(),n);return this.pushStack(st.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),st.fn.andSelf=st.fn.addBack,st.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return st.dir(e,"parentNode")},parentsUntil:function(e,t,n){return st.dir(e,"parentNode",n)},next:function(e){return c(e,"nextSibling")},prev:function(e){return c(e,"previousSibling")
},nextAll:function(e){return st.dir(e,"nextSibling")},prevAll:function(e){return st.dir(e,"previousSibling")},nextUntil:function(e,t,n){return st.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return st.dir(e,"previousSibling",n)},siblings:function(e){return st.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return st.sibling(e.firstChild)},contents:function(e){return st.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:st.merge([],e.childNodes)}},function(e,t){st.fn[e]=function(n,r){var i=st.map(this,t,n);return Pt.test(e)||(r=n),r&&"string"==typeof r&&(i=st.filter(r,i)),i=this.length>1&&!It[e]?st.unique(i):i,this.length>1&&Rt.test(e)&&(i=i.reverse()),this.pushStack(i)}}),st.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?st.find.matchesSelector(t[0],e)?[t[0]]:[]:st.find.matches(e,t)},dir:function(e,n,r){for(var i=[],o=e[n];o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!st(o).is(r));)1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});var zt="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Xt=/ jQuery\d+="(?:null|\d+)"/g,Ut=RegExp("<(?:"+zt+")[\\s/>]","i"),Vt=/^\s+/,Yt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Jt=/<([\w:]+)/,Gt=/<tbody/i,Qt=/<|&#?\w+;/,Kt=/<(?:script|style|link)/i,Zt=/^(?:checkbox|radio)$/i,en=/checked\s*(?:[^=]|=\s*.checked.)/i,tn=/^$|\/(?:java|ecma)script/i,nn=/^true\/(.*)/,rn=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,on={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:st.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},an=p(V),sn=an.appendChild(V.createElement("div"));on.optgroup=on.option,on.tbody=on.tfoot=on.colgroup=on.caption=on.thead,on.th=on.td,st.fn.extend({text:function(e){return st.access(this,function(e){return e===t?st.text(this):this.empty().append((this[0]&&this[0].ownerDocument||V).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(st.isFunction(e))return this.each(function(t){st(this).wrapAll(e.call(this,t))});if(this[0]){var t=st(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return st.isFunction(e)?this.each(function(t){st(this).wrapInner(e.call(this,t))}):this.each(function(){var t=st(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=st.isFunction(e);return this.each(function(n){st(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){st.nodeName(this,"body")||st(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=0;null!=(n=this[r]);r++)(!e||st.filter(e,[n]).length>0)&&(t||1!==n.nodeType||st.cleanData(b(n)),n.parentNode&&(t&&st.contains(n.ownerDocument,n)&&m(b(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&st.cleanData(b(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&st.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return st.clone(this,e,t)})},html:function(e){return st.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(Xt,""):t;if(!("string"!=typeof e||Kt.test(e)||!st.support.htmlSerialize&&Ut.test(e)||!st.support.leadingWhitespace&&Vt.test(e)||on[(Jt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(Yt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(st.cleanData(b(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=st.isFunction(e);return t||"string"==typeof e||(e=st(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;(n&&1===this.nodeType||11===this.nodeType)&&(st(this).remove(),t?t.parentNode.insertBefore(e,t):n.appendChild(e))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=et.apply([],e);var i,o,a,s,u,l,c=0,f=this.length,p=this,m=f-1,y=e[0],v=st.isFunction(y);if(v||!(1>=f||"string"!=typeof y||st.support.checkClone)&&en.test(y))return this.each(function(i){var o=p.eq(i);v&&(e[0]=y.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(f&&(i=st.buildFragment(e,this[0].ownerDocument,!1,this),o=i.firstChild,1===i.childNodes.length&&(i=o),o)){for(n=n&&st.nodeName(o,"tr"),a=st.map(b(i,"script"),h),s=a.length;f>c;c++)u=i,c!==m&&(u=st.clone(u,!0,!0),s&&st.merge(a,b(u,"script"))),r.call(n&&st.nodeName(this[c],"table")?d(this[c],"tbody"):this[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,st.map(a,g),c=0;s>c;c++)u=a[c],tn.test(u.type||"")&&!st._data(u,"globalEval")&&st.contains(l,u)&&(u.src?st.ajax({url:u.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):st.globalEval((u.text||u.textContent||u.innerHTML||"").replace(rn,"")));i=o=null}return this}}),st.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){st.fn[e]=function(e){for(var n,r=0,i=[],o=st(e),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),st(o[r])[t](n),tt.apply(i,n.get());return this.pushStack(i)}}),st.extend({clone:function(e,t,n){var r,i,o,a,s,u=st.contains(e.ownerDocument,e);if(st.support.html5Clone||st.isXMLDoc(e)||!Ut.test("<"+e.nodeName+">")?s=e.cloneNode(!0):(sn.innerHTML=e.outerHTML,sn.removeChild(s=sn.firstChild)),!(st.support.noCloneEvent&&st.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||st.isXMLDoc(e)))for(r=b(s),i=b(e),a=0;null!=(o=i[a]);++a)r[a]&&v(o,r[a]);if(t)if(n)for(i=i||b(e),r=r||b(s),a=0;null!=(o=i[a]);a++)y(o,r[a]);else y(e,s);return r=b(s,"script"),r.length>0&&m(r,!u&&b(e,"script")),r=i=o=null,s},buildFragment:function(e,t,n,r){for(var i,o,a,s,u,l,c,f=e.length,d=p(t),h=[],g=0;f>g;g++)if(o=e[g],o||0===o)if("object"===st.type(o))st.merge(h,o.nodeType?[o]:o);else if(Qt.test(o)){for(s=s||d.appendChild(t.createElement("div")),a=(Jt.exec(o)||["",""])[1].toLowerCase(),u=on[a]||on._default,s.innerHTML=u[1]+o.replace(Yt,"<$1></$2>")+u[2],c=u[0];c--;)s=s.lastChild;if(!st.support.leadingWhitespace&&Vt.test(o)&&h.push(t.createTextNode(Vt.exec(o)[0])),!st.support.tbody)for(o="table"!==a||Gt.test(o)?"<table>"!==u[1]||Gt.test(o)?0:s:s.firstChild,c=o&&o.childNodes.length;c--;)st.nodeName(l=o.childNodes[c],"tbody")&&!l.childNodes.length&&o.removeChild(l);for(st.merge(h,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=d.lastChild}else h.push(t.createTextNode(o));for(s&&d.removeChild(s),st.support.appendChecked||st.grep(b(h,"input"),x),g=0;o=h[g++];)if((!r||-1===st.inArray(o,r))&&(i=st.contains(o.ownerDocument,o),s=b(d.appendChild(o),"script"),i&&m(s),n))for(c=0;o=s[c++];)tn.test(o.type||"")&&n.push(o);return s=null,d},cleanData:function(e,n){for(var r,i,o,a,s=0,u=st.expando,l=st.cache,c=st.support.deleteExpando,f=st.event.special;null!=(o=e[s]);s++)if((n||st.acceptData(o))&&(i=o[u],r=i&&l[i])){if(r.events)for(a in r.events)f[a]?st.event.remove(o,a):st.removeEvent(o,a,r.handle);l[i]&&(delete l[i],c?delete o[u]:o.removeAttribute!==t?o.removeAttribute(u):o[u]=null,K.push(i))}}});var un,ln,cn,fn=/alpha\([^)]*\)/i,pn=/opacity\s*=\s*([^)]*)/,dn=/^(top|right|bottom|left)$/,hn=/^(none|table(?!-c[ea]).+)/,gn=/^margin/,mn=RegExp("^("+ut+")(.*)$","i"),yn=RegExp("^("+ut+")(?!px)[a-z%]+$","i"),vn=RegExp("^([+-])=("+ut+")","i"),bn={BODY:"block"},xn={position:"absolute",visibility:"hidden",display:"block"},Tn={letterSpacing:0,fontWeight:400},wn=["Top","Right","Bottom","Left"],Nn=["Webkit","O","Moz","ms"];st.fn.extend({css:function(e,n){return st.access(this,function(e,n,r){var i,o,a={},s=0;if(st.isArray(n)){for(i=ln(e),o=n.length;o>s;s++)a[n[s]]=st.css(e,n[s],!1,i);return a}return r!==t?st.style(e,n,r):st.css(e,n)},e,n,arguments.length>1)},show:function(){return N(this,!0)},hide:function(){return N(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:w(this))?st(this).show():st(this).hide()})}}),st.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=un(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":st.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=st.camelCase(n),l=e.style;if(n=st.cssProps[u]||(st.cssProps[u]=T(l,u)),s=st.cssHooks[n]||st.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=vn.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(st.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||st.cssNumber[u]||(r+="px"),st.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=st.camelCase(n);return n=st.cssProps[u]||(st.cssProps[u]=T(e.style,u)),s=st.cssHooks[n]||st.cssHooks[u],s&&"get"in s&&(o=s.get(e,!0,r)),o===t&&(o=un(e,n,i)),"normal"===o&&n in Tn&&(o=Tn[n]),r?(a=parseFloat(o),r===!0||st.isNumeric(a)?a||0:o):o},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(ln=function(t){return e.getComputedStyle(t,null)},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||st.contains(e.ownerDocument,e)||(u=st.style(e,n)),yn.test(u)&&gn.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):V.documentElement.currentStyle&&(ln=function(e){return e.currentStyle},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),yn.test(u)&&!dn.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u}),st.each(["height","width"],function(e,n){st.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&hn.test(st.css(e,"display"))?st.swap(e,xn,function(){return E(e,n,i)}):E(e,n,i):t},set:function(e,t,r){var i=r&&ln(e);return C(e,t,r?k(e,n,r,st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,i),i):0)}}}),st.support.opacity||(st.cssHooks.opacity={get:function(e,t){return pn.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=st.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===st.trim(o.replace(fn,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=fn.test(o)?o.replace(fn,i):o+" "+i)}}),st(function(){st.support.reliableMarginRight||(st.cssHooks.marginRight={get:function(e,n){return n?st.swap(e,{display:"inline-block"},un,[e,"marginRight"]):t}}),!st.support.pixelPosition&&st.fn.position&&st.each(["top","left"],function(e,n){st.cssHooks[n]={get:function(e,r){return r?(r=un(e,n),yn.test(r)?st(e).position()[n]+"px":r):t}}})}),st.expr&&st.expr.filters&&(st.expr.filters.hidden=function(e){return 0===e.offsetWidth&&0===e.offsetHeight||!st.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||st.css(e,"display"))},st.expr.filters.visible=function(e){return!st.expr.filters.hidden(e)}),st.each({margin:"",padding:"",border:"Width"},function(e,t){st.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+wn[r]+t]=o[r]||o[r-2]||o[0];return i}},gn.test(e)||(st.cssHooks[e+t].set=C)});var Cn=/%20/g,kn=/\[\]$/,En=/\r?\n/g,Sn=/^(?:submit|button|image|reset)$/i,An=/^(?:input|select|textarea|keygen)/i;st.fn.extend({serialize:function(){return st.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=st.prop(this,"elements");return e?st.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!st(this).is(":disabled")&&An.test(this.nodeName)&&!Sn.test(e)&&(this.checked||!Zt.test(e))}).map(function(e,t){var n=st(this).val();return null==n?null:st.isArray(n)?st.map(n,function(e){return{name:t.name,value:e.replace(En,"\r\n")}}):{name:t.name,value:n.replace(En,"\r\n")}}).get()}}),st.param=function(e,n){var r,i=[],o=function(e,t){t=st.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=st.ajaxSettings&&st.ajaxSettings.traditional),st.isArray(e)||e.jquery&&!st.isPlainObject(e))st.each(e,function(){o(this.name,this.value)});else for(r in e)j(r,e[r],n,o);return i.join("&").replace(Cn,"+")};var jn,Dn,Ln=st.now(),Hn=/\?/,Mn=/#.*$/,qn=/([?&])_=[^&]*/,_n=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Fn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,On=/^(?:GET|HEAD)$/,Bn=/^\/\//,Pn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Rn=st.fn.load,Wn={},$n={},In="*/".concat("*");try{Dn=Y.href}catch(zn){Dn=V.createElement("a"),Dn.href="",Dn=Dn.href}jn=Pn.exec(Dn.toLowerCase())||[],st.fn.load=function(e,n,r){if("string"!=typeof e&&Rn)return Rn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),st.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(o="POST"),s.length>0&&st.ajax({url:e,type:o,dataType:"html",data:n}).done(function(e){a=arguments,s.html(i?st("<div>").append(st.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,a||[e.responseText,t,e])}),this},st.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){st.fn[t]=function(e){return this.on(t,e)}}),st.each(["get","post"],function(e,n){st[n]=function(e,r,i,o){return st.isFunction(r)&&(o=o||i,i=r,r=t),st.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),st.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Dn,type:"GET",isLocal:Fn.test(jn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":In,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":st.parseJSON,"text xml":st.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?H(H(e,st.ajaxSettings),t):H(st.ajaxSettings,e)},ajaxPrefilter:D(Wn),ajaxTransport:D($n),ajax:function(e,n){function r(e,n,r,s){var l,f,v,b,T,N=n;2!==x&&(x=2,u&&clearTimeout(u),i=t,a=s||"",w.readyState=e>0?4:0,r&&(b=M(p,w,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=w.getResponseHeader("Last-Modified"),T&&(st.lastModified[o]=T),T=w.getResponseHeader("etag"),T&&(st.etag[o]=T)),304===e?(l=!0,N="notmodified"):(l=q(p,b),N=l.state,f=l.data,v=l.error,l=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),w.status=e,w.statusText=(n||N)+"",l?g.resolveWith(d,[f,N,w]):g.rejectWith(d,[w,N,v]),w.statusCode(y),y=t,c&&h.trigger(l?"ajaxSuccess":"ajaxError",[w,p,l?f:v]),m.fireWith(d,[w,N]),c&&(h.trigger("ajaxComplete",[w,p]),--st.active||st.event.trigger("ajaxStop")))}"object"==typeof e&&(n=e,e=t),n=n||{};var i,o,a,s,u,l,c,f,p=st.ajaxSetup({},n),d=p.context||p,h=p.context&&(d.nodeType||d.jquery)?st(d):st.event,g=st.Deferred(),m=st.Callbacks("once memory"),y=p.statusCode||{},v={},b={},x=0,T="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=_n.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=b[n]=b[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)y[t]=[y[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||T;return i&&i.abort(t),r(0,t),this}};if(g.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,p.url=((e||p.url||Dn)+"").replace(Mn,"").replace(Bn,jn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=st.trim(p.dataType||"*").toLowerCase().match(lt)||[""],null==p.crossDomain&&(l=Pn.exec(p.url.toLowerCase()),p.crossDomain=!(!l||l[1]===jn[1]&&l[2]===jn[2]&&(l[3]||("http:"===l[1]?80:443))==(jn[3]||("http:"===jn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=st.param(p.data,p.traditional)),L(Wn,p,n,w),2===x)return w;c=p.global,c&&0===st.active++&&st.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!On.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(Hn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=qn.test(o)?o.replace(qn,"$1_="+Ln++):o+(Hn.test(o)?"&":"?")+"_="+Ln++)),p.ifModified&&(st.lastModified[o]&&w.setRequestHeader("If-Modified-Since",st.lastModified[o]),st.etag[o]&&w.setRequestHeader("If-None-Match",st.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&w.setRequestHeader("Content-Type",p.contentType),w.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+In+"; q=0.01":""):p.accepts["*"]);for(f in p.headers)w.setRequestHeader(f,p.headers[f]);if(p.beforeSend&&(p.beforeSend.call(d,w,p)===!1||2===x))return w.abort();T="abort";for(f in{success:1,error:1,complete:1})w[f](p[f]);if(i=L($n,p,n,w)){w.readyState=1,c&&h.trigger("ajaxSend",[w,p]),p.async&&p.timeout>0&&(u=setTimeout(function(){w.abort("timeout")},p.timeout));try{x=1,i.send(v,r)}catch(N){if(!(2>x))throw N;r(-1,N)}}else r(-1,"No Transport");return w},getScript:function(e,n){return st.get(e,t,n,"script")},getJSON:function(e,t,n){return st.get(e,t,n,"json")}}),st.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return st.globalEval(e),e}}}),st.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),st.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=V.head||st("head")[0]||V.documentElement;return{send:function(t,i){n=V.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Xn=[],Un=/(=)\?(?=&|$)|\?\?/;st.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xn.pop()||st.expando+"_"+Ln++;return this[e]=!0,e}}),st.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Un.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Un.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=st.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Un,"$1"+o):n.jsonp!==!1&&(n.url+=(Hn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||st.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Xn.push(o)),s&&st.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Vn,Yn,Jn=0,Gn=e.ActiveXObject&&function(){var e;for(e in Vn)Vn[e](t,!0)};st.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&_()||F()}:_,Yn=st.ajaxSettings.xhr(),st.support.cors=!!Yn&&"withCredentials"in Yn,Yn=st.support.ajax=!!Yn,Yn&&st.ajaxTransport(function(n){if(!n.crossDomain||st.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,f,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=st.noop,Gn&&delete Vn[a]),i)4!==u.readyState&&u.abort();else{f={},s=u.status,p=u.responseXML,c=u.getAllResponseHeaders(),p&&p.documentElement&&(f.xml=p),"string"==typeof u.responseText&&(f.text=u.responseText);try{l=u.statusText}catch(d){l=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=f.text?200:404}}catch(h){i||o(-1,h)}f&&o(s,l,f,c)},n.async?4===u.readyState?setTimeout(r):(a=++Jn,Gn&&(Vn||(Vn={},st(e).unload(Gn)),Vn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Qn,Kn,Zn=/^(?:toggle|show|hide)$/,er=RegExp("^(?:([+-])=|)("+ut+")([a-z%]*)$","i"),tr=/queueHooks$/,nr=[W],rr={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=er.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(st.cssNumber[e]?"":"px"),"px"!==r&&s){s=st.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,st.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};st.Animation=st.extend(P,{tweener:function(e,t){st.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],rr[n]=rr[n]||[],rr[n].unshift(t)},prefilter:function(e,t){t?nr.unshift(e):nr.push(e)}}),st.Tween=$,$.prototype={constructor:$,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(st.cssNumber[n]?"":"px")},cur:function(){var e=$.propHooks[this.prop];return e&&e.get?e.get(this):$.propHooks._default.get(this)},run:function(e){var t,n=$.propHooks[this.prop];return this.pos=t=this.options.duration?st.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):$.propHooks._default.set(this),this}},$.prototype.init.prototype=$.prototype,$.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=st.css(e.elem,e.prop,"auto"),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){st.fx.step[e.prop]?st.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[st.cssProps[e.prop]]||st.cssHooks[e.prop])?st.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},$.propHooks.scrollTop=$.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},st.each(["toggle","show","hide"],function(e,t){var n=st.fn[t];st.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(I(t,!0),e,r,i)}}),st.fn.extend({fadeTo:function(e,t,n,r){return this.filter(w).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=st.isEmptyObject(e),o=st.speed(t,n,r),a=function(){var t=P(this,st.extend({},e),o);a.finish=function(){t.stop(!0)},(i||st._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=st.timers,a=st._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&tr.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&st.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=st._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=st.timers,a=r?r.length:0;for(n.finish=!0,st.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),st.each({slideDown:I("show"),slideUp:I("hide"),slideToggle:I("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){st.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),st.speed=function(e,t,n){var r=e&&"object"==typeof e?st.extend({},e):{complete:n||!n&&t||st.isFunction(e)&&e,duration:e,easing:n&&t||t&&!st.isFunction(t)&&t};return r.duration=st.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in st.fx.speeds?st.fx.speeds[r.duration]:st.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){st.isFunction(r.old)&&r.old.call(this),r.queue&&st.dequeue(this,r.queue)},r},st.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},st.timers=[],st.fx=$.prototype.init,st.fx.tick=function(){var e,n=st.timers,r=0;for(Qn=st.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||st.fx.stop(),Qn=t},st.fx.timer=function(e){e()&&st.timers.push(e)&&st.fx.start()},st.fx.interval=13,st.fx.start=function(){Kn||(Kn=setInterval(st.fx.tick,st.fx.interval))},st.fx.stop=function(){clearInterval(Kn),Kn=null},st.fx.speeds={slow:600,fast:200,_default:400},st.fx.step={},st.expr&&st.expr.filters&&(st.expr.filters.animated=function(e){return st.grep(st.timers,function(t){return e===t.elem}).length}),st.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){st.offset.setOffset(this,e,t)});var n,r,i={top:0,left:0},o=this[0],a=o&&o.ownerDocument;if(a)return n=a.documentElement,st.contains(n,o)?(o.getBoundingClientRect!==t&&(i=o.getBoundingClientRect()),r=z(a),{top:i.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:i.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):i},st.offset={setOffset:function(e,t,n){var r=st.css(e,"position");"static"===r&&(e.style.position="relative");var i,o,a=st(e),s=a.offset(),u=st.css(e,"top"),l=st.css(e,"left"),c=("absolute"===r||"fixed"===r)&&st.inArray("auto",[u,l])>-1,f={},p={};c?(p=a.position(),i=p.top,o=p.left):(i=parseFloat(u)||0,o=parseFloat(l)||0),st.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(f.top=t.top-s.top+i),null!=t.left&&(f.left=t.left-s.left+o),"using"in t?t.using.call(e,f):a.css(f)}},st.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===st.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),st.nodeName(e[0],"html")||(n=e.offset()),n.top+=st.css(e[0],"borderTopWidth",!0),n.left+=st.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-st.css(r,"marginTop",!0),left:t.left-n.left-st.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||V.documentElement;e&&!st.nodeName(e,"html")&&"static"===st.css(e,"position");)e=e.offsetParent;return e||V.documentElement})}}),st.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);st.fn[e]=function(i){return st.access(this,function(e,i,o){var a=z(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?st(a).scrollLeft():o,r?o:st(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}}),st.each({Height:"height",Width:"width"},function(e,n){st.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){st.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return st.access(this,function(n,r,i){var o;return st.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?st.css(n,r,s):st.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=st,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return st})})(window);
}});

require("secretarius");