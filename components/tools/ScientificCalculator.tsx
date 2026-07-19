"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Scientific Calculator — 100% client-side.                          */
/*                                                                     */
/*  SECURITY: user input is NEVER passed to eval() or new Function().  */
/*  Expressions are tokenised, converted to Reverse Polish Notation    */
/*  with a shunting-yard parser (respecting precedence + right-assoc   */
/*  for ^), then evaluated on a small numeric stack. Anything the      */
/*  parser can't make sense of surfaces as "Error".                    */
/* ------------------------------------------------------------------ */

type Token =
  | { type: "num"; value: string }
  | { type: "const"; value: "pi" | "e" }
  | { type: "op"; value: string }
  | { type: "func"; value: string }
  | { type: "postfix"; value: "!" | "%" }
  | { type: "lparen" }
  | { type: "rparen" };

const FUNCS = new Set(["sin", "cos", "tan", "ln", "log", "sqrt"]);

/** Break an expression string into tokens. Accepts display glyphs
 *  (×, ÷, √, π) as well as their plain-ASCII equivalents. */
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const s = input;
  let i = 0;

  while (i < s.length) {
    const c = s[i];

    if (c === " ") {
      i += 1;
      continue;
    }

    // Numbers (with a single decimal point).
    if (/[0-9.]/.test(c)) {
      let num = "";
      while (i < s.length && /[0-9.]/.test(s[i])) {
        num += s[i];
        i += 1;
      }
      if ((num.match(/\./g) || []).length > 1) throw new Error("bad number");
      tokens.push({ type: "num", value: num });
      continue;
    }

    // Function names & constants (letters), plus the √ and π glyphs.
    if (c === "√") {
      tokens.push({ type: "func", value: "sqrt" });
      i += 1;
      continue;
    }
    if (c === "π") {
      tokens.push({ type: "const", value: "pi" });
      i += 1;
      continue;
    }
    if (/[a-z]/i.test(c)) {
      let name = "";
      while (i < s.length && /[a-z]/i.test(s[i])) {
        name += s[i];
        i += 1;
      }
      name = name.toLowerCase();
      if (name === "pi") tokens.push({ type: "const", value: "pi" });
      else if (name === "e") tokens.push({ type: "const", value: "e" });
      else if (FUNCS.has(name)) tokens.push({ type: "func", value: name });
      else throw new Error("unknown token: " + name);
      continue;
    }

    if (c === "+" || c === "-" || c === "*" || c === "/" || c === "^") {
      tokens.push({ type: "op", value: c });
      i += 1;
      continue;
    }
    if (c === "×") {
      tokens.push({ type: "op", value: "*" });
      i += 1;
      continue;
    }
    if (c === "÷") {
      tokens.push({ type: "op", value: "/" });
      i += 1;
      continue;
    }
    if (c === "(") {
      tokens.push({ type: "lparen" });
      i += 1;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "rparen" });
      i += 1;
      continue;
    }
    if (c === "!") {
      tokens.push({ type: "postfix", value: "!" });
      i += 1;
      continue;
    }
    if (c === "%") {
      tokens.push({ type: "postfix", value: "%" });
      i += 1;
      continue;
    }

    throw new Error("bad character: " + c);
  }

  return tokens;
}

const PRECEDENCE: Record<string, number> = {
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
  neg: 4,
  "^": 5,
};
const RIGHT_ASSOC = new Set(["^", "neg"]);

