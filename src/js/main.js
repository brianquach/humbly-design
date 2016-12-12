$(document).ready(function () {
  var $name = $('#name');
  var $email = $('#email');
  var $topic = $('#topic');
  var $message = $('#message');
  var $submitMessageBtn = $('.send-message');

  function isEmailFormValid() {
    var nameVal = ($name.val() || '').trim();
    var emailVal = ($email.val() || '').trim();
    var topicVal = ($topic.val() || '').trim();
    var messageVal = ($message.val() || '').trim();
    var isValid = true;

    if ($name.hasClass('invalid') || $email.hasClass('invalid') || $topic.hasClass('invalid') || $message.hasClass('invalid')) {
      return false;
    }

    if (nameVal === '') {
      $name.addClass('invalid');
      isValid = false;
    }
    if (emailVal === '') {
      $email.addClass('invalid');
      isValid = false;
    }
    if (topicVal === '') {
      $topic.addClass('invalid');
      isValid = false;
    }
    if (messageVal === '') {
      $message.addClass('invalid');
      isValid = false;
    }
    return isValid;
  }

  $('#emailForm').on('submit', function(ev) {
    ev.preventDefault();

    if (!isEmailFormValid()) {
      return false;
    }
    $submitMessageBtn.remove();
    
    $.ajax({
      method: 'POST',
      url: '/email',
      data: {
        name: $name.val(),
        email: $email.val(),
        subject: $topic.val(),
        message: $message.val()
      }
    }).done(function (result) {
      if (result === 'sent') {
        $('.sent-message').show();
      } else {
        $('.sent-error').show();
      }
    });
  });

  $('#emailForm').on('focusout', function(ev) {
    var $el = $(ev.target);
    var id = $el[0].id;
    var value = $el[0].value.trim();

    switch (id) {
      case 'name':
      case 'email':
      case 'topic':
      case 'message':
        if (value === '') {
          if (!$el.hasClass('invalid')) {
            $el.addClass('invalid');
          }
        } else {
          $el.removeClass('invalid');
        }
        break;
      default:
        break;
    }
  });
});
