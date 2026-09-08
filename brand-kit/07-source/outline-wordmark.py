"""Export the existing Silkscreen wordmark as paths, without embedded fonts."""
import json
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

font = TTFont(sys.argv[1])
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm
result = {}
for text in ['ember', 'e']:
    cursor = 0
    parts = []
    bounds = []
    for letter in text:
        name = cmap[ord(letter)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        box = BoundsPen(glyphs)
        glyphs[name].draw(box)
        x0, y0, x1, y1 = box.bounds
        bounds.append((cursor + x0, y0, cursor + x1, y1))
        parts.append(f'<path transform="translate({cursor},0)" d="{pen.getCommands()}"/>')
        cursor += font['hmtx'][name][0] + units * 0.06
    left = min(b[0] for b in bounds)
    bottom = min(b[1] for b in bounds)
    right = max(b[2] for b in bounds)
    top = max(b[3] for b in bounds)
    result[text] = {'width': right-left, 'height': top-bottom,
                    'paths': f'<g transform="translate({-left},{top}) scale(1,-1)">{"".join(parts)}</g>'}
print(json.dumps(result))
