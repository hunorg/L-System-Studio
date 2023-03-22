module LSys exposing (generateSequence, generateTurtle)

import Model exposing (Model, Symbol)
import Turtle exposing (..)



-- Generates an L-system sequence based on the given iterations, axiom, and rules.


generateSequence : Int -> String -> List ( Char, List Char ) -> List Char
generateSequence iterations axiom rules =
    let
        expandSymbol symbol =
            case List.filter (\( s, _ ) -> s == symbol) rules of
                [] ->
                    [ symbol ]

                ( _, replacement ) :: _ ->
                    replacement
    in
    List.foldl (\_ seq -> List.concatMap expandSymbol seq) (String.toList axiom) (List.range 1 iterations)



-- Generates a turtle graphics object based on the given model, sequence, symbolAssignments, stepSize, and angle.


generateTurtle : Model -> List Char -> List Symbol -> Float -> Float -> Turtle
generateTurtle model sequence symbolAssignments stepSize angle =
    let
        applyAction turtle action =
            case action of
                Move ->
                    moveForward stepSize turtle

                MoveWithoutDrawing ->
                    let
                        ( newX, newY ) =
                            calculateNewPosition stepSize turtle.angle ( turtle.x, turtle.y )
                    in
                    { turtle | x = newX, y = newY }


                TurnLeft ->
                    turn -angle turtle

                TurnRight ->
                    turn angle turtle

                ReverseDirection ->
                    turn -180 turtle

                Push ->
                    push turtle

                Pop ->
                    pop turtle

                IncrementLineWidth ->
                    { turtle | lineWidth = turtle.lineWidth + model.lineWidthIncrement }

                DecrementLineWidth -> 
                    { turtle | lineWidth = turtle.lineWidth - model.lineWidthIncrement }

                DrawDot ->
                    { turtle | dots = ( ( turtle.x, turtle.y ), turtle.lineWidth ) :: turtle.dots }


                NoAction ->
                    turtle

        applySymbol symbol turtle =
            case List.filter (\s -> s.character == String.fromChar symbol) symbolAssignments of
                [] ->
                    turtle

                symbolAssignment :: _ ->
                    applyAction turtle symbolAssignment.action
    in
    List.foldl applySymbol (Turtle.initTurtle model.startingPoint |> Turtle.turn model.startingAngle) sequence


calculateNewPosition : Float -> Float -> ( Float, Float ) -> ( Float, Float )
calculateNewPosition stepSize angle ( x, y ) =
    let
        deltaX =
            stepSize * cos (degreesToRadians angle)

        deltaY =
            stepSize * sin (degreesToRadians angle)
    in
    ( x + deltaX, y + deltaY )

