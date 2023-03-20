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

                TurnLeft ->
                    turn -angle turtle

                TurnRight ->
                    turn angle turtle

                Push ->
                    push turtle

                Pop ->
                    pop turtle

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
