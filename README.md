# Sunzi Xiangqi app
A repository for a Xiangqi board and game without the AI

Plan is to use electron to make it a browser game kinda. Will do AI in python through tensorflow, so an API or SDK will be needed.

Also plan to have a training mode to help the player train
in such a way that they improve in a certain style of play,
such as strategic, tactical, positional, material, etc. Will necessitate having a puzzles creator and an opening movebook too.
Also should train in memorizing lines for play. Want to also have
a realistic AI, not a computer one (I'm thinking having the AI
able to tunnel vision, have confusion, greediness, morale hits/confidence, etc.)

We'll also try to use MuZero to play itself


Language: Typescript

For information on implementation
https://www.chessprogramming.org/

## Plan:
1. Implement GUI
2. Add in remaining backend (Asian rules of checkmate and draw)
3. Implement bruteforce AI (alpha beta pruning, heuristics etc.)
4. Implement humanlike AI (strategy and stuff)
5. Machine Learning AI