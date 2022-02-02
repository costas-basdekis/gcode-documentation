import {DocumentationService} from "../../src";

export const documentationService = new DocumentationService({
  "G0": [
    {
      "brief": "Add a straight line movement to the planner",
      "codes": [
        "G0",
        "G1"
      ],
      "id": "Marlin.G0[0]",
      "parameters": [
        {
          "description": "An absolute or relative coordinate on the X axis (in current units).",
          "label": "[X<pos>]",
          "optional": true,
          "tag": "X",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "The maximum movement rate of the move between the start and end point.",
          "label": "[F<rate>]",
          "optional": true,
          "tag": "F",
          "values": [
            {
              "tag": "rate",
              "type": "float"
            }
          ]
        },
      ],
      "related": [],
      "source": "Marlin",
      "title": "Linear Move",
      "url": "https://marlinfw.org/docs/gcode/G000-G001"
    },
  ],
  "G11": [
    {
      "brief": "Be like Seuss",
      "codes": [
        "G11"
      ],
      "id": "Marlin.G11[0]",
      "parameters": [
        {
          "description": "An absolute or relative coordinate on the X axis (in current units).",
          "label": "[X<pos>]",
          "optional": true,
          "tag": "X",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "The maximum movement rate of the move between the start and end point.",
          "label": "[F<rate>]",
          "optional": true,
          "tag": "F",
          "values": [
            {
              "tag": "rate",
              "type": "float"
            }
          ]
        },
      ],
      "related": [],
      "source": "Marlin",
      "title": "Weird Move",
      "url": "https://marlinfw.org/docs/gcode/G11"
    },
  ],
  "G12": [
    {
      "brief": "Be like Seuss, but different",
      "codes": [
        "G12"
      ],
      "id": "Marlin.G12[0]",
      "parameters": [
        {
          "description": "An absolute or relative coordinate on the X axis (in current units).",
          "label": "[X<pos>]",
          "optional": true,
          "tag": "X",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "The maximum movement rate of the move between the start and end point.",
          "label": "[F<rate>]",
          "optional": true,
          "tag": "F",
          "values": [
            {
              "tag": "rate",
              "type": "float"
            }
          ]
        },
      ],
      "related": [],
      "source": "Marlin",
      "title": "Weird Move",
      "url": "https://marlinfw.org/docs/gcode/G12"
    },
  ],
  "G20": [
    {
      "brief": "Retract the filament",
      "codes": [
        "G20"
      ],
      "id": "Marlin.G20[0]",
      "parameters": [
        {
          "description": "Use `G20 S1` to do a swap retraction, before changing extruders. The subsequent [`G11`](/docs/gcode/G011.html) (after tool change) will do a swap recover. (Requires `EXTRUDERS` > 1)",
          "label": "[S<bool>]",
          "optional": true,
          "tag": "S",
          "values": [
            {
              "type": "bool",
              "tag": "S",
            }
          ]
        }
      ],
      "related": [],
      "source": "Marlin",
      "title": "Retract",
      "url": "https://marlinfw.org/docs/gcode/G010"
    },
  ],
});
