
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
    var label = el.getAttribute('select-label') || '';
    var multiple = el.hasAttribute('select-multiple');
    var options = this.value(el.getAttribute('select-options'));
    var select = Select().label(label);
    var view = this.view;

    // If no options, no select
    if (!options || !Array.isArray(options)) return;

    // Allow multiple selection
    if (multiple) select.multiple();

    // Add all options
    options.forEach(function(item) {
      if (typeof item === 'string') select.add(item, item);
      else select.add(item.name, item.value, item.el);
    });

    // On selection change
    this.change(function() { selectItems(select, this.value(name)); });

    // Update model on selection changes
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
 * Select items, deselect items no longer existing in the array
 */

function selectItems(select, items) {
  if (items) {
    if (!Array.isArray(items)) items = [ items ];
    select.selected().forEach(function(selected) {
      var contains = false;
      items.forEach(function(item) {
        var name = item;
        if (typeof item !== 'string') name = item.name;
        if (selected.value === name) contains = true;
      });
      if (!contains) select.deselect(selected.name);
    });

    items.forEach(function(item) {
      var name = item;
      if (typeof name !== 'string') name = item.name;
      if (!select.get(name).selected) select.select(name);
    });
  } else {
    select.selected().forEach(function(selected) {
      select.deselect(selected.name);
    });
  }
}
