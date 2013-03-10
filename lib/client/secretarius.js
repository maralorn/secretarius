;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/msg.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('<span>');
var __val__ = msg
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],2:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/upload.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('Upload new ' + escape((interp = name) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n<form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n  <input type="file"/>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('Cancel');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('Upload ' + escape((interp = name) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],3:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/timepicker.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<div class="front">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('Set ' + escape((interp = name) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<span>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push(' ');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
 if (name != '')	{
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('' + escape((interp = name) == null ? '' : interp) + ':');
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
 }
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('<span class="reltime">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('\n    <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('Change');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('\n<div class="back">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('\n  <form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('\n    <input name="day" size="2"/>');
__jade.shift();
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('.');
__jade.shift();
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
buf.push('\n    <input name="month" size="2"/>');
__jade.shift();
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('.');
__jade.shift();
__jade.unshift({ lineno: 15, filename: __jade[0].filename });
buf.push('\n    <input name="year" size="4"/>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('&nbsp;&nbsp;&nbsp;');
__jade.shift();
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('\n    <input name="hour" size="2"/>');
__jade.shift();
__jade.unshift({ lineno: 18, filename: __jade[0].filename });
buf.push(':');
__jade.shift();
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('\n    <input name="minute" size="2"/>');
__jade.shift();
__jade.unshift({ lineno: 20, filename: __jade[0].filename });
buf.push(':');
__jade.shift();
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('\n    <input name="second" size="2"/>');
__jade.shift();
__jade.shift();
buf.push('\n  </form>');
__jade.shift();
__jade.unshift({ lineno: 22, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 22, filename: __jade[0].filename });
buf.push('Abort');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 23, filename: __jade[0].filename });
buf.push('\n  <button name="delete">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 23, filename: __jade[0].filename });
buf.push('Delete ' + escape((interp = name) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
buf.push('\n  <button name="save">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 24, filename: __jade[0].filename });
buf.push('Save ' + escape((interp = name) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],4:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/infobutton.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<span>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<span class="label">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
 if (del) {
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('x');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
 }
__jade.shift();
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],5:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/asaplistcreator.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<h2>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('New ToDo List');
__jade.shift();
__jade.shift();
buf.push('</h2>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<form name="list">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n  <input name="list"/>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <button type="submit">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('New ToDo List');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],6:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/notecreator.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<h2>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('New Note');
__jade.shift();
__jade.shift();
buf.push('</h2>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<form name="note">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n  <input name="note"/>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <button type="submit">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('New Note');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],7:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/asapcreator.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n  <input name="asap"/>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
 if (list) {
{
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('List:');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<span class="listsel">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
 } if (project) {
{
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('Project:');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('<span class="projectsel">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
 }
__jade.shift();
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('Create ToDo');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],8:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/projectcreator.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n  <input name="project"/>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
 if (parent) {
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('Parent:');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<span class="parentpicker">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
 }
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('Create Project');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],9:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var AsapCreator, AsapListCreator, AsapListsList, DropArea, Emitter, Flippable, InfoClassListManager, InfoClassPicker, InfoList, InfoListManager, ListManager, ListPicker, NoteCreator, ProjectCreator, ProjectPicker, ReferenceList, Slot, SlotGenerator, TimePicker, Uploader, View, WindowSlotGenerator, createInfoButton, defaultTo, _this = this, __hasProp = {

  }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child;
  }, __indexOf = ([].indexOf || function(item) { for (var i = 0, l = this.length; (i < l); i++) { if (((i in this) && (this[i] === item))) { return i }; }; return -1; });

  exports.message = function(msg) {
    var lb, msgcontainer, msgnode;
    msgcontainer = $("#msgcontainer");
    (msgnode = $(require("./template/msg")({
      msg: msg
    }))).appendTo(msgcontainer);
    (lb = $("<br>")).appendTo(msgcontainer);
    msgnode.hide();
    msgnode.show(1000);
    setTimeout((function() {
      return msgnode.hide(1000, function() {
        msgnode.remove();
        return lb.remove(); });

    }), 5000);
    return msgnode; };


  exports.View = View = (function() {
    var _views;

    function View() {  };

    _views = [];

    View.registerView = function(regex, cls, label) {
      return _views.push({
        regex: regex,
        cls: cls,
        label: label }); };



    View.getLabel = function View_getLabel__1(_, viewname) { var params, row, _ref, __this = this; var __frame = { name: "View_getLabel__1", line: 41 }; return __func(_, this, arguments, View_getLabel__1, 0, __frame, function __$View_getLabel__1() {

        _ref = __this._find(viewname), row = _ref[0], params = _ref[1]; return (function __$View_getLabel__1(__then) {
          if (((((row != null) ? row.label : void 0)) != null)) {
            return row.label(__cb(_, __frame, 4, 15, _, true), params); } else {

            return _(null, viewname); } ; })(_); }); };



    View.create = function(viewname, slot) {
      var params, row, _ref;
      _ref = this._find(viewname), row = _ref[0], params = _ref[1];
      if ((row != null)) {
        return new row.cls(slot, params); } ; };



    View._find = function(viewname) {
      var params, row, _i, _len;
      for (_i = 0, _len = _views.length; (_i < _len); _i++) {
        row = _views[_i];
        params = row.regex.exec(viewname);
        if ((params != null)) {
          return [row,params,]; } ; };


      return [null,null,]; };


    View.test = function(viewname) {
      return (this._find(viewname)[0] != null); };


    return View;

  })();

  exports.DropArea = DropArea = (function() {

    function DropArea(contentNode, cb) {
      contentNode.bind("dragover", function(ev) {
        return ev.originalEvent.preventDefault(); });

      contentNode.bind("drop", function(ev) {
        ev.originalEvent.preventDefault();
        return cb(ev.originalEvent.dataTransfer.getData("text/plain")); }); };



    return DropArea;

  })();

  exports.Slot = Slot = (function() {

    function Slot(contentNode, titleNode) {
      var _this = this;
      this.contentNode = contentNode;
      this.titleNode = titleNode;
      this.clear = function() {
        return Slot.prototype.clear.apply(_this, arguments); };

      this.setView = function(viewname) {
        return Slot.prototype.setView.apply(_this, arguments); };

      this.emitter = new Emitter(this.getTitleNode());
      this.clear(); };


    Slot.prototype.setView = function(viewname) {
      if (View.test(viewname)) {
        this.clear();
        this.view = View.create(viewname, this);
        return this.emitter.setViewName(viewname); } ; };



    Slot.prototype.setTitle = function(title) {
      return this.getTitleNode().html(title); };


    Slot.prototype.setContent = function(html) {
      return this.getContentNode().html(html); };


    Slot.prototype.getContentNode = function() {
      return this.contentNode; };


    Slot.prototype.getTitleNode = function() {
      return this.titleNode; };


    Slot.prototype.clear = function() {
      var _ref;
      if (((_ref = this.view) != null)) {
        _ref["delete"](); } ;

      this.getContentNode().empty();
      return this.setTitle("Secretarius"); };


    return Slot;

  })();

  exports.Emitter = Emitter = (function() {

    function Emitter(node, slotGenerator) {
      var _ref, _this = this;

      this.node = node;
      this.slotGenerator = slotGenerator;
      if (((_ref = this.slotGenerator) == null)) {
        this.slotGenerator = SlotGenerator.getDefault(); } ;

      this.node.attr("draggable", "true");
      this.node.bind("dragstart", function(ev) {
        ev.originalEvent.dataTransfer.setData("text/plain", _this.getViewName());
        return ev.originalEvent.dataTransfer.setData("text/uri-list", ((("http://" + window.location.host) + "/") + (_this.getViewName()))); });

      this.node.click(function() {
        return _this.slotGenerator.show(_this.getViewName()); }); };



    Emitter.prototype.setViewName = function(viewName) {
      this.viewName = viewName; };


    Emitter.prototype.getViewName = function() {
      return this.viewName; };


    return Emitter;

  })();

  exports.SlotGenerator = SlotGenerator = (function() {
    var _default;

    function SlotGenerator() {  };

    _default = null;

    SlotGenerator.setDefault = function(generator) {
      return _default = generator; };


    SlotGenerator.getDefault = function() {
      return _default; };


    return SlotGenerator;

  })();

  exports.WindowSlotGenerator = WindowSlotGenerator = (function(_super) {

    __extends(WindowSlotGenerator, _super);

    function WindowSlotGenerator() {
      return WindowSlotGenerator.__super__.constructor.apply(this, arguments); };


    WindowSlotGenerator.prototype.show = function(viewname) {
      return window.open((("" + (document.URL.match(/https?:\/\/.*\//)[0])) + viewname), "", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no"); };


    WindowSlotGenerator.setDefault(new WindowSlotGenerator);

    return WindowSlotGenerator;

  })(SlotGenerator);

  exports.Flippable = Flippable = (function() {

    function Flippable(front, back) {
      var _ref, _this = this;

      this.front = front;
      this.back = back;
      this.toggle = function() {
        return Flippable.prototype.toggle.apply(_this, arguments); };

      this.showFront = function() {
        return Flippable.prototype.showFront.apply(_this, arguments); };

      this.showBack = function() {
        return Flippable.prototype.showBack.apply(_this, arguments); };

      this.flipped = false;
      if (((_ref = this.back) != null)) {
        _ref.addClass("backside"); } ; };



    Flippable.prototype.showBack = function() {
      var _ref, _ref1;
      if (((_ref = this.front) != null)) {
        _ref.addClass("backside"); } ;

      return (((_ref1 = this.back) != null) ? _ref1.removeClass("backside") : void 0); };


    Flippable.prototype.showFront = function() {
      var _ref, _ref1;
      if (((_ref = this.front) != null)) {
        _ref.removeClass("backside"); } ;

      return (((_ref1 = this.back) != null) ? _ref1.addClass("backside") : void 0); };


    Flippable.prototype.toggle = function() {
      if (this.flipped = !this.flipped) {
        return this.showBack(); }
       else {
        return this.showFront(); } ; };



    Flippable.prototype.addToggler = function(toggler) {
      var _this = this;
      return toggler.click(function() {
        _this.toggle();
        return false; }); };



    return Flippable;

  })();

  exports.Uploader = Uploader = (function() {
    var defaults;

    defaults = {
      upload: function() {  },
      name: "File" };


    function Uploader(node, options) {
      var flip, links;
      this.node = node;
      this.options = ((options != null) ? options : { });
      defaultTo(this.options, defaults);
      this.node.html(require("./template/upload")(this.options));
      links = $("button", this.node);
      flip = new Flippable(links.first(), $("form", this.node));
      flip.addToggler(links); };


    return Uploader;

  })();

  exports.TimePicker = TimePicker = (function() {
    var defaults, units;

    units = {
      year: "FullYear",
      month: "Month",
      day: "Date",
      minute: "Minutes",
      hour: "Hours",
      second: "Seconds" };


    defaults = {
      change: function() {  },
      name: "Time" };


    function TimePicker(node, options) {
      var unit, _this = this;

      this.node = node;
      this.options = options;
      this.getDate = function() {
        return TimePicker.prototype.getDate.apply(_this, arguments); };

      this.save = function() {
        return TimePicker.prototype.save.apply(_this, arguments); };

      this.setDate = function(date) {
        _this.date = date;
        return TimePicker.prototype.setDate.apply(_this, arguments); };

      defaultTo(this.options, defaults);
      this.node.html(require("./template/timepicker")(this.options));
      this.node.addClass("timepicker");
      this.outerFlip = new Flippable($(".front", this.node), $(".back", this.node), 0);
      this.innerFlip = new Flippable($(".front > button", this.node), $(".front > span", this.node), 0);
      this.outerFlip.addToggler($("button", this.node));
      this.display = $("span.reltime", this.node);
      for (unit in units) {
        this[unit] = $((("input[name='" + unit) + "']"), this.node); };

      this.setDate(this.options.date);
      $("button[name=delete]", this.node).click(function() {
        _this.options.change(null);
        _this.setDate(null);
        return false; });

      $("button[name=save]", this.node).click(function() {
        _this.save();
        return false; }); };



    TimePicker.prototype.setDate = function(date) {
      var fn, unit, _results;
      this.date = date;
      date = this.date;
      if ((this.date != null)) {
        this.innerFlip.showBack(); }
       else {
        this.innerFlip.showFront();
        date = new Date; } ;

      this.display.attr("x-time", date);
      _results = [];
      for (unit in units) {
        fn = units[unit];
        _results.push(this[unit].val((date[("get" + fn)]() + (((unit === "month") ? 1 : 0))))); };

      return _results; };


    TimePicker.prototype.save = function() {
      var date, fn, unit;
      date = new Date;
      try {
        for (unit in units) {
          fn = units[unit];
          date[("set" + fn)]((this[unit].val() - (((unit === "month") ? 1 : 0)))); };

      } catch (error) {
        date = null; };

      this.options.change(date);
      return this.setDate(date); };


    TimePicker.prototype.getDate = function() {
      return this.date; };


    return TimePicker;

  })();

  exports.ListManager = ListManager = (function() {

    function ListManager(node, creator) {
      var _this = this;
      this.node = node;
      this.creator = creator;
      this.setList = function setList__1(_, list) { var __arguments = arguments; var __frame = { name: "setList__1", line: 400 }; return __func(_, this, arguments, setList__1, 0, __frame, function __$setList__1() {
          return _(null, ListManager.prototype.setList.apply(_this, __arguments)); }); };

      this.elements = { }; };


    ListManager.prototype.setList = function ListManager_prototype_setList__1(_, list) { var element, id, _i, _len, _ref, _results, __this = this; var __frame = { name: "ListManager_prototype_setList__1", line: 406 }; return __func(_, this, arguments, ListManager_prototype_setList__1, 0, __frame, function __$ListManager_prototype_setList__1() {

        _i = 0; _len = list.length; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$ListManager_prototype_setList__1() { __more = false; if (__3) { _i++; } else { __3 = true; } ; var __2 = (_i < _len); if (__2) {
              id = list[_i];
              if (!(!((id in __this.elements)))) { while (__more) { __loop(); }; __more = true; return; } ;


              return __this.creator(__cb(_, __frame, 7, 18, function ___(__0, __1) { element = __1;
                if (!((id in __this.elements))) {
                  __this.elements[id] = element;
                  if ((id === __this.select)) {
                    element.prop("selected", true); } ;

                  element.appendTo(__this.node); } ; while (__more) { __loop(); }; __more = true; }, true), id); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$ListManager_prototype_setList__1() {


          _ref = __this.elements;
          _results = [];
          for (id in _ref) {
            element = _ref[id];
            if (!((__indexOf.call(list, id) < 0))) {
              continue; } ;

            delete __this.elements[id];
            _results.push(element.remove()); };

          return _(null, _results); }); }); };


    return ListManager;

  })();

  exports.InfoListManager = InfoListManager = (function(_super) {

    __extends(InfoListManager, _super);

    function InfoListManager(node, creator) {
      InfoListManager.__super__.constructor.call(this, node, function __1(_, id) { var info; var __frame = { name: "__1", line: 444 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {

          return model.cache.getInformation(__cb(_, __frame, 2, 15, function ___(__0, __1) { info = __1; return (function __$__1(__then) {
              if ((info != null)) {
                return creator(__cb(_, __frame, 4, 17, _, true), info); } else { __then(); } ; })(_); }, true), id); }); }); };




    return InfoListManager;

  })(ListManager);

  exports.createInfoButton = createInfoButton = function(info, type, del) {
    var domnode, emitter, labelnode, setLabel;
    if ((type == null)) {
      type = false; } ;

    domnode = $(require("./template/infobutton")({
      del: (del != null) }));

    labelnode = $(".label", domnode);
    if ((del != null)) {
      $("button", domnode).click(function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return del(info); }); } ;


    info.onChanged(setLabel = function setLabel__1(info, _) { var label; var __frame = { name: "setLabel__1", line: 473 }; return __func(_, this, arguments, setLabel__1, 1, __frame, function __$setLabel__1() {

        return exports.info2label(__cb(_, __frame, 2, 14, function ___(__0, __1) { label = __1;
          if (!type) {
            label = (label.split(":")).slice(1).join(":"); } ;

          return _(null, labelnode.html(label)); }, true), info); }); });

    setLabel(info);
    emitter = new Emitter(domnode);
    emitter.setViewName(exports.info2viewname(info));
    return domnode; };


  exports.InfoList = InfoList = (function(_super) {

    __extends(InfoList, _super);

    function InfoList(node, type, del) {
      if ((type == null)) {
        type = false; } ;

      InfoList.__super__.constructor.call(this, node, function(autocb, reference) {
        return createInfoButton(reference, type, del); }); };



    return InfoList;

  })(InfoListManager);

  exports.ReferenceList = ReferenceList = (function(_super) {

    __extends(ReferenceList, _super);

    function ReferenceList(node, info) {
      new DropArea(node, function __1(viewname, _) { var id, reference, _ref; var __frame = { name: "__1", line: 509 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { return (function __$__1(__then) {

            if (((id = (((_ref = /^\w*:(.*)$/.exec(viewname)) != null) ? _ref[1] : void 0)) != null)) {
              return model.cache.getInformation(__cb(_, __frame, 3, 22, function ___(__0, __1) { reference = __1; return (function __$__1(__then) {
                  if ((reference != null)) {
                    return info.addReference(__cb(_, __frame, 5, 19, _, true), reference); } else { __then(); } ; })(__then); }, true), id); } else { __then(); } ; })(_); }); });



      ReferenceList.__super__.constructor.call(this, node, true, function(reference) {
        return info.removeReference((function() {  }), reference); }); };



    return ReferenceList;

  })(InfoList);

  exports.InfoClassListManager = InfoClassListManager = (function(_super) {

    __extends(InfoClassListManager, _super);

    function InfoClassListManager(_, node, cls, creator) { var __this = this; var __frame = { name: "InfoClassListManager", line: 531 }; return __func(_, this, arguments, InfoClassListManager, 0, __frame, function __$InfoClassListManager() {
        InfoClassListManager.__super__.constructor.call(__this, node, creator);
        cls.onChanged(__this.setList);
        return cls.getAllIDs(__cb(_, __frame, 3, 19, function ___(__0, __1) { __this.setList(__1); _(); }, true)); }); };


    return InfoClassListManager;

  })(InfoListManager);

  exports.AsapListsList = AsapListsList = (function(_super) {

    __extends(AsapListsList, _super);

    function AsapListsList(node) {
      AsapListsList.__super__.constructor.call(this, node, model.AsapList, function(autocb, list) {
        var listnode;
        listnode = $((("<button>" + list.name) + "</button>"));
        list.onChanged(function(list) {
          return listnode.html(list.name); });

        new Emitter(listnode).setViewName(("asaplist:" + list.id));
        return listnode; }); };



    return AsapListsList;

  })(InfoClassListManager);

  exports.InfoClassPicker = InfoClassPicker = (function(_super) {

    __extends(InfoClassPicker, _super);

    function InfoClassPicker(node, cls, defaultoption, cb) {
      this.select = null;
      this.picker = $("<select />");
      node.append(this.picker);
      if ((defaultoption != null)) {
        this.picker.append($(new Option(defaultoption, ""))); } ;

      InfoClassPicker.__super__.constructor.call(this, this.picker, cls, cb); };


    InfoClassPicker.prototype.sel = function(id) {
      this.select = id;
      if ((id in this.elements)) {
        return this.elements[id].prop("selected", true); } ; };



    InfoClassPicker.prototype.getInfo = function InfoClassPicker_prototype_getInfo__1(_) { var __this = this; var __frame = { name: "InfoClassPicker_prototype_getInfo__1", line: 582 }; return __func(_, this, arguments, InfoClassPicker_prototype_getInfo__1, 0, __frame, function __$InfoClassPicker_prototype_getInfo__1() {
        return model.cache.getInformation(__cb(_, __frame, 1, 13, _, true), __this.picker.val()); }); };


    InfoClassPicker.prototype.onChanged = function InfoClassPicker_prototype_onChanged__2(_) { var __this = this; var __frame = { name: "InfoClassPicker_prototype_onChanged__2", line: 586 }; return __func(_, this, arguments, InfoClassPicker_prototype_onChanged__2, 0, __frame, function __$InfoClassPicker_prototype_onChanged__2() {
        return __this.picker.change(__cb(_, __frame, 1, 6, function __$InfoClassPicker_prototype_onChanged__2() {
          return __this.getInfo(__cb(_, __frame, 2, 13, _, true)); }, true)); }); };


    return InfoClassPicker;

  })(InfoClassListManager);

  exports.ProjectPicker = ProjectPicker = (function(_super) {

    __extends(ProjectPicker, _super);

    function ProjectPicker(node) {
      ProjectPicker.__super__.constructor.call(this, node, model.Project, "No Project", function __1(_, project) { var projectnode; var __frame = { name: "__1", line: 600 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {

          projectnode = $(new Option(project.description, project.id));
          project.onChanged(function(project) {
            return projectnode.html(project.description); });

          return _(null, projectnode); }); }); };



    return ProjectPicker;

  })(InfoClassPicker);

  exports.ListPicker = ListPicker = (function(_super) {

    __extends(ListPicker, _super);

    function ListPicker(node) {
      ListPicker.__super__.constructor.call(this, node, model.AsapList, null, function __1(_, list) { var listnode; var __frame = { name: "__1", line: 619 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {

          listnode = $(new Option(list.name, list.id));
          list.onChanged(function(list) {
            return listnode.html(list.name); });

          return _(null, listnode); }); }); };



    return ListPicker;

  })(InfoClassPicker);

  exports.AsapListCreator = AsapListCreator = (function() {

    function AsapListCreator(node) {
      var list;
      node.html(require("./template/asaplistcreator")());
      list = $("input[name=list]", node);
      $("form[name=list]").submit(function(ev) {
        ev.preventDefault();
        return new model.AsapList().create((function(error) {
          if ((error == null)) {
            return list.val(""); } ;

        }), list.val()); }); };



    return AsapListCreator;

  })();

  exports.NoteCreator = NoteCreator = (function() {

    function NoteCreator(node) {
      var content;
      node.html(require("./template/notecreator")());
      content = $("input[name=note]", node);
      $("form[name=note]", node).submit(function(ev) {
        ev.preventDefault();
        return new model.Note().create((function(error) {
          if ((error == null)) {
            return content.val(""); } ;

        }), content.val()); }); };



    return NoteCreator;

  })();

  exports.AsapCreator = AsapCreator = (function() {

    function AsapCreator(node, list, project, reference) {
      var desc, form, listPicker, projectPicker, _this = this;

      this.list = ((list != null) ? list : null);
      this.project = ((project != null) ? project : null);
      this.reference = ((reference != null) ? reference : null);
      node.append(form = $(require("./template/asapcreator")({
        list: !((this.list != null)),
        project: !((this.project != null)) })));

      desc = $("input[name=asap]");
      projectPicker = new ProjectPicker($(".projectsel", node));
      listPicker = new ListPicker($(".listsel", node));
      form.submit(function() {
        (function __1(_) { var __frame = { name: "__1", line: 689 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function __$__1(_) {
              var __1 = (_this.project != null); if (__1) { return _(null, _this.project); } ; return projectPicker.getInfo(__cb(_, __frame, 1, 60, _, true)); })(__cb(_, __frame, -688, 7, function ___(__0, __3) { project = __3; return (function __$__1(_) {
                var __2 = (_this.list != null); if (__2) { return _(null, _this.list); } ; return listPicker.getInfo(__cb(_, __frame, 2, 51, _, true)); })(__cb(_, __frame, -688, 7, function ___(__0, __4) { list = __4;
                return new model.Asap().create(__cb(_, __frame, 3, 10, function __$__1() {
                  return _(null, desc.val("")); }, true), desc.val(), list, _this.reference, project); }, true)); }, true)); });
        })();
        return false; }); };



    AsapCreator.prototype.setList = function(list) {
      this.list = list; };


    AsapCreator.prototype.setProject = function(project) {
      this.project = project; };


    AsapCreator.prototype.setReference = function(reference) {
      this.reference = reference; };


    return AsapCreator;

  })();

  exports.ProjectCreator = ProjectCreator = (function() {

    function ProjectCreator(node, parent, reference) {
      var desc, form, parentPicker, _this = this;

      this.node = node;
      this.parent = ((parent != null) ? parent : null);
      this.reference = ((reference != null) ? reference : null);
      node.append(form = $(require("./template/projectcreator")({
        parent: !((this.parent != null)) })));

      desc = $("input[name=project]");
      parentPicker = new ProjectPicker($(".parentpicker", node));
      form.submit(function() {
        (function __1(_) { var __frame = { name: "__1", line: 729 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function __$__1(_) {
              var __1 = (_this.parent != null); if (__1) { return _(null, _this.parent); } ; return parentPicker.getInfo(__cb(_, __frame, 1, 57, _, true)); })(__cb(_, __frame, -728, 7, function ___(__0, __2) { parent = __2;
              return new model.Project().create(__cb(_, __frame, 2, 10, function __$__1() {
                return _(null, desc.val("")); }, true), desc.val(), _this.reference, parent); }, true)); });
        })();
        return false; }); };



    ProjectCreator.prototype.setParent = function(parent) {
      this.parent = parent; };


    ProjectCreator.prototype.setReference = function(reference) {
      this.reference = reference; };


    return ProjectCreator;

  })();

  exports.defaultTo = defaultTo = function(obj, defaults) {
    var key, value, _results;
    _results = [];
    for (key in defaults) {
      value = defaults[key];
      if ((obj[key] == null)) {
        _results.push(obj[key] = value); }
       else {
        _results.push(void 0); } ; };


    return _results; };


  exports.id2viewname = function exports_id2viewname__1(_, id) { var __frame = { name: "exports_id2viewname__1", line: 764 }; return __func(_, this, arguments, exports_id2viewname__1, 0, __frame, function __$exports_id2viewname__1() {
      return model.cache.getInformation(__cb(_, __frame, 1, 33, function ___(__0, __2) { var __1 = exports.info2viewname(__2); return _(null, __1); }, true), id); }); };


  exports.viewname2info = function exports_viewname2info__2(_, viewname) { var id, _ref; var __frame = { name: "exports_viewname2info__2", line: 768 }; return __func(_, this, arguments, exports_viewname2info__2, 0, __frame, function __$exports_viewname2info__2() { return (function __$exports_viewname2info__2(__then) {

        if (((id = (((_ref = /^\w*:(.*)$/.exec(viewname)) != null) ? _ref[1] : void 0)) != null)) {
          return model.cache.getInformation(__cb(_, __frame, 3, 13, _, true), id); } else {

          return _(new Error(("No Infoview Name: " + viewname))); } ; })(_); }); };



  exports.info2label = function exports_info2label__3(_, info) { var __frame = { name: "exports_info2label__3", line: 777 }; return __func(_, this, arguments, exports_info2label__3, 0, __frame, function __$exports_info2label__3() {
      return exports.label(__cb(_, __frame, 1, 11, _, true), exports.info2viewname(info)); }); };


  exports.info2viewname = function(info) {
    return ((("" + info.type) + ":") + info.id); };


  exports.id2label = function exports_id2label__4(_, id) { var __frame = { name: "exports_id2label__4", line: 785 }; return __func(_, this, arguments, exports_id2label__4, 0, __frame, function __$exports_id2label__4() {
      return exports.id2viewname(__cb(_, __frame, 1, 4, function __$exports_id2label__4() {
        return exports.label(__cb(_, __frame, 2, 11, _, true), viewname); }, true), id); }); };


  exports.label = function exports_label__5(_, viewname) { var __frame = { name: "exports_label__5", line: 790 }; return __func(_, this, arguments, exports_label__5, 0, __frame, function __$exports_label__5() {
      return View.getLabel(__cb(_, __frame, 1, 11, _, true), viewname); }); };


  exports.inbox = require("./inbox");

  exports.slots = require("./slots");

  exports.info = require("./info");

  exports.main = require("./main");

}).call(this);
})("/ui.js")
},{"./template/msg":1,"./template/upload":2,"./template/timepicker":3,"./template/infobutton":4,"./template/asaplistcreator":5,"./template/notecreator":6,"./template/asapcreator":7,"./template/projectcreator":8,"./inbox":10,"./slots":11,"./info":12,"./main":13,"streamline/lib/callbacks/runtime":14}],15:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/inbox.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<h1>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</h1>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<div class="inboxinfo">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n<div class="front">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <button name="asap">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('New ToDo');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('\n  <button name="project">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('New Project');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('\n<div class="back">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('Cancel');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('\n  <div class="newproject">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('\n  <div class="newasap">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],16:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/body.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<p id="msgcontainer">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<div id="header">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n  <h1>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('Secretarius');
__jade.shift();
__jade.shift();
buf.push('</h1>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <div id="clock">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('Clock');
__jade.shift();
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('\n  <div id="menu">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
// iterate menu
;(function(){
  if ('number' == typeof menu.length) {

    for (var $index = 0, $$l = menu.length; $index < $$l; $index++) {
      var entry = menu[$index];

__jade.unshift({ lineno: 6, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n    <button>');
var __val__ = entry
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
    }

  } else {
    var $$l = 0;
    for (var $index in menu) {
      $$l++;      var entry = menu[$index];

__jade.unshift({ lineno: 6, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n    <button>');
var __val__ = entry
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
    }

  }
}).call(this);

__jade.shift();
__jade.shift();
buf.push('\n  </div>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('\n<div id="content">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('\n<div id="footer">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('\n  <p>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('Copyright 2012');
__jade.shift();
__jade.shift();
buf.push('</p>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],17:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/infoframe.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<div class="infocontent">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<button name="save">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('Save');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n<div class="options">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <div class="setStatus">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('\n    <button name="delete">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('Delete');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('\n    <button name="default">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('Normal');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n    <button name="maybe">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('Maybe');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('\n    <button name="inbox">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('Inbox');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('\n    <button name="urgent">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('Urgent');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n  </div>');
__jade.shift();
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('\n  <div class="delay">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('\n  <div class="times">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('Last Change:');
__jade.shift();
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
buf.push('<span class="reltime last_edited">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('Created:');
__jade.shift();
__jade.unshift({ lineno: 15, filename: __jade[0].filename });
buf.push('<span class="reltime created_at">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('\n  <div class="references">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('\n    <h2>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('References');
__jade.shift();
__jade.shift();
buf.push('</h2>');
__jade.shift();
__jade.shift();
buf.push('\n  </div>');
__jade.shift();
__jade.unshift({ lineno: 18, filename: __jade[0].filename });
buf.push('\n  <div class="attachments">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('\n    <h2>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('Attachments');
__jade.shift();
__jade.shift();
buf.push('</h2>');
__jade.shift();
__jade.unshift({ lineno: 20, filename: __jade[0].filename });
buf.push('\n    <div class="upload">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.shift();
buf.push('\n  </div>');
__jade.shift();
__jade.shift();
buf.push('\n</div>');
__jade.shift();
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('\n<button name="options">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('Toggle Options');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],18:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/note.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n  <textarea placeholder="Note is empty…">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</textarea>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],19:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/asaplist.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<button name="toggleshow">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('Show all');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n<table>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <thead>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('\n    <tr>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('Done');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('Description');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('Project');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('Deadline');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('References');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('Last Changed');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('Created At');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('Delay');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
buf.push('Move To');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('\n      <th>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('Delete');
__jade.shift();
__jade.shift();
buf.push('</th>');
__jade.shift();
__jade.shift();
buf.push('\n    </tr>');
__jade.shift();
__jade.shift();
buf.push('\n  </thead>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('\n  <tbody>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</tbody>');
__jade.shift();
__jade.shift();
buf.push('\n</table>');
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
buf.push('\n<div class="newtodo">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 18, filename: __jade[0].filename });
buf.push('\n<form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 18, filename: __jade[0].filename });
buf.push('\n  <input name="newname"/>');
__jade.shift();
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('\n  <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('Rename');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n</form>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],20:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/listentry.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<tr>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n  <td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n    <input type="checkbox"/>');
__jade.shift();
__jade.shift();
buf.push('\n  </td>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n  <td class="desc">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('<span>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n    <form>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('\n      <input type="text"/>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('\n      <button>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('Rename');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n    </form>');
__jade.shift();
__jade.shift();
buf.push('\n  </td>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('\n  <td class="project">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push('\n  <td class="deadline">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 11, filename: __jade[0].filename });
buf.push('\n  <td class="refs">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
buf.push('\n  <td class="last reltime">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
buf.push('\n  <td class="create reltime">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
buf.push('\n  <td class="delay">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 15, filename: __jade[0].filename });
buf.push('\n  <td class="listsel">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</td>');
__jade.shift();
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('\n  <td>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('\n    <button name="delete">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
buf.push('Delete');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('\n  </td>');
__jade.shift();
__jade.shift();
buf.push('\n</tr>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],21:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/taskview.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<button name="toggleshow">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('Show all');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<div class="tasklist">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n<div class="root">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('/');
__jade.shift();
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],22:[function(require,module,exports){module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: "src/app/template/main.jade" }];
try {
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('\n<div class="newnote">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('\n<h2>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('ToDo Lists');
__jade.shift();
__jade.shift();
buf.push('</h2>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('\n<div class="lists">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('\n<div class="newlist">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
}
},{}],23:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename); (function() {
  var request, sec, ui, util, _ref;

  ui = require("./ui");

  sec = require("libsecretarius");

  util = sec.util;

  window.model = sec();

  request = (((_ref = document.URL.match(/https?:\/\/.*\/(.*)/)) != null) ? _ref[1] : void 0);

  $(function() {
    return new ui.slots.WindowSlot(util.dummy, request); });


}).call(this);
})("/secretarius.js")
},{"./ui":9,"streamline/lib/callbacks/runtime":14,"libsecretarius":24}],25:[function(require,module,exports){(function(global){/// !doc
/// 
/// # Container for global context
/// 
/// The `globals` module is a container for the global `context` object which is maintained across
/// asynchronous calls.
/// 
/// This context is very handy to store information that all calls should be able to access
/// but that you don't want to pass explicitly via function parameters. The most obvious example is
/// the `locale` that each request may set differently and that your low level libraries should
/// be able to retrieve to format messages.
/// 
/// `var globals = require('streamline/lib/globals')`
/// 
/// * `globals.context = ctx`
/// * `ctx = globals.context`  
///   sets and gets the context
/// 
/// Note: an empty context (`{}`) is automatically set by the server wrappers of the `streams` module,
/// before they dispatch a request. So, with these wrappers, each request starts with a fresh empty context.
// This module may be loaded several times so we need a true global (with a secret name!).
// This implementation also allows us to share the context between modules compiled in callback and fibers mode.
var glob = typeof global === "object" ? global : window;
var secret = "_20c7abceb95c4eb88b7ca1895b1170d1";
module.exports = (glob[secret] = (glob[secret] || {}));

})(window)
},{}],10:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func; (function() {
  var InboxView, ui, _this = this, __hasProp = {

  }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ui = require("./ui");

  InboxView = (function(_super) {

    __extends(InboxView, _super);

    InboxView.registerView(/^inbox$/, InboxView, function __1(_) { var __frame = { name: "__1", line: 13 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return _(null, "Inbox"); }); });


    function InboxView(slot) {
      var innerFlip, outerFlip, _this = this;

      this.slot = slot;
      this.draw = function(values) {
        return InboxView.prototype.draw.apply(_this, arguments); };

      this.size = this.first = null;
      this.context = this.slot.getContentNode();
      this.slot.setContent(require("./template/inbox")());
      this.innerslot = new ui.Slot($(".inboxinfo", this.slot.getContentNode()).first(), $("h1", this.slot.getContentNode()).first());
      model.inbox.onChanged(this.draw);
      model.inbox.get(function(err, values) {
        if ((err == null)) {
          return _this.draw(values); } ; });


      innerFlip = new ui.Flippable($(".newasap", this.context), $(".newproject", this.context), 0);
      outerFlip = new ui.Flippable($(".front", this.context), $(".back", this.context), 500);
      outerFlip.addToggler($(".front > button", this.context));
      outerFlip.addToggler($(".back > button", this.context));
      $("button[name=asap]", this.context).click(innerFlip.showFront);
      $("button[name=project]", this.context).click(innerFlip.showBack);
      this.asapCreator = new ui.AsapCreator($(".newasap", this.context));
      this.projectCreator = new ui.ProjectCreator($(".newproject", this.context)); };


    InboxView.prototype["delete"] = function() {
      return model.inbox.removeCb("changed", this.draw); };


    InboxView.prototype.draw = function(values) {
      if ((this.size !== values.size)) {
        this.slot.setTitle((("Inbox (" + (this.size = values.size)) + ")")); } ;

      if ((this.first !== values.first)) {
        this.first = values.first;
        this.asapCreator.setReference(this.first);
        this.projectCreator.setReference(this.first);
        if ((this.first != null)) {
          return this.innerslot.setView(((("" + this.first.type) + ":") + this.first.id)); }
         else {
          return this.innerslot.clear(); } ; } ; };




    return InboxView;

  })(ui.View);

}).call(this);
})("/inbox.js")
},{"./ui":9,"./template/inbox":15,"streamline/lib/callbacks/runtime":14}],11:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var WindowSlot, ui, _this = this, __hasProp = {

  }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ui = require("./ui");

  exports.WindowSlot = WindowSlot = (function(_super) {

    __extends(WindowSlot, _super);

    function WindowSlot(_, viewname) { var $clock, clock, dish, emitter, labels, menu, runclock, _i, _j, _len, _len1, _this, __this = this; var __frame = { name: "WindowSlot", line: 13 }; return __func(_, this, arguments, WindowSlot, 0, __frame, function __$WindowSlot() { _this = __this;


        __this.setView = function(viewname) {
          return WindowSlot.prototype.setView.apply(_this, arguments); };

        console.log("a");
        return model.inbox.get(__cb(_, __frame, 7, 6, function __$WindowSlot() {
          console.log("a");
          menu = ["","inbox","projects",];
          labels = { };
          _i = 0; _len = menu.length; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$WindowSlot() { __more = false; if (__6) { _i++; } else { __6 = true; } ; var __5 = (_i < _len); if (__5) {
                dish = menu[_i];
                return ui.label(__cb(_, __frame, 13, 23, function ___(__0, __2) { labels[dish] = __2; while (__more) { __loop(); }; __more = true; }, true), dish); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$WindowSlot() {










            return (function __1(_) { var _j, _len1, _results; _results = []; _j = 0; _len1 = menu.length; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$__1() { __more = false; if (__3) { _j++; } else { __3 = true; } ; var __2 = (_j < _len1); if (__2) { dish = menu[_j]; return labels[dish](__cb(_, __frame, 5, 26, function ___(__0, __1) { _results.push(__1); while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$__1() { return _(null, _results); }); })(__cb(_, __frame, 24, 14, function ___(__0, __3) { $("body").html(require("./template/body")({ menu: __3 }));

              new ui.AsapListsList($("#menu"));
              for (_j = 0, _len1 = menu.length; (_j < _len1); _j++) {
                dish = menu[_j];
                emitter = new ui.Emitter($((("#menu > button:contains('" + labels[dish]) + "')")));
                emitter.setViewName(dish); };

              $clock = $("#clock");
              $clock.hide();
              clock = function() {
                runclock();
                $(".reltime").each(function() {
                  var node;
                  node = $(this);
                  return node.html(new Date(node.attr("x-time")).toRelativeTime({
                    nowThreshold: 1000 })); });


                try {
                  $clock.show();
                  return $clock.html(((("" + (new Date().toLocaleString())) + " Inbox:") + model.inbox.values.size));
                } catch (err) {
                  return $clock.hide(); }; };


              (runclock = function() {
                return setTimeout(clock, (1000 - ((new Date().getTime)() % 1000)));
              })();
              WindowSlot.__super__.constructor.call(__this, $("#content"), $("#header > h1").first());
              WindowSlot.__super__.setView.call(__this, viewname);
              new ui.DropArea($("#header > h1").first(), __this.setView); _(); }, true)); }); }, true)); }); };


    WindowSlot.prototype.setView = function(viewname) {
      return window.location.href = ((("http://" + window.location.host) + "/") + viewname); };


    WindowSlot.prototype.setTitle = function(title) {
      WindowSlot.__super__.setTitle.apply(this, arguments);
      return document.title = (("" + title) + " - Secretarius"); };


    WindowSlot.prototype.close = function() {
      window.open("", "_self", "");
      return window.close(); };


    return WindowSlot;

  })(ui.Slot);

















































}).call(this);
})("/slots.js")
},{"./ui":9,"./template/body":16,"streamline/lib/callbacks/runtime":14}],12:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var AsapListView, AsapView, InfoView, NoteView, ProjectView, ProjectsView, TaskList, TaskView, ui, _this = this, __hasProp = {

  }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ui = require("./ui");

  exports.InfoView = InfoView = (function(_super) {

    __extends(InfoView, _super);

    function InfoView(_, slot, match) { var info, _this, __this = this; var __frame = { name: "InfoView", line: 13 }; return __func(_, this, arguments, InfoView, 0, __frame, function __$InfoView() { _this = __this;


        __this.slot = slot;
        __this.clean = function(force) {
          return InfoView.prototype.clean.apply(_this, arguments); };

        __this.dirty = function() {
          return InfoView.prototype.dirty.apply(_this, arguments); };

        __this.draw = function() {
          return InfoView.prototype.draw.apply(_this, arguments); };

        __this["delete"] = function() {
          return InfoView.prototype.delete.apply(_this, arguments); };

        __this.context = __this.slot.getContentNode();
        __this.id = match[1];
        __this.slot.setContent(require("./template/infoframe")());
        __this.contentNode = $(".infocontent", __this.context);
        return model.cache.getInformation(__cb(_, __frame, 20, 18, function ___(__0, __1) { __this.info = __1;
          __this.info.onChanged(__this.draw);
          __this.info.onDeleted(__this.delcb = function() {
            return _this.slot.setView("")(); });

          info = __this.info;
          $(".setStatus > button", __this.context).click(function(ev) {
            var status;
            ev.preventDefault();
            status = $(this).attr("name");
            if (!(((status === "delete") && !confirm("Really delete?")))) {
              return info.setStatus((function() {  }), status); } ; });


          (__this.savebutton = $("button[name=save]", __this.context)).hide();
          __this.delayPicker = new ui.TimePicker($(".delay"), {
            name: "Delay",
            change: function(date) {
              return info.setDelay((function() {  }), date); } });


          __this.savebutton.click(function(ev) {
            ev.preventDefault();
            return _this.clean(true); });

          new ui.Uploader($(".upload", __this.context));
          __this.refManager = new ui.ReferenceList($(".references", __this.context), __this.info);
          __this.initContent();
          __this.draw();
          new ui.Flippable($(".options", __this.context), null).addToggler($("button[name=options]", __this.context)); _(); }, true), __this.id); }); };


    InfoView.prototype["delete"] = function() {
      this.info.removeCb("changed", this.draw);
      return this.info.removeCb("deleted", this.delcb); };


    InfoView.prototype.draw = function() {
      this.drawTitle();
      this.drawFrame();
      return this.drawContent(); };


    InfoView.prototype.dirty = function() {
      this.dirtStamp = (new Date().getTime)();
      this.savebutton.show(400);
      return setTimeout(this.clean, 5000); };


    InfoView.prototype.clean = function(force) {
      if ((((this.dirtStamp != null)) && (((((new Date().getTime)() - this.dirtStamp) >= 5000) || force)))) {
        this.save();
        this.dirtStamp = null;
        return this.savebutton.hide(1000); } ; };



    InfoView.prototype.drawFrame = function() {
      $(".setStatus > button", this.context).removeClass("active");
      $(((".setStatus > button[name=" + this.info.status) + "]"), this.context).addClass("active");
      $("span.created_at", this.context).attr("x-time", this.info.createdAt);
      $("span.last_edited", this.context).attr("x-time", this.info.lastEdited);
      this.delayPicker.setDate(((this.info.delay != null) ? new Date(this.info.delay) : null));
      return this.refManager.setList(this.info.references); };


    return InfoView;

  })(ui.View);

  NoteView = (function(_super) {

    __extends(NoteView, _super);

    function NoteView() {
      return NoteView.__super__.constructor.apply(this, arguments); };


    NoteView.registerView(/^note:(.*)$/, NoteView, function __1(_, match) { var __frame = { name: "__1", line: 111 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return model.cache.getInformation(__cb(_, __frame, 1, 25, function ___(__0, __2) { var __1 = ("Note: " + (__2.content)); return _(null, __1); }, true), match[1]); }); });


    NoteView.prototype.drawTitle = function() {
      return this.slot.setTitle("Note"); };


    NoteView.prototype.drawContent = function NoteView_prototype_drawContent__2(_) { var __this = this; var __frame = { name: "NoteView_prototype_drawContent__2", line: 119 }; return __func(_, this, arguments, NoteView_prototype_drawContent__2, 0, __frame, function __$NoteView_prototype_drawContent__2() {
        __this.area.val(__this.info.content);
        return setTimeout(__cb(_, __frame, 2, 6, function __$NoteView_prototype_drawContent__2() {
          return _(null, __this.area.trigger("autosize")); }, true), 1); }); };


    NoteView.prototype.initContent = function() {
      var _this = this;
      this.contentNode.html(require("./template/note")());
      this.area = $("textarea", this.contentNode);
      this.area.autosize({
        append: "\n" });

      this.area.keyup(this.dirty);
      return this.area.change(function() {
        _this.dirty();
        return _this.clean(true); }); };



    NoteView.prototype.save = function NoteView_prototype_save__3(_) { var msg, __this = this; var __frame = { name: "NoteView_prototype_save__3", line: 139 }; return __func(_, this, arguments, NoteView_prototype_save__3, 0, __frame, function __$NoteView_prototype_save__3() { return (function __$NoteView_prototype_save__3(__then) {

          if ((__this.info.content !== __this.area.val())) {
            msg = ui.message("Saving…");
            return __this.info.setContent(__cb(_, __frame, 4, 8, function __$NoteView_prototype_save__3() {
              if (((typeof error !== "undefined") && (error !== null))) {
                return _(null, msg.html("Save failed!")); }
               else {
                return _(null, msg.html("Saved!")); } ; __then(); }, true), __this.area.val()); } else { __then(); } ; })(_); }); };




    return NoteView;

  })(InfoView);

  AsapListView = (function(_super) {

    __extends(AsapListView, _super);

    function AsapListView() {
      return AsapListView.__super__.constructor.apply(this, arguments); };


    AsapListView.registerView(/^asaplist:(.*)$/, AsapListView, function __1(_, match) { var __frame = { name: "__1", line: 164 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return model.cache.getInformation(__cb(_, __frame, 1, 30, function ___(__0, __2) { var __1 = ("ToDo List: " + (__2.name)); return _(null, __1); }, true), match[1]); }); });


    AsapListView.prototype.drawTitle = function() {
      return this.slot.setTitle(this.info.name); };


    AsapListView.prototype.drawContent = function AsapListView_prototype_drawContent__2(_) { var __this = this; var __frame = { name: "AsapListView_prototype_drawContent__2", line: 172 }; return __func(_, this, arguments, AsapListView_prototype_drawContent__2, 0, __frame, function __$AsapListView_prototype_drawContent__2() {
        __this.newname.val(__this.info.name);
        return model.Asap.getAllIDs(__cb(_, __frame, 2, 6, function __$AsapListView_prototype_drawContent__2() {
          return _(null, __this.list.setList(__this.info.asaps)); }, true)); }); };


    AsapListView.prototype.initContent = function() {
      var active, togglebutton, _this = this;

      this.contentNode.html(require("./template/asaplist")());
      this.contentNode.addClass("hideinactive");
      active = true;
      togglebutton = $("button[name=toggleshow]");
      togglebutton.click(function() {
        if (active) {
          active = false;
          togglebutton.html("Show only active");
          _this.contentNode.removeClass("hideinactive"); }
         else {
          active = true;
          togglebutton.html("Show all");
          _this.contentNode.addClass("hideinactive"); } ;

        return false; });

      this.newname = $("input[name=newname]", this.contentNode);
      $("form", this.contentNode).submit(function(ev) {
        ev.preventDefault();
        return _this.info.rename((function() {  }), _this.newname.val()); });

      new ui.AsapCreator($(".newtodo", this.contentNode), this.info);
      return this.list = new ui.InfoListManager($("tbody", this.contentNode), function(autocb, asap) {
        var create, deadlinePicker, delayPicker, delparent, descFlippable, descform, descinput, desclabel, donebox, entry, last, listPicker, project, refManager, set;
        entry = $(require("./template/listentry")());
        refManager = new ui.ReferenceList($(".refs", entry), asap);
        delayPicker = new ui.TimePicker($(".delay", entry), {
          name: "",
          change: function(date) {
            return asap.setDelay((function() {  }), date); } });


        deadlinePicker = new ui.TimePicker($(".deadline", entry), {
          name: "",
          change: function(date) {
            return asap.setDeadline((function() {  }), date); } });


        listPicker = new ui.ListPicker($("td.listsel", entry));
        listPicker.onChanged(function(list) {
          return asap.setList((function() {  }), list); });

        donebox = $("input[type=checkbox]", entry);
        donebox.click(function() {
          if (donebox.is(":checked")) {
            return asap.done((function() {  })); }
           else {
            return asap.undo((function() {  })); } ; });


        desclabel = $(".desc > span", entry);
        descform = $(".desc > form", entry);
        descinput = $(".desc > form > input", entry);
        descform.submit(function(ev) {
          return (function __1(_) { var __frame = { name: "__1", line: 235 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
              ev.preventDefault();
              return asap.setDescription(__cb(_, __frame, 2, 12, function __$__1() {
                return _(null, descFlippable.showFront()); }, true), descinput.val()); });
          })(); });

        descFlippable = new ui.Flippable(desclabel, descform, 0);
        descFlippable.addToggler(desclabel);
        last = $(".last", entry);
        create = $(".create", entry);
        project = $(".project", entry);
        new ui.DropArea(project, function __1(viewname, _) { var id, parent, _ref; var __frame = { name: "__1", line: 246 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { return (function __$__1(__then) {

              if (((id = (((_ref = /project:(.*)$/.exec(viewname)) != null) ? _ref[1] : void 0)) != null)) {
                return model.cache.getInformation(__cb(_, __frame, 3, 21, function ___(__0, __1) { parent = __1;
                  if ((parent != null)) {
                    return _(null, asap.setParent((function() {  }), parent)); } ; __then(); }, true), id); } else { __then(); } ; })(_); }); });



        $("td > button[name=delete]", entry).click(function() {
          if (confirm("Really delete?")) {
            return asap.setStatus((function() {  }), "delete"); } ; });


        delparent = function() {
          return asap.setParent((function() {  }), null); };

        asap.onChanged(set = function set__2(asap, _) { var parent; var __frame = { name: "set__2", line: 263 }; return __func(_, this, arguments, set__2, 1, __frame, function __$set__2() {

            if ((((asap.completed != null)) || !asap.active)) {
              entry.addClass("inactive"); }
             else {
              entry.removeClass("inactive"); } ;

            if ((((asap.completed == null)) && asap.overdue)) {
              $(".deadline", entry).addClass("overdue"); }
             else {
              $(".deadline", entry).removeClass("overdue"); } ;

            donebox.prop("checked", (asap.completed != null));
            desclabel.html(asap.description);
            descinput.val(asap.description);
            if ((asap.references != null)) {
              refManager.setList(asap.references); } ;

            return model.cache.getInformation(__cb(_, __frame, 18, 19, function ___(__0, __1) { parent = __1;
              project.html(((parent != null) ? ui.createInfoButton(parent, false, delparent) : ""));
              delayPicker.setDate(((asap.delay != null) ? new Date(asap.delay) : null));
              deadlinePicker.setDate(((asap.deadline != null) ? new Date(asap.deadline) : null));
              last.attr("x-time", asap.lastEdited);
              create.attr("x-time", asap.createdAt);
              return _(null, listPicker.sel(asap.asaplist)); }, true), asap.parent); }); });

        set(asap);
        return entry; }); };



    return AsapListView;

  })(InfoView);

  TaskList = (function(_super) {

    __extends(TaskList, _super);

    function TaskList(node) {
      TaskList.__super__.constructor.call(this, node, function(autocb, task) {
        var childrenList, collapsebutton, descFlippable, descform, descinput, desclabel, donebox, draw, drawboth, entry, listid;
        entry = $(require(("./template/" + task.type))());
        $("button[name=delete]", entry).click(function() {
          if (confirm("Really delete?")) {
            return task.setStatus((function() {  }), "delete"); } ; });


        donebox = $("input[name=completed]", entry);
        donebox.click(function() {
          if (donebox.prop("checked")) {
            return task.done((function() {  })); }
           else {
            return task.undo((function() {  })); } ; });


        switch (task.type) {
        case "project": collapsebutton = $("button.collapse", entry);
          collapsebutton.click(function(ev) {
            ev.preventDefault();
            if (task.collapsed) {
              return task.uncollapse((function() {
               })); } else {
              return task.collapse((function() {
               })); } ; }); childrenList = new TaskList($(".children", entry));


          desclabel = $("form > span.name", entry);
          descinput = $("form > input", entry);
          descform = $("form", entry);
          descform.submit(function(ev) {
            (function __1(_) {
              var __frame = { name: "__1", line: 335 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function __$__1(__then) { if (descFlippable.flipped) {
                    return task.setDescription(__cb(_, __frame, 2, 18, __then, true), descinput.val());
                  } else { __then(); } ; })(function __$__1() { return _(null, descFlippable.toggle());

                }); }); })();
            return false;
          }); descFlippable = new ui.Flippable(desclabel, descinput);

          draw = function(project) {
            collapsebutton.html((project.collapsed ? ">" : "v"));
            childrenList.setList(((project.collapsed || ((project.children == null))) ? [] : project.children));
            desclabel.html(project.description);
            return descinput.val(project.description);
          }; new ui.DropArea($(".projecthandle", entry), function __1(viewname, _) {

            var child, id, _ref; var __frame = { name: "__1", line: 350 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { return (function __$__1(__then) { if (((id = (((_ref = /(asap|project):(.*)$/.exec(viewname)) != null) ? _ref[2] : void 0)) != null)) {

                  return model.cache.getInformation(__cb(_, __frame, 3, 24, function ___(__0, __1) {
                    child = __1; return (function __$__1(__then) { if ((child != null)) {
                        return child.setParent(__cb(_, __frame, 5, 25, _, true), task);
                      } else { __then(); } ; })(__then); }, true), id); } else { __then(); } ; })(_); }); }); new ui.Emitter(desclabel).setViewName(("project:" + task.id));



          break;
        case "asap":
          $("span.description", entry).html(ui.createInfoButton(task));
          listid = null;
          draw = function draw__2(asap, _) {
            var list; var __frame = { name: "draw__2", line: 364 }; return __func(_, this, arguments, draw__2, 1, __frame, function __$draw__2() { return (function __$draw__2(__then) { if (((listid !== asap.asaplist) && ((asap.asaplist != null)))) {

                  listid = asap.asaplist;
                  return model.cache.getInformation(__cb(_, __frame, 4, 23, function ___(__0, __1) {
                    list = __1; return _(null, $("span.list", entry).html(ui.createInfoButton(list)));
                  }, true), listid); } else { __then(); } ; })(_); }); }; };



        drawboth = function(task) {
          donebox.prop("checked", (task.completed != null));
          if ((task.active && ((task.completed == null)))) {
            entry.removeClass("inactive"); }
           else {
            entry.addClass("inactive"); } ;

          if ((task.parent != null)) {
            return entry.addClass("hasparent"); }
           else {
            return entry.removeClass("hasparent"); } ; };


        task.onChanged(draw);
        task.onChanged(drawboth);
        draw(task);
        drawboth(task);
        return entry; }); };



    return TaskList;

  })(ui.InfoListManager);

  TaskView = (function(_super) {

    __extends(TaskView, _super);

    function TaskView() {
      return TaskView.__super__.constructor.apply(this, arguments); };


    TaskView.prototype.drawContent = function() {  };

    TaskView.prototype.initContent = function() {
      var active, togglebutton, _this = this;

      this.contentNode.html(require("./template/taskview")());
      this.contentNode.addClass("hideinactive");
      active = true;
      togglebutton = $("button[name=toggleshow]");
      togglebutton.click(function() {
        if (active) {
          active = false;
          togglebutton.html("Show only active");
          _this.contentNode.removeClass("hideinactive"); }
         else {
          active = true;
          togglebutton.html("Show all");
          _this.contentNode.addClass("hideinactive"); } ;

        return false; });

      new ui.DropArea($(".root", this.contentNode), function __1(viewname, _) { var id, _ref; var __frame = { name: "__1", line: 427 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { return (function __$__1(__then) {

            if (((id = (((_ref = /(asap|project):(.*)$/.exec(viewname)) != null) ? _ref[2] : void 0)) != null)) {
              return model.cache.getInformation(__cb(_, __frame, 3, 16, function ___(__0, __1) { child(__1);
                if (!(((((typeof error !== "undefined") && (error !== null))) || (((typeof child === "undefined") || (child === null)))))) {
                  return _(null, child.setParent((function() {  }), null)); } ; __then(); }, true), id); } else { __then(); } ; })(_); }); });



      return new TaskList($(".tasklist", this.contentNode)).setList([this.info.id,]); };


    return TaskView;

  })(InfoView);

  ProjectView = (function(_super) {

    __extends(ProjectView, _super);

    function ProjectView() {
      return ProjectView.__super__.constructor.apply(this, arguments); };


    ProjectView.registerView(/^project:(.*)$/, ProjectView, function __1(_, match) { var __frame = { name: "__1", line: 451 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return model.cache.getInformation(__cb(_, __frame, 1, 28, function ___(__0, __2) { var __1 = ("Project: " + (__2.description)); return _(null, __1); }, true), match[1]); }); });


    ProjectView.prototype.drawTitle = function() {
      return this.slot.setTitle(("Project: " + this.info.description)); };


    return ProjectView;

  })(TaskView);

  AsapView = (function(_super) {

    __extends(AsapView, _super);

    function AsapView() {
      return AsapView.__super__.constructor.apply(this, arguments); };


    AsapView.registerView(/^asap:(.*)$/, AsapView, function __1(_, match) { var __frame = { name: "__1", line: 471 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return model.cache.getInformation(__cb(_, __frame, 1, 25, function ___(__0, __2) { var __1 = ("ToDo: " + (__2.description)); return _(null, __1); }, true), match[1]); }); });


    AsapView.prototype.drawTitle = function() {
      return this.slot.setTitle("To Do"); };


    return AsapView;

  })(InfoView);

  ProjectsView = (function(_super) {

    __extends(ProjectsView, _super);

    ProjectsView.registerView(/^projects$/, ProjectsView, function __1(_) { var __frame = { name: "__1", line: 487 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return _(null, "Projects"); }); });


    function ProjectsView(slot) {
      var active, creator, togglebutton, _this = this;

      this.slot = slot;
      this.contentNode = this.slot.getContentNode();
      this.slot.setTitle("Projects");
      this.contentNode.html(require("./template/taskview")());
      this.contentNode.append(creator = $("<div/>"));
      new ui.ProjectCreator(creator);
      this.contentNode.append(creator = $("<div/>"));
      new ui.AsapCreator(creator);
      this.contentNode.append(creator = $("<div/>"));
      new ui.AsapListCreator(creator);
      this.contentNode.addClass("hideinactive hidechildren");
      active = true;
      togglebutton = $("button[name=toggleshow]");
      togglebutton.click(function() {
        if (active) {
          active = false;
          togglebutton.html("Show only active");
          _this.contentNode.removeClass("hideinactive"); }
         else {
          active = true;
          togglebutton.html("Show all");
          _this.contentNode.addClass("hideinactive"); } ;

        return false; });

      this.projectList = new TaskList($(".tasklist", this.contentNode));
      new ui.DropArea($(".root", this.contentNode), function __1(viewname, _) { var child, id, _ref; var __frame = { name: "__1", line: 520 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { return (function __$__1(__then) {

            if (((id = (((_ref = /(asap|project):(.*)$/.exec(viewname)) != null) ? _ref[2] : void 0)) != null)) {
              return model.cache.getInformation(__cb(_, __frame, 3, 18, function ___(__0, __1) { child = __1; return (function __$__1(__then) {
                  if ((child != null)) {
                    return child.setParent(__cb(_, __frame, 5, 19, _, true), null); } else { __then(); } ; })(__then); }, true), id); } else { __then(); } ; })(_); }); });



      model.Project.getAllIDs(catchNull(this.projectList.setList));
      model.Project.onChanged(this.projectList.setList); };


    ProjectsView.prototype["delete"] = function() {  };

    return ProjectsView;

  })(ui.View);

}).call(this);
})("/info.js")
},{"./ui":9,"./template/infoframe":17,"./template/note":18,"./template/asaplist":19,"./template/listentry":20,"./template/taskview":21,"streamline/lib/callbacks/runtime":14}],13:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func; (function() {
  var InboxView, ui, __hasProp = {
  }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ui = require("./ui");

  InboxView = (function(_super) {

    __extends(InboxView, _super);

    InboxView.registerView(/^$/, InboxView, function __1(_) { var __frame = { name: "__1", line: 12 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
        return _(null, "Secretarius"); }); });


    function InboxView(slot) {
      this.slot = slot;
      this.slot.setContent(require("./template/main")());
      new ui.NoteCreator($(".newnote", this.contentNode));
      new ui.AsapListsList($(".lists", this.contentNode));
      new ui.AsapListCreator($(".newlist", this.contentNode)); };


    InboxView.prototype["delete"] = function() {  };

    return InboxView;

  })(ui.View);

}).call(this);
})("/main.js")
},{"./ui":9,"./template/main":22,"streamline/lib/callbacks/runtime":14}],14:[function(require,module,exports){/**
 * Copyright (c) 2011 Bruno Jouhier <bruno.jouhier@sage.com>
 * MIT License
 */
(function(exports) {
	var __g = exports.globals || require("../globals");
	__g.context = __g.context || {};
	__g.depth = __g.depth || 0;

	__g.trampoline = (function() {
		var q = [];
		return {
			queue: function(fn) {
				q.push(fn);
			},
			flush: function() {
				__g.depth++;
				try {
					var fn;
					while (fn = q.shift()) fn();
				} finally {
					__g.depth--;
				}
			}
		}
	})();

	exports.runtime = function(filename) {
		function __func(_, __this, __arguments, fn, index, frame, body) {
			if (!_) {
				return __future.call(__this, fn, __arguments, index);
			}
			frame.file = filename;
			frame.prev = __g.frame;
			__g.frame = frame;
			__g.depth++;
			try {
				frame.active = true;
				body();
			} catch (e) {
				__setEF(e, frame.prev);
				__propagate(_, e);
			} finally {
				frame.active = false;
				__g.frame = frame.prev;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}

		return {
			__g: __g,
			__func: __func,
			__cb: __cb,
			__future: __future,
			__propagate: __propagate,
			__trap: __trap,
			__tryCatch: __tryCatch,
			__forIn: __forIn,
			__apply: __apply,
			__construct: __construct,
			__setEF: __setEF
		};
	}

	function __cb(_, frame, offset, col, fn, trampo) {
		frame.offset = offset;
		frame.col = col;
		var ctx = __g.context;
		return function ___(err, result) {
			var oldFrame = __g.frame;
			__g.frame = frame;
			__g.context = ctx;
			__g.depth++;
			try {
				if (trampo && frame.active && __g.trampoline) {
					__g.trampoline.queue(function() {
						return ___(err, result);
					});
				} else {
					if (err) {
						__setEF(err, frame);
						return _(err);
					}
					frame.active = true;
					return fn(null, result);
				}
			} catch (ex) {
				__setEF(ex, frame);
				return __propagate(_, ex);
			} finally {
				frame.active = false;
				__g.frame = oldFrame;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}
	}

	// unfortunately callee is gone. So we need to pass a function

	function __future(fn, args, i) {
		var err, result, done, q = [];
		args = Array.prototype.slice.call(args);
		args[i] = function(e, r) {
			err = e, result = r, done = true;
			q && q.forEach(function(f) {
				try {
					f(e, r);
				} catch (ex) {
					__trap(ex);
				}
			});
			q = null;
		};
		fn.apply(this, args);
		return function ___(_) {
			if (!_) return ___;
			if (done) _(err, result);
			else q.push(_)
		}
	}

	function __propagate(_, err) {
		try {
			_(err);
		} catch (ex) {
			__trap(ex);
		}
	}

	function __trap(err) {
		if (err) {
			if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);
			else __g.trampoline.queue(function() {
				throw err;
			});
		}
	}

	__tryCatch: function __tryCatch(_, fn) {
		try {
			fn();
		} catch (e) {
			try {
				_(e);
			} catch (ex) {
				__trap(ex);
			}
		}
	}

	function __forIn(object) {
		var array = [];
		for (var obj in object) {
			array.push(obj);
		}
		return array;
	}

	function __apply(cb, fn, thisObj, args, index) {
		if (cb == null) return __future(__apply, arguments, 0);
		args = Array.prototype.slice.call(args, 0);
		args[index != null ? index : args.length] = cb;
		return fn.apply(thisObj, args);
	}

	function __construct(constructor, i) {
		var key = '__async' + i,
			f;
		return constructor[key] || (constructor[key] = function() {
			var args = arguments;

			function F() {
				var self = this;
				var cb = args[i];
				args[i] = function(e, r) {
					cb(e, self);
				}
				return constructor.apply(self, args);
			}
			F.prototype = constructor.prototype;
			return new F();
		});
	}

	function __setEF(e, f) {
		function formatStack(e, raw) {
			var s = raw,
				f, skip, skipFunc = 0;
			if (s) {
				var ff;
				s = s.split('\n').map(function(l) {
					// try to map firefox format to V8 format
					// ffOffset takes care of lines difference introduced by require.js script.
					var ffOffset = (typeof navigator === 'object' && typeof require === 'function' && require.async) ? 10 : 0;
					var m = /(^[^(]+)\([^@]*\@(.*)\:(\d+)$/.exec(l);
					l = m ? "    at " + m[1] + " (" + m[2] + ":" + (parseInt(m[3]) - ffOffset) + ":0)" : l;
					ff = ff || (m != null);
					var i = l.indexOf('__$');
					if (i >= 0 && !skip) {
						skip = true;
						return l.substring(0, i) + l.substring(i + 3) + '\n';
					}
					return skip ? '' : l + '\n';
				}).join('');
				if (ff) // firefox does not include message
				s = "Error: " + e.message + '\n' + s;
				for (var f = e.__frame; f; f = f.prev) {
					if (f.offset >= 0) s += "    at " + f.name + " (" + f.file + ":" + (f.line + f.offset) + ":" + f.col + ")\n"
				}
			}
			return s;
		};
		e.__frame = e.__frame || f;
		if (exports.stackTraceEnabled && e.__lookupGetter__ && e.__lookupGetter__("rawStack") == null) {
			var getter = e.__lookupGetter__("stack");
			if (!getter) { // FF or Safari case
				var raw = e.stack || "raw stack unavailable";
				getter = function() {
					return raw;
				}
			}
			e.__defineGetter__("rawStack", getter);
			e.__defineGetter__("stack", function() {
				return formatStack(e, getter());
			});
		}
	}

	/// * `runtime.stackTraceEnabled = true/false;`
	///   If true, `err.stack` returns the reconstructed _sync_ stack trace.
	///   Otherwise, it returns the _raw_ stack trace.
	///   The default is true, but you must require the flows module
	///   at least once to enable sync stack traces.
	exports.stackTraceEnabled = true;
	})(typeof exports !== 'undefined' ? exports : (window.StreamlineRuntime = window.StreamlineRuntime || {
	globals: {}
}));
require && require("streamline/lib/callbacks/builtins");
},{"../globals":25,"streamline/lib/callbacks/builtins":26}],27:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename); (function() {
  var arrayEqual, debugOn, errString, __slice = [].slice;


  exports.UUID_REG = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

  exports.addNull = function(cb) {
    return function() {
      var args;
      args = ((1 <= arguments.length) ? __slice.call(arguments, 0) : []);
      return cb.apply(this, [null,].concat(args)); }; };



  exports.dummy = function(e) {
    if ((e != null)) {
      throw e; } ; };



  exports.findElement = function(name, obj) {
    var elem, name_;
    for (name_ in obj) {
      elem = obj[name_];
      if ((name_.toLowerCase() === name)) {
        return elem; } ; }; };




  arrayEqual = function(a, b) {
    var element, index, _i, _len;
    if ((a === b)) {
      return true; } ;

    if ((a.length !== b.length)) {
      return false; } ;

    for (index = _i = 0, _len = a.length; (_i < _len); index = ++_i) {
      element = a[index];
      if ((element !== b[index])) {
        return false; } ; };


    return true; };


  exports.singlify = function(func) {
    var calls;
    calls = [];
    return function() {
      var args, call, caller, cb, _i, _len;
      cb = arguments[0], args = ((2 <= arguments.length) ? __slice.call(arguments, 1) : []);
      for (_i = 0, _len = calls.length; (_i < _len); _i++) {
        call = calls[_i];
        if ((arrayEqual(args, call.args) && (call.context === this))) {
          return call.cbs.push(cb); } ; };


      calls.push(call = {
        args: args,
        cbs: [cb,],
        context: this });

      caller = function() {
        var args, cl, _j, _len1, _ref, _results;
        args = ((1 <= arguments.length) ? __slice.call(arguments, 0) : []);
        calls = (function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = calls.length; (_j < _len1); _j++) {
            cl = calls[_j];
            if ((cl !== call)) {
              _results.push(cl); } ; };


          return _results;
        })();
        _ref = call.cbs;
        _results = [];
        for (_j = 0, _len1 = _ref.length; (_j < _len1); _j++) {
          cb = _ref[_j];
          _results.push(cb.apply(this, args)); };

        return _results; };

      return func.apply(this, [caller,].concat(args)); }; };



  debugOn = false;

  exports.enableDebugMode = function() {
    return debugOn = true; };


  errString = function() {
    var b, e, file, func, i, line, s, time, _i, _len, _ref;
    b = Error.prepareStackTrace;
    Error.prepareStackTrace = function(a, stack) {
      return stack; };

    e = new Error;
    Error.captureStackTrace(e, this);
    s = e.stack;
    Error.prepareStackTrace = b;
    time = new Date().toString().match(/\d+:\d+:\d+/)[0];
    file = s[2].getFileName().match(/\/(\w*).\w*$/)[1];
    line = s[2].getLineNumber();
    _ref = s.slice(2);
    for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
      i = _ref[_i];
      func = i.getFunctionName();
      if ((((func != null)) && !/throw2cb/.test(func))) {
        break; } ; };


    func = func.replace(/module.exports./, "");
    return ((((((("" + time) + " ") + func) + " in ") + file) + " at ") + line); };


  exports.debug = function() {
    var args;
    args = ((1 <= arguments.length) ? __slice.call(arguments, 0) : []);
    if (!debugOn) {
      return; } ;

    return console.log.apply(null, [errString(),].concat(args)); };


}).call(this);
})("/../../node_modules/libsecretarius/lib/util.js")
},{"streamline/lib/callbacks/runtime":28}],24:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var util, __indexOf = ([].indexOf || function(item) {
    for (var i = 0, l = this.length; (i < l); i++) { if (((i in this) && (this[i] === item))) { return i }; }; return -1;
  }), __hasProp = { }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = function(host) {
    var Inbox, InfoCache, ModelObject, PGObject, getInfos, httprequest, inBrowser, model, port, req, request, updatecb, _this = this;

    if ((host == null)) {
      host = "http://localhost:3000"; } ;

    model = { };
    inBrowser = ((typeof window !== "undefined") && (window !== null));
    ModelObject = (function() {
      var cbs;

      function ModelObject() {
        var _this = this;
        this.emit = function(event, data) {
          return ModelObject.prototype.emit.apply(_this, arguments); }; };



      ModelObject.prototype.on = function(event, cb) {
        if ((this._cbs == null)) {
          this._cbs = { }; } ;

        if ((this._cbs[event] == null)) {
          this._cbs[event] = []; } ;

        if ((__indexOf.call(this._cbs[event], cb) < 0)) {
          return this._cbs[event].push(cb); } ; };



      ModelObject.prototype.emit = function(event, data) {
        var cb, _i, _len, _ref, _ref1, _results;
        if ((((((_ref = this._cbs) != null) ? _ref[event] : void 0)) != null)) {
          _ref1 = this._cbs[event];
          _results = [];
          for (_i = 0, _len = _ref1.length; (_i < _len); _i++) {
            cb = _ref1[_i];
            _results.push(cb.call(this, data)); };

          return _results; } ; };



      ModelObject.prototype.removeCb = function(event, cb) {
        var elem;
        this._cbs[event] = (function() {
          var _i, _len, _ref, _results;
          _ref = this._cbs[event];
          _results = [];
          for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
            elem = _ref[_i];
            if ((elem !== cb)) {
              _results.push(elem); } ; };


          return _results;
        }).call(this);
        if ((this._cbs[event] === [])) {
          delete this._cbs[event]; } ;

        return debug(event, "callback removed", this.constructor.name); };


      ModelObject.prototype.onChanged = function(cb) {
        return this.on("changed", cb); };


      ModelObject.prototype.onDeleted = function(cb) {
        return this.on("deleted", cb); };


      ModelObject.prototype.change = function(data) {
        return this.emit("changed", data); };


      ModelObject.prototype["delete"] = function() {
        return this.emit("deleted"); };


      cbs = { };

      ModelObject.on = function(event, cb) {
        var obj;
        if ((cbs[this.name] == null)) {
          cbs[this.name] = { }; } ;

        obj = cbs[this.name];
        if ((obj[event] == null)) {
          obj[event] = []; } ;

        if ((__indexOf.call(obj[event], cb) < 0)) {
          return obj[event].push(cb); } ; };



      ModelObject.emit = function(event, data) {
        var cb, _i, _len, _ref, _ref1, _results;
        if ((((((_ref = cbs[this.name]) != null) ? _ref[event] : void 0)) != null)) {
          _ref1 = cbs[this.name][event];
          _results = [];
          for (_i = 0, _len = _ref1.length; (_i < _len); _i++) {
            cb = _ref1[_i];
            _results.push(cb(data)); };

          return _results; } ; };



      ModelObject.removeCb = function(event, cb) {
        var elem;
        cbs[this.name][event] = (function() {
          var _i, _len, _ref, _results;
          _ref = cbs[this.name][event];
          _results = [];
          for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
            elem = _ref[_i];
            if ((elem !== cb)) {
              _results.push(elem); } ; };


          return _results;
        }).call(this);
        if ((cbs[this.name][event] === [])) {
          delete cbs[this.name][event]; } ;

        return debug(event, "callback removed", this.name); };


      ModelObject.onChanged = function(cb) {
        return this.on("changed", cb); };


      ModelObject.onDeleted = function(cb) {
        return this.on("deleted", cb); };


      ModelObject.change = function(data) {
        return this.emit("changed", data); };


      return ModelObject;

    })();
    InfoCache = (function() {

      function InfoCache() {
        this.infos = { }; };


      InfoCache.prototype.registerInfo = function(info) {
        return this.infos[info.id] = info; };


      InfoCache.prototype["delete"] = function(id) {
        if ((this.infos[id] != null)) {
          this.infos[id]["delete"]();
          return this.unregisterInfo(this.infos[id]); } ; };



      InfoCache.prototype.unregisterInfo = function(info) {
        if ((((info.id != null)) && ((this.infos[info.id] != null)))) {
          return delete this.infos[info.id]; } ; };



      InfoCache.prototype.updateInfo = function(values) {
        return this.storeInfo(values, true); };


      InfoCache.prototype.storeInfo = function(values, mustExist) {
        var info;
        if ((mustExist == null)) {
          mustExist = false; } ;

        if (!(((((info = this.infos[values.id]) != null)) || mustExist))) {
          info = new (model.getClassByType(values.type))(values.id);
          this.registerInfo(info); } ;

        return ((info != null) ? info._store(values) : void 0); };


      InfoCache.prototype.getInformation = util.singlify(function __1(_, id) { var __this = this; var __frame = { name: "__1", line: 189 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function __$__1(__then) {
            if ((((id != null)) && util.UUID_REG.test(id))) { return (function __$__1(__then) {
                if ((__this.infos[id] == null)) {
                  return new model.Information(id)._get(__cb(_, __frame, 3, 27, function ___(__0, __1) { __this.storeInfo(__1); __then(); }, true)); } else { __then(); } ; })(function __$__1() {

                return _(null, __this.infos[id]); }); } else {

              return _(null, null); } ; })(_); }); });



      return InfoCache;

    })();
    model.cache = new InfoCache;
    updatecb = function(data, name) {
      switch (name) {
      case "changed": return model.cache.updateInfo(data);
      case "inbox":
        return model.inbox._store((function() {
         }), data); case "deleted":
        model.cache["delete"](data.id);
        return util.findElement(data.type, model).deleted(data.id);
      case "new":
        return util.findElement(data.type, model)["new"](data.id);
      }; };


    if (inBrowser) {
      port = new SharedWorker("events.js").port;
      port.addEventListener("message", function(event) {
        return updatecb(event.data.data, event.data.name); });

      port.start(); }
     else {
      req = require;
      req("./events")(updatecb); } ;

    getInfos = function getInfos__1(_, cls, filter, params) { var list, values, _i, _len; var __frame = { name: "getInfos__1", line: 227 }; return __func(_, this, arguments, getInfos__1, 0, __frame, function __$getInfos__1() {

        if ((params == null)) {
          params = { }; } ;

        params.filter = filter;
        return new cls()._get(__cb(_, __frame, 6, 13, function ___(__0, __1) { list = __1;
          for (_i = 0, _len = list.length; (_i < _len); _i++) {
            values = list[_i];
            model.cache.storeInfo(values); };

          return _(null, list); }, true), params); }); };

    if (inBrowser) {
      request = function(cb, type, data, url) {
        var options;
        options = {
          type: type,
          success: util.addNull(cb),
          dataType: "json" };

        if ((data != null)) {
          request.data = data; } ;

        return $.ajax(options); }; }

     else {
      httprequest = require("request");
      request = function request__2(_, type, data, url) { var options; var __frame = { name: "request__2", line: 255 }; return __func(_, this, arguments, request__2, 0, __frame, function __$request__2() {

          options = {
            method: type.toUpperCase(),
            url: ((("" + host) + "/") + url),
            json: true,
            form: data };

          return httprequest(options, __cb(_, __frame, 8, 15, function ___(__0, __2) { var __1 = __2.body; return _(null, __1); }, true)); }); }; } ;


    PGObject = (function(_super) {

      __extends(PGObject, _super);

      function PGObject(id) {
        this.id = id; };


      PGObject.prototype._get = function PGObject_prototype__get__1(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__get__1", line: 274 }; return __func(_, this, arguments, PGObject_prototype__get__1, 0, __frame, function __$PGObject_prototype__get__1() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "get", data, url); }); };


      PGObject.prototype._put = function PGObject_prototype__put__2(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__put__2", line: 278 }; return __func(_, this, arguments, PGObject_prototype__put__2, 0, __frame, function __$PGObject_prototype__put__2() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "put", data, url); }); };


      PGObject.prototype._delete = function PGObject_prototype__delete__3(_, url) { var __this = this; var __frame = { name: "PGObject_prototype__delete__3", line: 282 }; return __func(_, this, arguments, PGObject_prototype__delete__3, 0, __frame, function __$PGObject_prototype__delete__3() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "delete", url); }); };


      PGObject.prototype._patch = function PGObject_prototype__patch__4(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__patch__4", line: 286 }; return __func(_, this, arguments, PGObject_prototype__patch__4, 0, __frame, function __$PGObject_prototype__patch__4() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "patch", data, url); }); };


      PGObject.prototype._post = function PGObject_prototype__post__5(_, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__post__5", line: 290 }; return __func(_, this, arguments, PGObject_prototype__post__5, 0, __frame, function __$PGObject_prototype__post__5() {
          return __this._call(__cb(_, __frame, 1, 15, _, true), "post", data, url); }); };


      PGObject.prototype._call = function PGObject_prototype__call__6(_, type, data, url) { var __this = this; var __frame = { name: "PGObject_prototype__call__6", line: 294 }; return __func(_, this, arguments, PGObject_prototype__call__6, 0, __frame, function __$PGObject_prototype__call__6() {
          if ((url == null)) {
            url = __this._url(); } ;

          console.log((((((("" + (type.toUpperCase())) + " ") + url) + " (") + (((data != null) ? JSON.stringify(data) : ""))) + ")"));
          return request(__cb(_, __frame, 5, 15, _, true), type, data, url); }); };


      return PGObject;

    })(ModelObject);
    model.Information = (function(_super) {
      var ids;

      __extends(Information, _super);

      function Information(id) {
        var tempType;
        this.id = id;
        this.values = false;
        tempType = this.constructor.name.toLowerCase();
        if ((tempType !== "information")) {
          this.type = tempType; } ; };



      Information.prototype._create = function Information_prototype__create__1(_, args) { var __this = this; var __frame = { name: "Information_prototype__create__1", line: 320 }; return __func(_, this, arguments, Information_prototype__create__1, 0, __frame, function __$Information_prototype__create__1() {
          return __this._post(__cb(_, __frame, 1, 18, function ___(__0, __1) { __this.id = __1.id;
            model.cache.registerInfo(__this);
            return _(null, __this.id); }, true), args); }); };


      Information.prototype.addReference = function Information_prototype_addReference__2(_, reference) { var __this = this; var __frame = { name: "Information_prototype_addReference__2", line: 326 }; return __func(_, this, arguments, Information_prototype_addReference__2, 0, __frame, function __$Information_prototype_addReference__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "addReference",
            reference: reference.id }); }); };



      Information.prototype.removeReference = function Information_prototype_removeReference__3(_, reference) { var __this = this; var __frame = { name: "Information_prototype_removeReference__3", line: 333 }; return __func(_, this, arguments, Information_prototype_removeReference__3, 0, __frame, function __$Information_prototype_removeReference__3() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "removeReference",
            reference: reference.id }); }); };



      Information.prototype.getType = function Information_prototype_getType__4(_) { var __this = this; var __frame = { name: "Information_prototype_getType__4", line: 340 }; return __func(_, this, arguments, Information_prototype_getType__4, 0, __frame, function __$Information_prototype_getType__4() { return (function __$Information_prototype_getType__4(__then) {
            if ((__this.type == null)) {
              return __this._get(__cb(_, __frame, 2, 22, function ___(__0, __1) { __this.type = __1.type; __then(); }, true), {
                filter: "type" }); } else { __then(); } ; })(function __$Information_prototype_getType__4() {


            return _(null, __this.type); }); }); };


      Information.prototype.get = function Information_prototype_get__5(_) { var __this = this; var __frame = { name: "Information_prototype_get__5", line: 349 }; return __func(_, this, arguments, Information_prototype_get__5, 0, __frame, function __$Information_prototype_get__5() { return (function __$Information_prototype_get__5(__then) {
            if (!__this.values) {
              return __this._get(__cb(_, __frame, 2, 22, function ___(__0, __1) { __this._store(__1); __then(); }, true), values); } else { __then(); } ; })(function __$Information_prototype_get__5() { return _(null, __this); }); }); };




      Information.prototype.setStatus = function Information_prototype_setStatus__6(_, status) { var __this = this; var __frame = { name: "Information_prototype_setStatus__6", line: 356 }; return __func(_, this, arguments, Information_prototype_setStatus__6, 0, __frame, function __$Information_prototype_setStatus__6() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setStatus",
            status: status }); }); };



      Information.prototype.setDelay = function Information_prototype_setDelay__7(_, delay) { var __this = this; var __frame = { name: "Information_prototype_setDelay__7", line: 363 }; return __func(_, this, arguments, Information_prototype_setDelay__7, 0, __frame, function __$Information_prototype_setDelay__7() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setDelay",
            delay: delay }); }); };



      Information.prototype.attach = function Information_prototype_attach__8(_, file) { var __this = this; var __frame = { name: "Information_prototype_attach__8", line: 370 }; return __func(_, this, arguments, Information_prototype_attach__8, 0, __frame, function __$Information_prototype_attach__8() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "attach",
            file: file.id }); }); };



      Information.prototype.detach = function Information_prototype_detach__9(_, file) { var __this = this; var __frame = { name: "Information_prototype_detach__9", line: 377 }; return __func(_, this, arguments, Information_prototype_detach__9, 0, __frame, function __$Information_prototype_detach__9() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "detach",
            file: file.id }); }); };



      Information.prototype.getReferences = function Information_prototype_getReferences__10(_) { var __this = this; var __frame = { name: "Information_prototype_getReferences__10", line: 384 }; return __func(_, this, arguments, Information_prototype_getReferences__10, 0, __frame, function __$Information_prototype_getReferences__10() {
          return __this._get(__cb(_, __frame, 1, 15, _, true), {
            filter: "references" }); }); };



      Information.prototype._url = function() {
        return (("" + (((this.type != null) ? this.type : "information"))) + (((this.id != null) ? ("/" + this.id) : ""))); };


      Information.prototype._store = function(values) {
        var key, value;
        this.values = true;
        for (key in values) {
          value = values[key];
          this[key] = value; };

        return this.change(values); };


      Information.getAll = util.singlify(function __11(_) { var all, info, __this = this; var __frame = { name: "__11", line: 404 }; return __func(_, this, arguments, __11, 0, __frame, function __$__11() {

          return getInfos(__cb(_, __frame, 2, 14, function ___(__0, __2) { all = __2;








            return (function __1(_) { var _i, _len, _results; _results = []; for (_i = 0, _len = all.length; (_i < _len); _i++) { info = all[_i]; _results.push(info.id); }; return _(null, _results); })(__cb(_, __frame, 11, 32, function ___(__0, __4) { var __3 = ids[__this.name] = __4; return _(null, __3); }, true)); }, true), __this, "all"); }); });


      ids = [];

      Information.getAllIDs = util.singlify(function __12(_) { var __this = this; var __frame = { name: "__12", line: 420 }; return __func(_, this, arguments, __12, 0, __frame, function __$__12() { return (function __$__12(__then) {
            if ((ids[__this.name] == null)) {
              return __this.getAll(__cb(_, __frame, 2, 10, __then, true)); } else { __then(); } ; })(function __$__12() {

            return _(null, ids[__this.name]); }); }); });


      Information["new"] = function(id) {
        if (ids[this.name]) {
          ids[this.name].push(id);
          return this.change(ids[this.name]); } ; };



      Information.deleted = function(id) {
        var i;
        if (ids[this.name]) {
          ids[this.name] = (function() {
            var _i, _len, _ref, _results;
            _ref = ids[this.name];
            _results = [];
            for (_i = 0, _len = _ref.length; (_i < _len); _i++) {
              i = _ref[_i];
              if ((i !== id)) {
                _results.push(i); } ; };


            return _results;
          }).call(this);
          return this.change(ids[this.name]); } ; };



      return Information;

    })(PGObject);
    "class File extends PGObject\n	create: (name) ->\n	getName: ->\n	delete: ->";
    model.Note = (function(_super) {

      __extends(Note, _super);

      function Note() {
        return Note.__super__.constructor.apply(this, arguments); };


      Note.prototype.create = function Note_prototype_create__1(_, content) { var __this = this; var __frame = { name: "Note_prototype_create__1", line: 465 }; return __func(_, this, arguments, Note_prototype_create__1, 0, __frame, function __$Note_prototype_create__1() {
          return __this._create(__cb(_, __frame, 1, 15, _, true), {
            content: content }); }); };



      Note.prototype.setContent = function Note_prototype_setContent__2(_, content) { var __this = this; var __frame = { name: "Note_prototype_setContent__2", line: 471 }; return __func(_, this, arguments, Note_prototype_setContent__2, 0, __frame, function __$Note_prototype_setContent__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setContent",
            content: content }); }); };



      return Note;

    })(model.Information);
    model.Task = (function(_super) {

      __extends(Task, _super);

      function Task() {
        return Task.__super__.constructor.apply(this, arguments); };


      Task.prototype.done = function Task_prototype_done__1(_) { var __this = this; var __frame = { name: "Task_prototype_done__1", line: 489 }; return __func(_, this, arguments, Task_prototype_done__1, 0, __frame, function __$Task_prototype_done__1() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "done" }); }); };



      Task.prototype.undo = function Task_prototype_undo__2(_) { var __this = this; var __frame = { name: "Task_prototype_undo__2", line: 495 }; return __func(_, this, arguments, Task_prototype_undo__2, 0, __frame, function __$Task_prototype_undo__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "undo" }); }); };



      Task.prototype.setParent = function Task_prototype_setParent__3(_, parent) { var __this = this; var __frame = { name: "Task_prototype_setParent__3", line: 501 }; return __func(_, this, arguments, Task_prototype_setParent__3, 0, __frame, function __$Task_prototype_setParent__3() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            parent: ((parent != null) ? parent.id : void 0),
            method: "setParent" }); }); };



      Task.prototype.setDeadline = function Task_prototype_setDeadline__4(_, deadline) { var __this = this; var __frame = { name: "Task_prototype_setDeadline__4", line: 508 }; return __func(_, this, arguments, Task_prototype_setDeadline__4, 0, __frame, function __$Task_prototype_setDeadline__4() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setDeadline",
            deadline: deadline }); }); };



      Task.prototype.setDescription = function Task_prototype_setDescription__5(_, description) { var __this = this; var __frame = { name: "Task_prototype_setDescription__5", line: 515 }; return __func(_, this, arguments, Task_prototype_setDescription__5, 0, __frame, function __$Task_prototype_setDescription__5() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "setDescription",
            description: description }); }); };



      return Task;

    })(model.Information);
    model.Project = (function(_super) {

      __extends(Project, _super);

      function Project() {
        return Project.__super__.constructor.apply(this, arguments); };


      Project.prototype.create = function Project_prototype_create__1(_, description, referencing, parent) { var __this = this; var __frame = { name: "Project_prototype_create__1", line: 533 }; return __func(_, this, arguments, Project_prototype_create__1, 0, __frame, function __$Project_prototype_create__1() {
          if ((referencing == null)) {
            referencing = null; } ;

          if ((parent == null)) {
            parent = null; } ;

          return __this._create(__cb(_, __frame, 7, 15, _, true), {
            description: description,
            referencing: ((referencing != null) ? referencing.id : void 0),
            parent: ((parent != null) ? parent.id : void 0) }); }); };



      Project.prototype.collapse = function Project_prototype_collapse__2(_) { var __this = this; var __frame = { name: "Project_prototype_collapse__2", line: 547 }; return __func(_, this, arguments, Project_prototype_collapse__2, 0, __frame, function __$Project_prototype_collapse__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "collapse" }); }); };



      Project.prototype.uncollapse = function Project_prototype_uncollapse__3(_) { var __this = this; var __frame = { name: "Project_prototype_uncollapse__3", line: 553 }; return __func(_, this, arguments, Project_prototype_uncollapse__3, 0, __frame, function __$Project_prototype_uncollapse__3() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "uncollapse" }); }); };



      return Project;

    })(model.Task);
    model.Asap = (function(_super) {

      __extends(Asap, _super);

      function Asap() {
        return Asap.__super__.constructor.apply(this, arguments); };


      Asap.prototype.create = function Asap_prototype_create__1(_, description, list, referencing, project) { var __this = this; var __frame = { name: "Asap_prototype_create__1", line: 570 }; return __func(_, this, arguments, Asap_prototype_create__1, 0, __frame, function __$Asap_prototype_create__1() {
          if ((referencing == null)) {
            referencing = null; } ;

          if ((project == null)) {
            project = null; } ;

          return __this._create(__cb(_, __frame, 7, 15, _, true), {
            description: description,
            list: list.id,
            referencing: ((referencing != null) ? referencing.id : void 0),
            project: ((project != null) ? project.id : void 0) }); }); };



      Asap.prototype.setList = function Asap_prototype_setList__2(_, list) { var __this = this; var __frame = { name: "Asap_prototype_setList__2", line: 585 }; return __func(_, this, arguments, Asap_prototype_setList__2, 0, __frame, function __$Asap_prototype_setList__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            list: list.id,
            method: "setList" }); }); };



      return Asap;

    })(model.Task);
    model.AsapList = (function(_super) {

      __extends(AsapList, _super);

      function AsapList() {
        return AsapList.__super__.constructor.apply(this, arguments); };


      AsapList.prototype.create = function AsapList_prototype_create__1(_, name) { var __this = this; var __frame = { name: "AsapList_prototype_create__1", line: 603 }; return __func(_, this, arguments, AsapList_prototype_create__1, 0, __frame, function __$AsapList_prototype_create__1() {
          return __this._create(__cb(_, __frame, 1, 15, _, true), {
            name: name }); }); };



      AsapList.prototype.rename = function AsapList_prototype_rename__2(_, name) { var __this = this; var __frame = { name: "AsapList_prototype_rename__2", line: 609 }; return __func(_, this, arguments, AsapList_prototype_rename__2, 0, __frame, function __$AsapList_prototype_rename__2() {
          return __this._patch(__cb(_, __frame, 1, 15, _, true), {
            method: "rename",
            name: name }); }); };



      return AsapList;

    })(model.Information);
    "class model.SocialEntity extends model.Information\n	create: ->\n		\nclass Circle extends SocialEntity\n	create: (name) ->\n	@getByName: (name) =>\n	rename: (name) ->\n\nclass Contact extends SocialEntity\n	create: (nameMap) ->\n	setValues: (nameMap) ->\n	addAccount: (account, description=null, priority=0) ->\n	removeAccount: (account) ->\n	addAddress: (place, description=null) ->\n	removeAddress: (place) ->\n	enterCircle: (circle) ->\n	leaveCircle: (circle) ->\n\nclass Place extends Information\n\n	create: (valueMap) ->\n\n	setValues: (valueMap) ->\n	setParent: (place) ->\n	removeParent: ->\n\nclass Appointment extends Information\n\n	create: (description, date, time=null, length=null, referencing=null) ->\n\n	setValues: (valueMap) ->\n	\n	setPlace: (place) ->\n\n	addException: (appointment, exceptionMove='no') ->\n	removeException: (appointment) ->\n\n	addFilter: (type, value) ->\n	removeFilter: (type, value) ->\n\n	addParticipant: (participant) ->\n	removeParticipant: (participant) ->\n\nclass Protocol extends PGObject\n	@find: (name) ->\n	delete: ->\n\nclass Server extends PGObject\n	@find: (name, protocol) ->\n	delete: ->\n\nclass Communicator extends Information\n	create: (username, server) ->\n	changeServer: (server) ->\n	setValues: (valueMap) ->\n\nclass Account extends Communicator\n	create: (username, server) ->\n	@find: (username, server) ->\n	join: (room, role=null) ->\n	leave: (room, role=null) ->\n\nclass UserAccount extends Account\n	setValues: ->\n	create: (account) ->\n	downGrade: ->\n	@getAll: ->\n\nclass Room extends Communicator\n	create: (name) ->\n	setMOTD: (motd) ->\n\nclass Communication extends Information\n	create: (from, time=new Date()) ->\n	setSender: (from) ->\n	setTime: (time=new Date()) ->\n	send: ->\n	sent: ->\n	draft: ->\n	addRecipient: (recipient, mode, resource=null) ->\n	removeRecipient: (recipient, mode) ->\n	getToSend: (from) ->\n\nclass Message extends Communication\n	create: (from, subject=null, body=null, time=new Date()) ->\n	setValues: (valueMap) ->\n\nclass Presence extends Communication\n	create: (from, time=new Date()) ->\n	addResource: (resource) ->\n\nclass Resource extends PGObject\n	create: (name, status, message) ->\n	delete: ->\n\nclass Daemon extends PGObject\n	registrate: (name, status) ->\n	setStatus: (status) ->\n	setMessage: (message) ->\n	deregistrate: ->\n	@getAll: ->\n\nclass Maybe extends PGObject\n	getSize: ->\n	getList: ->";
    Inbox = (function(_super) {

      __extends(Inbox, _super);

      function Inbox() {
        return Inbox.__super__.constructor.apply(this, arguments); };


      Inbox.prototype.getSize = function Inbox_prototype_getSize__1(_) { var __this = this; var __frame = { name: "Inbox_prototype_getSize__1", line: 628 }; return __func(_, this, arguments, Inbox_prototype_getSize__1, 0, __frame, function __$Inbox_prototype_getSize__1() {
          return __this.get(__cb(_, __frame, 1, 15, function ___(__0, __2) { var __1 = __2.size; return _(null, __1); }, true)); }); };


      Inbox.prototype.getFirst = function Inbox_prototype_getFirst__2(_) { var __this = this; var __frame = { name: "Inbox_prototype_getFirst__2", line: 632 }; return __func(_, this, arguments, Inbox_prototype_getFirst__2, 0, __frame, function __$Inbox_prototype_getFirst__2() {
          return __this.get(__cb(_, __frame, 1, 15, function ___(__0, __2) { var __1 = __2.first; return _(null, __1); }, true)); }); };


      Inbox.prototype.get = util.singlify(function __3(_) { var __this = this; var __frame = { name: "__3", line: 636 }; return __func(_, this, arguments, __3, 0, __frame, function __$__3() { return (function __$__3(__then) {
            if ((__this.values == null)) {
              return __this._get(__cb(_, __frame, 2, 25, function ___(__0, __1) { return __this._store(__cb(_, __frame, 2, 10, __then, true), __1); }, true), null, "inbox"); } else { __then(); } ; })(function __$__3() {

            return _(null, __this.values); }); }); });


      Inbox.prototype._store = function Inbox_prototype__store__4(_, values) { var __this = this; var __frame = { name: "Inbox_prototype__store__4", line: 643 }; return __func(_, this, arguments, Inbox_prototype__store__4, 0, __frame, function __$Inbox_prototype__store__4() {
          __this.values = values; return (function __$Inbox_prototype__store__4(__then) {
            if ((__this.values.first != null)) {
              return model.cache.getInformation(__cb(_, __frame, 3, 30, function ___(__0, __1) { __this.values.first = __1; __then(); }, true), __this.values.first); } else { __then(); } ; })(function __$Inbox_prototype__store__4() {

            return _(null, __this.change(__this.values)); }); }); };


      return Inbox;

    })(PGObject);
    "class Urgent extends PGObject\n	 getSize: ->\n	 getList: ->";
    model.inbox = new Inbox;
    return model; };


  module.exports.util = util = require("./util");

}).call(this);
})("/../../node_modules/libsecretarius/lib/index.js")
},{"./util":27,"streamline/lib/callbacks/runtime":28,"request":29}],30:[function(require,module,exports){(function(global){/// !doc
/// 
/// # Container for global context
/// 
/// The `globals` module is a container for the global `context` object which is maintained across
/// asynchronous calls.
/// 
/// This context is very handy to store information that all calls should be able to access
/// but that you don't want to pass explicitly via function parameters. The most obvious example is
/// the `locale` that each request may set differently and that your low level libraries should
/// be able to retrieve to format messages.
/// 
/// `var globals = require('streamline/lib/globals')`
/// 
/// * `globals.context = ctx`
/// * `ctx = globals.context`  
///   sets and gets the context
/// 
/// Note: an empty context (`{}`) is automatically set by the server wrappers of the `streams` module,
/// before they dispatch a request. So, with these wrappers, each request starts with a fresh empty context.
// This module may be loaded several times so we need a true global (with a secret name!).
// This implementation also allows us to share the context between modules compiled in callback and fibers mode.
var glob = typeof global === "object" ? global : window;
var secret = "_20c7abceb95c4eb88b7ca1895b1170d1";
module.exports = (glob[secret] = (glob[secret] || {}));

})(window)
},{}],31:[function(require,module,exports){var punycode = { encode : function (s) { return s } };

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

function arrayIndexOf(array, subject) {
    for (var i = 0, j = array.length; i < j; i++) {
        if(array[i] == subject) return i;
    }
    return -1;
}

var objectKeys = Object.keys || function objectKeys(object) {
    if (object !== Object(object)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in object) if (object.hasOwnProperty(key)) keys[keys.length] = key;
    return keys;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]+$/,
    // RFC 2396: characters reserved for delimiting URLs.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '~', '[', ']', '`'].concat(delims),
    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''],
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#']
      .concat(unwise).concat(autoEscape),
    nonAuthChars = ['/', '@', '?', '#'].concat(delims),
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-zA-Z0-9][a-z0-9A-Z_-]{0,62}$/,
    hostnamePartStart = /^([a-zA-Z0-9][a-z0-9A-Z_-]{0,62})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always have a path component.
    pathedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof(url) === 'object' && url.href) return url;

  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var out = {},
      rest = url;

  // cut off any delimiters.
  // This is to support parse stuff like "<http://foo.com>"
  for (var i = 0, l = rest.length; i < l; i++) {
    if (arrayIndexOf(delims, rest.charAt(i)) === -1) break;
  }
  if (i !== 0) rest = rest.substr(i);


  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    out.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      out.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    // don't enforce full RFC correctness, just be unstupid about it.

    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the first @ sign, unless some non-auth character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    var atSign = arrayIndexOf(rest, '@');
    if (atSign !== -1) {
      // there *may be* an auth
      var hasAuth = true;
      for (var i = 0, l = nonAuthChars.length; i < l; i++) {
        var index = arrayIndexOf(rest, nonAuthChars[i]);
        if (index !== -1 && index < atSign) {
          // not a valid auth.  Something like http://foo.com/bar@baz/
          hasAuth = false;
          break;
        }
      }
      if (hasAuth) {
        // pluck off the auth portion.
        out.auth = rest.substr(0, atSign);
        rest = rest.substr(atSign + 1);
      }
    }

    var firstNonHost = -1;
    for (var i = 0, l = nonHostChars.length; i < l; i++) {
      var index = arrayIndexOf(rest, nonHostChars[i]);
      if (index !== -1 &&
          (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
    }

    if (firstNonHost !== -1) {
      out.host = rest.substr(0, firstNonHost);
      rest = rest.substr(firstNonHost);
    } else {
      out.host = rest;
      rest = '';
    }

    // pull out port.
    var p = parseHost(out.host);
    var keys = objectKeys(p);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      out[key] = p[key];
    }

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    out.hostname = out.hostname || '';

    // validate a little.
    if (out.hostname.length > hostnameMaxLen) {
      out.hostname = '';
    } else {
      var hostparts = out.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            out.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    // hostnames are always lower case.
    out.hostname = out.hostname.toLowerCase();

    // IDNA Support: Returns a puny coded representation of "domain".
    // It only converts the part of the domain name that
    // has non ASCII characters. I.e. it dosent matter if
    // you call it with a domain that already is in ASCII.
    var domainArray = out.hostname.split('.');
    var newOut = [];
    for (var i = 0; i < domainArray.length; ++i) {
      var s = domainArray[i];
      newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
          'xn--' + punycode.encode(s) : s);
    }
    out.hostname = newOut.join('.');

    out.host = (out.hostname || '') +
        ((out.port) ? ':' + out.port : '');
    out.href += out.host;
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }

    // Now make sure that delims never appear in a url.
    var chop = rest.length;
    for (var i = 0, l = delims.length; i < l; i++) {
      var c = arrayIndexOf(rest, delims[i]);
      if (c !== -1) {
        chop = Math.min(c, chop);
      }
    }
    rest = rest.substr(0, chop);
  }


  // chop off from the tail first.
  var hash = arrayIndexOf(rest, '#');
  if (hash !== -1) {
    // got a fragment string.
    out.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = arrayIndexOf(rest, '?');
  if (qm !== -1) {
    out.search = rest.substr(qm);
    out.query = rest.substr(qm + 1);
    if (parseQueryString) {
      out.query = querystring.parse(out.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    out.search = '';
    out.query = {};
  }
  if (rest) out.pathname = rest;
  if (slashedProtocol[proto] &&
      out.hostname && !out.pathname) {
    out.pathname = '/';
  }

  //to support http.request
  if (out.pathname || out.search) {
    out.path = (out.pathname ? out.pathname : '') +
               (out.search ? out.search : '');
  }

  // finally, reconstruct the href based on what has been validated.
  out.href = urlFormat(out);
  return out;
}

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (typeof(obj) === 'string') obj = urlParse(obj);

  var auth = obj.auth || '';
  if (auth) {
    auth = auth.split('@').join('%40');
    for (var i = 0, l = nonAuthChars.length; i < l; i++) {
      var nAC = nonAuthChars[i];
      auth = auth.split(nAC).join(encodeURIComponent(nAC));
    }
    auth += '@';
  }

  var protocol = obj.protocol || '',
      host = (obj.host !== undefined) ? auth + obj.host :
          obj.hostname !== undefined ? (
              auth + obj.hostname +
              (obj.port ? ':' + obj.port : '')
          ) :
          false,
      pathname = obj.pathname || '',
      query = obj.query &&
              ((typeof obj.query === 'object' &&
                objectKeys(obj.query).length) ?
                 querystring.stringify(obj.query) :
                 '') || '',
      search = obj.search || (query && ('?' + query)) || '',
      hash = obj.hash || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (obj.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  return protocol + host + pathname + search + hash;
}

function urlResolve(source, relative) {
  return urlFormat(urlResolveObject(source, relative));
}

function urlResolveObject(source, relative) {
  if (!source) return relative;

  source = urlParse(urlFormat(source), false, true);
  relative = urlParse(urlFormat(relative), false, true);

  // hash is always overridden, no matter what.
  source.hash = relative.hash;

  if (relative.href === '') {
    source.href = urlFormat(source);
    return source;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    relative.protocol = source.protocol;
    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[relative.protocol] &&
        relative.hostname && !relative.pathname) {
      relative.path = relative.pathname = '/';
    }
    relative.href = urlFormat(relative);
    return relative;
  }

  if (relative.protocol && relative.protocol !== source.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      relative.href = urlFormat(relative);
      return relative;
    }
    source.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      relative.pathname = relPath.join('/');
    }
    source.pathname = relative.pathname;
    source.search = relative.search;
    source.query = relative.query;
    source.host = relative.host || '';
    source.auth = relative.auth;
    source.hostname = relative.hostname || relative.host;
    source.port = relative.port;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.slashes = source.slashes || relative.slashes;
    source.href = urlFormat(source);
    return source;
  }

  var isSourceAbs = (source.pathname && source.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host !== undefined ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (source.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = source.pathname && source.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = source.protocol &&
          !slashedProtocol[source.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // source.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {

    delete source.hostname;
    delete source.port;
    if (source.host) {
      if (srcPath[0] === '') srcPath[0] = source.host;
      else srcPath.unshift(source.host);
    }
    delete source.host;
    if (relative.protocol) {
      delete relative.hostname;
      delete relative.port;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      delete relative.host;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    source.host = (relative.host || relative.host === '') ?
                      relative.host : source.host;
    source.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : source.hostname;
    source.search = relative.search;
    source.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    source.search = relative.search;
    source.query = relative.query;
  } else if ('search' in relative) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      source.hostname = source.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = source.host && arrayIndexOf(source.host, '@') > 0 ?
                       source.host.split('@') : false;
      if (authInHost) {
        source.auth = authInHost.shift();
        source.host = source.hostname = authInHost.shift();
      }
    }
    source.search = relative.search;
    source.query = relative.query;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.href = urlFormat(source);
    return source;
  }
  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    delete source.pathname;
    //to support http.request
    if (!source.search) {
      source.path = '/' + source.search;
    } else {
      delete source.path;
    }
    source.href = urlFormat(source);
    return source;
  }
  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (source.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    source.hostname = source.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = source.host && arrayIndexOf(source.host, '@') > 0 ?
                     source.host.split('@') : false;
    if (authInHost) {
      source.auth = authInHost.shift();
      source.host = source.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (source.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  source.pathname = srcPath.join('/');
  //to support request.http
  if (source.pathname !== undefined || source.search !== undefined) {
    source.path = (source.pathname ? source.pathname : '') +
                  (source.search ? source.search : '');
  }
  source.auth = relative.auth || source.auth;
  source.slashes = source.slashes || relative.slashes;
  source.href = urlFormat(source);
  return source;
}

function parseHost(host) {
  var out = {};
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    out.port = port.substr(1);
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}

},{"querystring":32}],33:[function(require,module,exports){var events = require('events');

exports.isArray = isArray;
exports.isDate = function(obj){return Object.prototype.toString.call(obj) === '[object Date]'};
exports.isRegExp = function(obj){return Object.prototype.toString.call(obj) === '[object RegExp]'};


exports.print = function () {};
exports.puts = function () {};
exports.debug = function() {};

exports.inspect = function(obj, showHidden, depth, colors) {
  var seen = [];

  var stylize = function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
          'italic' : [3, 23],
          'underline' : [4, 24],
          'inverse' : [7, 27],
          'white' : [37, 39],
          'grey' : [90, 39],
          'black' : [30, 39],
          'blue' : [34, 39],
          'cyan' : [36, 39],
          'green' : [32, 39],
          'magenta' : [35, 39],
          'red' : [31, 39],
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\033[' + styles[style][0] + 'm' + str +
             '\033[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  };
  if (! colors) {
    stylize = function(str, styleType) { return str; };
  }

  function format(value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (value && typeof value.inspect === 'function' &&
        // Filter out the util module, it's inspect function is special
        value !== exports &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      return value.inspect(recurseTimes);
    }

    // Primitive types cannot have properties
    switch (typeof value) {
      case 'undefined':
        return stylize('undefined', 'undefined');

      case 'string':
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return stylize(simple, 'string');

      case 'number':
        return stylize('' + value, 'number');

      case 'boolean':
        return stylize('' + value, 'boolean');
    }
    // For some reason typeof null is "object", so special case here.
    if (value === null) {
      return stylize('null', 'null');
    }

    // Look up the keys of the object.
    var visible_keys = Object_keys(value);
    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;

    // Functions without properties can be shortcutted.
    if (typeof value === 'function' && keys.length === 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        var name = value.name ? ': ' + value.name : '';
        return stylize('[Function' + name + ']', 'special');
      }
    }

    // Dates without properties can be shortcutted
    if (isDate(value) && keys.length === 0) {
      return stylize(value.toUTCString(), 'date');
    }

    var base, type, braces;
    // Determine the object type
    if (isArray(value)) {
      type = 'Array';
      braces = ['[', ']'];
    } else {
      type = 'Object';
      braces = ['{', '}'];
    }

    // Make functions say that they are functions
    if (typeof value === 'function') {
      var n = value.name ? ': ' + value.name : '';
      base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
    } else {
      base = '';
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + value.toUTCString();
    }

    if (keys.length === 0) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        return stylize('[Object]', 'special');
      }
    }

    seen.push(value);

    var output = keys.map(function(key) {
      var name, str;
      if (value.__lookupGetter__) {
        if (value.__lookupGetter__(key)) {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Getter/Setter]', 'special');
          } else {
            str = stylize('[Getter]', 'special');
          }
        } else {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Setter]', 'special');
          }
        }
      }
      if (visible_keys.indexOf(key) < 0) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (seen.indexOf(value[key]) < 0) {
          if (recurseTimes === null) {
            str = format(value[key]);
          } else {
            str = format(value[key], recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (isArray(value)) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = stylize('[Circular]', 'special');
        }
      }
      if (typeof name === 'undefined') {
        if (type === 'Array' && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    });

    seen.pop();

    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.length + 1;
    }, 0);

    if (length > 50) {
      output = braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];

    } else {
      output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    return output;
  }
  return format(obj, (typeof depth === 'undefined' ? 2 : depth));
};


