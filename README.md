# poket-cube

1. Study 3D
1. AI
    - Neuro evolutionary algorithms
1. bitwise old times fun stuff
1. Have fun 

https://en.wikipedia.org/wiki/A*_search_algorithm

Show average time table. Tell the distinctions of each method. Show gifs.
Explain they compete for CPU resources

Copy the readme from https://github.com/achmand/Solving-2x2-Rubiks-Cube and https://github.com/lukapopijac/pocket-cube-optimal-solver and adapt them

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

Given that for a pocket cube, the God's number is 11. You'll find often times that the path found by these algorithms are not optimal.
 BFS and A* don't find the best answer because they don't look for the best answer to solve the cube. They look for the best answer to solve the cube with a given configuration. As long as one predefined cubelet remains static (usually, the bottom-left-back one). The reason behind it is to keep the branching factor smaller. You see, in this particular cube, you don't have to move all the sides (6) both directions. If the L move basically consists of a R' move and a new cube orientation (which is not a move, technically), you don't need to do the L move at all. The same applies for the other 2 axis. So, instead of having a branching factor of 2\*6, I make it 2\*3. I could even claim that R' is the same 3R, as in fact it is. It would make the branching factor 3\*1, so even smaller. But the solutions found would be even farther from the optimal one,