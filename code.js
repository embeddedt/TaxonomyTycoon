"use strict";

import { Sortable } from '@shopify/draggable';

import { Plugins } from '@shopify/draggable';

var sortable = null;

const correctString = "KingdomPhylumClassOrderFamilyGenusSpecies";

function recreateSortable() {
    sortable = new Sortable(document.querySelectorAll('#family-cards'), {
        draggable: 'div',
        swapAnimation: {
            horizontal: false //($("body").height() < $("body").width())
        },
        plugins: [Plugins.SwapAnimation]
    });
    sortable.on('sortable:start', function() {
        
    });
    sortable.on('sortable:sort', function() {
        var width = $(".draggable-source--is-dragging").width();
        $(".draggable-mirror").css('width', width + 'px');
        $(".draggable-mirror")[0].focus();
    });
    sortable.on('drag:stop', function() {
        setTimeout(function() {
            if($("#family-cards").children().text() == correctString) {
                console.log("Correct!");
                $("#instructions").text("Correct!");
                $("#instructions").addClass("correct");
                sortable.destroy();
                sortable = null;
            } else {
                console.log("Incorrect");
                console.log($("#family-cards").children().text());
                console.log(correctString);
            }
        }, 500);
        
    });
}



$(window).resize(function() {
    if(sortable)
        sortable.destroy();
    recreateSortable();
});

(function($) {

$.fn.randomize = function(childElem) {
  return this.each(function() {
      var $this = $(this);
      var elems = $this.children(childElem);

      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      $this.detach(childElem);  

      for(var i=0; i < elems.length; i++)
        $this.append(elems[i]);      

  });    
};
})(jQuery);

$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
});


do {
    $("#family-cards").randomize("#family-cards div");
} while ($("#family-cards").children().text() == correctString);

$("#family-cards").children().each(function(index, el) {
    $(el).css('background-color', 'hsl(' + (index/7)*360 + ", 100%, 50%)");
});

$("#family-cards").show();

recreateSortable();