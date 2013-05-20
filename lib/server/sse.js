/*** Generated by streamline 0.4.7 (fibers) - DO NOT EDIT ***/var fstreamline__ = require("streamline/lib/fibers/runtime"); (fstreamline__.create(function(_) { (function() {
  var TIMEOUT, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TIMEOUT = 119000;

  util = require('libsecretarius').util;

  module.exports = function(app, model) {
    var NotifyClient, SimpleNotifyClient, Socket, changedclient, deletedclient, inboxclient, newclient, sockets;

    sockets = 0;
    Socket = (function() {
      function Socket(req, res) {
        var empty,
          _this = this;

        this.req = req;
        this.res = res;
        util.debug(++sockets, 'sockets attached. (++)');
        this.clients = [];
        this.req.socket.setTimeout(Infinity);
        this.res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive"
        });
        (empty = function() {
          if (_this.res != null) {
            _this.res.write(":\n");
            return setTimeout(empty, TIMEOUT);
          }
        })();
        this.req.on("close", function() {
          var client, _i, _len, _ref, _results;

          _this.res = null;
          util.debug(--sockets, 'sockets attached. (--)');
          _ref = _this.clients;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            client = _ref[_i];
            _results.push(client.deregisterSocket(_this));
          }
          return _results;
        });
      }

      Socket.prototype.addClient = function(client) {
        client.registerSocket(this);
        this.clients.push(client);
        return this;
      };

      Socket.prototype.send = function(event) {
        return this.res.write(event);
      };

      Socket.prototype.lastId = function() {
        return this.req.get("Last-Event-Id");
      };

      return Socket;

    })();
    NotifyClient = (function() {
      function NotifyClient(name) {
        this.name = name;
        this.sockets = [];
      }

      NotifyClient.prototype.submit = function(data) {
        var event, socket, _i, _len, _ref, _results;

        event = "event: " + this.name + "\ndata: " + data + "\n\n";
        _ref = this.sockets;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          socket = _ref[_i];
          _results.push(socket.send(event));
        }
        return _results;
      };

      NotifyClient.prototype.registerSocket = function(socket) {
        return this.sockets.push(socket);
      };

      NotifyClient.prototype.deregisterSocket = function(socket) {
        var sock;

        return this.sockets = (function() {
          var _i, _len, _ref, _results;

          _ref = this.sockets;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sock = _ref[_i];
            if (sock !== socket) {
              _results.push(sock);
            }
          }
          return _results;
        }).call(this);
      };

      return NotifyClient;

    })();
    SimpleNotifyClient = (function(_super) {
      __extends(SimpleNotifyClient, _super);

      function SimpleNotifyClient(event, callback) {
        var _this = this;

        SimpleNotifyClient.__super__.constructor.call(this, event);
        model.listen(event, function(msg) {
          return fstreamline__.create((function(_) {
            return _this.submit(fstreamline__.invoke(null, callback, [_, msg.payload], 0));
          }), 0)();
        });
      }

      return SimpleNotifyClient;

    })(NotifyClient);
    changedclient = new SimpleNotifyClient('changed', fstreamline__.create(function(_, id) {
      return JSON.stringify(fstreamline__.invoke(new model.Information(id), "get", [_], 0));
    }, 0));
    newclient = new SimpleNotifyClient('new', fstreamline__.create(function(_, id) {
      return id;
    }, 0));
    deletedclient = new SimpleNotifyClient('deleted', fstreamline__.create(function(_, id) {
      return id;
    }, 0));
    inboxclient = new SimpleNotifyClient('inbox', fstreamline__.create(function(_) {
      return JSON.stringify(fstreamline__.invoke(model.inbox, "get", [_], 0));
    }, 0));
    return app.get('/sseupdate', function(req, res) {
      return new Socket(req, res).addClient(changedclient).addClient(inboxclient).addClient(newclient).addClient(deletedclient);
    });
  };

}).call(this);

}, 0).call(this, function(err) {
  if (err) throw err;
}));