function isArray(ar) {
  return ar instanceof Array ||
         Array.isArray(ar) ||
         (ar && ar !== Object.prototype && isArray(ar.__proto__));
}


function isRegExp(re) {
  return re instanceof RegExp ||
    (typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]');
}


function isDate(d) {
  if (d instanceof Date) return true;
  if (typeof d !== 'object') return false;
  var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
  var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
  return JSON.stringify(proto) === JSON.stringify(properties);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

exports.log = function (msg) {};

exports.pump = null;

var Object_keys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
};

var Object_create = Object.create || function (prototype, properties) {
    // from es5-shim
    var object;
    if (prototype === null) {
        object = { '__proto__' : null };
    }
    else {
        if (typeof prototype !== 'object') {
            throw new TypeError(
                'typeof prototype[' + (typeof prototype) + '] != \'object\''
            );
        }
        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
    }
    if (typeof properties !== 'undefined' && Object.defineProperties) {
        Object.defineProperties(object, properties);
    }
    return object;
};

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object_create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(exports.inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for(var x = args[i]; i < len; x = args[++i]){
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + exports.inspect(x);
    }
  }
  return str;
};

},{"events":34}],35:[function(require,module,exports){var events = require('events');
var util = require('util');

function Stream() {
  events.EventEmitter.call(this);
}
util.inherits(Stream, events.EventEmitter);
module.exports = Stream;
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once, and
  // only when all sources have ended.
  if (!dest._isStdio && (!options || options.end !== false)) {
    dest._pipeCount = dest._pipeCount || 0;
    dest._pipeCount++;

    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest._pipeCount--;

    // remove the listeners
    cleanup();

    if (dest._pipeCount > 0) {
      // waiting for other incoming streams to end.
      return;
    }

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest._pipeCount--;

    // remove the listeners
    cleanup();

    if (dest._pipeCount > 0) {
      // waiting for other incoming streams to end.
      return;
    }

    dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (this.listeners('error').length === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('end', cleanup);
    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":34,"util":33}],32:[function(require,module,exports){var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    };

var objectKeys = Object.keys || function objectKeys(object) {
    if (object !== Object(object)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in object) if (object.hasOwnProperty(key)) keys[keys.length] = key;
    return keys;
}


/*!
 * querystring
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.3.1';

/**
 * Object#toString() ref for stringify().
 */

var toString = Object.prototype.toString;

/**
 * Cache non-integer test regexp.
 */

var notint = /[^0-9]/;

/**
 * Parse the given query `str`, returning an object.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if (null == str || '' == str) return {};

  function promote(parent, key) {
    if (parent[key].length == 0) return parent[key] = {};
    var t = {};
    for (var i in parent[key]) t[i] = parent[key][i];
    parent[key] = t;
    return t;
  }

  return String(str)
    .split('&')
    .reduce(function(ret, pair){
      try{ 
        pair = decodeURIComponent(pair.replace(/\+/g, ' '));
      } catch(e) {
        // ignore
      }

      var eql = pair.indexOf('=')
        , brace = lastBraceInKey(pair)
        , key = pair.substr(0, brace || eql)
        , val = pair.substr(brace || eql, pair.length)
        , val = val.substr(val.indexOf('=') + 1, val.length)
        , parent = ret;

      // ?foo
      if ('' == key) key = pair, val = '';

      // nested
      if (~key.indexOf(']')) {
        var parts = key.split('[')
          , len = parts.length
          , last = len - 1;

        function parse(parts, parent, key) {
          var part = parts.shift();

          // end
          if (!part) {
            if (isArray(parent[key])) {
              parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
              parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
              parent[key] = val;
            } else {
              parent[key] = [parent[key], val];
            }
          // array
          } else {
            obj = parent[key] = parent[key] || [];
            if (']' == part) {
              if (isArray(obj)) {
                if ('' != val) obj.push(val);
              } else if ('object' == typeof obj) {
                obj[objectKeys(obj).length] = val;
              } else {
                obj = parent[key] = [parent[key], val];
              }
            // prop
            } else if (~part.indexOf(']')) {
              part = part.substr(0, part.length - 1);
              if(notint.test(part) && isArray(obj)) obj = promote(parent, key);
              parse(parts, obj, part);
            // key
            } else {
              if(notint.test(part) && isArray(obj)) obj = promote(parent, key);
              parse(parts, obj, part);
            }
          }
        }

        parse(parts, parent, 'base');
      // optimize
      } else {
        if (notint.test(key) && isArray(parent.base)) {
          var t = {};
          for(var k in parent.base) t[k] = parent.base[k];
          parent.base = t;
        }
        set(parent.base, key, val);
      }

      return ret;
    }, {base: {}}).base;
};

/**
 * Turn the given `obj` into a query string
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

var stringify = exports.stringify = function(obj, prefix) {
  if (isArray(obj)) {
    return stringifyArray(obj, prefix);
  } else if ('[object Object]' == toString.call(obj)) {
    return stringifyObject(obj, prefix);
  } else if ('string' == typeof obj) {
    return stringifyString(obj, prefix);
  } else {
    return prefix;
  }
};

/**
 * Stringify the given `str`.
 *
 * @param {String} str
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyString(str, prefix) {
  if (!prefix) throw new TypeError('stringify expects an object');
  return prefix + '=' + encodeURIComponent(str);
}

/**
 * Stringify the given `arr`.
 *
 * @param {Array} arr
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyArray(arr, prefix) {
  var ret = [];
  if (!prefix) throw new TypeError('stringify expects an object');
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[]'));
  }
  return ret.join('&');
}

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyObject(obj, prefix) {
  var ret = []
    , keys = objectKeys(obj)
    , key;
  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    ret.push(stringify(obj[key], prefix
      ? prefix + '[' + encodeURIComponent(key) + ']'
      : encodeURIComponent(key)));
  }
  return ret.join('&');
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (undefined === v) {
    obj[key] = val;
  } else if (isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length
    , brace
    , c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' == c) brace = false;
    if ('[' == c) brace = true;
    if ('=' == c && !brace) return i;
  }
}

},{}],36:[function(require,module,exports){var http = require('http');

var https = module.exports;

for (var key in http) {
    if (http.hasOwnProperty(key)) https[key] = http[key];
};

https.request = function (params, cb) {
    if (!params) params = {};
    params.scheme = 'https';
    return http.request.call(this, params, cb);
}
},{"http":37}],38:[function(require,module,exports){// todo

},{}],37:[function(require,module,exports){var http = module.exports;
var EventEmitter = require('events').EventEmitter;
var Request = require('./lib/request');

http.request = function (params, cb) {
    if (!params) params = {};
    if (!params.host) params.host = window.location.host.split(':')[0];
    if (!params.port) params.port = window.location.port;
    
    var req = new Request(new xhrHttp, params);
    if (cb) req.on('response', cb);
    return req;
};

http.get = function (params, cb) {
    params.method = 'GET';
    var req = http.request(params, cb);
    req.end();
    return req;
};

http.Agent = function () {};
http.Agent.defaultMaxSockets = 4;

var xhrHttp = (function () {
    if (typeof window === 'undefined') {
        throw new Error('no window object present');
    }
    else if (window.XMLHttpRequest) {
        return window.XMLHttpRequest;
    }
    else if (window.ActiveXObject) {
        var axs = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Microsoft.XMLHTTP'
        ];
        for (var i = 0; i < axs.length; i++) {
            try {
                var ax = new(window.ActiveXObject)(axs[i]);
                return function () {
                    if (ax) {
                        var ax_ = ax;
                        ax = null;
                        return ax_;
                    }
                    else {
                        return new(window.ActiveXObject)(axs[i]);
                    }
                };
            }
            catch (e) {}
        }
        throw new Error('ajax not supported in this browser')
    }
    else {
        throw new Error('ajax not supported in this browser');
    }
})();

},{"events":34,"./lib/request":39}],40:[function(require,module,exports){var sha = require('./sha')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: {
    hex: sha.hex_sha1,
    binary: sha.b64_sha1,
    ascii: sha.str_sha1
  },
  md5: {
    hex: md5.hex_md5,
    binary: md5.b64_md5,
    ascii: md5.any_md5
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) {
  alg = alg || 'sha1'
  if(!algorithms[alg])
    error('algorithm:', alg, 'is not yet supported')
  var s = ''
  var _alg = algorithms[alg]
  return {
    update: function (data) {
      s += data
      return this
    },
    digest: function (enc) {
      enc = enc || 'binary'
      var fn
      if(!(fn = _alg[enc]))
        error('encoding:', enc , 'is not yet supported for algorithm', alg)
      var r = fn(s)
      s = null //not meant to use the hash after you've called digest.
      return r
    }
  }
}

exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, rng(size));
    } catch (err) { callback(err); }
  } else {
    return rng(size);
  }
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
;['createCredentials'
, 'createHmac'
, 'createCypher'
, 'createCypheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDeffieHellman'
, 'pbkdf2'].forEach(function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./sha":41,"./rng":42,"./md5":43}],44:[function(require,module,exports){var crypto = require('crypto')
  , qs = require('querystring')
  ;

function sha1 (key, body) {
  return crypto.createHmac('sha1', key).update(body).digest('base64')
}

function rfc3986 (str) {
  return encodeURIComponent(str)
    .replace(/!/g,'%21')
    .replace(/\*/g,'%2A')
    .replace(/\(/g,'%28')
    .replace(/\)/g,'%29')
    .replace(/'/g,'%27')
    ;
}

function hmacsign (httpMethod, base_uri, params, consumer_secret, token_secret) {
  // adapted from https://dev.twitter.com/docs/auth/oauth and 
  // https://dev.twitter.com/docs/auth/creating-signature

  var querystring = Object.keys(params).sort().map(function(key){
    // big WTF here with the escape + encoding but it's what twitter wants
    return escape(rfc3986(key)) + "%3D" + escape(rfc3986(params[key]))
  }).join('%26')

  var base = [
    httpMethod ? httpMethod.toUpperCase() : 'GET',
    rfc3986(base_uri),
    querystring
  ].join('&')

  var key = [
    consumer_secret,
    token_secret || ''
  ].map(rfc3986).join('&')

  return sha1(key, base)
}

exports.hmacsign = hmacsign
exports.rfc3986 = rfc3986

},{"crypto":40,"querystring":32}],45:[function(require,module,exports){module.exports = function () {
  var s = [], itoh = '0123456789ABCDEF'
 
  // Make array of random hex digits. The UUID only has 32 digits in it, but we
  // allocate an extra items to make room for the '-'s we'll be inserting.
  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10)
 
  // Conform to RFC-4122, section 4.4
  s[14] = 4;  // Set 4 high bits of time_high field to version
  s[19] = (s[19] & 0x3) | 0x8  // Specify 2 high bits of clock sequence
 
  // Convert to hex chars
  for (var i = 0; i <36; i++) s[i] = itoh[s[i]]
 
  // Insert '-'s
  s[8] = s[13] = s[18] = s[23] = '-'
 
  return s.join('')
}

},{}],46:[function(require,module,exports){module.exports = ForeverAgent
ForeverAgent.SSL = ForeverAgentSSL

var util = require('util')
  , Agent = require('http').Agent
  , net = require('net')
  , tls = require('tls')
  , AgentSSL = require('https').Agent

function ForeverAgent(options) {
  var self = this
  self.options = options || {}
  self.requests = {}
  self.sockets = {}
  self.freeSockets = {}
  self.maxSockets = self.options.maxSockets || Agent.defaultMaxSockets
  self.minSockets = self.options.minSockets || ForeverAgent.defaultMinSockets
  self.on('free', function(socket, host, port) {
    var name = host + ':' + port
    if (self.requests[name] && self.requests[name].length) {
      self.requests[name].shift().onSocket(socket)
    } else if (self.sockets[name].length < self.minSockets) {
      if (!self.freeSockets[name]) self.freeSockets[name] = []
      self.freeSockets[name].push(socket)
      
      // if an error happens while we don't use the socket anyway, meh, throw the socket away
      function onIdleError() {
        socket.destroy()
      }
      socket._onIdleError = onIdleError
      socket.on('error', onIdleError)
    } else {
      // If there are no pending requests just destroy the
      // socket and it will get removed from the pool. This
      // gets us out of timeout issues and allows us to
      // default to Connection:keep-alive.
      socket.destroy()
    }
  })

}
util.inherits(ForeverAgent, Agent)

ForeverAgent.defaultMinSockets = 5


ForeverAgent.prototype.createConnection = net.createConnection
ForeverAgent.prototype.addRequestNoreuse = Agent.prototype.addRequest
ForeverAgent.prototype.addRequest = function(req, host, port) {
  var name = host + ':' + port
  if (this.freeSockets[name] && this.freeSockets[name].length > 0 && !req.useChunkedEncodingByDefault) {
    var idleSocket = this.freeSockets[name].pop()
    idleSocket.removeListener('error', idleSocket._onIdleError)
    delete idleSocket._onIdleError
    req._reusedSocket = true
    req.onSocket(idleSocket)
  } else {
    this.addRequestNoreuse(req, host, port)
  }
}

ForeverAgent.prototype.removeSocket = function(s, name, host, port) {
  if (this.sockets[name]) {
    var index = this.sockets[name].indexOf(s)
    if (index !== -1) {
      this.sockets[name].splice(index, 1)
    }
  } else if (this.sockets[name] && this.sockets[name].length === 0) {
    // don't leak
    delete this.sockets[name]
    delete this.requests[name]
  }
  
  if (this.freeSockets[name]) {
    var index = this.freeSockets[name].indexOf(s)
    if (index !== -1) {
      this.freeSockets[name].splice(index, 1)
      if (this.freeSockets[name].length === 0) {
        delete this.freeSockets[name]
      }
    }
  }

  if (this.requests[name] && this.requests[name].length) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(name, host, port).emit('free')
  }
}

function ForeverAgentSSL (options) {
  ForeverAgent.call(this, options)
}
util.inherits(ForeverAgentSSL, ForeverAgent)

ForeverAgentSSL.prototype.createConnection = createConnectionSSL
ForeverAgentSSL.prototype.addRequestNoreuse = AgentSSL.prototype.addRequest

function createConnectionSSL (port, host, options) {
  options.port = port
  options.host = host
  return tls.connect(options)
}

},{"util":33,"http":37,"net":47,"tls":38,"https":36}],48:[function(require,module,exports){/*!
* Tobi - CookieJar
* Copyright(c) 2010 LearnBoost <dev@learnboost.com>
* MIT Licensed
*/

/**
* Module dependencies.
*/

var url = require('url');

/**
* Initialize a new `CookieJar`.
*
* @api private
*/

var CookieJar = exports = module.exports = function CookieJar() {
  this.cookies = [];
};

/**
* Add the given `cookie` to the jar.
*
* @param {Cookie} cookie
* @api private
*/

CookieJar.prototype.add = function(cookie){
  this.cookies = this.cookies.filter(function(c){
    // Avoid duplication (same path, same name)
    return !(c.name == cookie.name && c.path == cookie.path);
  });
  this.cookies.push(cookie);
};

/**
* Get cookies for the given `req`.
*
* @param {IncomingRequest} req
* @return {Array}
* @api private
*/

CookieJar.prototype.get = function(req){
  var path = url.parse(req.url).pathname
    , now = new Date
    , specificity = {};
  return this.cookies.filter(function(cookie){
    if (0 == path.indexOf(cookie.path) && now < cookie.expires
      && cookie.path.length > (specificity[cookie.name] || 0))
      return specificity[cookie.name] = cookie.path.length;
  });
};

/**
* Return Cookie string for the given `req`.
*
* @param {IncomingRequest} req
* @return {String}
* @api private
*/

CookieJar.prototype.cookieString = function(req){
  var cookies = this.get(req);
  if (cookies.length) {
    return cookies.map(function(cookie){
      return cookie.name + '=' + cookie.value;
    }).join('; ');
  }
};

},{"url":31}],49:[function(require,module,exports){// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],50:[function(require,module,exports){(function(process){'use strict'

var net = require('net')
  , tls = require('tls')
  , http = require('http')
  , https = require('https')
  , events = require('events')
  , assert = require('assert')
  , util = require('util')
  ;

exports.httpOverHttp = httpOverHttp
exports.httpsOverHttp = httpsOverHttp
exports.httpOverHttps = httpOverHttps
exports.httpsOverHttps = httpsOverHttps


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options)
  agent.request = http.request
  return agent
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options)
  agent.request = http.request
  agent.createSocket = createSecureSocket
  return agent
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options)
  agent.request = https.request
  return agent
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options)
  agent.request = https.request
  agent.createSocket = createSecureSocket
  return agent
}


