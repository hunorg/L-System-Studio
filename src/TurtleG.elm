module TurtleG exposing (..)


import TypedSvg.Core exposing (Svg)
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Types exposing (Cursor(..), FillRule(..), Length(..), Paint(..), px)
import Color


type alias Turtle = 
    { x : Float 
    , y : Float 
    , angle : Float
    , stack : List ((Float, Float), Float) 
    , segments : List ((Float, Float), (Float, Float))
    } 

type Action
    = Move
    | Turn
    | Push
    | Pop

initTurtle : (Float, Float) -> Turtle 
initTurtle pos =
    { x = Tuple.first pos
    , y = Tuple.second pos
    , stack = []
    , angle = 0
    , segments = []
    }

degreesToRadians : Float -> Float
degreesToRadians degrees =
    degrees * pi / 180

moveForward : Float -> Turtle -> Turtle
moveForward distance turtle =
    let
        dx = distance * cos (degreesToRadians turtle.angle)
        dy = distance * sin (degreesToRadians turtle.angle)
        newX = turtle.x + dx
        newY = turtle.y - dy  -- Subtract dy because SVG coordinate system has the y-axis inverted
    in
    { turtle | x = newX, y = newY, segments = ((turtle.x, turtle.y), (newX, newY)) :: turtle.segments }


turn : Float -> Turtle -> Turtle
turn degrees turtle =
    let
        newAngle = turtle.angle + degrees
        boundedAngle = modBy 360 (round newAngle)
    in
    { turtle | angle = toFloat boundedAngle }

push : Turtle -> Turtle
push turtle =
    { turtle | stack = ((turtle.x, turtle.y), turtle.angle) :: turtle.stack }

pop : Turtle -> Turtle
pop turtle =
    case turtle.stack of
        [] ->
            turtle

        ((x, y), angle) :: rest ->
            { turtle | x = x, y = y, angle = angle, stack = rest }





renderTurtleSegments : Turtle -> List (Svg msg)
renderTurtleSegments turtle =
    List.map
        (\((x1, y1), (x2, y2)) ->
            line
                [ TypedSvg.Attributes.x1 (px x1)
                , TypedSvg.Attributes.y1 (px y1)
                , TypedSvg.Attributes.x2 (px x2)
                , TypedSvg.Attributes.y2 (px y2)
                , stroke <| Paint Color.black
                , strokeWidth (Px 1)
                ]
                []
        )
        turtle.segments
