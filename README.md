# L-System Studio 

interactive web application built with Elm, designed to help users explore and visualize L-systems

## Sample output:

![Bush](https://user-images.githubusercontent.com/114682020/227063859-eb63cc9b-80a2-461c-8c06-675f9344940b.png)
![SquareSierpinski](https://user-images.githubusercontent.com/114682020/227063864-abbdbd48-dd9b-419b-84e4-081dff7829f4.png)
![TrianglePaulB](https://user-images.githubusercontent.com/114682020/227063866-009f3656-6f39-4270-8c75-013f2c486c06.png)

## Symbols

The following characters are used with specific geometric interpretations to define the L-system rules:

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

You can try it out by visiting the live link:

[**L-System Studio Live**](https://rawcdn.githack.com/hunorg/L-System-Studio/5972198158dce4a5229a402fd794bcdca8587506/index.html)

### Run locally

If you'd like to set up the development environment and run the application locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/hunorg/L-System-Studio.git
```

2. Navigate to the project directory:

```
cd L-System-Studio
```

## Further Reading

For more information on L-Systems and a collection of examples, please visit the following resource:

- [Paul Bourke's L-System Fractals](http://paulbourke.net/fractals/lsys/)

This resource provides extensive information about L-Systems, along with numerous examples and visualizations to help you better understand their capabilities and potential applications.

## Contributions 

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes. If you have any questions or need assistance, feel free to open an issue or contact the project maintainer.


## Future enchancements include: 

1. Saving and loading L-system presets
3. Drawing process animation
4. User-guided tutorials or examples
5. Error handling and input validation
6. Tooltips and help text
7. Code optimization for performance


