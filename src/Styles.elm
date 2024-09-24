module Styles exposing (..)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font


white : Color
white =
    rgb 1 1 1


black : Color
black =
    rgb 0 0 0


blue : Color
blue =
    rgb 0 0 1


darkGray : Color
darkGray =
    rgb 0.2 0.2 0.2


midGray : Color
midGray =
    rgb 0.53 0.53 0.53


lightGray : Color
lightGray =
    rgb 0.8 0.8 0.8


transparentGray : Color
transparentGray =
    rgba 0.53 0.53 0.53 0.5


btnAttrs : List (Attribute msg)
btnAttrs =
    [ paddingXY 16 8
    , Border.width 2
    , Border.color midGray
    , Background.color lightGray
    , Font.size 18
    , Font.color black
    , Border.rounded 5
    ]


sliderAttrs : List (Attribute msg)
sliderAttrs =
    [ Element.width (px 250)
    , Background.color lightGray
    , Border.rounded 5
    , Border.width 2
    , Border.color midGray
    ]



{-
   sliderAttrs : List (Attribute msg)
   sliderAttrs =
       [ Element.height (Element.px 30)
       , Element.behindContent
           (Element.el
               [ Element.width Element.fill
               , Element.height (Element.px 2)
               , Element.centerY
               , Background.color blue
               ]
               Element.none
           )
       ]
-}


inputAttrs : List (Attribute msg)
inputAttrs =
    [ paddingXY 16 8
    , Border.width 2
    , Border.color midGray
    , Background.color lightGray
    , Font.size 18
    , Font.color black
    , Border.rounded 5
    , Element.width (px 200)
    ]


selectAttrs : List (Attribute msg)
selectAttrs =
    [ paddingXY 16 8
    , Border.width 2
    , Border.color midGray
    , Background.color lightGray
    , Border.rounded 5
    , Element.width (px 80)
    , Font.color black
    ]
