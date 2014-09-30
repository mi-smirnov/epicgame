define([
    'backbone',
    'tmpl/signup'
], function(
    Backbone,
    tmpl
){

    var signupView = Backbone.View.extend({

        template: tmpl,
        el: $("#page"),
       
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
        }
    });

    return new signupView();
});