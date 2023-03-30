module View exposing (..)

import Color
import ColorPicker
import Html exposing (Html, button, div, h2, input, option, select, span, text)
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
    Html.div [Html.Attributes.style "margin-top" "10px"]
        [ Html.label [ class [ "labelXY" ] ] [ text "X: " ]
        , Html.input [ class [ "inputStartingPoint" ], placeholder "X", value (String.fromFloat x), onInput UpdateStartingPointX ] []
        , Html.label [ class [ "labelXY" ] ] [ text "Y: " ]
        , Html.input [ class [ "inputStartingPoint" ], placeholder "Y", value (String.fromFloat y), onInput UpdateStartingPointY ] []
        ]


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to


view : Model -> Html Msg
view model =
    div [ class [ "main-container" ] ]
        [ div [ class [ "leftPanel" ] ]
            [ div [ class [ "section" ] ]
                [ h2 [ Html.Attributes.style "margin-top" "-25px" ] [ text "Info" ]
                , Html.a [ href "http://paulbourke.net/fractals/lsys/" ] [ text "For more information and examples, please visit Paul Bourke's L-System page" ]
                , div [ Html.Attributes.style "margin-left" "-28px", Html.Attributes.style "margin-top" "20px" ]
                    [ button [ class [ "buttonSyntax" ], onClick ToggleSyntaxDisplay, Html.Attributes.style "margin-top" "25px" ] [ text "Syntax" ]
                    ]
                , div [ class [ "section" ] ]
                    [ syntaxDisplayView model ]
                , div [ Html.Attributes.style "margin-top" "20px", Html.Attributes.style "margin-left" "-35px" ]
                    [ h2 [ Html.Attributes.style "margin-top" "-15px" ] [ text "Rules and Axiom" ]
                    , select [ class [ "dropdown" ], onInput SelectSymbol ] (List.map symbolOptionView model.symbolAssignments)
                    , input [ class [ "input" ], type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ] []
                    , div [ Html.Attributes.style "margin-left" "286px", Html.Attributes.style "margin-top" "-60px" ]
                        [ button [ class [ "button" ], onClick AddRule ] [ text "Add Rule" ]
                        ]
                    ]
                , div [ Html.Attributes.style "margin-top" "10px" ]
                    [ text "Rules: "
                    , text <| String.join ", " <| List.map showRule model.rules
                    ]
                , div [ Html.Attributes.style "margin-left" "50px" ]
                    [ input [ class [ "input" ], type_ "text", onInput SelectAxiom ] []
                    , button [ class [ "button" ], onClick ApplyAxiom ] [ text "Apply Axiom" ]
                    , div [ Html.Attributes.style "margin-left" "-48px" ]
                        [ text ("Axiom: " ++ model.axiom) ]
                    ]
                ]
            , div [ class [ "section" ] ]
                [ h2 [ Html.Attributes.style "margin-top" "-15px" ] [ text "Turtle Settings" ]
                , Html.label [ class [ "labelTurningAngle" ] ] [ text "Turning angle " ]
                , div [ Html.Attributes.style "margin-left" "235px", Html.Attributes.style "margin-top" "-40px" ]
                    [ input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.turningAngle) ] []
                    , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.turningAngle ++ "°") ]
                    ]
                , Html.label [ class [ "labelTurningAngleIncrement" ] ] [ text "Turning angle increment " ]
                , div [ Html.Attributes.style "margin-left" "235px", Html.Attributes.style "margin-top" "-30px" ]
                    [ input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateTurningAngleIncrement), value (String.fromFloat model.turningAngleIncrement) ] []
                    , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.turningAngleIncrement ++ "°") ]
                    ]
                , Html.label [ class [ "label" ] ] [ text "Line length " ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ class [ "slider" ], type_ "range", Html.Attributes.min "1", Html.Attributes.max "25", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLength), value (String.fromFloat model.lineLength) ] []
                    , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineLength) ]
                    ]
                , Html.label [ class [ "label" ] ] [ text "Line length scale" ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ class [ "slider" ], type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLengthScale), value (String.fromFloat model.lineLengthScale) ] []
                    , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineLengthScale) ]
                    ]
                , Html.label [ class [ "label" ] ] [ text "Line width increment" ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ class [ "slider" ], type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3.0", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineWidthIncrement), value (String.fromFloat model.lineWidthIncrement) ] []
                    , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineWidthIncrement) ]
                    ]
                , Html.label [ class [ "label" ] ] [ text "Recursion depth " ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ class [ "slider" ], type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
                    , span [ class [ "sliderValueText" ] ] [ text (String.fromInt model.iterations) ]
                    ]
                , Html.label [ class [ "labelStartingAngle" ], Html.Attributes.style "margin-top" "35px" ] [ text "Starting Angle " ]
                , div [ Html.Attributes.style "margin-left" "235px", Html.Attributes.style "margin-top" "-20px" ]
                    [ input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateStartingAngle), value (String.fromFloat model.startingAngle) ] []
                    , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.startingAngle ++ "°") ]
                    ]
                , Html.label [ class [ "labelStartingPoint" ], Html.Attributes.style "margin-top" "35px" ] [ text "Starting point " ]
                , startingPointInput model.startingPoint
                ]
            , div [ class [ "section" ] ]
                [ div [ Html.Attributes.style "margin-left" "135px", Html.Attributes.style "margin-top" "-25px" ]
                    [ button [ class [ "buttonDraw" ], onClick DrawTurtle ] [ text "Draw" ] ]
                ]
            , div [ class [ "section" ] ]
                [ h2 [ Html.Attributes.style "margin-top" "-15px" ] [ text "Attribution" ]
                , Html.a [ href "https://github.com/hunorg" ] [ text "created by @hunorg" ]
                , div []
                    [ Html.a [ href "https://github.com/hunorg/L-System-Studio" ] [ text "source code" ] ]
                ]
            ]
        , div [ Html.Attributes.style "margin-left" "550px", Html.Attributes.style "margin-top" "20px" ]
            [ div [ class [ "svg-wrapper" ] ]
                -- Added wrapper div
                [ svg
                    [ viewBox 0 0 1000 1000
                    , Html.Attributes.style "width" "80%"
                    , Html.Attributes.style "height" "80%"
                    , Html.Attributes.style "margin" "1rem"
                    ]
                  <|
                    let
                        generatedTurtle =
                            generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle
                    in
                    baseRect
                        ++ (if model.drawnTurtle then
                                (Turtle.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle)
                                    ++ (Turtle.renderTurtleDots <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle)
                                    ++ [ Turtle.drawFilledPolygons generatedTurtle.filledPolygons ]
                                -- Add filled polygons

                            else
                                []
                           )
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


baseRect =
    [ rect
        [ x (Px 0)
        , y (Px 0)
        , width (Px 1000)
        , height (Px 1000)
        , fill (Paint Color.black)
        , stroke (Paint (Color.rgb255 235 81 96))
        , strokeWidth (Px 6)
        ]
        []
    ]


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
