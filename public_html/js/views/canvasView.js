define([
    'backbone',
    'tmpl/canvas',
    'helpers/keycodes'
], function (Backbone, tmpl, KeyCodes) {

    var canvasView = Backbone.View.extend({

        initialize: function () {
            this.$page = $('#page');
            this.render();
            this.$el.hide();
            this.startAnimate();
        },

        template: tmpl,

        render: function () {
            this.$el.html(this.template);
            this.$page.append(this.$el);
        },

        show: function () {
            this.trigger('show', this);
        },

        startAnimate: function () {
            window.requestAnimFrame = (function (callback) {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            })();

            function drawRectangle(myRectangle, context) {
                context.beginPath();
                context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
                context.fillStyle = '#39f';
                context.fill();
                context.lineWidth = myRectangle.borderWidth;
                context.strokeStyle = 'black';
                context.stroke();
            }

            function animationGenerator() {
                var myRectangle = {
                    x: 10,
                    y: 120,
                    width: 20,
                    height: 20,
                    borderWidth: 1
                };

                var period = 30;
                var amplitude = 140;
                var direction = true;

                document.onkeydown = function () {
                    var key = window.event.keyCode;
                    if (key == KeyCodes.KEY_CODE_ARROW_UP) {
                        if(amplitude < 140 && amplitude >= 0){
                            amplitude = amplitude + 10;
                        }
                    }
                    if (key == KeyCodes.KEY_CODE_ARROW_DOWN) {
                        if(amplitude <= 140 && amplitude > 0){
                            amplitude = amplitude - 10;
                        }
                    }
                    if (key == KeyCodes.KEY_CODE_ARROW_LEFT) {
                        if(period <= 100 && period > 5){
                            period = period - 5;
                        }
                    }
                    if (key == KeyCodes.KEY_CODE_ARROW_RIGHT) {
                        if(period < 100 && period >= 5){
                            period = period + 5;
                        }
                    }
                };

                var animate =  function (canvas, context, startTime, runAnimation) {
                    if(runAnimation.value){
                        var time = (new Date()).getTime() - startTime;
                        var centerY = canvas.height / 2 - myRectangle.height / 2;
                        var nextY;
                        var nextX;

                        //var centerX = canvas.width / 2 - myRectangle.width / 2;
                        if(myRectangle.x == canvas.width - myRectangle.width){
                            direction = false;
                            context.clearRect(0, 0, canvas.width, canvas.height);
                        }
                        if(myRectangle.x == 0){
                            direction = true;
                            context.clearRect(0, 0, canvas.width, canvas.height);
                        }

                        if(direction == true){
                            nextX = myRectangle.x + 1;
                            nextY = amplitude * Math.sin(nextX / period) + centerY;
                            myRectangle.x = nextX;
                            myRectangle.y = nextY;
                        }


                        if(direction == false){
                            nextX = myRectangle.x - 1;
                            nextY = amplitude * Math.sin(nextX / period) + centerY;
                            myRectangle.x = nextX;
                            myRectangle.y = nextY;
                        }
                        //context.clearRect(0, 0, canvas.width, canvas.height);

                        drawRectangle(myRectangle, context);

                        requestAnimFrame(function () {
                            animate(canvas, context, startTime, runAnimation);
                        });
                    }
                };

                return animate;
            }

            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var runAnimation = {
                value: false
            };

            var animate = animationGenerator();

            document.querySelector('.startAnimate').addEventListener('click', function () {
                runAnimation.value = !runAnimation.value;
                if(runAnimation.value){
                    setTimeout(function () {
                        var startTime = (new Date()).getTime();
                        animate(canvas, context, startTime, runAnimation);
                    }, 100);
                }
            })
        }
    });

    return new canvasView();
});