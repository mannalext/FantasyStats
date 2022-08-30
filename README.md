# FantasyStats
A tool to consume the Sleeper API and calculate user and league-wide stats for fantasy football players

## About The Project
[under construction]

## Architecture
The app is organized according to the [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) pattern. 

There are two primary ports - a `StatsRepository` and a `SleeperClient`. The goal of this application is to consume data from the `SleeperClient` and store it in the `StatsRepository`. An API will be exposed to display that information in meaningful ways.

```
The `StatsRepository is a likely unnecessary abstraction to simply achieve the desired feature set. However, it exists for a couple reasons

1. There is no guarantee that Sleeper (or whatever external API port is used) will persist their data over the long term
2. Performing potentially expensive operations on data fetched from an API every time is wasteful. If there are complex constructs that emerge from the external data, those constructs can be stored in the app and only need to be recalculated when the input data changes
```

The advantage of hex-arch is that if Sleeper is no longer the best option to host fantasy leagues, all that must change is the port. The same for the chosen DBMS, Postgres