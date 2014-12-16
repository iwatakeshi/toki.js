// toki.js locale configuration
// locale : afrikaans (af)
// author : Werner Mollentze : https://github.com/wernerm
/*jslint node: true, forin: true, white: true, newcap: true*/
/*jslint browser:true */
/*global define*/

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['toki'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../toki')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : this).toki); // node or other global
    }
}(function(toki) {
    return toki.defineLocale('af', {
        month: {
            long: 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
            short: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
            min: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        },
        weekday: {
            long: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
            short: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
            min: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        },
        day: {
            format: '%s'
        },
        year: {
            format: '%s'
        }
    });
}));