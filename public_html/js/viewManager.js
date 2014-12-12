define([
    'backbone'
], function(Backbone) {
    
    var viewManager = Backbone.View.extend({

        subscribe: function(views){
            for(var i in views){
                this.listenTo(views[i], 'render', this.render);
                this.listenTo(views[i], 'show', this.show);
            }
        },

        unsubscribe: function(view){
            this.stopListening(view);
        },

        render: function(view){
            this.show(view);
        },

        show: function(view){
            if(this.currentView)
                this.currentView.$el.hide();
            this.currentView = view;
            view.$el.show();
        }
    });

    return new viewManager();
});