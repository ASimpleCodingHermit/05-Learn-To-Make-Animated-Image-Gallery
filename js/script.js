$(document).ready(function () {
  let items = $('#gallery li'),
    itemsByTags = {};

  // Loop thru tags
  items.each(function (i) {
    let elem = $(this),
      tags = elem.data('tags').split(', ');

    // Add data attribute for Quicksand
    elem.attr('data-id', i);

    $.each(tags, function (key, value) {
      // Remove whitespace
      value = $.trim(value);

      if (!(value in itemsByTags)) {
        // Add empty Value
        itemsByTags[value] = [];
      }
      //Add Image to Array
      itemsByTags[value].push(elem);
    });
  });
  //  Create All Items Option
  createList('All Items', items);
  $.each(itemsByTags, function (k, v) {
    createList(k, v);
  });

  // Click Handler
  $('#navbar a').live('click', function (e) {
    var link = $(this);
    // Add Active Class
    link.addClass('active').siblings().removeClass('active');
    $('#gallery').quicksand(link.data('list').find('li'));
    e.preventDefault();
  });
  $('#navbar a:first').click();
  // Create the List
  function createList(text, items) {
    // Create empty ul
    var ul = $('<ul>', {
      'class': 'hidden'
    });

    $.each(items, function () {
      $(this).clone().appendTo(ul);
    });

    // Add Gallery div
    ul.appendTo('#gallery');
    // Create Menu id
    var a = $('<a>', {
      html: text,
      href: '#',
      data: {
        list: ul
      }
    }).appendTo('#navbar');
  }

  // Call Fancy Box
  $(".fancybox").fancybox();
});