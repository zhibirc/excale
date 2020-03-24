/**
 * Simple and solid calendar/datepicker implementation.
 *
 * @module
 *
 * @author Yaroslav Surilov <>
 * @license MIT
 */

'use strict';

const BASE_BLOCK = 'excale';

const DIRECTION_PREVIOUS = Symbol('DIRECTION_PREVIOUS');
const DIRECTION_NEXT     = Symbol('DIRECTION_NEXT');

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

    name === 'a' && $element.setAttribute('href', '#');

    Object.keys(attributes).forEach(attributeName => $element.setAttribute(attributeName, attributes[attributeName]));

    return $element;
};

const getDateMetrics = date => (
    {
        year:      date.getFullYear(),
        month:     date.getMonth(),
        day:       date.getDay(),
        daysCount: 32 - (new Date(new Date(date).setDate(32))).getDate()
    }
);

const buildDaysDOM = (day, daysCount, $parent) => {
    while ( $parent.firstChild ) $parent.removeChild($parent.firstChild);

    Array.from({length: day}, () => $parent.appendChild(element('div')));
    Array.from({length: daysCount}, (item, index) => $parent.appendChild(element('a', index + 1, [`${BASE_BLOCK}__day`])));
};

/* eslint-disable-next-line consistent-return */
function buildMonthDOM ( config, $node ) {
    if ( $node ) {
        $node.$monthName.textContent = i18n.months[config.month];
        $node.$year.textContent      = config.year;
        buildDaysDOM(config.day, config.daysCount, $node.$days);
    } else {
        const $container    = element('div', null, [`${BASE_BLOCK}`, config.className]);
        const $header       = element('div', null, [`${BASE_BLOCK}__month-header`]);
        const $weekdayNames = element('div', null, [`${BASE_BLOCK}__weekday-names`]);
        const $days         = element('div', null, [`${BASE_BLOCK}__days`]);

        $container.$days = $days;

        [
            $container.$arrowPrevious = element('b', '❮', [`${BASE_BLOCK}__month-header-arrow`]),
            $container.$monthName     = element('span', i18n.months[config.month], [`${BASE_BLOCK}__month-header-name`]),
            $container.$year          = element('span', config.year, [`${BASE_BLOCK}__month-header-year`]),
            $container.$arrowNext = element('b', '❯', [`${BASE_BLOCK}__month-header-arrow`])
        ].forEach($header.appendChild.bind($header));

        i18n.daysShort.forEach((dayName, index) => $weekdayNames.appendChild(element('div', dayName, [], {title: i18n.days[index]})));
        buildDaysDOM(config.day, config.daysCount, $days);
        [$header, $weekdayNames, $days].forEach($container.appendChild.bind($container));

        return $container;
    }
}

class Excale {
    constructor ( config = {} ) {
        this.date   = config.year && config.month ? new Date(config.year, config.month - 1) : new Date();
        this.$node  = buildMonthDOM({...getDateMetrics(this.date), className: config.className || ''});
        this.events = config.events || [];

        this.$node.$arrowPrevious.addEventListener('click', () => {
            const currentDate = this.date;

            this.date.setMonth(this.date.getMonth() - 1);
            buildMonthDOM(getDateMetrics(this.date), this.$node);
            this.events.scroll && this.events.scroll(0, currentDate, this.date);
        });

        this.$node.$arrowNext.addEventListener('click', () => {
            const currentDate = this.date;

            this.date.setMonth(this.date.getMonth() + 1);
            buildMonthDOM(getDateMetrics(this.date), this.$node);
            this.events.scroll && this.events.scroll(1, currentDate, this.date);
        });

        (config.bindTo || document.body).appendChild(this.$node);
    }

    static get DIRECTION_NEXT () {
        return DIRECTION_NEXT;
    }

    static get DIRECTION_PREVIOUS () {
        return DIRECTION_PREVIOUS;
    }

    scroll ( direction ) {
        switch ( direction ) {
            case DIRECTION_PREVIOUS:
                // todo: implement
                break;
            case DIRECTION_NEXT:
                // todo: implement
                break;
            default:
                throw new Error('Error value for direction!');
        }
    }
}


//module.exports = Excale;