function TunnelingAgent(options) {
  var self = this
  self.options = options || {}
  self.proxyOptions = self.options.proxy || {}
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets
  self.requests = []
  self.sockets = []

  self.on('free', function onFree(socket, host, port) {
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i]
      if (pending.host === host && pending.port === port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1)
        pending.request.onSocket(socket)
        return
      }
    }
    socket.destroy()
    self.removeSocket(socket)
  })
}
util.inherits(TunnelingAgent, events.EventEmitter)

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port) {
  var self = this

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push({host: host, port: port, request: req})
    return
  }

  // If we are under maxSockets create a new one.
  self.createSocket({host: host, port: port, request: req}, function(socket) {
    socket.on('free', onFree)
    socket.on('close', onCloseOrRemove)
    socket.on('agentRemove', onCloseOrRemove)
    req.onSocket(socket)

    function onFree() {
      self.emit('free', socket, host, port)
    }

    function onCloseOrRemove(err) {
      self.removeSocket()
      socket.removeListener('free', onFree)
      socket.removeListener('close', onCloseOrRemove)
      socket.removeListener('agentRemove', onCloseOrRemove)
    }
  })
}

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this
  var placeholder = {}
  self.sockets.push(placeholder)

  var connectOptions = mergeOptions({}, self.proxyOptions, 
    { method: 'CONNECT'
    , path: options.host + ':' + options.port
    , agent: false
    }
  )
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {}
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64')
  }

  debug('making CONNECT request')
  var connectReq = self.request(connectOptions)
  connectReq.useChunkedEncodingByDefault = false // for v0.6
  connectReq.once('response', onResponse) // for v0.6
  connectReq.once('upgrade', onUpgrade)   // for v0.6
  connectReq.once('connect', onConnect)   // for v0.7 or later
  connectReq.once('error', onError)
  connectReq.end()

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head)
    })
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners()
    socket.removeAllListeners()

    if (res.statusCode === 200) {
      assert.equal(head.length, 0)
      debug('tunneling connection has established')
      self.sockets[self.sockets.indexOf(placeholder)] = socket
      cb(socket)
    } else {
      debug('tunneling socket could not be established, statusCode=%d', res.statusCode)
      var error = new Error('tunneling socket could not be established, ' + 'statusCode=' + res.statusCode)
      error.code = 'ECONNRESET'
      options.request.emit('error', error)
      self.removeSocket(placeholder)
    }
  }

  function onError(cause) {
    connectReq.removeAllListeners()

    debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack)
    var error = new Error('tunneling socket could not be established, ' + 'cause=' + cause.message)
    error.code = 'ECONNRESET'
    options.request.emit('error', error)
    self.removeSocket(placeholder)
  }
}

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) return
  
  this.sockets.splice(pos, 1)

  var pending = this.requests.shift()
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket)
    })
  }
}

