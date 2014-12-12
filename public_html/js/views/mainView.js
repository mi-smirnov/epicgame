define([
    'backbone',
    'tmpl/main'
], function (Backbone, tmpl){

    var mainView = Backbone.View.extend({
        
        initialize: function() {
            this.$page = $('#page');
            this.render();
            this.$el.hide();
        },

        template: tmpl,

        render: function () {
            this.$el.html(this.template);
            this.$page.append(this.$el);
        },

        show: function() {
           this.trigger('show', this);
        }
    });
    return new mainView();
});