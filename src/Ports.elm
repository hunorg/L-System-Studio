port module Ports exposing (..)

import Json.Decode as Decode exposing (Value)


port updateCanvasSize : (Value -> msg) -> Sub msg
