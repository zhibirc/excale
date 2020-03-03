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

const BASE_CLASS_PREFIX = 'excale';

const locale = {
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    months:      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysShort:   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    days:        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday']
};

const div = (content, className) => {
    const $div = document.createElement('div');

    className && $div.classList.add(className);
    $div.textContent = content;

    return $div;
};

const a = (content, className) => {
    const $a = document.createElement('a');

    $a.setAttribute('href', '#');
    className && $a.classList.add(className);
    $a.textContent = content;

    return $a;
};

function buildMonthDOM ( config ) {
    const $container    = div(null, `${BASE_CLASS_PREFIX}-month-item`);
    const $header       = div(config.monthName, `${BASE_CLASS_PREFIX}-month-item__header`);
    const $weekdayNames = div(null, `${BASE_CLASS_PREFIX}-month-item__weekday-names`);
    const $days         = div(null, `${BASE_CLASS_PREFIX}-month-item__days`);

    config.dayNames.forEach(dayName => $weekdayNames.appendChild(div(dayName)));
    Array.from({length: config.dayStart}, () => $days.appendChild(div()));
    Array.from({length: config.daysCount}, (item, index) => $days.appendChild(a(index + 1, `${BASE_CLASS_PREFIX}-day-item`)));
    Array.from({length: ++config.daysCount % 7}, () => () => $days.appendChild(div()));

    $container.appendChild($header);
    $container.appendChild($weekdayNames);
    $container.appendChild($days);

    return $container;
}

class Excale {
    constructor ( config = {} ) {
        const date = config.year && config.month ? new Date(config.year, config.month - 1) : new Date();

        this.dom = {
            $month: buildMonthDOM({
                monthName: locale.months[date.getMonth()],
                dayNames:  locale.daysShort,
                dayStart:  date.getDay(),
                daysCount: 32 - (new Date(date.setDate(32))).getDate()
            })
        };

        (config.bindTo || document.body).appendChild(this.dom.$month);
    }
}


//module.exports = Excale;
