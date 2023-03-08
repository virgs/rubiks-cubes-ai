# poket-cube

1. Study 3D
1. AI
    - Neuro evolutionary algorithms
1. bitwise old times fun stuff
1. Have fun 

Show average time table. Tell the distinctions of each method. Show gifs.
Explain they compete for CPU resources


# URL Query params
/rubiks-cubes-ai?cube=0&moves=F'  2U    B   2D    F'   R'   D'   U    L'   B    L    F    L'   F'   D   2U    L'
- cube
- moves

# Characteristics of a Pocket Cube
There is plenty of prior art in this space, and thanks to some key characteristics of a 2x2x2 Pocket Cube, optimally solving a given cube state is not too computationally intensive. The Pocket Cube consists of 8 cubies, each with three colour stickers on them. Any permutation of the cubies is possible, with seven of these being able to be independently oriented in three ways. If we fix one of these cubies to a chosen position and orientation (essential deeming it to be in a solved state); we can permit any permutation of the remaining seven cubies and any orientation of six cubies. This results in their only being 7! * 3^6 = 3674160 possible unique states.


# Characteristics of a Rubik Cube
As documented in my previous post, a Pocket Cube has a couple of key characteristics which make it easier to construct a solver using conventional Graph searching algorithms, with minimal pruning or heuristics required. However, in the case of a 3x3x3 Rubik Cube this is not the case, thanks in large part to the addition of a centre cubie - the two no longer share the same optimisations that can be performed. The cube itself has 43 quintillion, 252 quadrillion, 3 trillion, 274 billion, 489 million, 856 thousand different valid states, which in itself makes it computational infeasible to visit each possible move sequence in an adequate time. However, research has been conducted to prove that God’s Number for a Rubik’s Cube is twenty - that proving that any initial state can be solved in twenty moves or less.

--

### A star
I tried different herustics such as:
1. Average distance of every cubelet to it's final hipothetycal position.
1. Average number of different colors of every side

To ensure that we fix the given ‘solved’ cubie, we are only required to implement three of the possible six moves, these being Up, Right and Front in my case - resulting in the Down-Bottom-Left DBL cubie staying in-place at all times. In fixing a single cubie we have managed to reduce the number of valid states, and as such employing a convention Graph search algorithm over the search space provides us with a efficent means to reach the optimal solution move sequence.

Copy the readme from https://github.com/achmand/Solving-2x2-Rubiks-Cube, https://github.com/benbotto/rubiks-cube-cracker, and https://github.com/lukapopijac/pocket-cube-optimal-solver and adapt them

A cube is represented by an array of colors (26). That way is easier to clone a clube, all we have to do is to copy the array.
on the other hand... The rotation operations and cubelets mapping (show code) are super annoying since it includes some manual mapping.

The abstraction allows higher order cubes.. The solvers wouldn't work because they are stricted attached to this dimension cube. It would be really easy to change it.

```
    UP    LEFT  FRONT RIGHT BACK  DOWN  
    ----  ----  ----  ----  ----  ----  
    0000  1111  0000  1111  0000  1111
    0000  0000  1111  1111  0000  0000
    0000  0000  0000  0000  1111  1111
    ----  ----  ----  ----  ----  ----  
    YYYY  OOOO  BBBB  RRRR  GGGG  WWWW

```

```
          UP        
          Y ₀  Y ₁  
          Y ₃  Y ₂  
LEFT      FRONT     RIGHT     BACK      
O ₄  O ₅  B ₈  B ₉  R₁₂  R₁₃  G₁₆  G₁₇  
O ₇  O ₆  B₁₁  B₁₀  R₁₅  R₁₄  G₁₉  G₁₈  
          DOWN      
          W₂₀  W₂₁  
          W₂₃  W₂₂  
```

Meaning...

```
 F    L'   R   2U'   F'   D    F   
2D    U'   B    F   2U    F'  2R
 U'  2L'   R'   D'  2R    F    F'
2D'   B    L'   F'   D    R'   U'
 R'  2F   2D'   L'   B'  2F'  2U
  ```

 Meaning first layer move...


