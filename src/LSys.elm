module LSys exposing (generateSequence, generateTurtle)

import Array exposing (Array)
import List.Extra as Extra
import Model exposing (Model)
import SymbolAssignments exposing (Symbol)
import Turtle exposing (..)


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
        (\_ seq ->
            Array.map expandSymbol seq
                |> Array.toList
                |> List.map Array.toList
                |> List.concat
                |> Array.fromList
        )
        (String.toList axiom |> Array.fromList)
        (List.range 1 (round iterations))


generateTurtle :
    { state : Model
    , sequence : Array Char
    , symbolAssignments : List Symbol
    , stepSize : Float
    , angle : Float
    }
    -> Turtle
generateTurtle cfg =
    let
        applyAction turtle action =
            case action of
                Move ->
                    moveForward cfg.stepSize turtle

                MoveWithoutDrawing ->
                    let
                        ( newX, newY ) =
                            calculateNewPosition cfg.stepSize turtle.angle ( turtle.x, turtle.y )
                    in
                    { turtle | x = newX, y = newY }

                TurnLeft ->
                    if turtle.swapPlusMinus then
                        turn cfg.angle turtle

                    else
                        turn -cfg.angle turtle

                TurnRight ->
                    if turtle.swapPlusMinus then
                        turn -cfg.angle turtle

                    else
                        turn cfg.angle turtle

                ReverseDirection ->
                    turn -180 turtle

                Push ->
                    push turtle

                Pop ->
                    pop turtle

                IncrementLineWidth ->
                    { turtle | lineWidth = turtle.lineWidth + cfg.state.lineWidthIncrement }

                DecrementLineWidth ->
                    { turtle | lineWidth = turtle.lineWidth - cfg.state.lineWidthIncrement }

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
                    { turtle
                        | polygons =
                            currentPolygon :: updatedPolygons
                        , filledPolygons =
                            ( currentPolygon, cfg.state.polygonFillColor ) :: turtle.filledPolygons
                    }

                MultiplyLength ->
                    let
                        newStepSize =
                            cfg.state.lineLength * cfg.state.lineLengthScale
                    in
                    moveForward newStepSize turtle

                DivideLength ->
                    let
                        newStepSize =
                            cfg.state.lineLength / cfg.state.lineLengthScale
                    in
                    moveForward newStepSize turtle

                SwapPlusMinus ->
                    { turtle | swapPlusMinus = not turtle.swapPlusMinus }

                IncrementTurningAngle ->
                    { turtle | angle = turtle.angle + cfg.state.turningAngleIncrement }

                DecrementTurningAngle ->
                    { turtle | angle = turtle.angle - cfg.state.turningAngleIncrement }

                NoAction ->
                    turtle

        applySymbol symbol turtle =
            case List.filter (\s -> s.character == String.fromChar symbol) cfg.symbolAssignments of
                [] ->
                    turtle

                symbolAssignment :: _ ->
                    applyAction turtle symbolAssignment.action
    in
    Array.foldl applySymbol
        (Turtle.initTurtle cfg.state.startingPoint |> Turtle.turn cfg.state.startingAngle)
        cfg.sequence


calculateNewPosition : Float -> Float -> ( Float, Float ) -> ( Float, Float )
calculateNewPosition stepSize angle ( x, y ) =
    let
        deltaX =
            stepSize * cos (degreesToRadians angle)

        deltaY =
            stepSize * sin (degreesToRadians angle)
    in
    ( x + deltaX, y + deltaY )
