<h1 align="center">
  <br>
  <img src="https://i.imgur.com/stqZu9D.png" alt="Leverkusen and Darmstadt" width="200"></a>
  <br>
  Bundesliga
  <br>
</h1>

<h4 align="center">Client API made with <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>.</h4>

<p align="center">
  <a>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="typescript">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#documentation">Documentation</a>
</p>

## Key Features

* [Football-data API](https://www.football-data.org/)
* Unit tests
* Functional test
* Data Sanitization
* Performance calculation for the first and last place in the Bundesliga season 2023/24

## How To Use

You must obtain the authentication token by creating an account on [football-data API](https://www.football-data.org/).

After that, you must update the values ​​of the `config/default.json` and `config/test.json`.

To local run:

```
yarn install && yarn start:local
```

You can run tests with:

```
yarn test:unit
```
```
yarn test:functional
```

## Documentation

GET - `/standings`

Response:
```
[
	{
		"position": 1,
		"team": {
			"name": "Bayer 04 Leverkusen",
			"crest": "https://crests.football-data.org/3.png"
		},
		"playedGames": 34,
		"won": 28,
		"draw": 6,
		"lost": 0,
		"points": 90,
		"performance": 88.24
	},
	{
		"position": 18,
		"team": {
			"name": "SV Darmstadt 98",
			"crest": "https://crests.football-data.org/55.png"
		},
		"playedGames": 34,
		"won": 3,
		"draw": 8,
		"lost": 23,
		"points": 17,
		"performance": 16.67
	}
]
```