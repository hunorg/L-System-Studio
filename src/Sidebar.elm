module Sidebar exposing (..)

import Debug exposing (toString)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Model exposing (Model, Rule, Symbol)
import Select
import Styles exposing (..)
import Update exposing (Msg(..))


sidebar : Model -> Element Msg
sidebar state =
    let
        info : Element Msg
        info =
            let
                link =
                    Element.link [ Font.color blue ]
                        { label = text "For more information and examples, please visit Paul Bourke's L-System page"
                        , url = "http://paulbourke.net/fractals/lsys/"
                        }
            in
            column
                [ paddingXY 0 6, width (px 250) ]
                [ el [ Font.bold ] (text "Info:")
                , link
                ]

        actionBtnsWithSyntax : Element Msg
        actionBtnsWithSyntax =
            let
                syntax : Element Msg
                syntax =
                    let
                        symbolAssignments : List (Element msg)
                        symbolAssignments =
                            List.map
                                (\item ->
                                    let
                                        ( symbol, rule ) =
                                            case String.split "->" item of
                                                s :: r :: [] ->
                                                    ( s, r )

                                                _ ->
                                                    ( "", "" )
                                    in
                                    row []
                                        [ el [ Font.bold ] (text symbol)
                                        , text " -> "
                                        , text rule
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
                    in
                    column []
                        [ el [ Font.bold ] (text "Syntax")
                        , column [ Font.size 12 ]
                            symbolAssignments
                        ]

                syntaxBtn : Element Msg
                syntaxBtn =
                    Input.button
                        btnAttrs
                        { onPress = Just ToggleSyntaxDisplay
                        , label = text "syntax"
                        }

                randomPresetBtn : Element Msg
                randomPresetBtn =
                    Input.button
                        btnAttrs
                        { onPress = Just GetRandomPreset
                        , label = text "example"
                        }

                resetBtn : Element Msg
                resetBtn =
                    Input.button
                        btnAttrs
                        { onPress = Just Reset
                        , label = text "reset"
                        }
            in
            column []
                [ row [ spacing 10, alignTop ]
                    [ syntaxBtn
                    , randomPresetBtn
                    , resetBtn
                    ]
                , if state.syntaxDisplay then
                    syntax

                  else
                    none
                ]

        rules : Element Msg
        rules =
            let
                ruleView : Rule -> Element Msg
                ruleView rule =
                    let
                        isSelected =
                            case state.selectedRule of
                                Just selectedRule ->
                                    rule == selectedRule

                                _ ->
                                    False
                    in
                    el
                        [ Events.onClick (SelectRule rule)
                        , spacing 10
                        ]
                        (row [ alignRight ]
                            [ text <| String.fromChar (Tuple.first rule) ++ " -> " ++ String.fromList (Tuple.second rule)

                            -- Replace this with your icon component if available
                            -- , el [ onClick (RemoveRule rule) ] (text "cancel")
                            ]
                        )

                symbolSelect : Element Msg
                symbolSelect =
                    Select.view
                        |> Select.toElement selectAttrs
                            { select = Select.setItems state.symbolAssignments state.selectSymbol
                            , onChange = SelectSymbol
                            , itemToString = .character
                            , label = Input.labelAbove [] Element.none
                            , placeholder = Just (Input.placeholder [] (Element.text "Select a symbol"))
                            }

                ruleInput : Element Msg
                ruleInput =
                    Input.text
                        inputAttrs
                        { onChange = UpdateNewRuleInput
                        , text = state.newRuleInput
                        , placeholder = Nothing
                        , label = Input.labelAbove [] Element.none
                        }

                addRuleBtn : Element Msg
                addRuleBtn =
                    Input.button
                        btnAttrs
                        { onPress = Just AddRule
                        , label = text "Add Rule"
                        }
            in
            column [ paddingXY 0 6, spacing 10 ]
                [ el [ Font.bold ] (text "Rules:")
                , column [] (List.map ruleView state.rules)
                , row [ spacing 8 ]
                    [ symbolSelect
                    , ruleInput
                    ]
                , addRuleBtn
                ]

        axiom : Element Msg
        axiom =
            let
                axiomInput : Element Msg
                axiomInput =
                    Input.text
                        inputAttrs
                        { onChange = UpdateAxiomInput
                        , text = state.axiom
                        , placeholder = Nothing
                        , label = Input.labelAbove [] Element.none
                        }
            in
            column []
                [ el [ Font.bold ] (text "Axiom: ")
                , axiomInput
                ]

        drawBtn : Element Msg
        drawBtn =
            Input.button
                btnAttrs
                { onPress = Just StartAnimation
                , label = text "DRAW"
                }

        attribution : Element Msg
        attribution =
            column []
                [ el [ Font.bold ] (text "Attribution")
                , Element.link [ Font.color blue ]
                    { label = text "created by @hunorg"
                    , url = "https://github.com/hunorg"
                    }
                , Element.link [ Font.color blue ]
                    { label = text "source code"
                    , url = "https://github.com/hunorg/L-System-Studio"
                    }
                , Element.link [ Font.color blue ]
                    { label = text "support"
                    , url = "https://paypal.me/hunorg?country.x=RO&locale.x=en_US"
                    }
                ]
    in
    if state.showSidebar then
        column
            [ spacing 20
            , padding 20
            , Border.rounded 5
            , Border.width 2
            , Border.color midGray
            , Background.color white
            , Element.width (px 350)
            ]
            [ el [ Font.bold, Font.size 24 ] (text "L-System Studio")
            , info
            , actionBtnsWithSyntax
            , rules
            , axiom
            , turtleSettings state
            , drawBtn
            , attribution
            ]

    else
        none


turtleSettings : Model -> Element Msg
turtleSettings state =
    let
        startingAngle : Element Msg
        startingAngle =
            Input.text
                inputAttrs
                { onChange = UpdateStartingAngle
                , text = state.startingAngle |> toString
                , placeholder = Nothing
                , label = Input.labelAbove [] (Element.text "Starting Angle")
                }

        turningAngle : Element Msg
        turningAngle =
            Input.text
                inputAttrs
                { onChange = UpdateTurningAngle
                , text = state.turningAngle |> toString
                , placeholder = Nothing
                , label = Input.labelAbove [] (Element.text "Turning Angle")
                }

        turningAngleIncrement : Element Msg
        turningAngleIncrement =
            Input.text
                inputAttrs
                { onChange = UpdateTurningAngleIncrement
                , text = state.turningAngle |> toString
                , placeholder = Nothing
                , label = Input.labelAbove [] (Element.text "Turning Angle")
                }

        lineLength : Element Msg
        lineLength =
            Input.slider
                sliderAttrs
                { onChange = UpdateLineLength
                , label = Input.labelAbove [] (Element.text ("Line Length: " ++ (state.lineLength |> String.fromFloat)))
                , min = 1
                , max = 25
                , step = Nothing
                , value = state.lineLength
                , thumb = Input.defaultThumb
                }

        lineLengthScale : Element Msg
        lineLengthScale =
            Input.slider
                sliderAttrs
                { onChange = Update.UpdateLineLengthScale
                , label = Input.labelAbove [] (Element.text ("Line Length Scale: " ++ (state.lineLengthScale |> String.fromFloat)))
                , min = 0
                , max = 3
                , step = Nothing
                , value = state.lineLengthScale
                , thumb = Input.defaultThumb
                }

        lineWidthIncrement : Element Msg
        lineWidthIncrement =
            Input.slider
                sliderAttrs
                { onChange = Update.UpdateLineWidthIncrement
                , label = Input.labelAbove [] (Element.text ("Line Width Increment: " ++ (state.lineWidthIncrement |> String.fromFloat)))
                , min = 0
                , max = 3
                , step = Nothing
                , value = state.lineWidthIncrement
                , thumb = Input.defaultThumb
                }

        recursionDepth : Element Msg
        recursionDepth =
            Input.slider
                sliderAttrs
                { onChange = Update.UpdateRecursionDepth
                , label = Input.labelAbove [] (Element.text ("Recursion Depth: " ++ (state.recursionDepth |> String.fromFloat)))
                , min = 0
                , max = 6
                , step = Nothing
                , value = state.recursionDepth
                , thumb = Input.defaultThumb
                }

        startingPoint : Element Msg
        startingPoint =
            Element.text
                ("Starting point: "
                    ++ (state.startingPoint |> Tuple.first |> String.fromFloat)
                    ++ ", "
                    ++ (state.startingPoint |> Tuple.second |> String.fromFloat)
                )
    in
    Element.column
        [ Element.spacing 10 ]
        [ Element.el [ Font.bold ] (Element.text "Turtle Settings:")
        , Element.column
            [ Element.spacing 10 ]
            [ startingAngle
            , turningAngle
            , turningAngleIncrement
            , lineLength
            , lineLengthScale
            , lineWidthIncrement
            , recursionDepth
            , startingPoint
            ]
        ]
