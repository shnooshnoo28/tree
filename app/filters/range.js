define(['pages/home/module'], function (module) {

    'use strict';

    module.registerFilter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    });

});