function createSecureSocket(options, cb) {
  var self = this
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, mergeOptions({}, self.options, 
      { servername: options.host
      , socket: socket
      }
    ))
    cb(secureSocket)
  })
}


function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i]
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides)
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j]
        if (overrides[k] !== undefined) {
          target[k] = overrides[k]
        }
      }
    }
  }
  return target
}


var debug
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments)
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0]
    } else {
      args.unshift('TUNNEL:')
    }
    console.error.apply(console, args)
  }
} else {
  debug = function() {}
}
exports.debug = debug // for test

})(require("__browserify_process"))
},{"net":47,"tls":38,"http":37,"https":36,"events":34,"assert":51,"util":33,"__browserify_process":49}],52:[function(require,module,exports){
/*!
 * knox - auth
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var crypto = require('crypto')
  , parse = require('url').parse
  ;

/**
 * Valid keys.
 */

var keys = 
  [ 'acl'
  , 'location'
  , 'logging'
  , 'notification'
  , 'partNumber'
  , 'policy'
  , 'requestPayment'
  , 'torrent'
  , 'uploadId'
  , 'uploads'
  , 'versionId'
  , 'versioning'
  , 'versions'
  , 'website'
  ]

/**
 * Return an "Authorization" header value with the given `options`
 * in the form of "AWS <key>:<signature>"
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

exports.authorization = function(options){
  return 'AWS ' + options.key + ':' + exports.sign(options)
}

/**
 * Simple HMAC-SHA1 Wrapper
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */ 

exports.hmacSha1 = function(options){
  return crypto.createHmac('sha1', options.secret).update(options.message).digest('base64')
}

/**
 * Create a base64 sha1 HMAC for `options`. 
 * 
 * @param {Object} options
 * @return {String}
 * @api private
 */

exports.sign = function(options){
  options.message = exports.stringToSign(options)
  return exports.hmacSha1(options)
}

/**
 * Create a base64 sha1 HMAC for `options`. 
 *
 * Specifically to be used with S3 presigned URLs
 * 
 * @param {Object} options
 * @return {String}
 * @api private
 */

exports.signQuery = function(options){
  options.message = exports.queryStringToSign(options)
  return exports.hmacSha1(options)
}

/**
 * Return a string for sign() with the given `options`.
 *
 * Spec:
 * 
 *    <verb>\n
 *    <md5>\n
 *    <content-type>\n
 *    <date>\n
 *    [headers\n]
 *    <resource>
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

exports.stringToSign = function(options){
  var headers = options.amazonHeaders || ''
  if (headers) headers += '\n'
  var r = 
    [ options.verb
    , options.md5
    , options.contentType
    , options.date.toUTCString()
    , headers + options.resource
    ]
  return r.join('\n')
}

/**
 * Return a string for sign() with the given `options`, but is meant exclusively
 * for S3 presigned URLs
 *
 * Spec:
 * 
 *    <date>\n
 *    <resource>
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

exports.queryStringToSign = function(options){
  return 'GET\n\n\n' + options.date + '\n' + options.resource
};

/**
 * Perform the following:
 *
 *  - ignore non-amazon headers
 *  - lowercase fields
 *  - sort lexicographically
 *  - trim whitespace between ":"
 *  - join with newline
 *
 * @param {Object} headers
 * @return {String}
 * @api private
 */

exports.canonicalizeHeaders = function(headers){
  var buf = []
    , fields = Object.keys(headers)
    ;
  for (var i = 0, len = fields.length; i < len; ++i) {
    var field = fields[i]
      , val = headers[field]
      , field = field.toLowerCase()
      ;
    if (0 !== field.indexOf('x-amz')) continue
    buf.push(field + ':' + val)
  }
  return buf.sort().join('\n')
};

/**
 * Perform the following:
 *
 *  - ignore non sub-resources
 *  - sort lexicographically
 *
 * @param {String} resource
 * @return {String}
 * @api private
 */

exports.canonicalizeResource = function(resource){
  var url = parse(resource, true)
    , path = url.pathname
    , buf = []
    ;

  Object.keys(url.query).forEach(function(key){
    if (!~keys.indexOf(key)) return
    var val = '' == url.query[key] ? '' : '=' + encodeURIComponent(url.query[key])
    buf.push(key + val)
  })

  return path + (buf.length ? '?' + buf.sort().join('&') : '')
};

},{"crypto":40,"url":31}],34:[function(require,module,exports){(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":49}],53:[function(require,module,exports){/*!
 * Tobi - Cookie
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var url = require('url');

/**
 * Initialize a new `Cookie` with the given cookie `str` and `req`.
 *
 * @param {String} str
 * @param {IncomingRequest} req
 * @api private
 */

var Cookie = exports = module.exports = function Cookie(str, req) {
  this.str = str;

  // Map the key/val pairs
  str.split(/ *; */).reduce(function(obj, pair){
   var p = pair.indexOf('=');
   var key = p > 0 ? pair.substring(0, p).trim() : pair.trim();
   var lowerCasedKey = key.toLowerCase();
   var value = p > 0 ? pair.substring(p + 1).trim() : true;

   if (!obj.name) {
    // First key is the name
    obj.name = key;
    obj.value = value;
   }
   else if (lowerCasedKey === 'httponly') {
    obj.httpOnly = value;
   }
   else {
    obj[lowerCasedKey] = value;
   }
   return obj;
  }, this);

  // Expires
  this.expires = this.expires
    ? new Date(this.expires)
    : Infinity;

  // Default or trim path
  this.path = this.path
    ? this.path.trim(): req 
    ? url.parse(req.url).pathname: '/';
};

/**
 * Return the original cookie string.
 *
 * @return {String}
 * @api public
 */

Cookie.prototype.toString = function(){
  return this.str;
};

},{"url":31}],29:[function(require,module,exports){(function(process){// Copyright 2010-2012 Mikeal Rogers
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

var http = require('http')
  , https = false
  , tls = false
  , url = require('url')
  , util = require('util')
  , stream = require('stream')
  , qs = require('querystring')
  , crypto = require('crypto')
  , oauth = require('./oauth')
  , uuid = require('./uuid')
  , ForeverAgent = require('./forever')
  , Cookie = require('./vendor/cookie')
  , CookieJar = require('./vendor/cookie/jar')
  , cookieJar = new CookieJar
  , tunnel = require('./tunnel')
  , aws = require('./aws')
  
  , mime = require('mime')
  , FormData = require('form-data')
  ;
  
if (process.logging) {
  var log = process.logging('request')
}

try {
  https = require('https')
} catch (e) {}

try {
  tls = require('tls')
} catch (e) {}

function toBase64 (str) {
  return (new Buffer(str || "", "ascii")).toString("base64")
}

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

// Hacky fix for pre-0.4.4 https
if (https && !https.Agent) {
  https.Agent = function (options) {
    http.Agent.call(this, options)
  }
  util.inherits(https.Agent, http.Agent)
  https.Agent.prototype._getConnection = function (host, port, cb) {
    var s = tls.connect(port, host, this.options, function () {
      // do other checks here?
      if (cb) cb()
    })
    return s
  }
}

function isReadStream (rs) {
  if (rs.readable && rs.path && rs.mode) {
    return true
  }
}

function copy (obj) {
  var o = {}
  Object.keys(obj).forEach(function (i) {
    o[i] = obj[i]
  })
  return o
}

var isUrl = /^https?:/

var globalPool = {}

function Request (options) {
  stream.Stream.call(this)
  this.readable = true
  this.writable = true

  if (typeof options === 'string') {
    options = {uri:options}
  }
  
  var reserved = Object.keys(Request.prototype)
  for (var i in options) {
    if (reserved.indexOf(i) === -1) {
      this[i] = options[i]
    } else {
      if (typeof options[i] === 'function') {
        delete options[i]
      }
    }
  }
  options = copy(options)
  
  this.init(options)
}
util.inherits(Request, stream.Stream)
Request.prototype.init = function (options) {
  var self = this
  
  if (!options) options = {}
  if (request.debug) console.error('REQUEST', options)
  if (!self.pool && self.pool !== false) self.pool = globalPool
  self.dests = self.dests || []
  self.__isRequestRequest = true
  
  // Protect against double callback
  if (!self._callback && self.callback) {
    self._callback = self.callback
    self.callback = function () {
      if (self._callbackCalled) return // Print a warning maybe?
      self._callback.apply(self, arguments)
      self._callbackCalled = true
    }
    self.on('error', self.callback.bind())
    self.on('complete', self.callback.bind(self, null))
  }

  if (self.url) {
    // People use this property instead all the time so why not just support it.
    self.uri = self.url
    delete self.url
  }

  if (!self.uri) {
    // this will throw if unhandled but is handleable when in a redirect
    return self.emit('error', new Error("options.uri is a required argument"))
  } else {
    if (typeof self.uri == "string") self.uri = url.parse(self.uri)
  }
  
  if (self.proxy) {
    if (typeof self.proxy == 'string') self.proxy = url.parse(self.proxy)

    // do the HTTP CONNECT dance using koichik/node-tunnel
    if (http.globalAgent && self.uri.protocol === "https:") {
      var tunnelFn = self.proxy.protocol === "http:"
                   ? tunnel.httpsOverHttp : tunnel.httpsOverHttps

      var tunnelOptions = { proxy: { host: self.proxy.hostname
                                   , port: +self.proxy.port
                                   , proxyAuth: self.proxy.auth
                                   , headers: { Host: self.uri.hostname + ':' + 
                                        (self.uri.port || self.uri.protocol === 'https:' ? 443 : 80) }}
                          , ca: this.ca }

      self.agent = tunnelFn(tunnelOptions)
      self.tunnel = true
    }
  }

  if (!self.uri.host || !self.uri.pathname) {
    // Invalid URI: it may generate lot of bad errors, like "TypeError: Cannot call method 'indexOf' of undefined" in CookieJar
    // Detect and reject it as soon as possible
    var faultyUri = url.format(self.uri)
    var message = 'Invalid URI "' + faultyUri + '"'
    if (Object.keys(options).length === 0) {
      // No option ? This can be the sign of a redirect
      // As this is a case where the user cannot do anything (he didn't call request directly with this URL)
      // he should be warned that it can be caused by a redirection (can save some hair)
      message += '. This can be caused by a crappy redirection.'
    }
    self.emit('error', new Error(message))
    return // This error was fatal
  }

  self._redirectsFollowed = self._redirectsFollowed || 0
  self.maxRedirects = (self.maxRedirects !== undefined) ? self.maxRedirects : 10
  self.followRedirect = (self.followRedirect !== undefined) ? self.followRedirect : true
  self.followAllRedirects = (self.followAllRedirects !== undefined) ? self.followAllRedirects : false
  if (self.followRedirect || self.followAllRedirects)
    self.redirects = self.redirects || []

  self.headers = self.headers ? copy(self.headers) : {}

  self.setHost = false
  if (!(self.headers.host || self.headers.Host)) {
    self.headers.host = self.uri.hostname
    if (self.uri.port) {
      if ( !(self.uri.port === 80 && self.uri.protocol === 'http:') &&
           !(self.uri.port === 443 && self.uri.protocol === 'https:') )
      self.headers.host += (':'+self.uri.port)
    }
    self.setHost = true
  }
  
  self.jar(self._jar || options.jar)

  if (!self.uri.pathname) {self.uri.pathname = '/'}
  if (!self.uri.port) {
    if (self.uri.protocol == 'http:') {self.uri.port = 80}
    else if (self.uri.protocol == 'https:') {self.uri.port = 443}
  }

  if (self.proxy && !self.tunnel) {
    self.port = self.proxy.port
    self.host = self.proxy.hostname
  } else {
    self.port = self.uri.port
    self.host = self.uri.hostname
  }

  self.clientErrorHandler = function (error) {
    if (self._aborted) return
    
    if (self.req && self.req._reusedSocket && error.code === 'ECONNRESET'
        && self.agent.addRequestNoreuse) {
      self.agent = { addRequest: self.agent.addRequestNoreuse.bind(self.agent) }
      self.start()
      self.req.end()
      return
    }
    if (self.timeout && self.timeoutTimer) {
      clearTimeout(self.timeoutTimer)
      self.timeoutTimer = null
    }
    self.emit('error', error)
  }

  self._parserErrorHandler = function (error) {
    if (this.res) {
      if (this.res.request) {
        this.res.request.emit('error', error)
      } else {
        this.res.emit('error', error)
      }
    } else {
      this._httpMessage.emit('error', error)
    }
  }

  if (options.form) {
    self.form(options.form)
  }
  
  if (options.qs) self.qs(options.qs)

  if (self.uri.path) {
    self.path = self.uri.path
  } else {
    self.path = self.uri.pathname + (self.uri.search || "")
  }

  if (self.path.length === 0) self.path = '/'


  if (options.oauth) {
    self.oauth(options.oauth)
  }
  
  if (options.aws) {
    self.aws(options.aws)
  }

  if (options.auth) {
    self.auth(
      options.auth.user || options.auth.username,
      options.auth.pass || options.auth.password,
      options.auth.sendImmediately)
  }

  if (self.uri.auth && !self.headers.authorization) {
    var authPieces = self.uri.auth.split(':').map(function(item){ return qs.unescape(item) })
    self.auth(authPieces[0], authPieces[1], true)
  }
  if (self.proxy && self.proxy.auth && !self.headers['proxy-authorization'] && !self.tunnel) {
    self.headers['proxy-authorization'] = "Basic " + toBase64(self.proxy.auth.split(':').map(function(item){ return qs.unescape(item)}).join(':'))
  }

  
  if (self.proxy && !self.tunnel) self.path = (self.uri.protocol + '//' + self.uri.host + self.path)

  if (options.json) {
    self.json(options.json)
  } else if (options.multipart) {
    self.boundary = uuid()
    self.multipart(options.multipart)
  }

  if (self.body) {
    var length = 0
    if (!Buffer.isBuffer(self.body)) {
      if (Array.isArray(self.body)) {
        for (var i = 0; i < self.body.length; i++) {
          length += self.body[i].length
        }
      } else {
        self.body = new Buffer(self.body)
        length = self.body.length
      }
    } else {
      length = self.body.length
    }
    if (length) {
      if(!self.headers['content-length'] && !self.headers['Content-Length'])
      self.headers['content-length'] = length
    } else {
      throw new Error('Argument error, options.body.')
    }
  }

  var protocol = self.proxy && !self.tunnel ? self.proxy.protocol : self.uri.protocol
    , defaultModules = {'http:':http, 'https:':https}
    , httpModules = self.httpModules || {}
    ;
  self.httpModule = httpModules[protocol] || defaultModules[protocol]

  if (!self.httpModule) return this.emit('error', new Error("Invalid protocol"))

  if (options.ca) self.ca = options.ca

  if (!self.agent) {
    if (options.agentOptions) self.agentOptions = options.agentOptions

    if (options.agentClass) {
      self.agentClass = options.agentClass
    } else if (options.forever) {
      self.agentClass = protocol === 'http:' ? ForeverAgent : ForeverAgent.SSL
    } else {
      self.agentClass = self.httpModule.Agent
    }
  }

  if (self.pool === false) {
    self.agent = false
  } else {
    self.agent = self.agent || self.getAgent()
    if (self.maxSockets) {
      // Don't use our pooling if node has the refactored client
      self.agent.maxSockets = self.maxSockets
    }
    if (self.pool.maxSockets) {
      // Don't use our pooling if node has the refactored client
      self.agent.maxSockets = self.pool.maxSockets
    }
  }

  self.once('pipe', function (src) {
    if (self.ntick && self._started) throw new Error("You cannot pipe to this stream after the outbound request has started.")
    self.src = src
    if (isReadStream(src)) {
      if (!self.headers['content-type'] && !self.headers['Content-Type'])
        self.headers['content-type'] = mime.lookup(src.path)
    } else {
      if (src.headers) {
        for (var i in src.headers) {
          if (!self.headers[i]) {
            self.headers[i] = src.headers[i]
          }
        }
      }
      if (self._json && !self.headers['content-type'] && !self.headers['Content-Type'])
        self.headers['content-type'] = 'application/json'
      if (src.method && !self.method) {
        self.method = src.method
      }
    }

    self.on('pipe', function () {
      console.error("You have already piped to this stream. Pipeing twice is likely to break the request.")
    })
  })

  process.nextTick(function () {
    if (self._aborted) return
    
    if (self._form) {
      self.setHeaders(self._form.getHeaders())
      self._form.pipe(self)
    }
    if (self.body) {
      if (Array.isArray(self.body)) {
        self.body.forEach(function (part) {
          self.write(part)
        })
      } else {
        self.write(self.body)
      }
      self.end()
    } else if (self.requestBodyStream) {
      console.warn("options.requestBodyStream is deprecated, please pass the request object to stream.pipe.")
      self.requestBodyStream.pipe(self)
    } else if (!self.src) {
      if (self.method !== 'GET' && typeof self.method !== 'undefined') {
        self.headers['content-length'] = 0
      }
      self.end()
    }
    self.ntick = true
  })
}

// Must call this when following a redirect from https to http or vice versa
// Attempts to keep everything as identical as possible, but update the
// httpModule, Tunneling agent, and/or Forever Agent in use.
Request.prototype._updateProtocol = function () {
  var self = this
  var protocol = self.uri.protocol

  if (protocol === 'https:') {
    // previously was doing http, now doing https
    // if it's https, then we might need to tunnel now.
    if (self.proxy) {
      self.tunnel = true
      var tunnelFn = self.proxy.protocol === 'http:'
                   ? tunnel.httpsOverHttp : tunnel.httpsOverHttps
      var tunnelOptions = { proxy: { host: self.proxy.hostname
                                   , port: +self.proxy.port
                                   , proxyAuth: self.proxy.auth }
                          , ca: self.ca }
      self.agent = tunnelFn(tunnelOptions)
      return
    }

    self.httpModule = https
    switch (self.agentClass) {
      case ForeverAgent:
        self.agentClass = ForeverAgent.SSL
        break
      case http.Agent:
        self.agentClass = https.Agent
        break
      default:
        // nothing we can do.  Just hope for the best.
        return
    }

    // if there's an agent, we need to get a new one.
    if (self.agent) self.agent = self.getAgent()

  } else {
    if (log) log('previously https, now http')
    // previously was doing https, now doing http
    // stop any tunneling.
    if (self.tunnel) self.tunnel = false
    self.httpModule = http
    switch (self.agentClass) {
      case ForeverAgent.SSL:
        self.agentClass = ForeverAgent
        break
      case https.Agent:
        self.agentClass = http.Agent
        break
      default:
        // nothing we can do.  just hope for the best
        return
    }

    // if there's an agent, then get a new one.
    if (self.agent) {
      self.agent = null
      self.agent = self.getAgent()
    }
  }
}

Request.prototype.getAgent = function () {
  var Agent = this.agentClass
  var options = {}
  if (this.agentOptions) {
    for (var i in this.agentOptions) {
      options[i] = this.agentOptions[i]
    }
  }
  if (this.ca) options.ca = this.ca
  if (typeof this.rejectUnauthorized !== 'undefined')
    options.rejectUnauthorized = this.rejectUnauthorized;

  if (this.cert && this.key) {
    options.key = this.key
    options.cert = this.cert
  }

  var poolKey = ''

  // different types of agents are in different pools
  if (Agent !== this.httpModule.Agent) {
    poolKey += Agent.name
  }

  if (!this.httpModule.globalAgent) {
    // node 0.4.x
    options.host = this.host
    options.port = this.port
    if (poolKey) poolKey += ':'
    poolKey += this.host + ':' + this.port
  }

  // ca option is only relevant if proxy or destination are https
  var proxy = this.proxy
  if (typeof proxy === 'string') proxy = url.parse(proxy)
  var isHttps = (proxy && proxy.protocol === 'https:') || this.uri.protocol === 'https:'
  if (isHttps) {
    if (options.ca) {
      if (poolKey) poolKey += ':'
      poolKey += options.ca
    }

    if (typeof options.rejectUnauthorized !== 'undefined') {
      if (poolKey) poolKey += ':'
      poolKey += options.rejectUnauthorized
    }

    if (options.cert)
      poolKey += options.cert.toString('ascii') + options.key.toString('ascii')
  }

  if (!poolKey && Agent === this.httpModule.Agent && this.httpModule.globalAgent) {
    // not doing anything special.  Use the globalAgent
    return this.httpModule.globalAgent
  }

  // we're using a stored agent.  Make sure it's protocol-specific
  poolKey = this.uri.protocol + poolKey

  // already generated an agent for this setting
  if (this.pool[poolKey]) return this.pool[poolKey]

  return this.pool[poolKey] = new Agent(options)
}

Request.prototype.start = function () {
  var self = this

  if (self._aborted) return

  self._started = true
  self.method = self.method || 'GET'
  self.href = self.uri.href
  if (log) log('%method %href', self)

  if (self.src && self.src.stat && self.src.stat.size && !self.headers['content-length'] && !self.headers['Content-Length']) {
    self.headers['content-length'] = self.src.stat.size
  }
  if (self._aws) {
    self.aws(self._aws, true)
  }

  // We have a method named auth, which is completely different from the http.request
  // auth option.  If we don't remove it, we're gonna have a bad time.
  var reqOptions = copy(self)
  delete reqOptions.auth

  self.req = self.httpModule.request(reqOptions, function (response) {
    if (response.connection.listeners('error').indexOf(self._parserErrorHandler) === -1) {
      response.connection.once('error', self._parserErrorHandler)
    }
    if (self._aborted) return
    if (self._paused) response.pause()

    self.response = response
    response.request = self
    response.toJSON = toJSON

    if (self.httpModule === https &&
        self.strictSSL &&
        !response.client.authorized) {
      var sslErr = response.client.authorizationError
      self.emit('error', new Error('SSL Error: '+ sslErr))
      return
    }

    if (self.setHost) delete self.headers.host
    if (self.timeout && self.timeoutTimer) {
      clearTimeout(self.timeoutTimer)
      self.timeoutTimer = null
    }  

    var addCookie = function (cookie) {
      if (self._jar) self._jar.add(new Cookie(cookie))
      else cookieJar.add(new Cookie(cookie))
    }

    if (response.headers['set-cookie'] && (!self._disableCookies)) {
      if (Array.isArray(response.headers['set-cookie'])) response.headers['set-cookie'].forEach(addCookie)
      else addCookie(response.headers['set-cookie'])
    }

    var redirectTo = null
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      if (self.followAllRedirects) {
        redirectTo = response.headers.location
      } else if (self.followRedirect) {
        switch (self.method) {
          case 'PUT':
          case 'POST':
          case 'DELETE':
            // Do not follow redirects
            break
          default:
            redirectTo = response.headers.location
            break
        }
      }
    } else if (response.statusCode == 401 && self._hasAuth && !self._sentAuth) {
      var authHeader = response.headers['www-authenticate']
      var authVerb = authHeader && authHeader.split(' ')[0]
      switch (authVerb) {
        case 'Basic':
          self.auth(self._user, self._pass, true)
          redirectTo = self.uri
          break

        case 'Digest':
          // TODO: More complete implementation of RFC 2617.  For reference:
          // http://tools.ietf.org/html/rfc2617#section-3
          // https://github.com/bagder/curl/blob/master/lib/http_digest.c

          var matches = authHeader.match(/([a-z0-9_-]+)="([^"]+)"/gi)
          var challenge = {}

          for (var i = 0; i < matches.length; i++) {
            var eqPos = matches[i].indexOf('=')
            var key = matches[i].substring(0, eqPos)
            var quotedValue = matches[i].substring(eqPos + 1)
            challenge[key] = quotedValue.substring(1, quotedValue.length - 1)
          }

          var ha1 = md5(self._user + ':' + challenge.realm + ':' + self._pass)
          var ha2 = md5(self.method + ':' + self.uri.path)
          var digestResponse = md5(ha1 + ':' + challenge.nonce + ':1::auth:' + ha2)
          var authValues = {
            username: self._user,
            realm: challenge.realm,
            nonce: challenge.nonce,
            uri: self.uri.path,
            qop: challenge.qop,
            response: digestResponse,
            nc: 1,
            cnonce: ''
          }

          authHeader = []
          for (var k in authValues) {
            authHeader.push(k + '="' + authValues[k] + '"')
          }
          authHeader = 'Digest ' + authHeader.join(', ')
          self.setHeader('authorization', authHeader)
          self._sentAuth = true

          redirectTo = self.uri
          break
      }
    }

    if (redirectTo) {
      if (self._redirectsFollowed >= self.maxRedirects) {
        self.emit('error', new Error("Exceeded maxRedirects. Probably stuck in a redirect loop "+self.uri.href))
        return
      }
      self._redirectsFollowed += 1

      if (!isUrl.test(redirectTo)) {
        redirectTo = url.resolve(self.uri.href, redirectTo)
      }

      var uriPrev = self.uri
      self.uri = url.parse(redirectTo)

      // handle the case where we change protocol from https to http or vice versa
      if (self.uri.protocol !== uriPrev.protocol) {
        self._updateProtocol()
      }

      self.redirects.push(
        { statusCode : response.statusCode
        , redirectUri: redirectTo
        }
      )
      if (self.followAllRedirects && response.statusCode != 401) self.method = 'GET'
      // self.method = 'GET' // Force all redirects to use GET || commented out fixes #215
      delete self.src
      delete self.req
      delete self.agent
      delete self._started
      if (response.statusCode != 401) {
        delete self.body
        delete self._form
      }
      if (self.headers) {
        delete self.headers.host
        delete self.headers['content-type']
        delete self.headers['content-length']
      }
      if (log) log('Redirect to %uri due to status %status', {uri: self.uri, status: response.statusCode})
      self.init()
      return // Ignore the rest of the response
    } else {
      self._redirectsFollowed = self._redirectsFollowed || 0
      // Be a good stream and emit end when the response is finished.
      // Hack to emit end on close because of a core bug that never fires end
      response.on('close', function () {
        if (!self._ended) self.response.emit('end')
      })

      if (self.encoding) {
        if (self.dests.length !== 0) {
          console.error("Ingoring encoding parameter as this stream is being piped to another stream which makes the encoding option invalid.")
        } else {
          response.setEncoding(self.encoding)
        }
      }

      self.dests.forEach(function (dest) {
        self.pipeDest(dest)
      })

      response.on("data", function (chunk) {
        self._destdata = true
        self.emit("data", chunk)
      })
      response.on("end", function (chunk) {
        self._ended = true
        self.emit("end", chunk)
      })
      response.on("close", function () {self.emit("close")})

      self.emit('response', response)

      if (self.callback) {
        var buffer = []
        var bodyLen = 0
        self.on("data", function (chunk) {
          buffer.push(chunk)
          bodyLen += chunk.length
        })
        self.on("end", function () {
          if (self._aborted) return
          
          if (buffer.length && Buffer.isBuffer(buffer[0])) {
            var body = new Buffer(bodyLen)
            var i = 0
            buffer.forEach(function (chunk) {
              chunk.copy(body, i, 0, chunk.length)
              i += chunk.length
            })
            if (self.encoding === null) {
              response.body = body
            } else {
              response.body = body.toString(self.encoding)
            }
          } else if (buffer.length) {
            response.body = buffer.join('')
          }

          if (self._json) {
            try {
              response.body = JSON.parse(response.body)
            } catch (e) {}
          }
          
          self.emit('complete', response, response.body)
        })
      }
    }
  })

  if (self.timeout && !self.timeoutTimer) {
    self.timeoutTimer = setTimeout(function () {
      self.req.abort()
      var e = new Error("ETIMEDOUT")
      e.code = "ETIMEDOUT"
      self.emit("error", e)
    }, self.timeout)
    
    // Set additional timeout on socket - in case if remote
    // server freeze after sending headers
    if (self.req.setTimeout) { // only works on node 0.6+
      self.req.setTimeout(self.timeout, function () {
        if (self.req) {
          self.req.abort()
          var e = new Error("ESOCKETTIMEDOUT")
          e.code = "ESOCKETTIMEDOUT"
          self.emit("error", e)
        }
      })
    }
  }
  
  self.req.on('error', self.clientErrorHandler)
  self.req.on('drain', function() {
    self.emit('drain')
  })
  self.on('end', function() {
    if ( self.req.connection ) self.req.connection.removeListener('error', self._parserErrorHandler)
  })
  self.emit('request', self.req)
}

Request.prototype.abort = function () {
  this._aborted = true
  
  if (this.req) {
    this.req.abort()
  }
  else if (this.response) {
    this.response.abort()
  }
  
  this.emit("abort")
}

Request.prototype.pipeDest = function (dest) {
  var response = this.response
  // Called after the response is received
  if (dest.headers) {
    dest.headers['content-type'] = response.headers['content-type']
    if (response.headers['content-length']) {
      dest.headers['content-length'] = response.headers['content-length']
    }
  }
  if (dest.setHeader) {
    for (var i in response.headers) {
      dest.setHeader(i, response.headers[i])
    }
    dest.statusCode = response.statusCode
  }
  if (this.pipefilter) this.pipefilter(response, dest)
}

// Composable API
Request.prototype.setHeader = function (name, value, clobber) {
  if (clobber === undefined) clobber = true
  if (clobber || !this.headers.hasOwnProperty(name)) this.headers[name] = value
  else this.headers[name] += ',' + value
  return this
}
Request.prototype.setHeaders = function (headers) {
  for (var i in headers) {this.setHeader(i, headers[i])}
  return this
}
Request.prototype.qs = function (q, clobber) {
  var base
  if (!clobber && this.uri.query) base = qs.parse(this.uri.query)
  else base = {}
  
  for (var i in q) {
    base[i] = q[i]
  }
  
  this.uri = url.parse(this.uri.href.split('?')[0] + '?' + qs.stringify(base))
  this.url = this.uri
  
  return this
}
Request.prototype.form = function (form) {
  if (form) {
    this.headers['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    this.body = qs.stringify(form).toString('utf8')
    return this
  } 
  // create form-data object
  this._form = new FormData()
  return this._form
}
Request.prototype.multipart = function (multipart) {
  var self = this
  self.body = []

  if (!self.headers['content-type']) {
    self.headers['content-type'] = 'multipart/related; boundary=' + self.boundary
  } else {
    self.headers['content-type'] = self.headers['content-type'].split(';')[0] + '; boundary=' + self.boundary
  }

  if (!multipart.forEach) throw new Error('Argument error, options.multipart.')

  if (self.preambleCRLF) {
    self.body.push(new Buffer('\r\n'))
  }
  
  multipart.forEach(function (part) {
    var body = part.body
    if(body == null) throw Error('Body attribute missing in multipart.')
    delete part.body
    var preamble = '--' + self.boundary + '\r\n'
    Object.keys(part).forEach(function (key) {
      preamble += key + ': ' + part[key] + '\r\n'
    })
    preamble += '\r\n'
    self.body.push(new Buffer(preamble))
    self.body.push(new Buffer(body))
    self.body.push(new Buffer('\r\n'))
  })
  self.body.push(new Buffer('--' + self.boundary + '--'))
  return self
}
Request.prototype.json = function (val) {
  this.setHeader('accept', 'application/json')
  this._json = true
  if (typeof val === 'boolean') {
    if (typeof this.body === 'object') {
      this.setHeader('content-type', 'application/json')
      this.body = JSON.stringify(this.body)
    }
  } else {
    this.setHeader('content-type', 'application/json')
    this.body = JSON.stringify(val)
  }
  return this
}
function getHeader(name, headers) {
    var result, re, match
    Object.keys(headers).forEach(function (key) {
        re = new RegExp(name, 'i')
        match = key.match(re)
        if (match) result = headers[key]
    })
    return result
}
Request.prototype.auth = function (user, pass, sendImmediately) {
  if (typeof user !== 'string' || typeof pass !== 'string') {
    throw new Error('auth() received invalid user or password')
  }
  this._user = user
  this._pass = pass
  this._hasAuth = true
  if (sendImmediately || typeof sendImmediately == 'undefined') {
    this.setHeader('authorization', 'Basic ' + toBase64(user + ':' + pass))
    this._sentAuth = true
  }
  return this
}
Request.prototype.aws = function (opts, now) {
  if (!now) {
    this._aws = opts
    return this
  }
  var date = new Date()
  this.setHeader('date', date.toUTCString())
  var auth =
    { key: opts.key
    , secret: opts.secret
    , verb: this.method.toUpperCase()
    , date: date
    , contentType: getHeader('content-type', this.headers) || ''
    , md5: getHeader('content-md5', this.headers) || ''
    , amazonHeaders: aws.canonicalizeHeaders(this.headers)
    }
  if (opts.bucket && this.path) {
    auth.resource = '/' + opts.bucket + this.path
  } else if (opts.bucket && !this.path) {
    auth.resource = '/' + opts.bucket
  } else if (!opts.bucket && this.path) {
    auth.resource = this.path
  } else if (!opts.bucket && !this.path) {
    auth.resource = '/'
  }
  auth.resource = aws.canonicalizeResource(auth.resource)
  this.setHeader('authorization', aws.authorization(auth))
  
  return this
}

Request.prototype.oauth = function (_oauth) {
  var form
  if (this.headers['content-type'] && 
      this.headers['content-type'].slice(0, 'application/x-www-form-urlencoded'.length) ===
        'application/x-www-form-urlencoded' 
     ) {
    form = qs.parse(this.body)
  }
  if (this.uri.query) {
    form = qs.parse(this.uri.query)
  } 
  if (!form) form = {}
  var oa = {}
  for (var i in form) oa[i] = form[i]
  for (var i in _oauth) oa['oauth_'+i] = _oauth[i]
  if (!oa.oauth_version) oa.oauth_version = '1.0'
  if (!oa.oauth_timestamp) oa.oauth_timestamp = Math.floor( (new Date()).getTime() / 1000 ).toString()
  if (!oa.oauth_nonce) oa.oauth_nonce = uuid().replace(/-/g, '')
  
  oa.oauth_signature_method = 'HMAC-SHA1'
  
  var consumer_secret = oa.oauth_consumer_secret
  delete oa.oauth_consumer_secret
  var token_secret = oa.oauth_token_secret
  delete oa.oauth_token_secret
  var timestamp = oa.oauth_timestamp

  var baseurl = this.uri.protocol + '//' + this.uri.host + this.uri.pathname
  var signature = oauth.hmacsign(this.method, baseurl, oa, consumer_secret, token_secret)
  
  // oa.oauth_signature = signature
  for (var i in form) {
    if ( i.slice(0, 'oauth_') in _oauth) {
      // skip 
    } else {
      delete oa['oauth_'+i]
      if (i !== 'x_auth_mode') delete oa[i]
    }
  }
  oa.oauth_timestamp = timestamp
  this.headers.Authorization =
    'OAuth '+Object.keys(oa).sort().map(function (i) {return i+'="'+oauth.rfc3986(oa[i])+'"'}).join(',')
  this.headers.Authorization += ',oauth_signature="' + oauth.rfc3986(signature) + '"'
  return this
}
Request.prototype.jar = function (jar) {
  var cookies
  
  if (this._redirectsFollowed === 0) {
    this.originalCookieHeader = this.headers.cookie
  }
  
  if (jar === false) {
    // disable cookies
    cookies = false
    this._disableCookies = true
  } else if (jar) {
    // fetch cookie from the user defined cookie jar
    cookies = jar.get({ url: this.uri.href })
  } else {
    // fetch cookie from the global cookie jar
    cookies = cookieJar.get({ url: this.uri.href })
  }
  
  if (cookies && cookies.length) {
    var cookieString = cookies.map(function (c) {
      return c.name + "=" + c.value
    }).join("; ")

    if (this.originalCookieHeader) {
      // Don't overwrite existing Cookie header
      this.headers.cookie = this.originalCookieHeader + '; ' + cookieString
    } else {
      this.headers.cookie = cookieString
    }
  }
  this._jar = jar
  return this
}


// Stream API
Request.prototype.pipe = function (dest, opts) {
  if (this.response) {
    if (this._destdata) {
      throw new Error("You cannot pipe after data has been emitted from the response.")
    } else if (this._ended) {
      throw new Error("You cannot pipe after the response has been ended.")
    } else {
      stream.Stream.prototype.pipe.call(this, dest, opts)
      this.pipeDest(dest)
      return dest
    }
  } else {
    this.dests.push(dest)
    stream.Stream.prototype.pipe.call(this, dest, opts)
    return dest
  }
}
Request.prototype.write = function () {
  if (!this._started) this.start()
  return this.req.write.apply(this.req, arguments)
}
Request.prototype.end = function (chunk) {
  if (chunk) this.write(chunk)
  if (!this._started) this.start()
  this.req.end()
}
Request.prototype.pause = function () {
  if (!this.response) this._paused = true
  else this.response.pause.apply(this.response, arguments)
}
Request.prototype.resume = function () {
  if (!this.response) this._paused = false
  else this.response.resume.apply(this.response, arguments)
}
Request.prototype.destroy = function () {
  if (!this._ended) this.end()
}

// organize params for post, put, head, del
function initParams(uri, options, callback) {
  if ((typeof options === 'function') && !callback) callback = options
  if (options && typeof options === 'object') {
    options.uri = uri
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = uri
    uri = options.uri
  }
  return { uri: uri, options: options, callback: callback }
}

function request (uri, options, callback) {
  if (typeof uri === 'undefined') throw new Error('undefined is not a valid uri or options object.')
  if ((typeof options === 'function') && !callback) callback = options
  if (options && typeof options === 'object') {
    options.uri = uri
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = uri
  }

  if (callback) options.callback = callback
  var r = new Request(options)
  return r
}

module.exports = request

request.debug = process.env.NODE_DEBUG && /request/.test(process.env.NODE_DEBUG)

request.initParams = initParams

request.defaults = function (options, requester) {
  var def = function (method) {
    var d = function (uri, opts, callback) {
      var params = initParams(uri, opts, callback)
      for (var i in options) {
        if (params.options[i] === undefined) params.options[i] = options[i]
      }
      if(typeof requester === 'function') {
        if(method === request) {
          method = requester
        } else {
          params.options._requester = requester
        }
      }
      return method(params.options, params.callback)
    }
    return d
  }
  var de = def(request)
  de.get = def(request.get)
  de.post = def(request.post)
  de.put = def(request.put)
  de.head = def(request.head)
  de.del = def(request.del)
  de.cookie = def(request.cookie)
  de.jar = request.jar
  return de
}

request.forever = function (agentOptions, optionsArg) {
  var options = {}
  if (optionsArg) {
    for (option in optionsArg) {
      options[option] = optionsArg[option]
    }
  }
  if (agentOptions) options.agentOptions = agentOptions
  options.forever = true
  return request.defaults(options)
}

request.get = request
request.post = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'POST'
  return request(params.uri || null, params.options, params.callback)
}
request.put = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'PUT'
  return request(params.uri || null, params.options, params.callback)
}
request.head = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'HEAD'
  if (params.options.body || 
      params.options.requestBodyStream || 
      (params.options.json && typeof params.options.json !== 'boolean') || 
      params.options.multipart) {
    throw new Error("HTTP HEAD requests MUST NOT include a request body.")
  }
  return request(params.uri || null, params.options, params.callback)
}
request.del = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'DELETE'
  if(typeof params.options._requester === 'function') {
    request = params.options._requester
  }
  return request(params.uri || null, params.options, params.callback)
}
request.jar = function () {
  return new CookieJar
}
request.cookie = function (str) {
  if (str && str.uri) str = str.uri
  if (typeof str !== 'string') throw new Error("The cookie function only accepts STRING as param")
  return new Cookie(str)
}

