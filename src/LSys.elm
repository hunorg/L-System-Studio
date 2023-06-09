module LSys exposing (generateSequence, generateTurtle)

import Array exposing (Array)
import List.Extra as Extra
import Model exposing (Model, Symbol)
import Turtle exposing (..)



-- Generates an L-system sequence based on the given iterations, axiom, and rules.


generateSequence : Float -> String -> List ( Char, List Char ) -> Array Char
generateSequence iterations axiom rules =
    let
        expandSymbol symbol =
            case Extra.find (\( s, _ ) -> s == symbol) rules of
                Just ( _, replacement ) ->
                    Array.fromList replacement

                Nothing ->
                    Array.fromList [ symbol ]
    in
    List.foldl
        (\_ seq -> Array.map expandSymbol seq |> Array.toList |> List.map Array.toList |> List.concat |> Array.fromList)
        (String.toList axiom |> Array.fromList)
        (List.range 1 (round iterations))



-- Generates a turtle graphics object based on the given model, sequence, symbolAssignments, stepSize, and angle.


generateTurtle : Model -> Array Char -> List Symbol -> Float -> Float -> Turtle
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
                    if turtle.swapPlusMinus then
                        turn angle turtle

                    else
                        turn -angle turtle

                TurnRight ->
                    if turtle.swapPlusMinus then
                        turn -angle turtle

                    else
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

                OpenPolygon ->
                    { turtle | polygons = [] :: turtle.polygons }

                ClosePolygon ->
                    let
                        currentPolygon =
                            List.head turtle.polygons |> Maybe.withDefault []

                        updatedPolygons =
                            List.drop 1 turtle.polygons
                    in
                    { turtle | polygons = currentPolygon :: updatedPolygons, filledPolygons = ( currentPolygon, model.polygonFillColor ) :: turtle.filledPolygons }

                MultiplyLength ->
                    let
                        newStepSize =
                            model.lineLength * model.lineLengthScale
                    in
                    moveForward newStepSize turtle

                DivideLength ->
                    let
                        newStepSize =
                            model.lineLength / model.lineLengthScale
                    in
                    moveForward newStepSize turtle

                SwapPlusMinus ->
                    { turtle | swapPlusMinus = not turtle.swapPlusMinus }

                IncrementTurningAngle ->
                    { turtle | angle = turtle.angle + model.turningAngleIncrement }

                DecrementTurningAngle ->
                    { turtle | angle = turtle.angle - model.turningAngleIncrement }

                NoAction ->
                    turtle

        applySymbol symbol turtle =
            case List.filter (\s -> s.character == String.fromChar symbol) symbolAssignments of
                [] ->
                    turtle

                symbolAssignment :: _ ->
                    applyAction turtle symbolAssignment.action
    in
    Array.foldl applySymbol (Turtle.initTurtle model.startingPoint |> Turtle.turn model.startingAngle) sequence


calculateNewPosition : Float -> Float -> ( Float, Float ) -> ( Float, Float )
calculateNewPosition stepSize angle ( x, y ) =
    let
        deltaX =
            stepSize * cos (degreesToRadians angle)

        deltaY =
            stepSize * sin (degreesToRadians angle)
    in
    ( x + deltaX, y + deltaY )
