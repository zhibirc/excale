/**
 * Calendar/datepicker implementation.
 *
 * Component that allows users to view and select dates.
 *
 * @module
 *
 * @author Yaroslav Surilov <>
 */

'use strict';

const locale = {
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    months:      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    daysShort:   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    days:        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Monday"]
};

function prepareDate ( date ) {
    return {
        day:  date.getDay(),
        days: 32 - (new Date(date.setDate(32))).getDate(),
    };
}

class Excale {
    constructor ( config = {} ) {
        const date = config.year && config.month ? new Date(config.year, config.month - 1) : new Date();
        const {day, days} = prepareDate(date);

        const bindElement = config.bindTo || document.body;
    }

    pick ( config = {} ) {
        const date = config.year && config.month ? new Date(config.year, config.month - 1) : new Date();
        const {day, days} = prepareDate(date);
    }
}


module.exports = Excale;