// Safe toJSON

function getSafe (self, uuid) {  
  if (typeof self === 'object' || typeof self === 'function') var safe = {}
  if (Array.isArray(self)) var safe = []

  var recurse = []
  
  Object.defineProperty(self, uuid, {})
  
  var attrs = Object.keys(self).filter(function (i) {
    if (i === uuid) return false 
    if ( (typeof self[i] !== 'object' && typeof self[i] !== 'function') || self[i] === null) return true
    return !(Object.getOwnPropertyDescriptor(self[i], uuid))
  })
  
  
  for (var i=0;i<attrs.length;i++) {
    if ( (typeof self[attrs[i]] !== 'object' && typeof self[attrs[i]] !== 'function') || 
          self[attrs[i]] === null
        ) {
      safe[attrs[i]] = self[attrs[i]]
    } else {
      recurse.push(attrs[i])
      Object.defineProperty(self[attrs[i]], uuid, {})
    }
  }

  for (var i=0;i<recurse.length;i++) {
    safe[recurse[i]] = getSafe(self[recurse[i]], uuid)
  }
  
  return safe
}

function toJSON () {
  return getSafe(this, '__' + (((1+Math.random())*0x10000)|0).toString(16))
}

Request.prototype.toJSON = toJSON

})(require("__browserify_process"))
},{"http":37,"url":31,"util":33,"stream":35,"querystring":32,"crypto":40,"https":36,"tls":38,"./oauth":44,"./uuid":45,"./forever":46,"./vendor/cookie/jar":48,"./tunnel":50,"./aws":52,"./vendor/cookie":53,"mime":54,"form-data":55,"__browserify_process":49}],41:[function(require,module,exports){/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

exports.hex_sha1 = hex_sha1;
exports.b64_sha1 = b64_sha1;
exports.str_sha1 = str_sha1;
exports.hex_hmac_sha1 = hex_hmac_sha1;
exports.b64_hmac_sha1 = b64_hmac_sha1;
exports.str_hmac_sha1 = str_hmac_sha1;

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}


},{}],42:[function(require,module,exports){// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  // currently only available in webkit-based browsers.
  if (_global.crypto && crypto.getRandomValues) {
    var _rnds = new Uint32Array(4);
    whatwgRNG = function(size) {
      var bytes = new Array(size);
      crypto.getRandomValues(_rnds);

      for (var c = 0 ; c < size; c++) {
        bytes[c] = _rnds[c >> 2] >>> ((c & 0x03) * 8) & 0xff;
      }
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())
},{}],47:[function(require,module,exports){// todo

},{}],43:[function(require,module,exports){/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}


exports.hex_md5 = hex_md5;
exports.b64_md5 = b64_md5;
exports.any_md5 = any_md5;

},{}],51:[function(require,module,exports){// UTILITY
var util = require('util');
var Buffer = require("buffer").Buffer;
var pSlice = Array.prototype.slice;

function objectKeys(object) {
  if (Object.keys) return Object.keys(object);
  var result = [];
  for (var name in object) {
    if (Object.prototype.hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (value === undefined) {
    return '' + value;
  }
  if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (typeof value === 'function' || value instanceof RegExp) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (typeof s == 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

assert.AssertionError.prototype.toString = function() {
  if (this.message) {
    return [this.name + ':', this.message].join(' ');
  } else {
    return [
      this.name + ':',
      truncate(JSON.stringify(this.actual, replacer), 128),
      this.operator,
      truncate(JSON.stringify(this.expected, replacer), 128)
    ].join(' ');
  }
};

// assert.AssertionError instanceof Error

assert.AssertionError.__proto__ = Error.prototype;

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!!!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (expected instanceof RegExp) {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail('Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail('Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

},{"util":33,"buffer":56}],28:[function(require,module,exports){/**
 * Copyright (c) 2011 Bruno Jouhier <bruno.jouhier@sage.com>
 * MIT License
 */
(function(exports) {
	var __g = exports.globals || require("../globals");
	__g.context = __g.context || {};
	__g.depth = __g.depth || 0;

	__g.trampoline = (function() {
		var q = [];
		return {
			queue: function(fn) {
				q.push(fn);
			},
			flush: function() {
				__g.depth++;
				try {
					var fn;
					while (fn = q.shift()) fn();
				} finally {
					__g.depth--;
				}
			}
		}
	})();

	exports.runtime = function(filename) {
		function __func(_, __this, __arguments, fn, index, frame, body) {
			if (!_) {
				return __future.call(__this, fn, __arguments, index);
			}
			frame.file = filename;
			frame.prev = __g.frame;
			__g.frame = frame;
			__g.depth++;
			try {
				frame.active = true;
				body();
			} catch (e) {
				__setEF(e, frame.prev);
				__propagate(_, e);
			} finally {
				frame.active = false;
				__g.frame = frame.prev;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}

		return {
			__g: __g,
			__func: __func,
			__cb: __cb,
			__future: __future,
			__propagate: __propagate,
			__trap: __trap,
			__tryCatch: __tryCatch,
			__forIn: __forIn,
			__apply: __apply,
			__construct: __construct,
			__setEF: __setEF
		};
	}

	function __cb(_, frame, offset, col, fn, trampo) {
		frame.offset = offset;
		frame.col = col;
		var ctx = __g.context;
		return function ___(err, result) {
			var oldFrame = __g.frame;
			__g.frame = frame;
			__g.context = ctx;
			__g.depth++;
			try {
				if (trampo && frame.active && __g.trampoline) {
					__g.trampoline.queue(function() {
						return ___(err, result);
					});
				} else {
					if (err) {
						__setEF(err, frame);
						return _(err);
					}
					frame.active = true;
					return fn(null, result);
				}
			} catch (ex) {
				__setEF(ex, frame);
				return __propagate(_, ex);
			} finally {
				frame.active = false;
				__g.frame = oldFrame;
				if (--__g.depth === 0 && __g.trampoline) __g.trampoline.flush();
			}
		}
	}

	// unfortunately callee is gone. So we need to pass a function

	function __future(fn, args, i) {
		var err, result, done, q = [];
		args = Array.prototype.slice.call(args);
		args[i] = function(e, r) {
			err = e, result = r, done = true;
			q && q.forEach(function(f) {
				try {
					f(e, r);
				} catch (ex) {
					__trap(ex);
				}
			});
			q = null;
		};
		fn.apply(this, args);
		return function ___(_) {
			if (!_) return ___;
			if (done) _(err, result);
			else q.push(_)
		}
	}

	function __propagate(_, err) {
		try {
			_(err);
		} catch (ex) {
			__trap(ex);
		}
	}

	function __trap(err) {
		if (err) {
			if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err);
			else __g.trampoline.queue(function() {
				throw err;
			});
		}
	}

	__tryCatch: function __tryCatch(_, fn) {
		try {
			fn();
		} catch (e) {
			try {
				_(e);
			} catch (ex) {
				__trap(ex);
			}
		}
	}

	function __forIn(object) {
		var array = [];
		for (var obj in object) {
			array.push(obj);
		}
		return array;
	}

	function __apply(cb, fn, thisObj, args, index) {
		if (cb == null) return __future(__apply, arguments, 0);
		args = Array.prototype.slice.call(args, 0);
		args[index != null ? index : args.length] = cb;
		return fn.apply(thisObj, args);
	}

	function __construct(constructor, i) {
		var key = '__async' + i,
			f;
		return constructor[key] || (constructor[key] = function() {
			var args = arguments;

			function F() {
				var self = this;
				var cb = args[i];
				args[i] = function(e, r) {
					cb(e, self);
				}
				return constructor.apply(self, args);
			}
			F.prototype = constructor.prototype;
			return new F();
		});
	}

	function __setEF(e, f) {
		function formatStack(e, raw) {
			var s = raw,
				f, skip, skipFunc = 0;
			if (s) {
				var ff;
				s = s.split('\n').map(function(l) {
					// try to map firefox format to V8 format
					// ffOffset takes care of lines difference introduced by require.js script.
					var ffOffset = (typeof navigator === 'object' && typeof require === 'function' && require.async) ? 10 : 0;
					var m = /(^[^(]+)\([^@]*\@(.*)\:(\d+)$/.exec(l);
					l = m ? "    at " + m[1] + " (" + m[2] + ":" + (parseInt(m[3]) - ffOffset) + ":0)" : l;
					ff = ff || (m != null);
					var i = l.indexOf('__$');
					if (i >= 0 && !skip) {
						skip = true;
						return l.substring(0, i) + l.substring(i + 3) + '\n';
					}
					return skip ? '' : l + '\n';
				}).join('');
				if (ff) // firefox does not include message
				s = "Error: " + e.message + '\n' + s;
				for (var f = e.__frame; f; f = f.prev) {
					if (f.offset >= 0) s += "    at " + f.name + " (" + f.file + ":" + (f.line + f.offset) + ":" + f.col + ")\n"
				}
			}
			return s;
		};
		e.__frame = e.__frame || f;
		if (exports.stackTraceEnabled && e.__lookupGetter__ && e.__lookupGetter__("rawStack") == null) {
			var getter = e.__lookupGetter__("stack");
			if (!getter) { // FF or Safari case
				var raw = e.stack || "raw stack unavailable";
				getter = function() {
					return raw;
				}
			}
			e.__defineGetter__("rawStack", getter);
			e.__defineGetter__("stack", function() {
				return formatStack(e, getter());
			});
		}
	}

	/// * `runtime.stackTraceEnabled = true/false;`
	///   If true, `err.stack` returns the reconstructed _sync_ stack trace.
	///   Otherwise, it returns the _raw_ stack trace.
	///   The default is true, but you must require the flows module
	///   at least once to enable sync stack traces.
	exports.stackTraceEnabled = true;
	})(typeof exports !== 'undefined' ? exports : (window.StreamlineRuntime = window.StreamlineRuntime || {
	globals: {}
}));
require && require("streamline/lib/callbacks/builtins");
},{"../globals":30,"streamline/lib/callbacks/builtins":57}],54:[function(require,module,exports){(function(process,__dirname){var path = require('path');
var fs = require('fs');

function Mime() {
  // Map of extension -> mime type
  this.types = Object.create(null);

  // Map of mime type -> extension
  this.extensions = Object.create(null);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];

    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG_MIME && this.types[exts]) {
        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
          this.types[exts] + ' to ' + type);
      }

      this.types[exts[i]] = type;
    }

    // Default extension is the first one we encounter
    if (!this.extensions[type]) {
      this.extensions[type] = exts[0];
    }
  }
};

/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */
Mime.prototype.load = function(file) {

  this._loading = file;
  // Read file and split into lines
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
    // Clean up whitespace/comments, and split into fields
    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
    map[fields.shift()] = fields;
  });

  this.define(map);

  this._loading = null;
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.lookup = function(path, fallback) {
  var ext = path.replace(/.*[\.\/]/, '').toLowerCase();

  return this.types[ext] || fallback || this.default_type;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.extension = function(mimeType) {
  return this.extensions[mimeType];
};

// Default instance
var mime = new Mime();

// Load local copy of
// http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
mime.load(path.join(__dirname, 'types/mime.types'));

// Load additional types from node.js community
mime.load(path.join(__dirname, 'types/node.types'));

// Default type
mime.default_type = mime.lookup('bin');

//
// Additional API specific to the default instance
//

mime.Mime = Mime;

/**
 * Lookup a charset based on mime type.
 */
mime.charsets = {
  lookup: function(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
  }
};

module.exports = mime;

})(require("__browserify_process"),"/../../node_modules/libsecretarius/node_modules/request/node_modules/mime")
},{"path":58,"fs":59,"__browserify_process":49}],26:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function(exports) {








  "use strict";
  var VERSION = 3;

  var future = function(fn, args, i) {
    var err, result, done, q = [], self = this;

    args = Array.prototype.slice.call(args);
    args[i] = function(e, r) {
      err = e, result = r, done = true;
      (q && q.forEach(function(f) {
        f.call(self, e, r); }));

      q = null; };

    fn.apply(this, args);
    return function F(cb) {
      if (!cb) { return F };
      if (done) { cb.call(self, err, result); } else {
        q.push(cb); }; }; };




  exports.funnel = function(max) {
    max = ((max == null) ? -1 : max);
    if ((max === 0)) { max = funnel.defaultSize; };
    if ((typeof max !== "number")) { throw new Error(("bad max number: " + max)) };
    var queue = [], active = 0, closed = false;



    var fun = function(callback, fn) {
      if ((callback == null)) { return future(fun, arguments, 0) };

      if (((max < 0) || (max == Infinity))) { return fn(callback) };

      queue.push({
        fn: fn,
        cb: callback });


      function _doOne() {
        var current = queue.splice(0, 1)[0];
        if (!current.cb) { return current.fn() };
        active++;
        current.fn(function(err, result) {
          active--;
          if (!closed) {
            current.cb(err, result);
            while (((active < max) && (queue.length > 0))) { _doOne();; }; } ; }); };




      while (((active < max) && (queue.length > 0))) { _doOne();; }; };

    fun.close = function() {
      queue = [], closed = true; };

    return fun; };

  var funnel = exports.funnel;
  funnel.defaultSize = 4;

  function _parallel(options) {
    if ((typeof options === "number")) { return options };
    if ((typeof options.parallel === "number")) { return options.parallel };
    return (options.parallel ? -1 : 1); };


  if ((Array.prototype.forEach_ && (Array.prototype.forEach_.version_ >= VERSION))) { return };


  try {
    Object.defineProperty({ }, "x", { });
  } catch (e) {
    return; };


  var has = Object.prototype.hasOwnProperty;

























  delete Array.prototype.forEach_;
  Object.defineProperty(Array.prototype, "forEach_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__1(_, options, fn, thisObj) { var par, len, i, __this = this; var __frame = { name: "value__1", line: 120 }; return __func(_, this, arguments, value__1, 0, __frame, function __$value__1() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__1(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __2 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__1() { __more = false; if (__2) { i++; } else { __2 = true; } ; var __1 = (i < len); if (__1) { return (function __$value__1(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 7, 28, __then, true), __this[i], i); } else { __then(); } ; })(function __$value__1() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            return __this.map_(__cb(_, __frame, 10, 4, __then, true), par, fn, thisObj); } ; })(function __$value__1() { return _(null, __this); }); }); } });




  Array.prototype.forEach_.version_ = VERSION;


  delete Array.prototype.map_;
  Object.defineProperty(Array.prototype, "map_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__2(_, options, fn, thisObj) { var par, len, result, i, fun, __this = this; var __frame = { name: "value__2", line: 143 }; return __func(_, this, arguments, value__2, 0, __frame, function __$value__2() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__2(__then) {

          if (((par === 1) || (len <= 1))) {
            result = new Array(len);
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 9, 40, function ___(__0, __1) { result[i] = __1; __then(); }, true), __this[i], i); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            result = __this.map(function(elt, i) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 157 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt, i); }); }); });


            i = 0; var __7 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__7) { i++; } else { __7 = true; } ; var __6 = (i < len); if (__6) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return result[i](__cb(_, __frame, 19, 40, function ___(__0, __2) { result[i] = __2; __then(); }, true)); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__2() {


          return _(null, result); }); }); } });




  delete Array.prototype.filter_;
  Object.defineProperty(Array.prototype, "filter_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__3(_, options, fn, thisObj) { var par, result, len, i, elt, __this = this; var __frame = { name: "value__3", line: 175 }; return __func(_, this, arguments, value__3, 0, __frame, function __$value__3() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        result = [];
        len = __this.length; return (function __$value__3(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__3() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__3(__then) {
                    if (has.call(__this, i)) {
                      elt = __this[i];
                      return fn.call(thisObj, __cb(_, __frame, 10, 10, function ___(__0, __2) { return (function __$value__3(__then) { if (__2) { result.push(elt); __then(); } else { __then(); } ; })(__then); }, true), elt); } else { __then(); } ; })(function __$value__3() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {



            return __this.map_(__cb(_, __frame, 14, 4, __then, true), par, function __1(_, elt) { var __frame = { name: "__1", line: 189 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                return fn.call(thisObj, __cb(_, __frame, 1, 9, function ___(__0, __1) { return (function __$__1(__then) { if (__1) { result.push(elt); __then(); } else { __then(); } ; })(_); }, true), elt); });
            }, thisObj); } ; })(function __$value__3() {

          return _(null, result); }); }); } });




  delete Array.prototype.every_;
  Object.defineProperty(Array.prototype, "every_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__4(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__4", line: 203 }; return __func(_, this, arguments, value__4, 0, __frame, function __$value__4() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__4(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__4(_) {

                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 8, 31, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true), __this[i]); })(__cb(_, __frame, -202, 17, function ___(__0, __3) { return (function __$value__4(__then) { if (__3) { return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 216 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__4(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 18, 31, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true)); })(__cb(_, __frame, -202, 17, function ___(__0, __4) { return (function __$value__4(__then) { if (__4) {
                        fun.close();
                        return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__4() {



          return _(null, true); }); }); } });




  delete Array.prototype.some_;
  Object.defineProperty(Array.prototype, "some_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__5(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__5", line: 237 }; return __func(_, this, arguments, value__5, 0, __frame, function __$value__5() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__5(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__5(_) {
                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 7, 30, _, true), __this[i]); })(__cb(_, __frame, -236, 17, function ___(__0, __3) { return (function __$value__5(__then) { if (__3) { return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 249 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__5(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 17, 30, _, true)); })(__cb(_, __frame, -236, 17, function ___(__0, __4) { return (function __$value__5(__then) { if (__4) {
                        fun.close();
                        return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__5() {



          return _(null, false); }); }); } });




  delete Array.prototype.reduce_;
  Object.defineProperty(Array.prototype, "reduce_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__6(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__6", line: 270 }; return __func(_, this, arguments, value__6, 0, __frame, function __$value__6() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__6() { __more = false; if (__3) { i++; } else { __3 = true; } ; var __2 = (i < len); if (__2) { return (function __$value__6(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__6() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__6() {

          return _(null, v); }); }); } });




  delete Array.prototype.reduceRight_;
  Object.defineProperty(Array.prototype, "reduceRight_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__7(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__7", line: 286 }; return __func(_, this, arguments, value__7, 0, __frame, function __$value__7() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = (len - 1); var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__7() { __more = false; if (__3) { i--; } else { __3 = true; } ; var __2 = (i >= 0); if (__2) { return (function __$value__7(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__7() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__7() {

          return _(null, v); }); }); } });






  delete Array.prototype.sort_;
  Object.defineProperty(Array.prototype, "sort_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__8(_, compare, beg, end) { var array, __this = this;




      function _qsort(_, beg, end) { var tmp, mid, o, nbeg, nend; var __frame = { name: "_qsort", line: 309 }; return __func(_, this, arguments, _qsort, 0, __frame, function __$_qsort() {
          if ((beg >= end)) { return _(null); } ; return (function __$_qsort(__then) {

            if ((end == (beg + 1))) {
              return compare(__cb(_, __frame, 4, 9, function ___(__0, __2) { var __1 = (__2 > 0); return (function __$_qsort(__then) { if (__1) {
                    tmp = array[beg];
                    array[beg] = array[end];
                    array[end] = tmp; __then(); } else { __then(); } ; })(function __$_qsort() { return _(null); }); }, true), array[beg], array[end]); } else { __then(); } ; })(function __$_qsort() {




            mid = Math.floor((((beg + end)) / 2));
            o = array[mid];
            nbeg = beg;
            nend = end; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false;

                var __4 = (nbeg <= nend); if (__4) { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                          var __1 = (nbeg < end); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 18, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), array[nbeg], o); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __5) { if (__5) { nbeg++; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                            var __1 = (beg < nend); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 19, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), o, array[nend]); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __7) { if (__7) { nend--; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() {

                      if ((nbeg <= nend)) {
                        tmp = array[nbeg];
                        array[nbeg] = array[nend];
                        array[nend] = tmp;
                        nbeg++;
                        nend--; } ; while (__more) { __loop(); }; __more = true; }); }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function __$_qsort(__then) {



                if ((nbeg < end)) { return _qsort(__cb(_, __frame, 30, 20, __then, true), nbeg, end); } else { __then(); } ; })(function __$_qsort() { return (function __$_qsort(__then) {
                  if ((beg < nend)) { return _qsort(__cb(_, __frame, 31, 20, __then, true), beg, nend); } else { __then(); } ; })(_); }); }); }); }); }; var __frame = { name: "value__8", line: 304 }; return __func(_, this, arguments, value__8, 0, __frame, function __$value__8() { array = __this; beg = (beg || 0); end = ((end == null) ? (array.length - 1) : end);

        return _qsort(__cb(_, __frame, 38, 3, function __$value__8() {
          return _(null, array); }, true), beg, end); }); } });











  delete Function.prototype.apply_;
  Object.defineProperty(Function.prototype, "apply_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(callback, thisObj, args, index) {
      args = Array.prototype.slice.call(args, 0);
      args.splice((((index != null) && (index >= 0)) ? index : args.length), 0, callback);
      return this.apply(thisObj, args); } });


})(((typeof exports !== "undefined") ? exports : (window.StreamlineBuiltins = (window.StreamlineBuiltins || {}))));
})("/../../node_modules/streamline/lib/callbacks/builtins.js")
},{"streamline/lib/callbacks/runtime":14}],60:[function(require,module,exports){var Stream = require('stream');

var Response = module.exports = function (res) {
    this.offset = 0;
    this.readable = true;
};

Response.prototype = new Stream;

var capable = {
    streaming : true,
    status2 : true
};

function parseHeaders (res) {
    var lines = res.getAllResponseHeaders().split(/\r?\n/);
    var headers = {};
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line === '') continue;
        
        var m = line.match(/^([^:]+):\s*(.*)/);
        if (m) {
            var key = m[1].toLowerCase(), value = m[2];
            
            if (headers[key] !== undefined) {
            
                if (isArray(headers[key])) {
                    headers[key].push(value);
                }
                else {
                    headers[key] = [ headers[key], value ];
                }
            }
            else {
                headers[key] = value;
            }
        }
        else {
            headers[line] = true;
        }
    }
    return headers;
}

