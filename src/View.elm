module View exposing (..)

import Array
import Color
import ColorPicker
import Html exposing (Html, button, div, h1, h2, h3, i, img, input, li, option, p, section, select, span, text, ul)
import Html.Attributes exposing (classList, src, step, type_, value)
import Html.Events exposing (onClick, onInput)
import Html.Events.Extra.Mouse as Mouse
import Html.Extra exposing (nothing, viewIf)
import LSys exposing (generateTurtle)
import Model exposing (Model, Symbol)
import Turtle exposing (Action(..))
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Types exposing (Length(..), Paint(..))
import Update exposing (..)


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to


icon name msg =
    i
        [ class [ "material-icons" ]
        , Html.Attributes.style "cursor" "pointer"
        , onClick msg
        , Html.Attributes.style "font-size" "46px"
        ]
        [ text name ]


iconMenu model =
    span
        [ class [ "toggleSidebar", "material-icons" ]
        , Html.Attributes.style "cursor" "pointer"
        , onClick ToggleSidebar
        , Html.Attributes.style "font-size" "46px"
        , Html.Attributes.style "background-color" "#eb5160"
        , Html.Attributes.style "color" "#ffffff"
        , Html.Attributes.style "border-radius" "8px"
        , Html.Attributes.style "margin-left" "0.5rem"
        , Html.Attributes.style "margin-top" "0.5rem"
        , Html.Attributes.style "z-index" "10"
        , if model.showSidebar then
            Html.Attributes.style "border" "2px solid #ffffff"

          else
            Html.Attributes.style "border" "none"
        ]
        [ text
            (if model.showSidebar then
                "menu_open"

             else
                "menu"
            )
        ]


loadingIcon : Html msg
loadingIcon =
    span
        [ class [ "loadingIcon", "material-icons" ]
        , Html.Attributes.style "font-size" "46px"
        , Html.Attributes.style "color" "#eb5160"
        , Html.Attributes.style "border-radius" "8px"
        , Html.Attributes.style "right" "0"
        , Html.Attributes.style "margin-top" "0.5rem"
        , Html.Attributes.style "margin-right" "1rem"
        , Html.Attributes.style "z-index" "10"
        ]
        [ text "hourglass_empty" ]


sidebar : Model -> Html Msg
sidebar model =
    viewIf model.showSidebar <|
        div [ class [ "sidebar" ] ]
            [ div [ class [ "sidebarContent" ] ]
                [ section []
                    [ h1
                        [ Html.Attributes.style "margin-top" "4.5rem"
                        , Html.Attributes.style "font-size" "2.0rem"
                        , Html.Attributes.style "font-weight" "bold"
                        , Html.Attributes.style "text-align" "center"
                        ]
                        [ text "L-System Studio" ]
                    ]
                , section [ class [ "infoSection" ] ]
                    [ h2 [] [ text "Info:" ]
                    , p [ Html.Attributes.style "width" "100%" ]
                        [ Html.a [ href "http://paulbourke.net/fractals/lsys/", Html.Attributes.style "font-size" "1.2rem" ] [ text "For more information and examples, please visit Paul Bourke's L-System page" ] ]
                    ]
                , section []
                    [ div [ class [ "gridIcons" ] ]
                        [ icon "code" ToggleSyntaxDisplay
                        , icon "casino" GetRandomPreset
                        , icon "refresh" Reset
                        ]
                    , syntaxDisplayView model
                    ]
                , section [ class [ "rulesText" ] ]
                    [ h2 [] [ text "Rules:" ]
                    , div [ Html.Attributes.style "cursor" "pointer" ]
                        [ ul []
                            (List.map
                                (\rule ->
                                    li [ class [ "rule" ] ]
                                        [ ruleView rule model
                                        ]
                                )
                                model.rules
                            )
                        ]
                    , div [ class [ "grid2" ] ]
                        [ select [ class [ "dropdown" ], onInput SelectSymbol ] (List.map symbolOptionView model.symbolAssignments)
                        , input [ class [ "input" ], type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ] []
                        ]
                    , div []
                        [ button [ class [ "button" ], onClick AddRule ] [ text "Add Rule" ]
                        ]
                    ]
                , section []
                    [ div []
                        [ h2 []
                            [ text "Axiom:" ]
                        , h3 []
                            [ text
                                (if model.axiomApplied then
                                    model.axiom

                                 else
                                    ""
                                )
                            ]
                        ]
                    , div [ class [ "grid" ] ]
                        [ input [ class [ "input2" ], type_ "text", onInput SelectAxiom ] []
                        , button [ class [ "button" ], onClick ApplyAxiom ] [ text "Apply Axiom" ]
                        ]
                    ]
                , section []
                    [ h2 [] [ text "Turtle Settings:" ]
                    , div [ class [ "grid3" ] ]
                        (inputAngle "Turning angle" model.turningAngle UpdateAngle
                            ++ inputAngle "Turning angle increment" model.turningAngleIncrement UpdateTurningAngleIncrement
                            ++ inputRange "Line length" "1" "25" "1" UpdateLineLength model.lineLength
                            ++ inputRange " Line length scale" "0.0" "3" "0.1" UpdateLineLengthScale model.lineLengthScale
                            ++ inputRange "Line width increment" "0.0" "3.0" "0.1" UpdateLineWidthIncrement model.lineWidthIncrement
                            ++ inputRange "Recursion depth" "0" "6" "1" UpdateIterations model.iterations
                            ++ inputAngle "Starting Angle" model.startingAngle UpdateStartingAngle
                            ++ [ Html.label [] [ text "Starting point " ]
                               , span [ class [ "startingPointValueText" ] ] [ text ((model.startingPoint |> Tuple.first |> String.fromFloat) ++ ", " ++ (model.startingPoint |> Tuple.second |> String.fromFloat)) ]
                               ]
                        )
                    ]
                , section [ class [ "drawSection" ] ]
                    [ button [ class [ "buttonDraw" ], onClick StartAnimation ] [ text "Draw" ]
                    ]
                , section [ class [ "attributionSection" ] ]
                    [ h2 [ Html.Attributes.style "text-align" "center" ] [ text "Attribution" ]
                    , div [ Html.Attributes.style "text-align" "center" ]
                        [ Html.a [ href "https://github.com/hunorg", Html.Attributes.style "font-size" "1.2rem" ] [ text "created by @hunorg" ] ]
                    , div [ Html.Attributes.style "text-align" "center" ]
                        [ Html.a [ href "https://github.com/hunorg/L-System-Studio", Html.Attributes.style "font-size" "1.2rem" ] [ text "source code" ] ]
                    , div [ Html.Attributes.style "text-align" "center" ]
                        [ Html.a [ href "https://paypal.me/hunorg?country.x=RO&locale.x=en_US", Html.Attributes.style "font-size" "1.2rem" ] [ text "support" ] ]
                    ]
                ]
            ]


