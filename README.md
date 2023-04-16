# L-System Studio 

interactive web application built with Elm, designed to help users explore and visualize L-systems

## Sample output:
![LSysEx4](https://user-images.githubusercontent.com/114682020/231900995-36ad027b-1c02-4da8-b2f4-c606a53ff545.png)








## Symbols

the following characters are used with specific geometric interpretations to define the L-system rules:

| Character | Meaning                                                     |
|-----------|-------------------------------------------------------------|
| F         | Move forward by line length drawing a line                  |
| f         | Move forward by line length without drawing a line          |
| +         | Turn left by turning angle                                  |
| -         | Turn right by turning angle                                 |
| \|        | Reverse direction (i.e., turn by 180 degrees)               |
| [         | Push current drawing state onto stack                       |
| ]         | Pop current drawing state from the stack                    |
| #         | Increment the line width by line width increment            |
| !         | Decrement the line width by line width increment            |
| @         | Draw a dot with line width radius                           |
| {         | Open a polygon                                              |
| }         | Close a polygon and fill it with fill color                 |
| >         | Multiply the line length by the line length scale factor    |
| <         | Divide the line length by the line length scale factor      |
| &         | Swap the meaning of + and -                                 |
| (         | Decrement turning angle by turning angle increment          |
| )         | Increment turning angle by turning angle increment          |

These symbols allow users to create a wide range of L-system rules and customize the generated fractals to their liking.

## Getting started:

### Try it live

you can try it out by visiting the live link:

[**L-System Studio Live**](https://raw.githack.com/hunorg/L-System-Studio/main/index.html)

### Run locally

if you'd like to set up the development environment and run the application locally, follow these steps:

1. clone the repository:

```
git clone https://github.com/hunorg/L-System-Studio.git
```

2. navigate to the project directory:

```
cd L-System-Studio
```

## Further Reading

for more information on L-Systems and a collection of examples, please visit the following resource:

- [Paul Bourke's L-System Fractals](http://paulbourke.net/fractals/lsys/)

this resource provides extensive information about L-Systems, along with numerous examples and visualizations to help you better understand their capabilities and potential applications

## Contributions 

contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes. If you have any questions or need assistance, feel free to open an issue or contact the project maintainer


## Future enchancements include: 

1. code optimization for performance and deeper recursion
2. adding more presets