Response.prototype.getResponse = function (xhr) {
    var respType = String(xhr.responseType).toLowerCase();
    if (respType === 'blob') return xhr.responseBlob;
    if (respType === 'arraybuffer') return xhr.response;
    return xhr.responseText;
}

Response.prototype.getHeader = function (key) {
    return this.headers[key.toLowerCase()];
};

Response.prototype.handle = function (res) {
    if (res.readyState === 2 && capable.status2) {
        try {
            this.statusCode = res.status;
            this.headers = parseHeaders(res);
        }
        catch (err) {
            capable.status2 = false;
        }
        
        if (capable.status2) {
            this.emit('ready');
        }
    }
    else if (capable.streaming && res.readyState === 3) {
        try {
            if (!this.statusCode) {
                this.statusCode = res.status;
                this.headers = parseHeaders(res);
                this.emit('ready');
            }
        }
        catch (err) {}
        
        try {
            this._emitData(res);
        }
        catch (err) {
            capable.streaming = false;
        }
    }
    else if (res.readyState === 4) {
        if (!this.statusCode) {
            this.statusCode = res.status;
            this.emit('ready');
        }
        this._emitData(res);
        
        if (res.error) {
            this.emit('error', this.getResponse(res));
        }
        else this.emit('end');
        
        this.emit('close');
    }
};

