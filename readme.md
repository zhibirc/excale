[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](license.md)
[![Maintenance](https://img.shields.io/maintenance/yes/2020.svg?style=flat-square)]()
![GitHub package.json version](https://img.shields.io/github/package-json/v/zhibirc/excale?style=flat-square)
![GitHub file size in bytes](https://img.shields.io/github/size/zhibirc/excale/build/index.min.js?style=flat-square)

# Express Calendar

_Simple and solid implementation of Calendar UI component._

**Core ideas:**

- zero-dependency;
- often times customization flexibility is more important than a variety of out-of-the-box features, amount of which is often not enough for project purposes,
  so the first goal was to provide the most basic implementation, but extendable enough in the same time to build more features on top;
- some basic concepts such as `show`/`hide` methods are omitted, because in modular UI they expect to be present in prototype chain, like basic `component` module;
- realization is in OOP-style, so users can instantiate as many independents calendars as they want;
- resulting bundle size is one of project priorities so some syntax constructions and architectural decisions sometimes may look strange (google "abnormal programming").

## Install

```bash
npm i excale
```

## API

### Public

| Property           | Type                      | Scope         | Arguments | Purpose                                                  |
|--------------------|---------------------------|---------------|-----------|----------------------------------------------------------|
| date               | `[object Date]`           | self          | -         | Current date.                                            |
| events             | `[object Object]`         | self          | -         | User-level subscriptions.                                |
| $node              | `[object HTMLDivElement]` | self          | -         | Root DOM element of instance for extended customization. |
| scroll             | `[object Function]`       | prototype     | direction | Scroll/switch to the previous/next month.                |
| DIRECTION_PREVIOUS | `[object Symbol]`         | static getter | -         | Predefined constant for specify backward direction.      |
| DIRECTION_NEXT     | `[object Symbol]`         | static getter | -         | Predefined constant for specify forward direction.       |

### Initial config

| Property  | Type              | Required | Defaults           | Purpose                                                         |
|-----------|-------------------|----------|--------------------|-----------------------------------------------------------------|
| year      | `[object Number]` | no       | Current year.      | Year for initial setup.                                         |
| month     | `[object Number]` | no       | Current month.     | Month for initial setup.                                        |
| day       | `[object Number]` | no       | Current day.       | Day to highlight on initial setup.                              |
| bindTo    | `HTMLElement`     | yes      | -                  | HTML element that will determine the location of instance node. |
| className | `[object String]` | no       | Empty string `''`. | User-defined class name of instance node.                       |
| events    | `[object Object]` | no       | Empty object `{}`. | User's subscriptions to interested events.                      |

Example:

```javascript
const Excale = require('excale');
const excale = new Excale({
    year:  2020,
    month: 4,
    day:   1,

    bindTo: document.getElementById('calendar'),

    className: 'be-my-calendar',

    events: {
        scroll: (direction, dateFrom, dateTo) => {
            console.info(`Scroll ${['back', 'for'][direction]}ward from ${dateFrom} to ${dateTo}.`);

            /* do some cool stuff */
        }
    }
});
```

## License

**excale** is [MIT licensed](./license.md).
