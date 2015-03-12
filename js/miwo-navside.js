(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Header,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Header = (function(_super) {
  __extends(Header, _super);

  function Header() {
    return Header.__super__.constructor.apply(this, arguments);
  }

  Header.prototype.xtype = 'navsideheader';

  Header.prototype.baseCls = 'navside-header';

  Header.prototype.text = '';

  Header.prototype.doRender = function() {
    this.el.set('html', '<span>' + this.text + '</span>');
  };

  return Header;

})(Miwo.Component);

module.exports = Header;


},{}],2:[function(require,module,exports){
var Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Item = (function(_super) {
  __extends(Item, _super);

  function Item() {
    return Item.__super__.constructor.apply(this, arguments);
  }

  Item.prototype.xtype = 'navsideitem';

  Item.prototype.componentCls = 'navside-item';

  Item.prototype.icon = '';

  Item.prototype.text = '';

  Item.prototype.active = false;

  Item.prototype.role = 'presentation';

  Item.prototype.badge = null;

  Item.prototype.beforeRender = function() {
    Item.__super__.beforeRender.apply(this, arguments);
    this.el.on('click', (function(_this) {
      return function(event) {
        event.stop();
        _this.emit('click', _this);
      };
    })(this));
  };

  Item.prototype.doRender = function() {
    var inner;
    inner = '<i class="' + this.icon + '"></i><span>' + this.text + '</span>';
    if (this.badge) {
      inner += '<span class="badge">' + this.badge + '</span>';
    }
    this.el.set('html', '<a href="#" role="menuitem">' + inner + '</a>');
  };

  Item.prototype.setActive = function(active, silent) {
    if (this.active === active) {
      return;
    }
    this.active = active;
    this.el.toggleClass('active', active);
    if (!silent) {
      this.emit('active', this);
    }
  };

  Item.prototype.setBadge = function(badge) {
    this.badge = badge;
    this.redraw();
  };

  return Item;

})(Miwo.Component);

module.exports = Item;


},{}],3:[function(require,module,exports){
var Item, ItemGroup,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Item = require('./Item');

ItemGroup = (function(_super) {
  __extends(ItemGroup, _super);

  function ItemGroup() {
    return ItemGroup.__super__.constructor.apply(this, arguments);
  }

  ItemGroup.prototype.xtype = 'navsidegroup';

  ItemGroup.prototype.componentCls = 'navside-group';

  ItemGroup.prototype.icon = '';

  ItemGroup.prototype.text = '';

  ItemGroup.prototype.opened = true;

  ItemGroup.prototype.role = 'presentation';

  ItemGroup.prototype.addItem = function(name, config) {
    return this.add(name, new Item(config));
  };

  ItemGroup.prototype.beforeRender = function() {
    ItemGroup.__super__.beforeRender.apply(this, arguments);
    this.el.set('html', '<div class="navside-item"><a role="menuitem" miwo-events="click:onItemClick" href="#"><i class="' + this.icon + '"></i><span>' + this.text + '</span><i miwo-reference="switchEl" class="switch glyphicon"></i></a></div>' + '<div class="navside-items" role="menu" miwo-reference="contentEl"></div>');
  };

  ItemGroup.prototype.afterRender = function() {
    ItemGroup.__super__.afterRender.apply(this, arguments);
    this.setOpened(this.opened, true);
  };

  ItemGroup.prototype.onItemClick = function(event) {
    event.stop();
    this.toggle();
  };

  ItemGroup.prototype.toggle = function() {
    this.setOpened(!this.opened);
  };

  ItemGroup.prototype.setOpened = function(opened, silent) {
    this.opened = opened;
    this.contentEl.setVisible(opened);
    this.switchEl.toggleClass('glyphicon-chevron-down', !opened);
    this.switchEl.toggleClass('glyphicon-chevron-up', opened);
    if (!silent) {
      if (opened) {
        this.emit('open', this);
      } else {
        this.emit('close', this);
      }
    }
  };

  return ItemGroup;

})(Miwo.Container);

module.exports = ItemGroup;


},{"./Item":2}],4:[function(require,module,exports){
var Header, Item, ItemGroup, Navigation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Header = require('./Header');

Item = require('./Item');

ItemGroup = require('./ItemGroup');

Navigation = (function(_super) {
  __extends(Navigation, _super);

  function Navigation() {
    return Navigation.__super__.constructor.apply(this, arguments);
  }

  Navigation.prototype.componentCls = 'navside';

  Navigation.prototype.active = null;

  Navigation.prototype.role = 'navigation';

  Navigation.prototype.scrollable = true;

  Navigation.prototype.afterInit = function() {
    Navigation.__super__.afterInit.apply(this, arguments);
    this.mon(window, 'hashchange', 'onWindowHashChange');
  };

  Navigation.prototype.addItem = function(name, config) {
    return this.add(name, new Item(config));
  };

  Navigation.prototype.addItemGroup = function(name, config) {
    return this.add(name, new ItemGroup(config));
  };

  Navigation.prototype.addHeader = function(name, config) {
    return this.add(name, new Header(config));
  };

  Navigation.prototype.addedComponentDeep = function(component) {
    Navigation.__super__.addedComponentDeep.call(this, component);
    if (component instanceof Item) {
      this.mon(component, 'active', 'onItemActive');
      this.mon(component, 'click', 'onItemClick');
    }
    if (component instanceof ItemGroup) {
      this.mon(component, 'open', 'onItemGroupOpen');
      this.mon(component, 'close', 'onItemGroupClose');
    }
  };

  Navigation.prototype.removedComponentDeep = function(component) {
    Navigation.__super__.removedComponentDeep.call(this, component);
    if (component instanceof Item) {
      this.mun(component, 'active', 'onItemActive');
      this.mun(component, 'click', 'onItemClick');
    }
    if (component instanceof ItemGroup) {
      this.mun(component, 'open', 'onItemGroupOpen');
      this.mun(component, 'close', 'onItemGroupClose');
    }
  };

  Navigation.prototype.onItemClick = function(item) {
    if (this.active !== item) {
      item.setActive(true);
    }
    if (item.target && !this.preventHashChange) {
      miwo.redirect(item.target);
    }
  };

  Navigation.prototype.onItemActive = function(item) {
    if (this.active === item) {
      return;
    }
    if (this.active) {
      this.active.setActive(false, true);
    }
    this.active = item;
    this.emit('active', this, item);
  };

  Navigation.prototype.onItemGroupOpen = function(itemGroup) {
    this.emit('open', this, itemGroup);
  };

  Navigation.prototype.onItemGroupClose = function(itemGroup) {
    this.emit('close', this, itemGroup);
  };

  Navigation.prototype.onWindowHashChange = function() {
    this.setActivateByTarget(document.location.hash);
  };

  Navigation.prototype.afterRender = function() {
    Navigation.__super__.afterRender.apply(this, arguments);
    this.setActivateByTarget(document.location.hash);
  };

  Navigation.prototype.setActivateByTarget = function(target) {
    var component, _i, _len, _ref;
    if (!target) {
      return;
    }
    _ref = this.findAll('navsideitem');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      if (target.indexOf(component.target) >= 0) {
        this.preventHashChange = true;
        component.setActive(true);
        this.preventHashChange = false;
        break;
      }
    }
  };

  return Navigation;

})(Miwo.panel.Pane);

module.exports = Navigation;


},{"./Header":1,"./Item":2,"./ItemGroup":3}],5:[function(require,module,exports){
Miwo.navside = {};

Miwo.navside.Navigation = require('./Navigation');

Miwo.navside.Item = require('./Item');

Miwo.navside.ItemGroup = require('./ItemGroup');

Miwo.navside.Header = require('./Header');


},{"./Header":1,"./Item":2,"./ItemGroup":3,"./Navigation":4}]},{},[5])