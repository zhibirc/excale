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

const BASE_BLOCK = 'excale';

const i18n = {
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    months:      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysShort:   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    days:        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

const element = (name, content = '', classList = [], attributes = {}) => {
    const $element = document.createElement(name);

    $element.textContent = content;
    $element.classList.add(...classList);

    switch ( name ) {
        case 'a':
            // default anchor, can be overwritten
            $element.setAttribute('href', '#');
            break;
    }

    Object.keys(attributes).forEach(attributeName => $element.setAttribute(attributeName, attributes[attributeName]));

    return $element;
};

function buildMonthDOM ( config ) {
    const $container    = element('div', null, [`${BASE_BLOCK}`]);
    const $header       = element('div', config.monthName, [`${BASE_BLOCK}__month-header`]);
    const $weekdayNames = element('div', null, [`${BASE_BLOCK}__weekday-names`]);
    const $days         = element('div', null, [`${BASE_BLOCK}__days`]);

    i18n.daysShort.forEach((dayName, index) => $weekdayNames.appendChild(element('div', dayName, [], {title: i18n.days[index]})));
    Array.from({length: config.dayStart}, () => $days.appendChild(element('div')));
    Array.from({length: config.daysCount}, (item, index) => $days.appendChild(element('a', index + 1, [`${BASE_BLOCK}__day`])));

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
                monthName: i18n.months[date.getMonth()],
                dayStart:  date.getDay(),
                daysCount: 32 - (new Date(date.setDate(32))).getDate()
            })
        };

        (config.bindTo || document.body).appendChild(this.dom.$month);
    }
}


//module.exports = Excale;
