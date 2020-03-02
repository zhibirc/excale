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
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    months:      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysShort:   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    days:        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday']
};

const div = (content, classList = []) => {
    const $div = document.createElement('div');

    $div.classList.add(...classList);
    $div.textContent = content;

    return $div;
};

const a = (content, classList = []) => {
    const $a = document.createElement('a');

    $a.setAttribute('href', '#');
    $a.classList.add(...classList);
    $a.textContent = content;

    return $a;
};

function buildMonthDOM ( config ) {
    const $container    = div();
    const $header       = div(config.monthName);
    const $weekdayNames = div();
    const $days         = div();

    $container.appendChild($header);
    $container.appendChild($weekdayNames);
    $container.appendChild($days);

    config.dayNames.forEach(dayName => $weekdayNames.appendChild(div(dayName)));

    for ( let index = 0; index < config.days; index += 1 ) {
        // todo: implement
    }

    return $container;
}

function prepareDate ( date ) {
    return {
        day:  date.getDay(),
        days: 32 - (new Date(date.setDate(32))).getDate()
    };
}

class Excale {
    constructor ( config = {} ) {
        const date = config.year && config.month ? new Date(config.year, config.month - 1) : new Date();
        const {day, days} = prepareDate(date);
        const bindElement = config.bindTo || document.body;

        this.dom = {
            $month: buildMonthDOM({
                monthName: locale.monthsShort[date.getMonth()],
                dayNames:  locale.daysShort,
                days,
                day
            })
        };

        bindElement.appendChild(this.dom.$month);
    }

    pick ( config = {} ) {
        const date = config.year && config.month ? new Date(config.year, config.month - 1) : new Date();
        const {day, days} = prepareDate(date);
    }
}


module.exports = Excale;
