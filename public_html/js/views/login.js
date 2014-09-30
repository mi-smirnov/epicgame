define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var loginView = Backbone.View.extend({

        template: tmpl,
        el: $("#page"),
        
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
        }
    });

    return new loginView();
});