God's Number for the 2x2 puzzle (having only 3,674,160 different positions) has been proven to be 11 moves using the half turn metric, or 14 using the quarter turn metric (half turns count as 2 rotations).

Given that for a pocket cube, the God's number is 14. You'll find often times that the path found by these algorithms are not optimal.
 BFS and A* don't find the best answer because they don't look for the best answer to solve the cube. They look for the best answer to solve the cube with a given configuration. As long as one predefined cubelet remains static (usually, the bottom-left-back one). The reason behind it is to keep the branching factor smaller. You see, in this particular cube, you don't have to move all the sides (6) both directions. If the L move basically consists of a R' move and a new cube orientation (which is not a move, technically), you don't need to do the L move at all. The same applies for the other 2 axis. So, instead of having a branching factor of 2\*6, I make it 2\*3. I could even claim that R' is the same 3R, as in fact it is. It would make the branching factor 3\*1, so even smaller. But the solutions found would be even farther from the optimal one,


# Using a Bidirectional search
As we know the desired goal state and the initial cube state we can employ two simultaneous Breath First Searches - one going forward from the initial state and one backward from the goal state, stopping when they meet. In doing this we provide a means to restrict the branching which occurs when the search is being performed, into seperate two sub-graphs - dramatically reducing the amount of exploration required.

> Suppose if the branching factor of the tree is b and distance of the goal vertex from the source is d, then the trivial Breath First Search complexity would be O(bd). On the other hand, if we execute two search operations then the complexity would be O(bd/2) for each search, with a total complexity of O(bd/2 + bd/2) - which is far less than O(bd).

# Visualising the Solution
Now that I was able to optimally solve a given cube state in the Browser via WASM, next was to provide a pleasing visualisation which could be followed along using a real Pocket Cube. For this I decided to build the client in Vue using Three.js and TypeScript. I have had little experience till now using Three.js, but thought it would be interesting to explore constructing such models in a declarative manner using React.

I found this to be a very rewarding experience, using a Facelet representation of the cube state to communicate between the client and the solver. The cube component itself took adavanteg of React Hooks to manage the state transitions and rotation animations.

# Reinforcement Learning
Reinforcement learning (RL) is an area of machine learning where an agent learns how to behave
in an environment by performing an action and seeing the rewards. Over the past several years, RL
has sparked interest, as it has been applied to a wide array of fields [5, 1, 2]. While RL has been
successful in many use cases, it depends on environments in which it can obtain informative rewards
as it takes a certain policy. In domains with very sparse rewards, RL algorithms do not perform nearly
as well [8]. Such domains include short answer exam problems, and combination puzzles such as the
Rubik’s Cube, which is why we were interested in exploring novel RL approaches to solving such
problems.

# Related Work
Deep Reinforcement Learning (DRL) broadly describes the use of deep neural networks to solve
RL problems, and often involves training a model to predict the value function for a (state, action)
pair [7]. Deep reinforcement learning techniques have been successful with such games as chess
and Go [12, 13], and there have been recent efforts to use adapted versions of these techniques to
solve problems with sparser reward spaces. While many games have extremely large state spaces,
the Rubik’s cube problem is unique because of its sparse reward space. The random turns of a cube
are difficult to evaluate as rewards because of the uncertainty in judging whether or not the new
configuration is closer to a solution.
Our work for this paper involved a modified implementation of McAleer et al.’s paper [8] that first
solved the Rubik’s cube problem by augmenting a Monte Carlo Tree Search (MCTS) algorithm
with a trained neural network. MCTS is an online, heuristic search algorithm for decision making
processes that has enjoyed great success in game AI [4]. There are many variants of MCTS [3], two
of which we implement in this paper. It builds upon the ideas of Alpha Go Zero [14], whose neural
network learns by generating its own training data (i.e., playing simulated games of Go against itself).