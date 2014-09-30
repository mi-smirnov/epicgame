define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var mainView = Backbone.View.extend({

        template: tmpl,
        el: $("#page"),
        
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
        }
    });

    return new mainView();
});