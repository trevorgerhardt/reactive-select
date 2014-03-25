
var assert = require('assert');
var domify = require('domify');
var Model = require('model');
var Reactive = require('reactive');
var select = require('reactive-select');

// use select
Reactive.use(select);

// create a default model
var Person = Model('Person')
  .attr('state')
  .attr('states');

// default template
var template = '<div select="state" select-options="stateOptions" select-label="Label"></div>';
var multiTemplate = '<div select="states" select-options="statesOptions" select-label="Label" select-multiple></div>';

describe('reactive-select', function() {
  it('should be able to access the select instance from the view', function() {
    var view = {
      stateOptions: []
    };
    var reactive = new Reactive(domify(template), new Person(), view);

    assert(view.select('state') !== undefined);
  });

  it('should have the correct available options', function() {
    var view = {
      stateOptions: function() { return [ 'Arizona', 'New York' ]; }
    };
    var reactive = new Reactive(domify(template), new Person(), view);

    var options = reactive.el.querySelectorAll('.select-option');

    assert(options.length === 2);
    assert(options[0].dataset.name === 'arizona');
    assert(options[1].dataset.name === 'new york');
  });

  it('should select the correct options', function() {
    var view = {
      stateOptions: [ 'Arizona', 'New York' ]
    };
    var reactive = new Reactive(domify(template), new Person({
      state: 'New York'
    }), view);

    var selected = reactive.el.querySelectorAll('li.selected');
    assert(selected.length === 1);
    assert(selected[0].dataset.name === 'new york');
  });

  it('on model change it should update the selected option, call the change event once and the select event once', function() {
    var view = {
      stateOptions: [ 'Arizona', 'New York' ]
    };
    var person = new Person();
    var reactive = new Reactive(domify(template), person, view);

    var changesToPerson = 0;
    person.on('change', function() {
      assert(changesToPerson++ < 2);
    });

    var changesToSelect = 0;
    view.select('state').on('change', function() {
      assert(changesToSelect++ < 2);
    });

    assert(reactive.el.querySelectorAll('li.selected').length === 0, 'Option selected but shouldnt be.');
    person.state('Arizona');
    var selected = reactive.el.querySelectorAll('li.selected');
    assert(selected.length === 1);
    assert(selected[0].dataset.name === 'arizona');
  });

  it('on select change it should change the model, call the select event once and the change event once', function() {
    var view = {
      stateOptions: [ 'Arizona', 'New York' ]
    };
    var person = new Person();
    var reactive = new Reactive(domify(template), person, view);

    var changesToPerson = 0;
    person.on('change', function() {
      assert(changesToPerson++ < 2);
    });

    var changesToSelect = 0;
    view.select('state').on('change', function() {
      assert(changesToSelect++ < 2);
    });

    assert(reactive.el.querySelectorAll('li.selected').length === 0, 'Option selected but shouldnt be.');
    view.select('state').select('Arizona');
    var selected = reactive.el.querySelectorAll('li.selected');
    assert(selected.length === 1);
    assert(selected[0].dataset.name === 'arizona');
    assert(person.state() === 'Arizona', 'State has not been set correctly. ' + person.state() + ' should be Arizona.');
  });

  it('should set the label correctly', function() {
    var reactive = new Reactive(domify(template), new Person(), {
      stateOptions: []
    });
    var label = reactive.el.querySelector('.select-input').placeholder;
    assert(label === 'Label');
  });

  it('should handle multi-selects properly', function() {

  });
});
