CHALLENGE #1: PREDICTING OUTCOME

### Flow

Brute Force:

function: `predictOutcome`

**input** : bowl_type, shot_type, shot_timing

**output**: shot_outcome

=> validateInputs

=> for the given bowl_type check timing:

- => if perfect timing

  - => shot was optimal (probability >= 0.75): 4/6 runs

  * => shot was average (probability >= 0.4): 2/3 runs

  - => shot was bad (probability < 0.4): 0 runs / 1 wicket

* => if good timing

  - => shot was optimal (probability >= 0.75): 3/4 runs

  * => shot was average (probability >= 0.4): 1/2 runs

  - => shot was bad (probability < 0.4): 0 runs / 1 wicket

- => if early timing

  - => shot was optimal (probability >= 0.75): 1/2 runs

  * => shot was average (probability >= 0.4): 0/1 runs

  - => shot was bad (probability < 0.4): 0 runs / 1 wicket

* => if late timing 0 runs / 1 wicket