/** Shunting-yard: token stream -> Reverse Polish Notation. */
function toRPN(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const ops: Token[] = [];
  let prev: Token | null = null;

  for (const t of tokens) {
    if (t.type === "num" || t.type === "const") {
      output.push(t);
    } else if (t.type === "func") {
      ops.push(t);
    } else if (t.type === "postfix") {
      // Factorial / percent bind tighter than any binary op — emit now.
      output.push(t);
    } else if (t.type === "op") {
      const unary =
        (t.value === "-" || t.value === "+") &&
        (prev === null ||
          prev.type === "op" ||
          prev.type === "lparen" ||
          prev.type === "func");

      if (unary) {
        if (t.value === "+") {
          prev = t; // unary plus is a no-op
          continue;
        }
        const neg: Token = { type: "op", value: "neg" };
        while (ops.length) {
          const top = ops[ops.length - 1];
          if (top.type === "op" && PRECEDENCE[top.value] > PRECEDENCE.neg) {
            output.push(ops.pop() as Token);
          } else break;
        }
        ops.push(neg);
      } else {
        while (ops.length) {
          const top = ops[ops.length - 1];
          if (top.type === "func") {
            output.push(ops.pop() as Token);
            continue;
          }
          if (top.type === "op") {
            const tp = PRECEDENCE[top.value];
            const cp = PRECEDENCE[t.value];
            if (tp > cp || (tp === cp && !RIGHT_ASSOC.has(t.value))) {
              output.push(ops.pop() as Token);
              continue;
            }
          }
          break;
        }
        ops.push(t);
      }
    } else if (t.type === "lparen") {
      ops.push(t);
    } else if (t.type === "rparen") {
      while (ops.length && ops[ops.length - 1].type !== "lparen") {
        output.push(ops.pop() as Token);
      }
      if (!ops.length) throw new Error("mismatched parentheses");
      ops.pop(); // discard the "("
      if (ops.length && ops[ops.length - 1].type === "func") {
        output.push(ops.pop() as Token);
      }
    }
    prev = t;
  }

  while (ops.length) {
    const top = ops.pop() as Token;
    if (top.type === "lparen") throw new Error("mismatched parentheses");
    output.push(top);
  }

  return output;
}

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new Error("factorial needs a non-negative integer");
  if (n > 170) return Infinity; // 171! overflows a double anyway
  let acc = 1;
  for (let k = 2; k <= n; k += 1) acc *= k;
  return acc;
}

function applyFunc(name: string, x: number, deg: boolean): number {
  const angle = deg ? (x * Math.PI) / 180 : x;
  switch (name) {
    case "sin":
      return Math.sin(angle);
    case "cos":
      return Math.cos(angle);
    case "tan":
      return Math.tan(angle);
    case "ln":
      return Math.log(x);
    case "log":
      return Math.log10(x);
    case "sqrt":
      return Math.sqrt(x);
    default:
      throw new Error("unknown function");
  }
}

/** Evaluate an RPN token list on a numeric stack. */
function evalRPN(rpn: Token[], deg: boolean): number {
  const st: number[] = [];

  for (const t of rpn) {
    if (t.type === "num") {
      const v = parseFloat(t.value);
      if (Number.isNaN(v)) throw new Error("bad number");
      st.push(v);
    } else if (t.type === "const") {
      st.push(t.value === "pi" ? Math.PI : Math.E);
    } else if (t.type === "op") {
      if (t.value === "neg") {
        const a = st.pop();
        if (a === undefined) throw new Error("missing operand");
        st.push(-a);
      } else {
        const b = st.pop();
        const a = st.pop();
        if (a === undefined || b === undefined) throw new Error("missing operand");
        if (t.value === "+") st.push(a + b);
        else if (t.value === "-") st.push(a - b);
        else if (t.value === "*") st.push(a * b);
        else if (t.value === "/") st.push(a / b);
        else if (t.value === "^") st.push(Math.pow(a, b));
      }
    } else if (t.type === "func") {
      const a = st.pop();
      if (a === undefined) throw new Error("missing operand");
      st.push(applyFunc(t.value, a, deg));
    } else if (t.type === "postfix") {
      const a = st.pop();
      if (a === undefined) throw new Error("missing operand");
      st.push(t.value === "!" ? factorial(a) : a / 100);
    }
  }

  if (st.length !== 1) throw new Error("malformed expression");
  const r = st[0];
  if (!Number.isFinite(r)) throw new Error("not finite");
  return r;
}

/** Full safe pipeline. Returns null instead of throwing. */
function safeEvaluate(expr: string, deg: boolean): number | null {
  if (!expr.trim()) return null;
  try {
    return evalRPN(toRPN(tokenize(expr)), deg);
  } catch {
    return null;
  }
}

/** Trim floating-point noise and format for display. */
function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const rounded = parseFloat(n.toPrecision(12));
  if (Object.is(rounded, -0)) return "0";
  const abs = Math.abs(rounded);
  if (abs !== 0 && (abs < 1e-9 || abs >= 1e15)) {
    return rounded.toExponential(6).replace(/\.?0+e/, "e");
  }
  return String(rounded);
}

