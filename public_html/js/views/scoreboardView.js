define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/ScoreCollection'
], function (Backbone, tmpl, ScoreModel, ScoreCollection){

    var ScoreboardView = Backbone.View.extend({

        //collection: ScoreCollection,

        initialize: function () {
            this.$page = $('#page');
            this.listenTo(this.collection, 'reset', this.render);
            this.render();
            this.$el.hide();
            this.collection.on("reset", this.render, this);
        },

        template: tmpl,

        render: function () {
            var scores = this.collection.toJSON();
            this.$el.html(this.template(scores));
            this.$page.append(this.$el);
        },

        show: function () {
            this.collection.fetch();
            this.trigger('show', this);
        }
    });

    return new ScoreboardView({collection: ScoreCollection});


});