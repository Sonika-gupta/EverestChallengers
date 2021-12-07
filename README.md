CHALLENGE #1: PREDICTING OUTCOME

### Flow

function: `predictOutcome`

**input** : bowl_type, shot_type, shot_timing

**output**: shot_outcome

=> validateInputs

=> for the given bowl_type check timing:

if the shot was bad (hit probability < 0.4): 0 runs/1 wicket

- => if perfect timing

  - => shot was optimal (probability >= 0.7): 4/6 runs

  * => shot was average (probability >= 0.4): 2/3 runs

* => if good timing

  - => shot was optimal (probability >= 0.7): 3/4 runs

  * => shot was average (probability >= 0.4): 1/2 runs

- => if early timing

  - => shot was optimal (probability >= 0.7): 1/2 runs

  * => shot was average (probability >= 0.4): 0/1 runs

* => if late timing 0 runs / 1 wicket
