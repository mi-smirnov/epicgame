define([
    'backbone',
    'jquery',
    'views/mainView',
    'views/loginView',
    'views/gameView',
    'views/scoreboardView',
    'views/signupView',
    'views/canvasView',
    'viewManager'
], function (Backbone, jquery, mainView, loginView, gameView, scoreboardView, signupView, canvasView, viewManager){
    
    viewManager.subscribe([mainView, loginView, gameView, scoreboardView, signupView, canvasView]);

    var Router = Backbone.Router.extend({

        routes: {
            '' : 'index',
            'scoreboard' : 'scoreboardAction',
            'game' : 'gameAction',
            'login' : 'loginAction',
            'signup' : 'signupAction',
            'canvas' : 'canvasAction',
            '*default': 'defaultAction'
        },

        index: function() {
            mainView.show()
        },
   
        defaultAction: function() {
            alert('404');
        },

        scoreboardAction: function() {
            scoreboardView.show();
        },

        gameAction: function() {
            gameView.show();
        },

        loginAction: function() {
            loginView.show();
        },
        
        signupAction: function() {
            signupView.show();
        },

        canvasAction: function() {
            canvasView.show();
        }
    });

    return new Router();
});