Response.prototype._emitData = function (res) {
    var respBody = this.getResponse(res);
    if (respBody.toString().match(/ArrayBuffer/)) {
        this.emit('data', new Uint8Array(respBody, this.offset));
        this.offset = respBody.byteLength;
        return;
    }
    if (respBody.length > this.offset) {
        this.emit('data', respBody.slice(this.offset));
        this.offset = respBody.length;
    }
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

},{"stream":35}],59:[function(require,module,exports){// nothing to see here... no file methods for the browser

},{}],58:[function(require,module,exports){(function(process){function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

})(require("__browserify_process"))
},{"__browserify_process":49}],61:[function(require,module,exports){exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isBE ? 0 : (nBytes - 1),
      d = isBE ? 1 : -1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isBE ? (nBytes - 1) : 0,
      d = isBE ? -1 : 1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],56:[function(require,module,exports){function SlowBuffer (size) {
    this.length = size;
};

var assert = require('assert');

exports.INSPECT_MAX_BYTES = 50;


function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; i++)
    if (str.charCodeAt(i) <= 0x7F)
      byteArray.push(str.charCodeAt(i));
    else {
      var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16));
    }

  return byteArray;
}

function asciiToBytes(str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++ )
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push( str.charCodeAt(i) & 0xFF );

  return byteArray;
}

function base64ToBytes(str) {
  return require("base64-js").toByteArray(str);
}

SlowBuffer.byteLength = function (str, encoding) {
  switch (encoding || "utf8") {
    case 'hex':
      return str.length / 2;

    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(str).length;

    case 'ascii':
      return str.length;

    case 'base64':
      return base64ToBytes(str).length;

    default:
      throw new Error('Unknown encoding');
  }
};

function blitBuffer(src, dst, offset, length) {
  var pos, i = 0;
  while (i < length) {
    if ((i+offset >= dst.length) || (i >= src.length))
      break;

    dst[i + offset] = src[i];
    i++;
  }
  return i;
}

SlowBuffer.prototype.utf8Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(utf8ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.asciiWrite = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten =  blitBuffer(asciiToBytes(string), this, offset, length);
};

SlowBuffer.prototype.base64Write = function (string, offset, length) {
  var bytes, pos;
  return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
};

SlowBuffer.prototype.base64Slice = function (start, end) {
  var bytes = Array.prototype.slice.apply(this, arguments)
  return require("base64-js").fromByteArray(bytes);
}

function decodeUtf8Char(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return String.fromCharCode(0xFFFD); // UTF 8 invalid char
  }
}

SlowBuffer.prototype.utf8Slice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var res = "";
  var tmp = "";
  var i = 0;
  while (i < bytes.length) {
    if (bytes[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
      tmp = "";
    } else
      tmp += "%" + bytes[i].toString(16);

    i++;
  }

  return res + decodeUtf8Char(tmp);
}

SlowBuffer.prototype.asciiSlice = function () {
  var bytes = Array.prototype.slice.apply(this, arguments);
  var ret = "";
  for (var i = 0; i < bytes.length; i++)
    ret += String.fromCharCode(bytes[i]);
  return ret;
}

SlowBuffer.prototype.inspect = function() {
  var out = [],
      len = this.length;
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }
  return '<SlowBuffer ' + out.join(' ') + '>';
};


SlowBuffer.prototype.hexSlice = function(start, end) {
  var len = this.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; i++) {
    out += toHex(this[i]);
  }
  return out;
};


SlowBuffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();
  start = +start || 0;
  if (typeof end == 'undefined') end = this.length;

  // Fastpath empty strings
  if (+end == start) {
    return '';
  }

  switch (encoding) {
    case 'hex':
      return this.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.utf8Slice(start, end);

    case 'ascii':
      return this.asciiSlice(start, end);

    case 'binary':
      return this.binarySlice(start, end);

    case 'base64':
      return this.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


SlowBuffer.prototype.hexWrite = function(string, offset, length) {
  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2) {
    throw new Error('Invalid hex string');
  }
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(byte)) throw new Error('Invalid hex string');
    this[offset + i] = byte;
  }
  SlowBuffer._charsWritten = i * 2;
  return i;
};


SlowBuffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  switch (encoding) {
    case 'hex':
      return this.hexWrite(string, offset, length);

    case 'utf8':
    case 'utf-8':
      return this.utf8Write(string, offset, length);

    case 'ascii':
      return this.asciiWrite(string, offset, length);

    case 'binary':
      return this.binaryWrite(string, offset, length);

    case 'base64':
      return this.base64Write(string, offset, length);

    case 'ucs2':
    case 'ucs-2':
      return this.ucs2Write(string, offset, length);

    default:
      throw new Error('Unknown encoding');
  }
};


// slice(start, end)
SlowBuffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;

  if (end > this.length) {
    throw new Error('oob');
  }
  if (start > end) {
    throw new Error('oob');
  }

  return new Buffer(this, end - start, +start);
};

SlowBuffer.prototype.copy = function(target, targetstart, sourcestart, sourceend) {
  var temp = [];
  for (var i=sourcestart; i<sourceend; i++) {
    assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
    temp.push(this[i]);
  }

  for (var i=targetstart; i<targetstart+temp.length; i++) {
    target[i] = temp[i-targetstart];
  }
};

function coerce(length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length);
  return length < 0 ? 0 : length;
}


// Buffer

function Buffer(subject, encoding, offset) {
  if (!(this instanceof Buffer)) {
    return new Buffer(subject, encoding, offset);
  }

  var type;

  // Are we slicing?
  if (typeof offset === 'number') {
    this.length = coerce(encoding);
    this.parent = subject;
    this.offset = offset;
  } else {
    // Find the length
    switch (type = typeof subject) {
      case 'number':
        this.length = coerce(subject);
        break;

      case 'string':
        this.length = Buffer.byteLength(subject, encoding);
        break;

      case 'object': // Assume object is an array
        this.length = coerce(subject.length);
        break;

      default:
        throw new Error('First argument needs to be a number, ' +
                        'array or string.');
    }

    if (this.length > Buffer.poolSize) {
      // Big buffer, just alloc one.
      this.parent = new SlowBuffer(this.length);
      this.offset = 0;

    } else {
      // Small buffer.
      if (!pool || pool.length - pool.used < this.length) allocPool();
      this.parent = pool;
      this.offset = pool.used;
      pool.used += this.length;
    }

    // Treat array-ish objects as a byte array.
    if (isArrayIsh(subject)) {
      for (var i = 0; i < this.length; i++) {
        this.parent[i + this.offset] = subject[i];
      }
    } else if (type == 'string') {
      // We are a string
      this.length = this.write(subject, 0, encoding);
    }
  }

}

function isArrayIsh(subject) {
  return Array.isArray(subject) || Buffer.isBuffer(subject) ||
         subject && typeof subject === 'object' &&
         typeof subject.length === 'number';
}

exports.SlowBuffer = SlowBuffer;
exports.Buffer = Buffer;

Buffer.poolSize = 8 * 1024;
var pool;

function allocPool() {
  pool = new SlowBuffer(Buffer.poolSize);
  pool.used = 0;
}


// Static methods
Buffer.isBuffer = function isBuffer(b) {
  return b instanceof Buffer || b instanceof SlowBuffer;
};

Buffer.concat = function (list, totalLength) {
  if (!Array.isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = new Buffer(totalLength);
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

// Inspect
Buffer.prototype.inspect = function inspect() {
  var out = [],
      len = this.length;

  for (var i = 0; i < len; i++) {
    out[i] = toHex(this.parent[i + this.offset]);
    if (i == exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...';
      break;
    }
  }

  return '<Buffer ' + out.join(' ') + '>';
};


Buffer.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i];
};


Buffer.prototype.set = function set(i, v) {
  if (i < 0 || i >= this.length) throw new Error('oob');
  return this.parent[this.offset + i] = v;
};


// write(string, offset = 0, length = buffer.length-offset, encoding = 'utf8')
Buffer.prototype.write = function(string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length;
      length = undefined;
    }
  } else {  // legacy
    var swap = encoding;
    encoding = offset;
    offset = length;
    length = swap;
  }

  offset = +offset || 0;
  var remaining = this.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = +length;
    if (length > remaining) {
      length = remaining;
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase();

  var ret;
  switch (encoding) {
    case 'hex':
      ret = this.parent.hexWrite(string, this.offset + offset, length);
      break;

    case 'utf8':
    case 'utf-8':
      ret = this.parent.utf8Write(string, this.offset + offset, length);
      break;

    case 'ascii':
      ret = this.parent.asciiWrite(string, this.offset + offset, length);
      break;

    case 'binary':
      ret = this.parent.binaryWrite(string, this.offset + offset, length);
      break;

    case 'base64':
      // Warning: maxLength not taken into account in base64Write
      ret = this.parent.base64Write(string, this.offset + offset, length);
      break;

    case 'ucs2':
    case 'ucs-2':
      ret = this.parent.ucs2Write(string, this.offset + offset, length);
      break;

    default:
      throw new Error('Unknown encoding');
  }

  Buffer._charsWritten = SlowBuffer._charsWritten;

  return ret;
};


// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function(encoding, start, end) {
  encoding = String(encoding || 'utf8').toLowerCase();

  if (typeof start == 'undefined' || start < 0) {
    start = 0;
  } else if (start > this.length) {
    start = this.length;
  }

  if (typeof end == 'undefined' || end > this.length) {
    end = this.length;
  } else if (end < 0) {
    end = 0;
  }

  start = start + this.offset;
  end = end + this.offset;

  switch (encoding) {
    case 'hex':
      return this.parent.hexSlice(start, end);

    case 'utf8':
    case 'utf-8':
      return this.parent.utf8Slice(start, end);

    case 'ascii':
      return this.parent.asciiSlice(start, end);

    case 'binary':
      return this.parent.binarySlice(start, end);

    case 'base64':
      return this.parent.base64Slice(start, end);

    case 'ucs2':
    case 'ucs-2':
      return this.parent.ucs2Slice(start, end);

    default:
      throw new Error('Unknown encoding');
  }
};


// byteLength
Buffer.byteLength = SlowBuffer.byteLength;


// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill(value, start, end) {
  value || (value = 0);
  start || (start = 0);
  end || (end = this.length);

  if (typeof value === 'string') {
    value = value.charCodeAt(0);
  }
  if (!(typeof value === 'number') || isNaN(value)) {
    throw new Error('value is not a number');
  }

  if (end < start) throw new Error('end < start');

  // Fill 0 bytes; we're done
  if (end === start) return 0;
  if (this.length == 0) return 0;

  if (start < 0 || start >= this.length) {
    throw new Error('start out of bounds');
  }

  if (end < 0 || end > this.length) {
    throw new Error('end out of bounds');
  }

  return this.parent.fill(value,
                          start + this.offset,
                          end + this.offset);
};


// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function(target, target_start, start, end) {
  var source = this;
  start || (start = 0);
  end || (end = this.length);
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  return this.parent.copy(target.parent,
                          target_start + target.offset,
                          start + this.offset,
                          end + this.offset);
};


// slice(start, end)
Buffer.prototype.slice = function(start, end) {
  if (end === undefined) end = this.length;
  if (end > this.length) throw new Error('oob');
  if (start > end) throw new Error('oob');

  return new Buffer(this.parent, end - start, +start + this.offset);
};


// Legacy methods for backwards compatibility.

Buffer.prototype.utf8Slice = function(start, end) {
  return this.toString('utf8', start, end);
};

Buffer.prototype.binarySlice = function(start, end) {
  return this.toString('binary', start, end);
};

Buffer.prototype.asciiSlice = function(start, end) {
  return this.toString('ascii', start, end);
};

Buffer.prototype.utf8Write = function(string, offset) {
  return this.write(string, offset, 'utf8');
};

Buffer.prototype.binaryWrite = function(string, offset) {
  return this.write(string, offset, 'binary');
};

Buffer.prototype.asciiWrite = function(string, offset) {
  return this.write(string, offset, 'ascii');
};

Buffer.prototype.readUInt8 = function(offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  return buffer.parent[buffer.offset + offset];
};

function readUInt16(buffer, offset, isBigEndian, noAssert) {
  var val = 0;


  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (isBigEndian) {
    val = buffer.parent[buffer.offset + offset] << 8;
    val |= buffer.parent[buffer.offset + offset + 1];
  } else {
    val = buffer.parent[buffer.offset + offset];
    val |= buffer.parent[buffer.offset + offset + 1] << 8;
  }

  return val;
}

Buffer.prototype.readUInt16LE = function(offset, noAssert) {
  return readUInt16(this, offset, false, noAssert);
};

Buffer.prototype.readUInt16BE = function(offset, noAssert) {
  return readUInt16(this, offset, true, noAssert);
};

function readUInt32(buffer, offset, isBigEndian, noAssert) {
  var val = 0;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  if (isBigEndian) {
    val = buffer.parent[buffer.offset + offset + 1] << 16;
    val |= buffer.parent[buffer.offset + offset + 2] << 8;
    val |= buffer.parent[buffer.offset + offset + 3];
    val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0);
  } else {
    val = buffer.parent[buffer.offset + offset + 2] << 16;
    val |= buffer.parent[buffer.offset + offset + 1] << 8;
    val |= buffer.parent[buffer.offset + offset];
    val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0);
  }

  return val;
}

Buffer.prototype.readUInt32LE = function(offset, noAssert) {
  return readUInt32(this, offset, false, noAssert);
};

Buffer.prototype.readUInt32BE = function(offset, noAssert) {
  return readUInt32(this, offset, true, noAssert);
};


/*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
Buffer.prototype.readInt8 = function(offset, noAssert) {
  var buffer = this;
  var neg;

  if (!noAssert) {
    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to read beyond buffer length');
  }

  neg = buffer.parent[buffer.offset + offset] & 0x80;
  if (!neg) {
    return (buffer.parent[buffer.offset + offset]);
  }

  return ((0xff - buffer.parent[buffer.offset + offset] + 1) * -1);
};

function readInt16(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt16(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x8000;
  if (!neg) {
    return val;
  }

  return (0xffff - val + 1) * -1;
}

Buffer.prototype.readInt16LE = function(offset, noAssert) {
  return readInt16(this, offset, false, noAssert);
};

Buffer.prototype.readInt16BE = function(offset, noAssert) {
  return readInt16(this, offset, true, noAssert);
};

function readInt32(buffer, offset, isBigEndian, noAssert) {
  var neg, val;

  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  val = readUInt32(buffer, offset, isBigEndian, noAssert);
  neg = val & 0x80000000;
  if (!neg) {
    return (val);
  }

  return (0xffffffff - val + 1) * -1;
}

Buffer.prototype.readInt32LE = function(offset, noAssert) {
  return readInt32(this, offset, false, noAssert);
};

Buffer.prototype.readInt32BE = function(offset, noAssert) {
  return readInt32(this, offset, true, noAssert);
};

function readFloat(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 3 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.readFloatLE = function(offset, noAssert) {
  return readFloat(this, offset, false, noAssert);
};

Buffer.prototype.readFloatBE = function(offset, noAssert) {
  return readFloat(this, offset, true, noAssert);
};

function readDouble(buffer, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset + 7 < buffer.length,
        'Trying to read beyond buffer length');
  }

  return require('./buffer_ieee754').readIEEE754(buffer, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.readDoubleLE = function(offset, noAssert) {
  return readDouble(this, offset, false, noAssert);
};

Buffer.prototype.readDoubleBE = function(offset, noAssert) {
  return readDouble(this, offset, true, noAssert);
};


/*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
function verifuint(value, max) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value >= 0,
      'specified a negative value for writing an unsigned value');

  assert.ok(value <= max, 'value is larger than maximum value for type');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xff);
  }

  buffer.parent[buffer.offset + offset] = value;
};

function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffff);
  }

  if (isBigEndian) {
    buffer.parent[buffer.offset + offset] = (value & 0xff00) >>> 8;
    buffer.parent[buffer.offset + offset + 1] = value & 0x00ff;
  } else {
    buffer.parent[buffer.offset + offset + 1] = (value & 0xff00) >>> 8;
    buffer.parent[buffer.offset + offset] = value & 0x00ff;
  }
}

Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
  writeUInt16(this, value, offset, true, noAssert);
};

function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'trying to write beyond buffer length');

    verifuint(value, 0xffffffff);
  }

  if (isBigEndian) {
    buffer.parent[buffer.offset + offset] = (value >>> 24) & 0xff;
    buffer.parent[buffer.offset + offset + 1] = (value >>> 16) & 0xff;
    buffer.parent[buffer.offset + offset + 2] = (value >>> 8) & 0xff;
    buffer.parent[buffer.offset + offset + 3] = value & 0xff;
  } else {
    buffer.parent[buffer.offset + offset + 3] = (value >>> 24) & 0xff;
    buffer.parent[buffer.offset + offset + 2] = (value >>> 16) & 0xff;
    buffer.parent[buffer.offset + offset + 1] = (value >>> 8) & 0xff;
    buffer.parent[buffer.offset + offset] = value & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
  writeUInt32(this, value, offset, true, noAssert);
};


/*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */

