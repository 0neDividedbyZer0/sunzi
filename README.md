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
1. Implement bruteforce AI (alpha beta pruning to 16-18 layers Ideally, heuristics etc.) (also need to add opening book. The book is gonna be a tree, since transposing positions exists so some nodes need to point to the same. We also need a board position hash that hashes both the color and piece board together to find the correct node in the tree. Need a reflection function that reflects board across central file, to see mirrored positions and stuff)
2. Implement humanlike AI (strategy and stuff) (create styles according to xqinenglish opening styles page, like giving favorite opening systems and personalities). (At beginner levels, basically make its choice of moves probabilistically uniform across all moves, and then at higher levels make it sharpen to the better ones? Or modify how it evaluates at each level?) (remember PASTE: position, analysis, strategy, tactics, execution)
3. Machine Learning AI (Muzero)
4. Machine Learning classifier (of moves and integrate with humanlike AI to play more naturally)
5. Trainer (use the classifier to teach and improve your play, maybe a PCA to see your style based on your games? Have it be able to hint moves, analyze best moves for that style)

## Misc. Thoughts:
1. Muzero has a policy and a value function. The policy function basically chooses the best move, the value function evaluates the value of the board/state. To implement the trainer, I think it's best to basically have a function that classifies each move according to its different styles, which would be complicated. Then to make a stylistic AI, should probably combine its evaluation with the preferred style of move to rank them and choose them.
2. Encoding moves: like how certain chess programs classify moves as quiet moves, castles, etc, we could probably do the same with Xiangqi. Then it would be easy to simply weight these for styles?
3. Can we come up with a list of common strategies? (and how the heck would we implement it?)
4. Since MuZero is unsupervised, I don't know if we can apply the convolutional neural net to classifying styles. It's internal model might be meaningless.
5. Semi-supervised learning of styles? Or just do Maia chess strategy of learning?

## Bug List
1. (TODO: fix bug where opposite player's time still progresses by like 1 second after finishing a game)
2. Fix blocking search. 3 ways of doing it that I see: iterative version of alphabeta (basically a grand loop, and you create your stack, but you have to keep track of the level of depth in the stack to inherit proper alpha beta values)
(edit: promise based recursions depend on the chain being made synchronously. However, since we are doing a tree that might not be generated entirely, this requires asynchronous creation, so it is not possible/very difficult to get right)
3. Fix the legalmove generator's clamping

## TODO:
0. GUI's functions with think probably need redoing
1. Evaluation of position (heuristics on capturing I guess? Some important considerations is to have orthogonal evaluations, simpler lighter is better, and to be continuous and to be able to judge close positions better than completely different positions) (will likely do interpolation between endgame and middlegame) (space evaluation) (tempo bonus to help with score oscillation. Tempo is perhaps the most important factor in Xiangqi over even material)
2. Alpha-Beta pruning tree search with null move heuristic (need quiescent search and iterative deepening)
3. Opening Books (mergesort and trees, need a way of recording csv of move history,
and reading from them. Then we need to play a bunch of lines of each opening)

4. GUI: Implement buttons (new game, undo, redo moves, draw, resign, edit game, edit position)  (next would be undo and redo moves) (lastly would be edit game and edit position) (undo and redo and edit game, edit position would be buttons, the rest menu options) (need to give new game options) 