/* ------------------------------------------------------------------ */

type Btn = {
  label: string;
  aria?: string;
  ins?: string; // text inserted into the expression
  value?: boolean; // true = starts a new value (digit/const/func/paren)
  fn?: "equals" | "clear" | "back" | "sign";
  variant?: "fn" | "op" | "num" | "accent";
  span?: 2;
};

const BUTTONS: Btn[] = [
  { label: "sin", ins: "sin(", value: true, variant: "fn", aria: "sine" },
  { label: "cos", ins: "cos(", value: true, variant: "fn", aria: "cosine" },
  { label: "tan", ins: "tan(", value: true, variant: "fn", aria: "tangent" },
  { label: "ln", ins: "ln(", value: true, variant: "fn", aria: "natural log" },
  { label: "log", ins: "log(", value: true, variant: "fn", aria: "log base 10" },

  { label: "√", ins: "√(", value: true, variant: "fn", aria: "square root" },
  { label: "x²", ins: "^2", variant: "fn", aria: "square" },
  { label: "xʸ", ins: "^", variant: "fn", aria: "power" },
  { label: "n!", ins: "!", variant: "fn", aria: "factorial" },
  { label: "π", ins: "π", value: true, variant: "fn", aria: "pi" },

  { label: "(", ins: "(", value: true, variant: "fn" },
  { label: ")", ins: ")", variant: "fn" },
  { label: "%", ins: "%", variant: "fn", aria: "percent" },
  { label: "e", ins: "e", value: true, variant: "fn", aria: "euler number" },
  { label: "⌫", fn: "back", variant: "fn", aria: "backspace" },

  { label: "7", ins: "7", value: true, variant: "num" },
  { label: "8", ins: "8", value: true, variant: "num" },
  { label: "9", ins: "9", value: true, variant: "num" },
  { label: "÷", ins: "÷", variant: "op", aria: "divide" },
  { label: "C", fn: "clear", variant: "op", aria: "clear" },

  { label: "4", ins: "4", value: true, variant: "num" },
  { label: "5", ins: "5", value: true, variant: "num" },
  { label: "6", ins: "6", value: true, variant: "num" },
  { label: "×", ins: "×", variant: "op", aria: "multiply" },
  { label: "±", fn: "sign", variant: "op", aria: "toggle sign" },

  { label: "1", ins: "1", value: true, variant: "num" },
  { label: "2", ins: "2", value: true, variant: "num" },
  { label: "3", ins: "3", value: true, variant: "num" },
  { label: "−", ins: "-", variant: "op", aria: "minus" },
  { label: "+", ins: "+", variant: "op", aria: "plus" },

  { label: "0", ins: "0", value: true, variant: "num", span: 2 },
  { label: ".", ins: ".", value: true, variant: "num" },
  { label: "=", fn: "equals", variant: "accent", span: 2 },
];

const VARIANT_CLASS: Record<NonNullable<Btn["variant"]>, string> = {
  num: "bg-paper-2 text-ink hover:border-forest border border-line",
  fn: "bg-card text-ink-soft hover:border-forest hover:text-forest border border-line-strong",
  op: "bg-forest-soft text-forest hover:bg-forest hover:text-white border border-transparent",
  accent: "bg-forest text-white hover:opacity-90 border border-transparent",
};

