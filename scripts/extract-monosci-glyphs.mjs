import fs from "node:fs";

const GLYPH_NAMES = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."abcdefghijklmnopqrstuvwxyz",
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const DIGIT_NAMES = new Map([
  ["zero", "0"],
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

const STYLE_SOURCES = [
  ["round", process.argv[2]],
  ["angular", process.argv[3]],
  ["extended", process.argv[4]],
];

function findBalanced(source, start, open, close) {
  let depth = 0;
  let quoted = false;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];

    if (quoted) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        quoted = false;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === open) {
      depth += 1;
    } else if (character === close) {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }

  throw new Error(`Unbalanced ${open}${close} block`);
}

function glyphBlock(source, glyphName) {
  const marker = `glyphname = ${glyphName};`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Missing glyph ${glyphName}`);
  const start = source.lastIndexOf("{", markerIndex);
  return findBalanced(source, start, "{", "}");
}

function foregroundShapes(block) {
  const markers = [...block.matchAll(/shapes = \(/g)];
  if (markers.length === 0) return "";
  const start = markers.at(-1).index + markers.at(-1)[0].length - 1;
  return findBalanced(block, start, "(", ")");
}

function parseContours(shapesBlock) {
  const contours = [];
  const nodeMarkers = [...shapesBlock.matchAll(/nodes = \(/g)];

  nodeMarkers.forEach((marker) => {
    const start = marker.index + marker[0].length - 1;
    const nodeBlock = findBalanced(shapesBlock, start, "(", ")");
    const nodes = [...nodeBlock.matchAll(/\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*([a-z]+)\s*\)/gi)].map(
      ([, x, y, type]) => ({ x: Number(x), y: Number(y), type }),
    );

    if (nodes.length > 0) contours.push(nodes);
  });

  return contours;
}

function isOffCurve(node) {
  return node.type === "o";
}

function contourToPath(nodes) {
  const firstOnCurve = nodes.findIndex((node) => !isOffCurve(node));
  if (firstOnCurve < 0) return "";

  const ordered = [
    ...nodes.slice(firstOnCurve),
    ...nodes.slice(0, firstOnCurve),
  ];
  const start = ordered[0];
  const commands = [`M${start.x} ${start.y}`];
  let controls = [];

  for (let offset = 1; offset <= ordered.length; offset += 1) {
    const node = ordered[offset % ordered.length];

    if (isOffCurve(node)) {
      controls.push(node);
      continue;
    }

    if (controls.length >= 2) {
      const first = controls[0];
      const second = controls.at(-1);
      commands.push(`C${first.x} ${first.y} ${second.x} ${second.y} ${node.x} ${node.y}`);
    } else if (controls.length === 1) {
      const control = controls[0];
      commands.push(`Q${control.x} ${control.y} ${node.x} ${node.y}`);
    } else if (node.type === "l") {
      commands.push(`L${node.x} ${node.y}`);
    } else {
      commands.push(`L${node.x} ${node.y}`);
    }

    controls = [];
  }

  commands.push("Z");
  return commands.join(" ");
}

function parseGlyph(source, glyphName) {
  const block = glyphBlock(source, glyphName);
  const shapes = foregroundShapes(block);
  const contours = parseContours(shapes);
  const nodes = contours.flat();
  const widthMatch = block.match(/\bwidth = (-?[\d.]+);/);
  const width = widthMatch ? Number(widthMatch[1]) : 1000;
  const path = contours.map(contourToPath).filter(Boolean).join(" ");

  if (path.length === 0) throw new Error(`No foreground outline for ${glyphName}`);

  return {
    width,
    bounds: {
      xMin: Math.min(...nodes.map((node) => node.x)),
      yMin: Math.min(...nodes.map((node) => node.y)),
      xMax: Math.max(...nodes.map((node) => node.x)),
      yMax: Math.max(...nodes.map((node) => node.y)),
    },
    path,
  };
}

const output = {
  metrics: {
    unitsPerEm: 1000,
    ascender: 794,
    xHeight: 500,
    baseline: 0,
    descender: -187,
  },
  styles: {},
};

STYLE_SOURCES.forEach(([styleName, filePath]) => {
  if (!filePath) throw new Error(`Missing source path for ${styleName}`);
  const source = fs.readFileSync(filePath, "utf8");
  const glyphs = {};

  GLYPH_NAMES.forEach((glyphName) => {
    const character = DIGIT_NAMES.get(glyphName) ?? glyphName;
    glyphs[character] = parseGlyph(source, glyphName);
  });

  output.styles[styleName] = glyphs;
});

process.stdout.write(JSON.stringify(output));
