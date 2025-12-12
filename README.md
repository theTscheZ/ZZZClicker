# ZZZ Clicker – README

## Overview

A small React + TypeScript clicker game with a simple gacha system. You generate currency, perform pulls, collect characters, and build a team with faction bonuses.

## Team members

* Niklas Mikeska
* Aaron Bandion
* Rafael Bieringer

## Requirements

* Node.js
* npm

## Installation

```
npm install
```

## Run

```
npm run dev
```

Open the shown local URL in your browser.

## Build

```
npm run build
npm run preview
```

## Main Features

* Clicker system generating currency
* Single and ten-pull gacha with shared pity
* Automatic character leveling from dupes
* Team of three characters with faction bonuses

## Usage

* Click to generate currency
* Perform gacha pulls
* Assign characters to team slots

## Automatic Saving

The game automatically saves the following data to ensure your progress is preserved across sessions:

* olychromes (poly): The amount of in-game currency you have collected.
* Owned Characters (owned): The list of characters you have acquired, along with their levels.
* Team (team): The characters currently equipped in your team, including their levels.
* Achievements (unlockedAchievements): The achievements you have unlocked during gameplay.
* Starter Banner Usage (starterUsed): Indicates whether the starter banner has been used.
* Total Pulls (totalPulls): The total number of pulls you have made in the game.

All of these data points are saved automatically and restored when you reload the game, ensuring that you never lose your progress.
