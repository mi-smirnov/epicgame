define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var gameView = Backbone.View.extend({

        template: tmpl,
        el: $("#page"),
        
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
        }
    });

    return new gameView();
});