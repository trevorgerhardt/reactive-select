
var Select = require('select');

/**
 * Expose `plugin`
 */

module.exports = reactiveSelect;

/**
 * Reactive Select
 */

function reactiveSelect(reactive) {
  reactive.bind('select', function(el, name, model) {
    var multiple = el.hasAttribute('select-multiple');
    var view = this.view;

    // Create select
    var select = Select();

    // Add a label
    select.label(el.getAttribute('select-label') || '');

    // Allow multiple selection
    if (multiple) select.multiple();

    // Add the options
    this.value(el.getAttribute('select-options')).forEach(function(item) {
      if (typeof item === 'string') select.add(item, item);
      else select.add(item.name, item.value, item.el);
    });

    // On selection change
    this.change(function() {
      var items = this.value(name);
      if (items) {
        if (!multiple) items = [ items ];
        items.forEach(function(item) {
          selectItem(select, item);
        });
      }
    });

    // Update model on changes
    select.on('change', function() {
      var values = select.values();
      if (multiple) model[name](values);
      else model[name](values[0]);
    });

    // Append the select to this div
    el.appendChild(select.el);

    // Add to `_selects` object
    view._selects = view._selects || {};
    view._selects[name] = select;

    // Create `select` function if it does not exist
    if (!view.select) {
      view.select = function(name) {
        return this._selects[name];
      };
    }
  });
}

/**
 * Select
 */

function selectItem(select, item) {
  var name = item;
  if (typeof name !== 'string') name = item.name;
  if (!select.get(name).selected) select.select(name);
}