/*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
function verifsint(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');

  assert.ok(Math.floor(value) === value, 'value has a fractional component');
}

function verifIEEE754(value, max, min) {
  assert.ok(typeof (value) == 'number',
      'cannot write a non-number as a number');

  assert.ok(value <= max, 'value larger than maximum allowed value');

  assert.ok(value >= min, 'value smaller than minimum allowed value');
}

Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
  var buffer = this;

  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7f, -0x80);
  }

  if (value >= 0) {
    buffer.writeUInt8(value, offset, noAssert);
  } else {
    buffer.writeUInt8(0xff + value + 1, offset, noAssert);
  }
};

function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 1 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fff, -0x8000);
  }

  if (value >= 0) {
    writeUInt16(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
  writeInt16(this, value, offset, true, noAssert);
};

function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifsint(value, 0x7fffffff, -0x80000000);
  }

  if (value >= 0) {
    writeUInt32(buffer, value, offset, isBigEndian, noAssert);
  } else {
    writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
  }
}

Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, false, noAssert);
};

Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
  writeInt32(this, value, offset, true, noAssert);
};

function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 3 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      23, 4);
}

Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, false, noAssert);
};

Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
  writeFloat(this, value, offset, true, noAssert);
};

function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
  if (!noAssert) {
    assert.ok(value !== undefined && value !== null,
        'missing value');

    assert.ok(typeof (isBigEndian) === 'boolean',
        'missing or invalid endian');

    assert.ok(offset !== undefined && offset !== null,
        'missing offset');

    assert.ok(offset + 7 < buffer.length,
        'Trying to write beyond buffer length');

    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  require('./buffer_ieee754').writeIEEE754(buffer, value, offset, isBigEndian,
      52, 8);
}

Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, false, noAssert);
};

Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
  writeDouble(this, value, offset, true, noAssert);
};

SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8;
SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE;
SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE;
SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE;
SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE;
SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE;

},{"assert":51,"./buffer_ieee754":61,"base64-js":62}],39:[function(require,module,exports){var Stream = require('stream');
var Response = require('./response');
var concatStream = require('concat-stream')

var Request = module.exports = function (xhr, params) {
    var self = this;
    self.writable = true;
    self.xhr = xhr;
    self.body = concatStream()
    
    var uri = params.host + ':' + params.port + (params.path || '/');
    
    xhr.open(
        params.method || 'GET',
        (params.scheme || 'http') + '://' + uri,
        true
    );
    
    if (params.headers) {
        var keys = objectKeys(params.headers);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!self.isSafeRequestHeader(key)) return;
            var value = params.headers[key];
            if (isArray(value)) {
                for (var j = 0; j < value.length; j++) {
                    xhr.setRequestHeader(key, value[j]);
                }
            }
            else xhr.setRequestHeader(key, value)
        }
    }
    
    var res = new Response;
    res.on('close', function () {
        self.emit('close');
    });
    
    res.on('ready', function () {
        self.emit('response', res);
    });
    
    xhr.onreadystatechange = function () {
        res.handle(xhr);
    };
};

Request.prototype = new Stream;

Request.prototype.setHeader = function (key, value) {
    if (isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            this.xhr.setRequestHeader(key, value[i]);
        }
    }
    else {
        this.xhr.setRequestHeader(key, value);
    }
};

Request.prototype.write = function (s) {
    this.body.write(s);
};

Request.prototype.destroy = function (s) {
    this.xhr.abort();
    this.emit('close');
};

Request.prototype.end = function (s) {
    if (s !== undefined) this.body.write(s);
    this.body.end()
    this.xhr.send(this.body.getBody());
};

// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
Request.unsafeHeaders = [
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "cookie",
    "cookie2",
    "content-transfer-encoding",
    "date",
    "expect",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "user-agent",
    "via"
];

Request.prototype.isSafeRequestHeader = function (headerName) {
    if (!headerName) return false;
    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var indexOf = function (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
};

},{"stream":35,"./response":60,"concat-stream":63}],62:[function(require,module,exports){(function (exports) {
	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function b64ToByteArray(b64) {
		var i, j, l, tmp, placeHolders, arr;
	
		if (b64.length % 4 > 0) {
			throw 'Invalid string. Length must be a multiple of 4';
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		placeHolders = b64.indexOf('=');
		placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;

		// base64 is 4/3 + up to two characters of the original data
		arr = [];//new Uint8Array(b64.length * 3 / 4 - placeHolders);

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length;

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
			arr.push((tmp & 0xFF0000) >> 16);
			arr.push((tmp & 0xFF00) >> 8);
			arr.push(tmp & 0xFF);
		}

		if (placeHolders === 2) {
			tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
			arr.push(tmp & 0xFF);
		} else if (placeHolders === 1) {
			tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
			arr.push((tmp >> 8) & 0xFF);
			arr.push(tmp & 0xFF);
		}

		return arr;
	}

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	module.exports.toByteArray = b64ToByteArray;
	module.exports.fromByteArray = uint8ToBase64;
}());

},{}],63:[function(require,module,exports){var stream = require('stream')
var util = require('util')

function ConcatStream(cb) {
  stream.Stream.call(this)
  this.writable = true
  if (cb) this.cb = cb
  this.body = []
  if (this.cb) this.on('error', cb)
}

util.inherits(ConcatStream, stream.Stream)

ConcatStream.prototype.write = function(chunk) {
  this.body.push(chunk)
}

ConcatStream.prototype.arrayConcat = function(arrs) {
  if (arrs.length === 0) return []
  if (arrs.length === 1) return arrs[0]
  return arrs.reduce(function (a, b) { return a.concat(b) })
}

ConcatStream.prototype.isArray = function(arr) {
  var isArray = Array.isArray(arr)
  var isTypedArray = arr.toString().match(/Array/)
  return isArray || isTypedArray
}

ConcatStream.prototype.getBody = function () {
  if (this.body.length === 0) return
  if (typeof(this.body[0]) === "string") return this.body.join('')
  if (this.isArray(this.body[0])) return this.arrayConcat(this.body)
  if (typeof(Buffer) !== "undefined" && Buffer.isBuffer(this.body[0])) {
    return Buffer.concat(this.body)
  }
  return this.body
}

ConcatStream.prototype.end = function() {
  if (this.cb) this.cb(false, this.getBody())
}

module.exports = function(cb) {
  return new ConcatStream(cb)
}

module.exports.ConcatStream = ConcatStream

},{"stream":35,"util":33}],57:[function(require,module,exports){(function(__filename){/*** Generated by streamline 0.4.6 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function(exports) {








  "use strict";
  var VERSION = 3;

  var future = function(fn, args, i) {
    var err, result, done, q = [], self = this;

    args = Array.prototype.slice.call(args);
    args[i] = function(e, r) {
      err = e, result = r, done = true;
      (q && q.forEach(function(f) {
        f.call(self, e, r); }));

      q = null; };

    fn.apply(this, args);
    return function F(cb) {
      if (!cb) { return F };
      if (done) { cb.call(self, err, result); } else {
        q.push(cb); }; }; };




  exports.funnel = function(max) {
    max = ((max == null) ? -1 : max);
    if ((max === 0)) { max = funnel.defaultSize; };
    if ((typeof max !== "number")) { throw new Error(("bad max number: " + max)) };
    var queue = [], active = 0, closed = false;



    var fun = function(callback, fn) {
      if ((callback == null)) { return future(fun, arguments, 0) };

      if (((max < 0) || (max == Infinity))) { return fn(callback) };

      queue.push({
        fn: fn,
        cb: callback });


      function _doOne() {
        var current = queue.splice(0, 1)[0];
        if (!current.cb) { return current.fn() };
        active++;
        current.fn(function(err, result) {
          active--;
          if (!closed) {
            current.cb(err, result);
            while (((active < max) && (queue.length > 0))) { _doOne();; }; } ; }); };




      while (((active < max) && (queue.length > 0))) { _doOne();; }; };

    fun.close = function() {
      queue = [], closed = true; };

    return fun; };

  var funnel = exports.funnel;
  funnel.defaultSize = 4;

  function _parallel(options) {
    if ((typeof options === "number")) { return options };
    if ((typeof options.parallel === "number")) { return options.parallel };
    return (options.parallel ? -1 : 1); };


  if ((Array.prototype.forEach_ && (Array.prototype.forEach_.version_ >= VERSION))) { return };


  try {
    Object.defineProperty({ }, "x", { });
  } catch (e) {
    return; };


  var has = Object.prototype.hasOwnProperty;

























  delete Array.prototype.forEach_;
  Object.defineProperty(Array.prototype, "forEach_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__1(_, options, fn, thisObj) { var par, len, i, __this = this; var __frame = { name: "value__1", line: 120 }; return __func(_, this, arguments, value__1, 0, __frame, function __$value__1() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__1(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __2 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__1() { __more = false; if (__2) { i++; } else { __2 = true; } ; var __1 = (i < len); if (__1) { return (function __$value__1(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 7, 28, __then, true), __this[i], i); } else { __then(); } ; })(function __$value__1() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            return __this.map_(__cb(_, __frame, 10, 4, __then, true), par, fn, thisObj); } ; })(function __$value__1() { return _(null, __this); }); }); } });




  Array.prototype.forEach_.version_ = VERSION;


  delete Array.prototype.map_;
  Object.defineProperty(Array.prototype, "map_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__2(_, options, fn, thisObj) { var par, len, result, i, fun, __this = this; var __frame = { name: "value__2", line: 143 }; return __func(_, this, arguments, value__2, 0, __frame, function __$value__2() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__2(__then) {

          if (((par === 1) || (len <= 1))) {
            result = new Array(len);
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 9, 40, function ___(__0, __1) { result[i] = __1; __then(); }, true), __this[i], i); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            result = __this.map(function(elt, i) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 157 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt, i); }); }); });


            i = 0; var __7 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__2() { __more = false; if (__7) { i++; } else { __7 = true; } ; var __6 = (i < len); if (__6) { return (function __$value__2(__then) {
                    if (has.call(__this, i)) { return result[i](__cb(_, __frame, 19, 40, function ___(__0, __2) { result[i] = __2; __then(); }, true)); } else { __then(); } ; })(function __$value__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__2() {


          return _(null, result); }); }); } });




  delete Array.prototype.filter_;
  Object.defineProperty(Array.prototype, "filter_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__3(_, options, fn, thisObj) { var par, result, len, i, elt, __this = this; var __frame = { name: "value__3", line: 175 }; return __func(_, this, arguments, value__3, 0, __frame, function __$value__3() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        result = [];
        len = __this.length; return (function __$value__3(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__3() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < len); if (__3) { return (function __$value__3(__then) {
                    if (has.call(__this, i)) {
                      elt = __this[i];
                      return fn.call(thisObj, __cb(_, __frame, 10, 10, function ___(__0, __2) { return (function __$value__3(__then) { if (__2) { result.push(elt); __then(); } else { __then(); } ; })(__then); }, true), elt); } else { __then(); } ; })(function __$value__3() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {



            return __this.map_(__cb(_, __frame, 14, 4, __then, true), par, function __1(_, elt) { var __frame = { name: "__1", line: 189 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                return fn.call(thisObj, __cb(_, __frame, 1, 9, function ___(__0, __1) { return (function __$__1(__then) { if (__1) { result.push(elt); __then(); } else { __then(); } ; })(_); }, true), elt); });
            }, thisObj); } ; })(function __$value__3() {

          return _(null, result); }); }); } });




  delete Array.prototype.every_;
  Object.defineProperty(Array.prototype, "every_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__4(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__4", line: 203 }; return __func(_, this, arguments, value__4, 0, __frame, function __$value__4() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__4(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__4(_) {

                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 8, 31, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true), __this[i]); })(__cb(_, __frame, -202, 17, function ___(__0, __3) { return (function __$value__4(__then) { if (__3) { return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 216 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__4() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__4(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 18, 31, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true)); })(__cb(_, __frame, -202, 17, function ___(__0, __4) { return (function __$value__4(__then) { if (__4) {
                        fun.close();
                        return _(null, false); } else { __then(); } ; })(function __$value__4() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__4() {



          return _(null, true); }); }); } });




  delete Array.prototype.some_;
  Object.defineProperty(Array.prototype, "some_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__5(_, options, fn, thisObj) { var par, len, i, fun, futures, __this = this; var __frame = { name: "value__5", line: 237 }; return __func(_, this, arguments, value__5, 0, __frame, function __$value__5() {
        if ((typeof options === "function")) { thisObj = fn, fn = options, options = 1; } ;
        par = _parallel(options);
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length; return (function __$value__5(__then) {
          if (((par === 1) || (len <= 1))) {
            i = 0; var __6 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__6) { i++; } else { __6 = true; } ; var __5 = (i < len); if (__5) { return (function __$value__5(_) {
                    var __1 = has.call(__this, i); if (!__1) { return _(null, __1); } ; return fn.call(thisObj, __cb(_, __frame, 7, 30, _, true), __this[i]); })(__cb(_, __frame, -236, 17, function ___(__0, __3) { return (function __$value__5(__then) { if (__3) { return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else {


            fun = funnel(par);
            futures = __this.map(function(elt) {
              return fun(null, function __1(_) { var __frame = { name: "__1", line: 249 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                  return fn.call(thisObj, __cb(_, __frame, 1, 13, _, true), elt); }); }); });


            i = 0; var __9 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__5() { __more = false; if (__9) { i++; } else { __9 = true; } ; var __8 = (i < len); if (__8) { return (function __$value__5(_) {
                    var __2 = has.call(__this, i); if (!__2) { return _(null, __2); } ; return futures[i](__cb(_, __frame, 17, 30, _, true)); })(__cb(_, __frame, -236, 17, function ___(__0, __4) { return (function __$value__5(__then) { if (__4) {
                        fun.close();
                        return _(null, true); } else { __then(); } ; })(function __$value__5() { while (__more) { __loop(); }; __more = true; }); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } ; })(function __$value__5() {



          return _(null, false); }); }); } });




  delete Array.prototype.reduce_;
  Object.defineProperty(Array.prototype, "reduce_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__6(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__6", line: 270 }; return __func(_, this, arguments, value__6, 0, __frame, function __$value__6() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__6() { __more = false; if (__3) { i++; } else { __3 = true; } ; var __2 = (i < len); if (__2) { return (function __$value__6(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__6() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__6() {

          return _(null, v); }); }); } });




  delete Array.prototype.reduceRight_;
  Object.defineProperty(Array.prototype, "reduceRight_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__7(_, fn, v, thisObj) { var len, i, __this = this; var __frame = { name: "value__7", line: 286 }; return __func(_, this, arguments, value__7, 0, __frame, function __$value__7() {
        thisObj = ((thisObj !== undefined) ? thisObj : __this);
        len = __this.length;
        i = (len - 1); var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$value__7() { __more = false; if (__3) { i--; } else { __3 = true; } ; var __2 = (i >= 0); if (__2) { return (function __$value__7(__then) {
                if (has.call(__this, i)) { return fn.call(thisObj, __cb(_, __frame, 4, 31, function ___(__0, __1) { v = __1; __then(); }, true), v, __this[i], i, __this); } else { __then(); } ; })(function __$value__7() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$value__7() {

          return _(null, v); }); }); } });






  delete Array.prototype.sort_;
  Object.defineProperty(Array.prototype, "sort_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function value__8(_, compare, beg, end) { var array, __this = this;




      function _qsort(_, beg, end) { var tmp, mid, o, nbeg, nend; var __frame = { name: "_qsort", line: 309 }; return __func(_, this, arguments, _qsort, 0, __frame, function __$_qsort() {
          if ((beg >= end)) { return _(null); } ; return (function __$_qsort(__then) {

            if ((end == (beg + 1))) {
              return compare(__cb(_, __frame, 4, 9, function ___(__0, __2) { var __1 = (__2 > 0); return (function __$_qsort(__then) { if (__1) {
                    tmp = array[beg];
                    array[beg] = array[end];
                    array[end] = tmp; __then(); } else { __then(); } ; })(function __$_qsort() { return _(null); }); }, true), array[beg], array[end]); } else { __then(); } ; })(function __$_qsort() {




            mid = Math.floor((((beg + end)) / 2));
            o = array[mid];
            nbeg = beg;
            nend = end; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false;

                var __4 = (nbeg <= nend); if (__4) { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                          var __1 = (nbeg < end); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 18, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), array[nbeg], o); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __5) { if (__5) { nbeg++; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$_qsort() { __more = false; return (function __$_qsort(_) { return (function __$_qsort(_) {
                            var __1 = (beg < nend); if (!__1) { return _(null, __1); } ; return compare(__cb(_, __frame, 19, 26, function ___(__0, __3) { var __2 = (__3 < 0); return _(null, __2); }, true), o, array[nend]); })(__cb(_, __frame, -308, 17, _, true)); })(__cb(_, __frame, -308, 17, function ___(__0, __7) { if (__7) { nend--; while (__more) { __loop(); }; __more = true; } else { __break(); } ; }, true)); }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() {

                      if ((nbeg <= nend)) {
                        tmp = array[nbeg];
                        array[nbeg] = array[nend];
                        array[nend] = tmp;
                        nbeg++;
                        nend--; } ; while (__more) { __loop(); }; __more = true; }); }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$_qsort() { return (function __$_qsort(__then) {



                if ((nbeg < end)) { return _qsort(__cb(_, __frame, 30, 20, __then, true), nbeg, end); } else { __then(); } ; })(function __$_qsort() { return (function __$_qsort(__then) {
                  if ((beg < nend)) { return _qsort(__cb(_, __frame, 31, 20, __then, true), beg, nend); } else { __then(); } ; })(_); }); }); }); }); }; var __frame = { name: "value__8", line: 304 }; return __func(_, this, arguments, value__8, 0, __frame, function __$value__8() { array = __this; beg = (beg || 0); end = ((end == null) ? (array.length - 1) : end);

        return _qsort(__cb(_, __frame, 38, 3, function __$value__8() {
          return _(null, array); }, true), beg, end); }); } });











  delete Function.prototype.apply_;
  Object.defineProperty(Function.prototype, "apply_", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: function(callback, thisObj, args, index) {
      args = Array.prototype.slice.call(args, 0);
      args.splice((((index != null) && (index >= 0)) ? index : args.length), 0, callback);
      return this.apply(thisObj, args); } });


})(((typeof exports !== "undefined") ? exports : (window.StreamlineBuiltins = (window.StreamlineBuiltins || {}))));
})("/../../node_modules/libsecretarius/node_modules/streamline/lib/callbacks/builtins.js")
},{"streamline/lib/callbacks/runtime":28}],55:[function(require,module,exports){(function(process){var CombinedStream = require('combined-stream');
var util = require('util');
var path = require('path');
var http = require('http');
var https = require('https');
var parseUrl = require('url').parse;
var fs = require('fs');
var mime = require('mime');
var async = require('async');

module.exports = FormData;
function FormData() {
  this._overheadLength = 0;
  this._valueLength = 0;
  this._lengthRetrievers = [];

  CombinedStream.call(this);
}
util.inherits(FormData, CombinedStream);

FormData.LINE_BREAK = '\r\n';

FormData.prototype.append = function(field, value, options) {
  options = options || {};

  var append = CombinedStream.prototype.append.bind(this);

  // all that streamy business can't handle numbers
  if (typeof value == 'number') value = ''+value;

  var header = this._multiPartHeader(field, value, options);
  var footer = this._multiPartFooter(field, value, options);

  append(header);
  append(value);
  append(footer);

  // pass along options.knownLength
  this._trackLength(header, value, options);
};

FormData.prototype._trackLength = function(header, value, options) {
  var valueLength = 0;

  // used w/ trackLengthSync(), when length is known.
  // e.g. for streaming directly from a remote server,
  // w/ a known file a size, and not wanting to wait for
  // incoming file to finish to get its size.
  if (options.knownLength != null) {
    valueLength += +options.knownLength;
  } else if (Buffer.isBuffer(value)) {
    valueLength = value.length;
  } else if (typeof value === 'string') {
    valueLength = Buffer.byteLength(value);
  }

  this._valueLength += valueLength;

  // @check why add CRLF? does this account for custom/multiple CRLFs?
  this._overheadLength +=
    Buffer.byteLength(header) +
    + FormData.LINE_BREAK.length;

  // empty or either doesn't have path or not an http response
  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) )) {
    return;
  }

  this._lengthRetrievers.push(function(next) {

    // do we already know the size?
    // 0 additional leaves value from getSyncLength()
    if (options.knownLength != null) {
      next(null, 0);

    // check if it's local file
    } else if (value.hasOwnProperty('fd')) {
      fs.stat(value.path, function(err, stat) {
        if (err) {
          next(err);
          return;
        }

        next(null, stat.size);
      });

    // or http response
    } else if (value.hasOwnProperty('httpVersion')) {
      next(null, +value.headers['content-length']);

    // or request stream http://github.com/mikeal/request
    } else if (value.hasOwnProperty('httpModule')) {
      // wait till response come back
      value.on('response', function(response) {
        value.pause();
        next(null, +response.headers['content-length']);
      });
      value.resume();

    // something else
    } else {
      next('Unknown stream');
    }
  });
};

FormData.prototype._multiPartHeader = function(field, value, options) {
  var boundary = this.getBoundary();
  var header = '';

  // custom header specified (as string)?
  // it becomes responsible for boundary
  // (e.g. to handle extra CRLFs on .NET servers)
  if (options.header != null) {
    header = options.header;
  } else {
    header += '--' + boundary + FormData.LINE_BREAK +
      'Content-Disposition: form-data; name="' + field + '"';

    // fs- and request- streams have path property
    // TODO: Use request's response mime-type
    if (value.path) {
      header +=
        '; filename="' + path.basename(value.path) + '"' + FormData.LINE_BREAK +
        'Content-Type: ' + mime.lookup(value.path);

    // http response has not
    } else if (value.readable && value.hasOwnProperty('httpVersion')) {
      header +=
        '; filename="' + path.basename(value.client._httpMessage.path) + '"' + FormData.LINE_BREAK +
        'Content-Type: ' + value.headers['content-type'];
    }

    header += FormData.LINE_BREAK + FormData.LINE_BREAK;
  }

  return header;
};

FormData.prototype._multiPartFooter = function(field, value, options) {
  return function(next) {
    var footer = FormData.LINE_BREAK;

    var lastPart = (this._streams.length === 0);
    if (lastPart) {
      footer += this._lastBoundary();
    }

    next(footer);
  }.bind(this);
};

FormData.prototype._lastBoundary = function() {
  return '--' + this.getBoundary() + '--';
};

FormData.prototype.getHeaders = function(userHeaders) {
  var formHeaders = {
    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
  };

  for (var header in userHeaders) {
    formHeaders[header.toLowerCase()] = userHeaders[header];
  }

  return formHeaders;
}

FormData.prototype.getCustomHeaders = function(contentType) {
    contentType = contentType ? contentType : 'multipart/form-data';

    var formHeaders = {
        'content-type': contentType + '; boundary=' + this.getBoundary(),
        'content-length': this.getLengthSync()
    };

    return formHeaders;
}

FormData.prototype.getBoundary = function() {
  if (!this._boundary) {
    this._generateBoundary();
  }

  return this._boundary;
};

FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};

FormData.prototype.getLengthSync = function() {
    var knownLength = this._overheadLength + this._valueLength;

    if (this._streams.length) {
        knownLength += this._lastBoundary().length;
    }

    return knownLength;
};

FormData.prototype.getLength = function(cb) {
  var knownLength = this._overheadLength + this._valueLength;

  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  if (!this._lengthRetrievers.length) {
    process.nextTick(cb.bind(this, null, knownLength));
    return;
  }

  async.parallel(this._lengthRetrievers, function(err, values) {
    if (err) {
      cb(err);
      return;
    }

    values.forEach(function(length) {
      knownLength += length;
    });

    cb(null, knownLength);
  });
};

FormData.prototype.submit = function(params, cb) {
  this.getLength(function(err, length) {

    var request
      , options
      , defaults = {
          method : 'post',
          port   : 80,
          headers: this.getHeaders({'Content-Length': length})
      };

    // parse provided url if it's string
    // or treat it as options object
    if (typeof params == 'string') {
      params = parseUrl(params);

      options = populate({
        port: params.port,
        path: params.pathname,
        host: params.hostname
      }, defaults);
    }
    else // use custom params
    {
      options = populate(params, defaults);
    }

    // https if specified, fallback to http in any other case
    if (params.protocol == 'https:') {
      // override default port
      if (!params.port) options.port = 443;
      request = https.request(options);
    } else {
      request = http.request(options);
    }

    this.pipe(request);
    if (cb) {
      request.on('error', cb);
      request.on('response', cb.bind(this, null));
    }

    return request;
  }.bind(this));
};

/*
 * Santa's little helpers
 */

// populates missing values
function populate(dst, src) {
  for (var prop in src) {
    if (!dst[prop]) dst[prop] = src[prop];
  }
  return dst;
}

})(require("__browserify_process"))
},{"util":33,"path":58,"http":37,"https":36,"url":31,"fs":59,"combined-stream":64,"async":65,"mime":54,"__browserify_process":49}],65:[function(require,module,exports){// This file is just added for convenience so this repository can be
// directly checked out into a project's deps folder
module.exports = require('./lib/async');

},{"./lib/async":66}],66:[function(require,module,exports){(function(process){/*global setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root = this,
        previous_async = root.async;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    else {
        root.async = async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    //// cross-browser compatiblity functions ////

    var _forEach = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _forEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        async.nextTick = function (fn) {
            setTimeout(fn, 0);
        };
    }
    else {
        async.nextTick = process.nextTick;
    }

    async.forEach = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _forEach(arr, function (x) {
            iterator(x, function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                }
            });
        });
    };

    async.forEachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };

    async.forEachLimit = function (arr, limit, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length || limit <= 0) {
            return callback();
        }
        var completed = 0;
        var started = 0;
        var running = 0;

        (function replenish () {
            if (completed === arr.length) {
                return callback();
            }

            while (running < limit && started < arr.length) {
                started += 1;
                running += 1;
                iterator(arr[started - 1], function (err) {
                    if (err) {
                        callback(err);
                        callback = function () {};
                    }
                    else {
                        completed += 1;
                        running -= 1;
                        if (completed === arr.length) {
                            callback();
                        }
                        else {
                            replenish();
                        }
                    }
                });
            }
        })();
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEach].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);


    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.forEachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _forEach(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _forEach(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                if (err) {
                    callback(err);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    taskComplete();
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.nextTick(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    async.parallel = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEach(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.queue = function (worker, concurrency) {
        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _forEach(data, function(task) {
                    q.tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (q.saturated && q.tasks.length == concurrency) {
                        q.saturated();
                    }
                    async.nextTick(q.process);
                });
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if(q.empty && q.tasks.length == 0) q.empty();
                    workers += 1;
                    worker(task.data, function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if(q.drain && q.tasks.length + workers == 0) q.drain();
                        q.process();
                    });
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _forEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

}());

})(require("__browserify_process"))
},{"__browserify_process":49}],64:[function(require,module,exports){var util = require('util');
var Stream = require('stream').Stream;
var DelayedStream = require('delayed-stream');

module.exports = CombinedStream;
function CombinedStream() {
  this.writable = false;
  this.readable = true;
  this.dataSize = 0;
  this.maxDataSize = 2 * 1024 * 1024;
  this.pauseStreams = true;

  this._released = false;
  this._streams = [];
  this._currentStream = null;
}
util.inherits(CombinedStream, Stream);

CombinedStream.create = function(options) {
  var combinedStream = new this();

  options = options || {};
  for (var option in options) {
    combinedStream[option] = options[option];
  }

  return combinedStream;
};

CombinedStream.isStreamLike = function(stream) {
  return (typeof stream !== 'function')
    && (typeof stream !== 'string')
    && (typeof stream !== 'boolean')    
    && (typeof stream !== 'number')
    && (!Buffer.isBuffer(stream));
};

CombinedStream.prototype.append = function(stream) {
  var isStreamLike = CombinedStream.isStreamLike(stream);

  if (isStreamLike) {
    if (!(stream instanceof DelayedStream)) {
      stream.on('data', this._checkDataSize.bind(this));

      stream = DelayedStream.create(stream, {
        maxDataSize: Infinity,
        pauseStream: this.pauseStreams,
      });
    }

    this._handleErrors(stream);

    if (this.pauseStreams) {
      stream.pause();
    }
  }

  this._streams.push(stream);
  return this;
};

CombinedStream.prototype.pipe = function(dest, options) {
  Stream.prototype.pipe.call(this, dest, options);
  this.resume();
};

CombinedStream.prototype._getNext = function() {
  this._currentStream = null;
  var stream = this._streams.shift();


  if (typeof stream == 'undefined') {
    this.end();
    return;
  }

  if (typeof stream !== 'function') {
    this._pipeNext(stream);
    return;
  }

  var getStream = stream;
  getStream(function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('data', this._checkDataSize.bind(this));
      this._handleErrors(stream);
    }

    this._pipeNext(stream);
  }.bind(this));
};

CombinedStream.prototype._pipeNext = function(stream) {
  this._currentStream = stream;

  var isStreamLike = CombinedStream.isStreamLike(stream);
  if (isStreamLike) {
    stream.on('end', this._getNext.bind(this))
    stream.pipe(this, {end: false});
    return;
  }

  var value = stream;
  this.write(value);
  this._getNext();
};

CombinedStream.prototype._handleErrors = function(stream) {
  var self = this;
  stream.on('error', function(err) {
    self._emitError(err);
  });
};

CombinedStream.prototype.write = function(data) {
  this.emit('data', data);
};

CombinedStream.prototype.pause = function() {
  if (!this.pauseStreams) {
    return;
  }

  this.emit('pause');
};

CombinedStream.prototype.resume = function() {
  if (!this._released) {
    this._released = true;
    this.writable = true;
    this._getNext();
  }

  this.emit('resume');
};

CombinedStream.prototype.end = function() {
  this._reset();
  this.emit('end');
};

CombinedStream.prototype.destroy = function() {
  this._reset();
  this.emit('close');
};

CombinedStream.prototype._reset = function() {
  this.writable = false;
  this._streams = [];
  this._currentStream = null;
};

CombinedStream.prototype._checkDataSize = function() {
  this._updateDataSize();
  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this._emitError(new Error(message));
};

CombinedStream.prototype._updateDataSize = function() {
  this.dataSize = 0;

  var self = this;
  this._streams.forEach(function(stream) {
    if (!stream.dataSize) {
      return;
    }

    self.dataSize += stream.dataSize;
  });

  if (this._currentStream && this._currentStream.dataSize) {
    this.dataSize += this._currentStream.dataSize;
  }
};

CombinedStream.prototype._emitError = function(err) {
  this._reset();
  this.emit('error', err);
};

},{"util":33,"stream":35,"delayed-stream":67}],67:[function(require,module,exports){var Stream = require('stream').Stream;
var util = require('util');

module.exports = DelayedStream;
function DelayedStream() {
  this.source = null;
  this.dataSize = 0;
  this.maxDataSize = 1024 * 1024;
  this.pauseStream = true;

  this._maxDataSizeExceeded = false;
  this._released = false;
  this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);

DelayedStream.create = function(source, options) {
  var delayedStream = new this();

  options = options || {};
  for (var option in options) {
    delayedStream[option] = options[option];
  }

  delayedStream.source = source;

  var realEmit = source.emit;
  source.emit = function() {
    delayedStream._handleEmit(arguments);
    return realEmit.apply(source, arguments);
  };

  source.on('error', function() {});
  if (delayedStream.pauseStream) {
    source.pause();
  }

  return delayedStream;
};

DelayedStream.prototype.__defineGetter__('readable', function() {
  return this.source.readable;
});

DelayedStream.prototype.resume = function() {
  if (!this._released) {
    this.release();
  }

  this.source.resume();
};

DelayedStream.prototype.pause = function() {
  this.source.pause();
};

DelayedStream.prototype.release = function() {
  this._released = true;

  this._bufferedEvents.forEach(function(args) {
    this.emit.apply(this, args);
  }.bind(this));
  this._bufferedEvents = [];
};

DelayedStream.prototype.pipe = function() {
  var r = Stream.prototype.pipe.apply(this, arguments);
  this.resume();
  return r;
};

DelayedStream.prototype._handleEmit = function(args) {
  if (this._released) {
    this.emit.apply(this, args);
    return;
  }

  if (args[0] === 'data') {
    this.dataSize += args[1].length;
    this._checkIfMaxDataSizeExceeded();
  }

  this._bufferedEvents.push(args);
};

DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
  if (this._maxDataSizeExceeded) {
    return;
  }

  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  this._maxDataSizeExceeded = true;
  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this.emit('error', new Error(message));
};

},{"stream":35,"util":33}]},{},[23]);