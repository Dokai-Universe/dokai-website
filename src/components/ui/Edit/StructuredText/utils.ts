export type StructuredTextLevelSpec = {
  labelKey: string;
  childrenKey?: string;
};

export type StructuredTextSpec = {
  levels: StructuredTextLevelSpec[];
  leafUsesDash?: boolean;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === "object" && v !== null;
}

function getStringField(obj: UnknownRecord, key: string): string {
  const v = obj[key];
  return typeof v === "string" ? v : String(v ?? "");
}

function ensureArray(obj: UnknownRecord, key: string): unknown[] {
  const v = obj[key];
  if (Array.isArray(v)) return v;
  obj[key] = [];
  return obj[key] as unknown[];
}

const INDENT = "  "; // 2 spaces

function rtrim(s: string) {
  return s.replace(/\s+$/g, "");
}

function countIndent(raw: string) {
  let level = 0;
  while (raw.startsWith(INDENT.repeat(level + 1))) level++;
  return level;
}

function stripIndent(raw: string, level: number) {
  return raw.slice(INDENT.length * level);
}

function stripDash(line: string) {
  if (!line.startsWith("- ")) throw new Error(`Expected "- " prefix: ${line}`);
  return line.slice(2).trim();
}
export const toStructuredText = <T extends Record<string, unknown> | string>(
  data: T[],
  spec: StructuredTextSpec,
) => {
  const leafUsesDash = spec.leafUsesDash ?? true;
  const lastIndex = spec.levels.length - 1;
  const blocks: string[] = [];

  if (spec.levels.length === 0) {
    return (data as string[])
      .map((v) => String(v ?? "").trim())
      .filter(Boolean)
      .map((v) => (leafUsesDash ? `- ${v}` : v))
      .join("\n");
  }

  for (const top of data) {
    const lines: string[] = [];

    const walk = (node: unknown, levelIndex: number, indentLevel: number) => {
      if (!isRecord(node)) return;

      const levelSpec = spec.levels[levelIndex];
      const label = getStringField(node, levelSpec.labelKey).trim();
      if (!label) return;

      if (indentLevel === 0) lines.push(label);
      else lines.push(`${INDENT.repeat(indentLevel)}- ${label}`);

      const childrenKey = levelSpec.childrenKey;
      if (!childrenKey) return;

      const children = node[childrenKey];

      // 마지막 레벨: children은 string[]
      if (levelIndex === lastIndex) {
        if (Array.isArray(children)) {
          for (const item of children) {
            const v = String(item ?? "").trim();
            if (!v) continue;
            const prefix = leafUsesDash ? "- " : "";
            lines.push(`${INDENT.repeat(indentLevel + 1)}${prefix}${v}`);
          }
        }
        return;
      }

      // 중간 레벨: children은 object[]
      if (Array.isArray(children)) {
        for (const child of children) {
          walk(child, levelIndex + 1, indentLevel + 1);
        }
      }
    };

    walk(top, 0, 0);
    blocks.push(lines.join("\n"));
  }

  return blocks.filter(Boolean).join("\n\n");
};

export function fromStructuredText<T extends Record<string, unknown> | string>(
  text: string,
  spec: StructuredTextSpec,
): T[] {
  const leafUsesDash = spec.leafUsesDash ?? true;

  if (spec.levels.length === 0) {
    const lines = text
      .split("\n")
      .map(rtrim)
      .map((l) => l.trim())
      .filter(Boolean);

    const out = lines.map((l) => (leafUsesDash ? stripDash(l) : l));
    return out as T[];
  }

  const lines = text
    .split("\n")
    .map(rtrim)
    .filter((l) => l.trim().length > 0);

  const levels = spec.levels;
  const lastIndex = levels.length - 1;

  const out: UnknownRecord[] = [];
  const stack: UnknownRecord[] = [];

  for (const raw of lines) {
    const indent = countIndent(raw);
    const content = stripIndent(raw, indent).trim();

    if (indent === 0) {
      const node: UnknownRecord = { [levels[0].labelKey]: content };
      if (levels[0].childrenKey) node[levels[0].childrenKey] = [];
      out.push(node);
      stack.length = 0;
      stack[0] = node;
      continue;
    }

    const leafDepth = levels.length;

    if (indent > leafDepth) throw new Error(`Too deep indent: "${raw}"`);

    // leaf
    if (indent === leafDepth) {
      const parent = stack[levels.length - 1];
      if (!parent) throw new Error(`Leaf without parent: "${raw}"`);

      const leafKey = levels[lastIndex].childrenKey;
      if (!leafKey)
        throw new Error(`Spec missing leaf childrenKey at last level`);

      const arr = ensureArray(parent, leafKey);
      const value = leafUsesDash ? stripDash(content) : content;
      arr.push(value);
      continue;
    }

    // label node
    const levelIndex = indent;
    if (levelIndex > lastIndex)
      throw new Error(`Invalid label level: "${raw}"`);

    const parent = stack[levelIndex - 1];
    if (!parent)
      throw new Error(`Node without parent at indent ${indent}: "${raw}"`);

    const parentChildrenKey = levels[levelIndex - 1].childrenKey;
    if (!parentChildrenKey) {
      throw new Error(
        `Parent has no childrenKey at indent ${indent}: "${raw}"`,
      );
    }

    const siblings = ensureArray(parent, parentChildrenKey);

    const label = stripDash(content);
    const node: UnknownRecord = { [levels[levelIndex].labelKey]: label };
    if (levels[levelIndex].childrenKey)
      node[levels[levelIndex].childrenKey] = [];

    siblings.push(node);

    stack.length = levelIndex + 1;
    stack[levelIndex] = node;
  }

  // ✅ 최종적으로 T로 캐스팅 (여기서 완전 안전해지려면 validateT가 필요)
  return out as T[];
}
