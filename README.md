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
2. Add in remaining backend (Asian rules of checkmate and draw) (revis: I'd rather just do three move repetition. It's easier and simpler that way)
3. Implement bruteforce AI (alpha beta pruning to 16-18 layers Ideally, heuristics etc.) (also need to add opening book. The book is gonna be a tree, since transposing positions exists so some nodes need to point to the same. We also need a board position hash that hashes both the color and piece board together to find the correct node in the tree. Need a reflection function that reflects board across central file, to see mirrored positions and stuff)
4. Implement humanlike AI (strategy and stuff) (create styles according to xqinenglish opening styles page, like giving favorite opening systems and personalities). (At beginner levels, basically make its choice of moves probabilistically uniform across all moves, and then at higher levels make it sharpen to the better ones? Or modify how it evaluates at each level?) (remember PASTE: position, analysis, strategy, tactics, execution)
5. Machine Learning AI (Muzero)
6. Machine Learning classifier (of moves and integrate with humanlike AI to play more naturally)
7. Trainer (use the classifier to teach and improve your play, maybe a PCA to see your style based on your games? Have it be able to hint moves, analyze best moves for that style)

## Misc. Thoughts:
1. Muzero has a policy and a value function. The policy function basically chooses the best move, the value function evaluates the value of the board/state. To implement the trainer, I think it's best to basically have a function that classifies each move according to its different styles, which would be complicated. Then to make a stylistic AI, should probably combine its evaluation with the preferred style of move to rank them and choose them.
2. Encoding moves: like how certain chess programs classify moves as quiet moves, castles, etc, we could probably do the same with Xiangqi. Then it would be easy to simply weight these for styles?
3. Can we come up with a list of common strategies? (and how the heck would we implement it?)
4. Since MuZero is unsupervised, I don't know if we can apply the convolutional neural net to classifying styles. It's internal model might be meaningless.
5. Semi-supervised learning of styles? Or just do Maia chess strategy of learning?

## Bug List

## TODO:
1. GUI: Implement buttons (new game, undo, redo moves, draw, resign, edit game, edit position) (not all these need implementation immediately)
2. Game: Change clock to initiate after first moves of both sides 
3. Game: Draws and simple 3 move repetition (we are not implementing Asia rules anymore)
