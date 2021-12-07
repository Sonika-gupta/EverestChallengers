## CHALLENGE #1: PREDICTING OUTCOME

### Provided

- Bowl Types
- Shot Types
- Shot Timings

### Assumptions

- Hit Probabilities: As the data provided is limited, random hit probabilities have been assigned to each shot type for each bowl type. The higher the hit probability, better the result.

- Level of Shot: Depending on hit probability, it is decided if the shot played is good, average or bad. If the shot is bad, it won't take into account the timing as a bad shot would always give a bad result. Outcomes have been randomly chosen out of possible outcomes for a certain combination.

- Relation to the real world: The outcomes do not reflect the real world. Next upgrade is expected to incorporate hit probabilities manually to comprehend the non-fictional outputs.

### Flow

```
function: `predictOutcome`

**input** : bowl_type, shot_type, shot_timing

**output**: shot_outcome
```

=> Get the bowl card for given bowl type
=> Read hit probability from bowl card for given shot type
=> access outcome from Prediction Model based on the hit probability and shot timing

### Prediction Model

- timing: perfect

  - => shot was optimal (probability >= 0.7): 4/6 runs

  * => shot was average (probability < 0.7 && >= 0.4): 2/3 runs

* timing: good

  - => shot was optimal (probability >= 0.7): 3/4 runs

  * => shot was average (probability < 0.7 && >= 0.4): 1/2 runs

- timing: early

  - => shot was optimal (probability >= 0.7): 1/2 runs

  * => shot was average (probability < 0.7 && >= 0.4): 0/1 runs

* timing: late
  - => for all shots: 0 runs / 1 wicket

- default: the shot was bad (hit probability < 0.4): 0 runs/1 wicket

<br>

## CHALLENGE #2: COMMENTARY

### Provided

- Comments for all outcomes

### Flow

```
function: `getCommentaryOutcome`

**input** : bowl_type, shot_type, shot_timing : `str`

**output**: suitable_commentary - shot_outcome
```

=> predict outcome for given input
=> return randomly from the comments available for received outcome
