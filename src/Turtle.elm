module Turtle exposing (..)

import Color
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Cursor(..), FillRule(..), Length(..), Paint(..), px)




type alias Turtle =
    { x : Float
    , y : Float
    , angle : Float
    , stack : List ( ( Float, Float ), Float )
    , segments : List ( ( Float, Float ), ( Float, Float ) )
    , dots : List ( ( Float, Float ), Float )
    , polygons : List (List (Float, Float))
    , filledPolygons : List (List (Float, Float), Color.Color)
    , fillColor : Color.Color
    , lineWidth : Float
    , swapPlusMinus : Bool
    }



-- Represents the actions a turtle graphics object can perform based on L-system symbols.


type Action
    = Move
    | MoveWithoutDrawing
    | TurnLeft
    | TurnRight
    | ReverseDirection
    | Push
    | Pop
    | IncrementLineWidth 
    | DecrementLineWidth
    | DrawDot
    | OpenPolygon
    | ClosePolygon
    | MultiplyLength
    | DivideLength
    | SwapPlusMinus
    | IncrementTurningAngle
    | DecrementTurningAngle
    | NoAction


initTurtle : ( Float, Float ) -> Turtle
initTurtle pos =
    { x = Tuple.first pos
    , y = Tuple.second pos
    , stack = []
    , angle = 0
    , segments = []
    , dots = []
    , polygons = []
    , filledPolygons = []
    , fillColor = Color.black
    , lineWidth = 1
    , swapPlusMinus = False
    }


degreesToRadians : Float -> Float
degreesToRadians degrees =
    degrees * pi / 180


moveForward : Float -> Turtle -> Turtle
moveForward stepSize turtle =
    let
        ( newX, newY ) =
            calculateNewPosition stepSize turtle.angle ( turtle.x, turtle.y )

        currentPolygon = List.head turtle.polygons |> Maybe.withDefault []
        updatedPolygons = ( ( newX, newY ) :: currentPolygon ) :: List.drop 1 turtle.polygons
    in
    { turtle
        | x = newX
        , y = newY
        , segments = ( ( turtle.x, turtle.y ), ( newX, newY ) ) :: turtle.segments
        , polygons = updatedPolygons
    }



turn : Float -> Turtle -> Turtle
turn degrees turtle =
    let
        newAngle =
            turtle.angle + degrees

        boundedAngle =
            modBy 360 (round newAngle)
    in
    { turtle | angle = toFloat boundedAngle }


push : Turtle -> Turtle
push turtle =
    { turtle | stack = ( ( turtle.x, turtle.y ), turtle.angle ) :: turtle.stack }


pop : Turtle -> Turtle
pop turtle =
    case turtle.stack of
        [] ->
            turtle

        ( ( x, y ), angle ) :: rest ->
            { turtle | x = x, y = y, angle = angle, stack = rest }


renderTurtleSegments : Turtle -> List (Svg msg)
renderTurtleSegments turtle =
    List.map
        (\( ( x1, y1 ), ( x2, y2 ) ) ->
            line
                [ TypedSvg.Attributes.x1 (px x1)
                , TypedSvg.Attributes.y1 (px y1)
                , TypedSvg.Attributes.x2 (px x2)
                , TypedSvg.Attributes.y2 (px y2)
                , stroke <| Paint Color.white
                , strokeWidth (Px turtle.lineWidth)
                ]
                []
        )
        turtle.segments

renderTurtleDots : Turtle -> List (Svg msg)
renderTurtleDots turtle =
    List.map
        (\( ( x, y ), radius ) ->
            circle
                [ TypedSvg.Attributes.cx (px x)
                , TypedSvg.Attributes.cy (px y)
                , TypedSvg.Attributes.r (px radius)
                , fill <| Paint Color.white
                ]
                []
        )
        turtle.dots

drawFilledPolygons : List (List (Float, Float), Color.Color) -> Svg msg
drawFilledPolygons filledPolygons =
    TypedSvg.g []
        (List.map
            (\(polygon, fillColor) ->
                TypedSvg.polygon
                    [ points (List.map (\(x, y) -> (x, y)) polygon)
                    , TypedSvg.Attributes.style ("fill:" ++ Color.toCssString fillColor)
                    ]
                    []
            )
            filledPolygons
        )


calculateNewPosition : Float -> Float -> ( Float, Float ) -> ( Float, Float )
calculateNewPosition stepSize angle ( x, y ) =
    let
        deltaX =
            stepSize * cos (degreesToRadians angle)

        deltaY =
            stepSize * sin (degreesToRadians angle)
    in
    ( x + deltaX, y + deltaY )



