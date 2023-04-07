module View exposing (..)

import Color
import ColorPicker
import Html exposing (Html, button, div, h2, input, option, p, section, select, span, text)
import Html.Attributes exposing (placeholder, step, type_, value)
import Html.Events exposing (onClick, onInput)
import LSys exposing (generateTurtle)
import Model exposing (Model, Symbol)
import Turtle exposing (Action(..))
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Types exposing (Length(..), Paint(..))
import Update exposing (..)


startingPointInput : ( Float, Float ) -> Html Msg
startingPointInput ( x, y ) =
    Html.div [ class [ "startingPointInput" ] ]
        [ Html.label [ class [ "label" ] ] [ text "X: " ]
        , Html.input [ class [ "inputStartingPoint" ], placeholder "X", value (String.fromFloat x), onInput UpdateStartingPointX ] []
        , Html.label [ class [ "label" ] ] [ text "Y: " ]
        , Html.input [ class [ "inputStartingPoint" ], placeholder "Y", value (String.fromFloat y), onInput UpdateStartingPointY ] []
        ]


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to


view : Model -> Html Msg
view model =
    div [ class [ "flexContainer" ] ]
        [ button [ class [ "toggleSidebar" ], onClick ToggleSidebar ] [ text "≡" ]
        , if model.showSidebar then
            div [ class [ "sidebar" ] ]
                [ div [ class [ "sidebarContent" ] ]
                    [ section [ class [ "infoSection" ] ]
                        [ h2 [] [ text "Info" ]
                        , p []
                            [ Html.a [ href "http://paulbourke.net/fractals/lsys/" ] [ text "For more information and examples, please visit Paul Bourke's L-System page" ] ]
                        , button [ class [ "buttonSyntax" ], onClick ToggleSyntaxDisplay ] [ text "Syntax" ]
                        , syntaxDisplayView model
                        ]
                    , section []
                        [ h2 [] [ text "Rules and Axiom" ]
                        , div [ class [ "grid" ] ]
                            [ div [] [ text "Rules:" ]
                            , div []
                                [ text <| String.join ", " <| List.map showRule model.rules
                                ]
                            , select [ class [ "dropdown" ], onInput SelectSymbol ] (List.map symbolOptionView model.symbolAssignments)
                            , input [ class [ "input" ], type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ] []
                            , div [] []
                            , button [ class [ "button" ], onClick AddRule ] [ text "Add Rule" ]
                            , div [] [ text "Axiom:" ]
                            , div []
                                [ text
                                    (if model.axiomApplied then
                                        model.axiom

                                     else
                                        ""
                                    )
                                ]
                            , div [] []
                            , input [ class [ "input" ], type_ "text", onInput SelectAxiom ] []
                            , div [] []
                            , button [ class [ "button" ], onClick ApplyAxiom ] [ text "Apply Axiom" ]
                            ]
                        ]
                    , section [ class [ "turtleSettingsSection", "turtleGrid" ] ]
                        [ h2 [] [ text "Turtle Settings" ]
                        , Html.label [ class [ "label" ] ] [ text "Turning angle " ]
                        , input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.turningAngle) ] []
                        , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.turningAngle ++ "°") ]
                        , Html.label [ class [ "label" ] ] [ text "Turning angle increment " ]
                        , input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateTurningAngleIncrement), value (String.fromFloat model.turningAngleIncrement) ] []
                        , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.turningAngleIncrement ++ "°") ]
                        , Html.label [ class [ "label" ] ] [ text "Line length " ]
                        , input [ class [ "slider" ], type_ "range", Html.Attributes.min "1", Html.Attributes.max "25", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLength), value (String.fromFloat model.lineLength) ] []
                        , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineLength) ]
                        , Html.label [ class [ "label" ] ] [ text "Line length scale" ]
                        , input [ class [ "slider" ], type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLengthScale), value (String.fromFloat model.lineLengthScale) ] []
                        , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineLengthScale) ]
                        , Html.label [ class [ "label" ] ] [ text "Line width increment" ]
                        , input [ class [ "slider" ], type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3.0", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineWidthIncrement), value (String.fromFloat model.lineWidthIncrement) ] []
                        , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineWidthIncrement) ]
                        , Html.label [ class [ "label" ] ] [ text "Recursion depth " ]
                        , input [ class [ "slider" ], type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
                        , span [ class [ "sliderValueText" ] ] [ text (String.fromInt model.iterations) ]
                        , Html.label [ class [ "label" ] ] [ text "Starting Angle " ]
                        , input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateStartingAngle), value (String.fromFloat model.startingAngle) ] []
                        , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.startingAngle ++ "°") ]
                        , Html.label [ class [ "label" ] ] [ text "Starting point " ]
                        , startingPointInput model.startingPoint
                        ]
                    , section [ class [ "drawSection" ] ]
                        [ button [ class [ "buttonDraw" ], onClick DrawTurtle ] [ text "Draw" ]
                        ]
                    , section [ class [ "attributionSection" ] ]
                        [ h2 [] [ text "Attribution" ]
                        , Html.a [ href "https://github.com/hunorg" ] [ text "created by @hunorg" ]
                        , Html.a [ href "https://github.com/hunorg/L-System-Studio" ] [ text "source code" ]
                        ]
                    ]
                ]

          else
            text ""
        , div [ class [ "canvas" ], (if model.showSidebar then Html.Attributes.style "padding-left" "0rem" else Html.Attributes.style "padding-left" "1rem") ]
            [ div [ class [ "canvasContent" ]]
                [ svg
                    [ viewBox 0 0 model.canvasWidth model.canvasHeight
                    ]
                  <|
                    let
                        generatedTurtle =
                            generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle
                    in
                    if model.drawnTurtle then
                        (Turtle.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle)
                            ++ (Turtle.renderTurtleDots <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle)
                            ++ [ Turtle.drawFilledPolygons generatedTurtle.filledPolygons ]
                        -- Add filled polygons

                    else
                        []
                ]
            ]
        ]



