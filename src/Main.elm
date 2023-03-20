module Main exposing (main)

import Browser
import Model exposing (init)
import Update exposing (update)
import View exposing (view)


main : Program () Model.Model Update.Msg
main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }
