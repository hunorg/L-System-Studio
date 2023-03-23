# L-System Studio 

L-System Studio is an interactive web application built with Elm, designed to help users explore and visualize L-systems. With its intuitive graphical user interface, users can easily create, modify, and experiment with different L-system rules, and visualize the resulting fractals in real-time.

## Features

L-System Studio offers the following features:

- Easy-to-use graphical interface for designing L-systems
- Support for various L-system rules, including context-sensitive and parametric L-systems
- Real-time visualization of L-system fractals as you modify rules
- Extensive symbol set for geometric interpretations (see [Symbols](#symbols) section)
- Customizable rendering settings, including line width, colors, and angles

These features make L-System Studio a powerful and flexible tool for creating and exploring L-system fractals.

## Sample output:

![Bush](https://user-images.githubusercontent.com/114682020/227063859-eb63cc9b-80a2-461c-8c06-675f9344940b.png)
![SquareSierpinski](https://user-images.githubusercontent.com/114682020/227063864-abbdbd48-dd9b-419b-84e4-081dff7829f4.png)
![TrianglePaulB](https://user-images.githubusercontent.com/114682020/227063866-009f3656-6f39-4270-8c75-013f2c486c06.png)

## Symbols

L-System Studio uses the following characters with specific geometric interpretations to define the L-system rules:

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

To use L-System Studio, simply clone the repository and follow the instructions in the README file to set up the development environment. Once you have the application running, you can start experimenting with different L-system rules and parameters to create your own unique fractals.

## Further Reading

For more information on L-Systems and a collection of examples, please visit the following resource:

- [Paul Bourke's L-System Fractals](http://paulbourke.net/fractals/lsys/)

This resource provides extensive information about L-Systems, along with numerous examples and visualizations to help you better understand their capabilities and potential applications.

## Contributions 

Contributions to L-System Studio are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes. If you have any questions or need assistance, feel free to open an issue or contact the project maintainer.


## Future enchancements include: 

1. Saving and loading L-system presets
3. Drawing process animation
4. User-guided tutorials or examples
5. Error handling and input validation
6. Tooltips and help text
7. Code optimization for performance

## License

This project is licensed under the [MIT] License - see the [LICENSE](LICENSE) file for details.