{- polyigon fill colour label + widget

   , div [ Html.Attributes.style "margin-top" "40px" ]
                       [ Html.label [ class [ "labelPolygonFillColour" ] ] [ text "Polygon fill colour" ]
                       , colorPickerView model.polygonFillColor model.colorPicker
                       ]

-}


symbolOptionView : Symbol -> Html msg
symbolOptionView symbol =
    option [ value symbol.character ] [ text symbol.character ]


colorPickerView : Color.Color -> ColorPicker.State -> Html Msg
colorPickerView color state =
    ColorPicker.view color state
        |> Html.map ColorPickerMsg


syntaxDisplayView : Model -> Html Msg
syntaxDisplayView model =
    if model.syntaxDisplay then
        div []
            [ h2 [] [ text "Syntax" ]
            , Html.ul []
                [ Html.li [] [ text "F -> Move forward by line length drawing a line" ]
                , Html.li [] [ text "G -> Move forward by line length drawing a line" ]
                , Html.li [] [ text "f -> Move forward by line length without drawing a line" ]
                , Html.li []
                    [ text "+ -> Turn left by turning angle"
                    , Html.li [] [ text "- -> Turn right by turning angle" ]
                    , Html.li [] [ text "| -> Reverse direction (ie: turn by 180 degrees)" ]
                    , Html.li [] [ text "[ -> Push current drawing state onto stack" ]
                    , Html.li [] [ text "] -> Pop current drawing state from the stack" ]
                    , Html.li [] [ text "# -> Increment the line width by line width increment" ]
                    , Html.li [] [ text "! -> Decrement the line width by line width increment" ]
                    , Html.li [] [ text "@ -> Draw a dot with line width radius" ]
                    , Html.li [] [ text "{ -> Open a polygon" ]
                    , Html.li [] [ text "} -> Close a polygon and fill it with fill colour" ]
                    , Html.li [] [ text "< -> Multiply the line length by the line length scale" ]
                    , Html.li [] [ text "> -> Divide the line length by the line length scale" ]
                    , Html.li [] [ text "& -> Swap the meaning of + and -" ]
                    , Html.li [] [ text "( -> Decrement turning angle by turning angle increment" ]
                    , Html.li [] [ text ") -> Increment turning angle by turning angle increment" ]
                    , Html.li [] [ text "a to z (except f) -> No action" ]
                    ]
                ]
            ]

    else
        text ""
