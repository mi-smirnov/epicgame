define([
    'jquery',
    'backbone',
    'tmpl/signup',
    'models/user',
    'instance/user'
], function (jquery, Backbone, tmpl, UserModel, User){

    var signupView = Backbone.View.extend({

        initialize: function() {
            this.$page = $('#page');
            this.render();
            this.$el.hide();
        },

        template: tmpl,

        render: function () {
            this.$el.html(this.template);
            this.$page.append(this.$el);
            this.$error = $('.alert');
        },
        
        show: function() {
            this.trigger('show', this);
        },

        events: {
            'submit form' : 'signup',
            'input input' : 'validate'
        },
        
        signup: function(event) {
            event.preventDefault();
            var email = $('.form__input_signup-email').val();
            var password = $('.form__input_signup-password').val();
            if(password.match(/.+/i) && email.match(/.+?@(.+?\.)+.+/i)) {
                var form = this.$el.find('form'),
                    data = form.serialize(),
                    url = form.attr('action'),
                    that = this;

                $.ajax({
                    url: url,
                    type: "post",
                    data: data,
                    success: function () {
                        window.location.href = '#game';
                        User.set({email: email});
                    },
                    error: function () {
                        $('.alert').css('display', 'block');
                        that.renderError("This email already exists");
                    }
                });
            }
            else{
                $('.form__button_submit-signup').attr('disabled', 'true');
                $(".form__input_signup-email").addClass('form__input_error');
                $(".form__input_signup-password").addClass('form__input_error');
                $('.alert').css('display', 'block');
                this.renderError("All fields must be filled!");
            }

        },

        validate: function() {
            var email = $('.form__input_signup-email').val();
            $('.form__input_signup-email').blur(function(){
                if (!email.match(/.+?@(.+?\.)+.+/i)) {
                    if (!$('.form__div_error-email')[0]) {
                        $('.form__input_signup-email').addClass('form__input_error').after('<div class=\'form__div_error-email\'>Enter valid email, example: admin@mail.ru</div>');
                    }
                }
                else{
                    $('.form__input_signup-email').removeClass('form__input_error');
                    $('.form__div_error-email').remove();
                    $('.alert').css('display', 'none');
                }
            });

            var password = $('.form__input_signup-password').val();
            $('.form__input_signup-password').keyup(function(){
                if (!password.match(/.+/i)) {
                    if (!$('.form__div_error-password')[0]) {
                        $('.form__input_signup-password').addClass('form__input_error').after('<div class=\'form__div_error-password\'>Enter your password!</div>');
                    }
                }
                else{
                    $('.form__input_signup-password').removeClass('form__input_error');
                    $('.form__div_error-password').remove();
                    $('.alert').css('display', 'none');
                }
            });

            if((!password.match(/.+/i)) || (!email.match(/.+?@(.+?\.)+.+/i))){
                $('.form__button_submit-signup').attr('disabled', 'true');
            }
            else{
                $('.form__button_submit-signup').removeAttr('disabled');
            }
        },

        renderError: function(msg) {
            this.$error.text(msg);
        }
    });

    return new signupView();
});