view : Model -> Html Msg
view model =
    div [ class [ "flexContainer" ] ]
        [ iconMenu model
        , if model.loadingIconVisible then
            loadingIcon

          else
            nothing
        , sidebar model
        , div
            [ class [ "canvas" ]
            , if not model.showSidebar then
                Html.Attributes.style "margin-left" "1rem"

              else
                class [ "" ]
            ]
            [ div [ class [ "canvasContent" ] ]
                [ svg
                    [ viewBox 0 0 model.canvasWidth model.canvasHeight
                    , Mouse.onDown (\event -> DownMsg event.button event.offsetPos)
                    , Html.Attributes.style "cursor" "pointer"
                    ]
                  <|
                    let
                        progress =
                            Basics.min model.renderingProgress (toFloat (Array.length model.generatedSequence))

                        progressSequence =
                            Array.slice 0 (round progress) model.generatedSequence

                        progressTurtle =
                            generateTurtle model progressSequence model.symbolAssignments model.lineLength model.turningAngle
                    in
                    Turtle.renderTurtleSegments progress progressTurtle
                        ++ [ Turtle.drawFilledPolygons progress progressTurtle.filledPolygons ]
                        ++ Turtle.renderTurtleDots progress progressTurtle
                ]
            ]
        ]


inputAngle : String -> Float -> (Float -> Msg) -> List (Html Msg)
inputAngle label angle msg =
    [ Html.label [] [ text label ]
    , input
        [ class [ "inputAngle" ]
        , type_ "number"
        , Html.Attributes.min "-360"
        , Html.Attributes.max "360"
        , step "1"
        , onInput (String.toFloat >> Maybe.withDefault 0 >> msg)
        , value (String.fromFloat angle)
        ]
        []
    , span [ class [ "angleValueText" ] ] [ text (String.fromFloat angle ++ "°") ]
    ]


inputRange label min max stepSize msg val =
    [ Html.label [] [ text label ]
    , input
        [ class [ "slider" ]
        , type_ "range"
        , Html.Attributes.min min
        , Html.Attributes.max max
        , step stepSize
        , onInput (String.toFloat >> Maybe.withDefault 1 >> msg)
        , value (String.fromFloat val)
        ]
        []
    , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat val) ]
    ]


ruleView : ( Char, List Char ) -> Model -> Html Msg
ruleView rule model =
    let
        isSelected =
            case model.selectedRule of
                Just selectedRule ->
                    rule == selectedRule

                _ ->
                    False
    in
    li
        [ onClick (SelectRule rule)
        , classList [ ( "selectedRule", isSelected ) ]
        ]
        [ div [ class [ "ruleItem" ] ]
            [ text <| String.fromChar (Tuple.first rule) ++ " -> " ++ String.fromList (Tuple.second rule)
            , img [ src "https://i.ibb.co/KqQjhGF/delete.png", onClick (RemoveRule rule), Html.Attributes.style "width" "1rem", Html.Attributes.style "height" "1rem" ] []
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
            [ h3 [] [ text "Syntax" ]
            , Html.ul [ class [ "syntaxText" ] ]
                (List.map
                    (\item ->
                        let
                            ( boldText, restText ) =
                                case String.split "->" item of
                                    b :: r :: [] ->
                                        ( String.trim b, String.trim r )

                                    _ ->
                                        ( "", "" )
                        in
                        Html.li []
                            [ Html.b [] [ text boldText ]
                            , text " -> "
                            , text restText
                            ]
                    )
                    [ "F -> Move forward by line length drawing a line"
                    , "G -> Move forward by line length drawing a line"
                    , "f -> Move forward by line length without drawing a line"
                    , "+ -> Turn left by turning angle"
                    , "- -> Turn right by turning angle"
                    , "| -> Reverse direction (ie: turn by 180 degrees)"
                    , "[ -> Push current drawing state onto stack"
                    , "] -> Pop current drawing state from the stack"
                    , "# -> Increment the line width by line width increment"
                    , "! -> Decrement the line width by line width increment"
                    , "@ -> Draw a dot with line width radius"
                    , "{ -> Open a polygon"
                    , "} -> Close a polygon and fill it with fill colour"
                    , "< -> Multiply the line length by the line length scale"
                    , "> -> Divide the line length by the line length scale"
                    , "& -> Swap the meaning of + and -"
                    , "( -> Decrement turning angle by turning angle increment"
                    , ") -> Increment turning angle by turning angle increment"
                    , "a to z (except f) -> No action"
                    ]
                )
            ]

    else
        nothing
