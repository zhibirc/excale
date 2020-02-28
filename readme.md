[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](license.md)
[![Maintenance](https://img.shields.io/maintenance/yes/2020.svg?style=flat-square)]()
![GitHub package.json version](https://img.shields.io/github/package-json/v/zhibirc/excale?style=flat-square)
![GitHub file size in bytes](https://img.shields.io/github/size/zhibirc/excale/build/index.min.js?style=flat-square)

# Express Calendar

Core ideas:

- often times customization flexibility is more important than a variety of out-of-the-box features, amount of which is often not enough for project purposes,
  so the first goal was to provide the most basic implementation, but extendable enough in the same time to build more features on top;
- some basic concepts such as `show`/`hide` methods are omitted, because in modular UI they expect to be present in prototype chain, like basic `component` module;
- realization is in OOP-style, so users can instantiate as many independents calendars as they want;
- resulting bundle size is one of project priorities so some syntax constructions and architectural decisions sometimes may look strange (google "abnormal programming").
