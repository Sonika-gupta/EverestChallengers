# EVEREST CHALLENGERS CRICSUMMIT 2021

Basic tool to predict outcome of given ball, have commentary and play super over.

### Try it

To run the program:

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to input from command line

Jest has been used to create unit tests. To run the tests, run `npm run tests`.

### Directory Structure

- `src`
  - `classes`: Class Declarations for required Entities
  - `data`: Required Data to create Outcome Chart / Prediction Model
  - `game.js`: Module to create an instance of Game, to be accessed globally in project
  - `globals.js`: Contains bindings required globally in project
  - `index.js`: Entry point for application. `npm start` runs the script to begin command line REPL
  - `populators.js`: Functions to feed data into Game Instance
  - `predictionModel.js`: Object which saves conditions required to predict an outcome
  - `predictOutcome.js`: Module including function which takes in 3 parameters and returns outcome of one ball
  - `predictSuperOverOutcome.js`: Module including function to play super over and print commentary for the super over
  - `utils.js`: utility functions
  - `wrappers.js`: wrapper functions to call predictOutcome
- `tests`
  - `getCommentaryOutcome.test.js`
  - `getShotOutcome.test.js`

### CHALLENGE #1: PREDICTING OUTCOME

#### Required Data

- Bowl Types
- Shot Types
- Shot Timings

#### Assumptions

- Hit Probabilities: As the data provided is limited, random hit probabilities have been assigned to each shot type for each bowl type. The higher the hit probability, better the result.

- Level of Shot: Depending on hit probability, it is decided if the shot played is good, average or bad. If the shot is bad, it won't take into account the timing as a bad shot would always give a bad result. Outcomes have been randomly chosen out of possible outcomes for a certain combination.

- Relation to the real world: The outcomes do not reflect the real world. Next upgrade is expected to incorporate hit probabilities manually to comprehend the non-fictional outputs.

#### Flow

```
function: getShotOutcome
input: "bowl_type shot_type shot_timing"
prints: "shot_outcome"
```

=> convert string to input parameters for `predictOutcome`  
=> return result string of received outcome

```
function: predictOutcome
input: bowl_type, shot_type, shot_timing
returns: shot_outcome
```

=> Get the bowl card for given bowl type  
=> Read hit probability from bowl card for given shot type  
=> access outcome from Prediction Model based on the hit probability and shot timing

#### Prediction Model

Levels of Shot Played:

- Optimal: hit probability >= 0.7
- Average: hit probability < 0.7 & >= 0.4
- Bad: hit probability < 0.4

| Timing  |  Optimal Shot  |  Average Shot  |    Bad Shot    |
| :------ | :------------: | :------------: | :------------: |
| Perfect |    4/6 runs    |    2/3 runs    | 0 runs/ wicket |
| Good    |    3/4 runs    |    1/2 runs    | 0 runs/ wicket |
| Early   |    1/2 runs    |    0/1 runs    | 0 runs/ wicket |
| Late    | 0 runs/ wicket | 0 runs/ wicket | 0 runs/ wicket |

<br>

### CHALLENGE #2: COMMENTARY

#### Required Data

- Comments for all outcomes

#### Flow

```
function: getCommentaryOutcome
input: "bowl_type shot_type shot_timing"
prints: "suitable_commentary - shot_outcome"
```

=> convert string to input parameters for `predictOutcome`  
=> return randomly from the comments available for received outcome

<br>

### CHALLENGE #3: SUPER OVER

#### Required Data

- Players' Names
- Teams

#### Assumptions

- Chasing Team: Default: Assuming that Team India has played and Team Australia is chasing.
- Target Runs: Default: Assuming Team India scored 20 runs in the super over so Team Australia requires 21 for a win.
- Bowl Cards: 6 bowl cards for super over will be picked randomly from valid bowl cards.
- Wickets: 2 batsmen from Team Australia will be picked randomly.
- Bowler: Bowler from Team India will be picked randomly.

#### Flow

```
function: playSuperOver
input: [i] = [shot_type, shot_timing], n = 6 | [i] = "shot_type shot_timing", n = 6
prints: ball_summary
        suitable_commentary - shot_outcome

        match_result
```

=> Chose randomly batting team, bowling team, 6 bowl cards, 2 wickets, 1 bowler, target score  
=> Predict Outcome for each ball  
=> Add the received outcome score to team score
=> Update game state with received outcome
=> Print won status if target chased  
=> Print lost status if both wickets gone or target not achieved

<br>

### Planned Upgrades

1. Remove Random assignment of hit probability
2. Make Commentary more comprehensible depending on each bowl type and shot type
3. Provide options to chose batsmen, bowler in Super Over
