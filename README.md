Codename: Marvin
================
[![In Progress](https://badge.waffle.io/sethtrain/marvin.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/sethtrain/marvin)

[http://muppet.wikia.com/wiki/Marvin_Suggs](http://muppet.wikia.com/wiki/Marvin_Suggs)

Virtual Tabletop application

![visual concept](https://raw.githubusercontent.com/sethtrain/marvin/master/design/concept.png?token=AAAD_eK-LNaqJxXAb67tqxQx2ROkFu_fks5XP9DAwA%3D%3D)

Setup
-----
1. Setup an IAM role with admin access
2. Fork and clone the repo, then change directory to `marvin`

```bash
npm install -g serverless
npm install
serverless project init
```

Initial Goals
-------------
1. Provide a simple environment to run a RPG game virtually.
2. Deployed to AWS via the Serverless framework.
3. Frontent served from Cloudfront
4. Realtime (or really near realtime) updating of map

One day Goals
-------------
1. Tile map builder
2. Audio/Video integration with WebRTC
3. Campaign statistics (encounter action events stored in a manner that would allow a GM to make decisions based up how the PCs have reacted to similar actions, for the best storyline/character happiness)
