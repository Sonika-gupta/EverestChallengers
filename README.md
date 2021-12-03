CHALLENGE #1: PREDICTING OUTCOME

### Flow

Brute Force:

function: `predictOutcome`

**input** : bowl_type, shot_type, shot_timing

**output**: shot_outcome

=> validateInputs

=> for the given bowl_type check timing:

- => if perfect timing

  - => shot was optimal: 4/6 runs

  * => shot was average: 2/3 runs

  - => shot was bad: 0 runs / wicket

* => if good timing

  - => shot was optimal: 3/4 runs

  * => shot was average: 1/2 runs

  - => shot was bad: 0 runs / wicket

- => if early timing

  - => shot was optimal: 1/2 runs

  * => shot was average: 0/1 runs

  - => shot was bad: 0 runs / wicket

* => if late timing 0 runs / wicket
