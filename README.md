To-Do:

[Half-Done] Text boxes do not change the input when changed, and they can go outside 0-255.
- set range 0-255 for input boxes

[Done] Text boxes display as decimal (the spec states that they need to be hex)
- display hex in input boxes

[Done] There seems to be a bug in the scoring system on my branch (unimplemented in master).
- fixed calxulate_score function

Many of the elements are still in the underlying DOM, and they need to be created as part of whatever object calls hexed().

[Done] Difficulty and turns remain unimplemented.
- fixed so that user needs to input difficulty and number of turns before generates color (before starts playing game)