/** Delete one token (whole function name if the expr ends with one). */
function backspace(expr: string): string {
  const m = expr.match(/(sin\(|cos\(|tan\(|ln\(|log\(|√\()$/);
  if (m) return expr.slice(0, expr.length - m[1].length);
  return expr.slice(0, -1);
}

/** Toggle the sign of the trailing number using unary minus. */
function toggleSign(expr: string): string {
  const m = expr.match(/(\d*\.?\d+)$/);
  if (!m) return expr;
  const num = m[1];
  const before = expr.slice(0, expr.length - num.length);
  if (before.endsWith("-")) {
    const c = before.length >= 2 ? before[before.length - 2] : "";
    const unary = before.length === 1 || "+-*/^(×÷".includes(c);
    if (unary) return before.slice(0, -1) + num;
    return expr; // binary minus — leave it alone
  }
  return before + "-" + num;
}

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [deg, setDeg] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [error, setError] = useState(false);

  const preview = useMemo(() => {
    if (error) return null;
    const v = safeEvaluate(expr, deg);
    return v === null ? null : formatResult(v);
  }, [expr, deg, error]);

  const insert = useCallback(
    (ins: string, isValue: boolean) => {
      setExpr((prev) => {
        let base = error ? "" : prev;
        if (justEvaluated) base = isValue ? "" : base; // digit starts fresh; operator continues
        return base + ins;
      });
      setJustEvaluated(false);
      setError(false);
    },
    [error, justEvaluated]
  );

  const equals = useCallback(() => {
    const v = safeEvaluate(expr, deg);
    if (v === null) {
      if (expr.trim()) setError(true);
      return;
    }
    setExpr(formatResult(v));
    setJustEvaluated(true);
    setError(false);
  }, [expr, deg]);

  const clearAll = useCallback(() => {
    setExpr("");
    setJustEvaluated(false);
    setError(false);
  }, []);

  const doBackspace = useCallback(() => {
    setExpr((prev) => (error ? "" : backspace(prev)));
    setJustEvaluated(false);
    setError(false);
  }, [error]);

  const doSign = useCallback(() => {
    setExpr((prev) => toggleSign(error ? "" : prev));
    setError(false);
  }, [error]);

  const press = useCallback(
    (b: Btn) => {
      if (b.fn === "equals") return equals();
      if (b.fn === "clear") return clearAll();
      if (b.fn === "back") return doBackspace();
      if (b.fn === "sign") return doSign();
      if (b.ins !== undefined) insert(b.ins, Boolean(b.value));
    },
    [equals, clearAll, doBackspace, doSign, insert]
  );

  // Keyboard input.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const k = e.key;

      if (/[0-9]/.test(k)) return insert(k, true);
      if (k === ".") return insert(".", true);
      if (k === "+") return insert("+", false);
      if (k === "-") return insert("-", false);
      if (k === "*") return insert("×", false);
      if (k === "/") {
        e.preventDefault();
        return insert("÷", false);
      }
      if (k === "^") return insert("^", false);
      if (k === "(") return insert("(", true);
      if (k === ")") return insert(")", false);
      if (k === "!") return insert("!", false);
      if (k === "%") return insert("%", false);
      if (k === "Enter" || k === "=") {
        e.preventDefault();
        return equals();
      }
      if (k === "Backspace") {
        e.preventDefault();
        return doBackspace();
      }
      if (k === "Escape") return clearAll();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [insert, equals, doBackspace, clearAll]);

  const displayValue = error ? "Error" : expr || "0";

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-line bg-card p-4 sm:p-5">
        {/* Display */}
        <div className="rounded-xl border border-line bg-paper-2 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setDeg((d) => !d)}
              aria-label={`Angle mode: ${deg ? "degrees" : "radians"}. Tap to switch.`}
              className="rounded-lg border border-line-strong bg-card px-2.5 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
            >
              {deg ? "DEG" : "RAD"}
            </button>
            <span className="text-xs text-ink-faint">Scientific</span>
          </div>
          <div
            className="mt-3 overflow-x-auto whitespace-nowrap text-right font-display text-3xl font-600 text-ink tabular-nums leading-tight"
            aria-live="polite"
            role="status"
          >
            {displayValue}
          </div>
          <div className="mt-1 h-5 overflow-x-auto whitespace-nowrap text-right text-sm text-ink-faint tabular-nums">
            {!error && preview !== null && preview !== (expr || "0") ? `= ${preview}` : ""}
          </div>
        </div>

        {/* Keypad */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {BUTTONS.map((b, idx) => (
            <button
              key={`${b.label}-${idx}`}
              type="button"
              onClick={() => press(b)}
              aria-label={b.aria ?? b.label}
              className={`${b.span === 2 ? "col-span-2" : ""} rounded-xl px-2 py-3.5 text-base font-semibold tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                VARIANT_CLASS[b.variant ?? "num"]
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-ink-faint">
        Tip: you can type with your keyboard. Enter = evaluate, Esc = clear.
      </p>
    </div>
  );
}
