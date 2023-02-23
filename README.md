# poket-cube

1. Study 3D
1. AI
    - Neuro evolutionary algorithms
1. Have fun 

Show average time table. Tell the distinctions of each method. Show gifs.
Explain they compete for CPU resources

Copy the readme from https://github.com/achmand/Solving-2x2-Rubiks-Cube and adapt it

A cube is represented by an array of colors (26). That way is easier to clone a clube, all we have to do is to copy the array.
on the other hand... The rotation operations and cubelets mapping (show code) are super annoying since it includes some manual mapping.

The abstraction allows higher order cubes.. The solvers wouldn't work because they are stricted attached to this dimension cube. It would be really easy to change it.


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