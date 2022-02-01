import {GcodeInfoSet} from "gcode-documentation";

export const demoGcodeInfoSet: GcodeInfoSet = {
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
          "description": "An absolute or relative coordinate on the Y axis (in current units).",
          "label": "[Y<pos>]",
          "optional": true,
          "tag": "Y",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "An absolute or relative coordinate on the Z axis (in current units).",
          "label": "[Z<pos>]",
          "optional": true,
          "tag": "Z",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "An absolute or relative coordinate on the E (extruder) axis (in current units). The E axis describes the position of the filament in terms of input to the extruder feeder.",
          "label": "[E<pos>]",
          "optional": true,
          "tag": "E",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter.",
          "label": "[F<rate>]",
          "optional": true,
          "tag": "F",
          "values": [
            {
              "tag": "rate",
              "type": "float"
            }
          ]
        }
      ],
      "related": [
        "G2",
        "G3",
        "G5",
        "M82",
        "M83",
        "G91"
      ],
      "source": "Marlin",
      "title": "Linear Move",
      "url": "https://marlinfw.org/docs/gcode/G000-G001"
    },
    {
      "brief": "* G0 : Rapid Move\n* G1 : Linear Move",
      "codes": [
        "G0",
        "G1"
      ],
      "id": "RepRap.G0[0]",
      "parameters": [
        {
          "description": " The position to move to on the X axis",
          "label": "Xnnn",
          "optional": true,
          "tag": "X",
          "values": []
        },
        {
          "description": " The position to move to on the Y axis",
          "label": "Ynnn",
          "optional": true,
          "tag": "Y",
          "values": []
        },
        {
          "description": " The position to move to on the Z axis",
          "label": "Znnn",
          "optional": true,
          "tag": "Z",
          "values": []
        },
        {
          "description": " The amount to extrude between the starting point and ending point",
          "label": "Ennn",
          "optional": true,
          "tag": "E",
          "values": []
        },
        {
          "description": " The feedrate per minute of the move between the starting point and ending point (if supplied)",
          "label": "Fnnn",
          "optional": true,
          "tag": "F",
          "values": []
        },
        {
          "description": " (RepRapFirmware) Flag to check if an endstop was hit (H1 to check, H0 to ignore, other  see note, default is H0)",
          "label": "Hnnn",
          "optional": true,
          "tag": "H",
          "values": []
        },
        {
          "description": " (RepRapFirmware) Restore point number ",
          "label": "Rnnn",
          "optional": true,
          "tag": "R",
          "values": []
        },
        {
          "description": " Laser cutter/engraver power. In RepRapFirmware, when not in laser mode S in interpreted the same as H.",
          "label": "Snnn",
          "optional": true,
          "tag": "S",
          "values": []
        }
      ],
      "related": [],
      "source": "RepRap",
      "title": "G0 & G1: Move",
      "url": "https://reprap.org/wiki/G-code#G0_.26_G1:_Move"
    }
  ],
  "G1": [
    {
      "brief": "",
      "codes": [
        "G1"
      ],
      "id": "Klipper.G1[0]",
      "parameters": [
        {
          "description": "",
          "label": "[X<Xpos>]",
          "optional": true,
          "tag": "X",
          "values": []
        },
        {
          "description": "",
          "label": "[Y<Ypos>]",
          "optional": true,
          "tag": "Y",
          "values": []
        },
        {
          "description": "",
          "label": "[Z<Zpos>]",
          "optional": true,
          "tag": "Z",
          "values": []
        },
        {
          "description": "",
          "label": "[E<Epos>]",
          "optional": true,
          "tag": "E",
          "values": []
        },
        {
          "description": "",
          "label": "[F<Fspeed>]",
          "optional": true,
          "tag": "F",
          "values": []
        }
      ],
      "related": [],
      "source": "Klipper",
      "title": "",
      "url": "https://www.klipper3d.org/G-Codes.html#g-code-commands"
    },
    {
      "brief": "Add a straight line movement to the planner",
      "codes": [
        "G0",
        "G1"
      ],
      "id": "Marlin.G1[0]",
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
          "description": "An absolute or relative coordinate on the Y axis (in current units).",
          "label": "[Y<pos>]",
          "optional": true,
          "tag": "Y",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "An absolute or relative coordinate on the Z axis (in current units).",
          "label": "[Z<pos>]",
          "optional": true,
          "tag": "Z",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "An absolute or relative coordinate on the E (extruder) axis (in current units). The E axis describes the position of the filament in terms of input to the extruder feeder.",
          "label": "[E<pos>]",
          "optional": true,
          "tag": "E",
          "values": [
            {
              "tag": "pos",
              "type": "float"
            }
          ]
        },
        {
          "description": "The maximum movement rate of the move between the start and end point. The feedrate set here applies to subsequent moves that omit this parameter.",
          "label": "[F<rate>]",
          "optional": true,
          "tag": "F",
          "values": [
            {
              "tag": "rate",
              "type": "float"
            }
          ]
        }
      ],
      "related": [
        "G2",
        "G3",
        "G5",
        "M82",
        "M83",
        "G91"
      ],
      "source": "Marlin",
      "title": "Linear Move",
      "url": "https://marlinfw.org/docs/gcode/G000-G001"
    },
    {
      "brief": "* G0 : Rapid Move\n* G1 : Linear Move",
      "codes": [
        "G0",
        "G1"
      ],
      "id": "RepRap.G1[0]",
      "parameters": [
        {
          "description": " The position to move to on the X axis",
          "label": "Xnnn",
          "optional": true,
          "tag": "X",
          "values": []
        },
        {
          "description": " The position to move to on the Y axis",
          "label": "Ynnn",
          "optional": true,
          "tag": "Y",
          "values": []
        },
        {
          "description": " The position to move to on the Z axis",
          "label": "Znnn",
          "optional": true,
          "tag": "Z",
          "values": []
        },
        {
          "description": " The amount to extrude between the starting point and ending point",
          "label": "Ennn",
          "optional": true,
          "tag": "E",
          "values": []
        },
        {
          "description": " The feedrate per minute of the move between the starting point and ending point (if supplied)",
          "label": "Fnnn",
          "optional": true,
          "tag": "F",
          "values": []
        },
        {
          "description": " (RepRapFirmware) Flag to check if an endstop was hit (H1 to check, H0 to ignore, other  see note, default is H0)",
          "label": "Hnnn",
          "optional": true,
          "tag": "H",
          "values": []
        },
        {
          "description": " (RepRapFirmware) Restore point number ",
          "label": "Rnnn",
          "optional": true,
          "tag": "R",
          "values": []
        },
        {
          "description": " Laser cutter/engraver power. In RepRapFirmware, when not in laser mode S in interpreted the same as H.",
          "label": "Snnn",
          "optional": true,
          "tag": "S",
          "values": []
        }
      ],
      "related": [],
      "source": "RepRap",
      "title": "G0 & G1: Move",
      "url": "https://reprap.org/wiki/G-code#G0_.26_G1:_Move"
    }
  ],
}