module View exposing (..)

import Array
import Color exposing (black)
import ColorPicker
import Element exposing (Element, fill, padding, px, spacing)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events exposing (onMouseDown)
import Element.Input as Input
import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Events.Extra.Mouse as Mouse
import Html.Extra exposing (viewIf)
import LSys exposing (generateTurtle)
import Model exposing (Model)
import Sidebar exposing (sidebar)
import Styles exposing (btnAttrs, midGray)
import Turtle exposing (Action(..))
import TypedSvg exposing (..)
import TypedSvg.Attributes
import TypedSvg.Types exposing (Length(..), Paint(..))
import Update exposing (..)


view : Model -> Html Msg
view state =
    let
        canvas : Element Msg
        canvas =
            Element.el
                [ Element.width fill
                , Element.height (px (state.windowHeight - 20))
                , Background.color Styles.black
                , Border.rounded 5

                --   , Element.padding 10
                , Border.width 2
                , Border.color midGray
                , Element.pointer
                ]
            <|
                Element.html <|
                    svg
                        [ TypedSvg.Attributes.viewBox
                            0
                            0
                            state.canvasWidth
                            (Basics.toFloat (state.windowHeight - 20))
                        , Mouse.onDown
                            (\event -> UpdateStartingPoint event.button event.offsetPos)
                        ]
                    <|
                        let
                            progress : Float
                            progress =
                                Basics.min state.renderingProgress
                                    (toFloat (Array.length state.generatedSequence))

                            progressSequence : Array.Array Char
                            progressSequence =
                                Array.slice 0 (round progress) state.generatedSequence

                            turtle : Turtle.Turtle
                            turtle =
                                generateTurtle
                                    { state = state
                                    , sequence = progressSequence
                                    , symbolAssignments = state.symbolAssignments
                                    , stepSize = state.lineLength
                                    , angle = state.turningAngle
                                    }
                        in
                        Turtle.renderTurtleSegments
                            { progress = progress
                            , turtle = turtle
                            }
                            ++ [ Turtle.drawFilledPolygons progress turtle.filledPolygons ]
                            ++ Turtle.renderTurtleDots progress turtle
    in
    Element.layout
        [ Element.height (px state.windowHeight)
        , Element.clipY
        , padding 10
        ]
    <|
        Element.row
            [ Element.width fill
            , spacing 10
            ]
            [ sidebar state
            , canvas
            ]



{- polyigon fill colour label + widget

   , div [ Html.Attributes.style "margin-top" "40px" ]
                       [ Html.label [ class [ "labelPolygonFillColour" ] ] [ text "Polygon fill colour" ]
                       , colorPickerView model.polygonFillColor model.colorPicker
                       ]

-}
{-

   , viewIf state.loadingIconVisible <|
       icon
           { name = "hourglass_empty"
           , onTap = NoOp
           , classes = "absolute right-2 top-2 text-white"
           }
-}


colorPickerView : Color.Color -> ColorPicker.State -> Html Msg
colorPickerView color state =
    ColorPicker.view color state
        |> Html.map ColorPickerMsg



-- helpers


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to
