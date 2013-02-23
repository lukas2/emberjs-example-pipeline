var App = Ember.Application.create({});

/* IDEA.
   -----

(User) has many Items and many Stages.
       An Item belongs to a Stage.   

One index page that contains a list of items on the left.
  At the top a list of stages.

Items can be dragged to stages.

Use-case:

Could be useful for example to manage TODO items or a sales-
pipeline when searching for clients.

*/

// *** Routes

App.Router.map( function () {
  this.resource('items', function() {
    this.route('new');
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('itemsAside').set('model', App.Item.find());
    this.controllerFor('stages').set('model', App.Stage.find());
    this.controllerFor('debug').set('model', App.Stage.find());
  }
});

App.ItemsRoute = Ember.Route.extend({
  model: function() {
    return App.Item.find(); 
  },
  events: {
    goToRoot: function( ) {
      this.transitionTo("index");
    }
  }
});

App.ItemsNewRoute = Ember.Route.extend({
  model: function() { 
    return App.Item.createRecord(); 
  }
});


// *** Controllers

App.DebugController = Ember.ArrayController.extend();

App.StagesController = Ember.ArrayController.extend({

  addItemToStage: function( itemId, stageId ) {
    var stage = App.Stage.find( stageId );
    var item  = App.Item.find( itemId );

    item.set('stage', stage);
    item.store.commit();
  },
  removeItemFromStage: function( item ) {
    item.set('stage', null);
    item.store.commit();
  }
});

App.ItemsAsideController = Ember.ArrayController.extend({
  unassigned: function() {
    return this.filter(function(item, index, enumerable){
      return !item.get('stage');
    });
  }.property('@each.stage'),
  delete: function( item ) {
    var title = item.get('title');
    if( confirm("Really delete " + title + "?") ){
      item.store.deleteRecord( item );
      item.store.commit();
    }
  }
});

App.ItemsNewController = Ember.ObjectController.extend({
  save: function( item ) {
    var title = item.get( 'title' );
    var desc  = item.get( 'desc' );
    if( title && desc ) {
      item.store.commit();
      this.get('target').send('goToRoot');
    }
    else {
      alert( "Please fill out both fields." );
    }
  },
  cancel: function( item ) {
    item.get('transaction').rollback();
    this.get('target').send('goToRoot');
  }
});

// *** Views

/* aka "DroppableView" */
App.StageColumnView = Ember.View.extend({
  didInsertElement: function( event ) {

    var stageId    = this.get('content').get('id');
    var controller = this.get('controller');

    this.$().find(">:first-child").droppable({
      accept: ".ui-draggable",
      hoverClass: "droppable-hover",
      drop: function( event, ui ) {
        controller.addItemToStage( $(ui.draggable).data("itemId"), stageId);
      }
    });
  }
});

App.DraggableView = Ember.View.extend({
  didInsertElement: function() {
    var itemId = this.get('content').get('id');

    this.$().find(">:first-child").draggable({
      start: function( event, ui ) {
        $(this).css( 'z-index', 1000 );
        $(this).data("itemId", itemId);
      },
      stop: function( event, ui ) {
        $(this).css( 'z-index', 1 );
      },
      revert: function( droppableObject ) {
        if( droppableObject !== false &&
          droppableObject.hasClass("ui-droppable") ) {
          return false;
        }
        else
        {
          return true;  
        }
      }
    });
  }
});

// ** Models

App.Store = DS.Store.extend({
  revision: 11
});

App.Item = DS.Model.extend({
  stage: DS.belongsTo( 'App.Stage' ),
  title: DS.attr('string'),
  desc: DS.attr('string'),

  didLoad: function() {
    // console.log("* item didLoad");
  },
  didReload: function() {
    // console.log("* item didReload");
  },
  didUpdate: function() {
    // console.log("* item didUpdate");
  },
  didCreate: function() {
    // console.log("* item didCreate");
  },
  didDelete: function() {
    // console.log("* item didDelete");
  },
  becameInvalid: function() {
    // console.log("* item becameInvalid");
  },
  becameError: function() {
    // console.log("* item becameError");
  }
});

App.Stage = DS.Model.extend({ // need to define attrs except id.
  items: DS.hasMany( 'App.Item' ),
  title: DS.attr('string'),

  didLoad: function() {
    // console.log("* stage didLoad");
  },
  didReload: function() {
    // console.log("* stage didReload");
  },
  didUpdate: function() {
    // console.log("* stage didUpdate");
  },
  didCreate: function() {
    // console.log("* stage didCreate");
  },
  didDelete: function() {
    // console.log("* stage didDelete");
  },
  becameInvalid: function() {
    // console.log("* stage becameInvalid");
  },
  becameError: function() {
    // console.log("* stage becameError");
  }
});