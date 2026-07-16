"use client";

import { useEffect, useState } from "react";
import { IconSparkle } from "@/components/icons";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Experience = {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string;
  bullets: string; // one achievement per line
};

type Education = {
  id: string;
  degree: string;
  school: string;
  year: string;
};

type ResumeData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string; // comma separated
};

const STORAGE_KEY = "coinmind-resume";

const uid = () => Math.random().toString(36).slice(2, 10);

const emptyExperience = (): Experience => ({
  id: uid(),
  role: "",
  company: "",
  start: "",
  end: "",
  bullets: "",
});

const emptyEducation = (): Education => ({
  id: uid(),
  degree: "",
  school: "",
  year: "",
});

const SAMPLE: ResumeData = {
  name: "Aarav Sharma",
  title: "Senior Product Designer",
  email: "aarav.sharma@email.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  website: "linkedin.com/in/aaravsharma",
  summary:
    "Product designer with 6+ years shipping user-centred web and mobile products. I turn ambiguous problems into simple, measurable experiences — and have raised activation by 30%+ across two SaaS products.",
  experience: [
    {
      id: uid(),
      role: "Senior Product Designer",
      company: "Fintech Labs",
      start: "Jan 2022",
      end: "Present",
      bullets:
        "Led the redesign of the onboarding flow, lifting activation from 48% to 71% in two quarters.\nBuilt and maintained a 60-component design system used by 4 product teams.\nMentored 3 junior designers and ran weekly design critiques.",
    },
    {
      id: uid(),
      role: "Product Designer",
      company: "BrightApps",
      start: "Jun 2019",
      end: "Dec 2021",
      bullets:
        "Shipped 12+ features from research through to launch for a 200k-user app.\nCut checkout drop-off by 22% through iterative usability testing.",
    },
  ],
  education: [
    {
      id: uid(),
      degree: "B.Des in Interaction Design",
      school: "National Institute of Design",
      year: "2019",
    },
  ],
  skills:
    "User Research, Figma, Prototyping, Design Systems, Usability Testing, HTML/CSS, Accessibility",
};

const BLANK: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [emptyExperience()],
  education: [emptyEducation()],
  skills: "",
};

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------
const inputCls =
  "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-forest w-full";
const labelCls = "text-sm font-medium text-ink-soft";

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(BLANK);
  const [hydrated, setHydrated] = useState(false);

  // AI assist state (keyed by target so multiple can run/notice independently)
  const [aiBusy, setAiBusy] = useState<string | null>(null);
  const [aiNote, setAiNote] = useState<Record<string, string>>({});

  // Load from localStorage once on mount. If nothing saved, seed with a sample
  // so the preview looks alive immediately (user can Clear to start fresh).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ResumeData>;
        setData({
          ...BLANK,
          ...parsed,
          experience:
            parsed.experience && parsed.experience.length
              ? parsed.experience
              : [emptyExperience()],
          education:
            parsed.education && parsed.education.length
              ? parsed.education
              : [emptyEducation()],
        });
      } else {
        setData(SAMPLE);
      }
    } catch {
      setData(SAMPLE);
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration so we don't clobber saved data).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full / disabled — ignore, builder still works */
    }
  }, [data, hydrated]);

  // -- field setters --------------------------------------------------------
  function setField<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateExperience(id: string, patch: Partial<Experience>) {
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    }));
  }
  function addExperience() {
    setData((d) => ({ ...d, experience: [...d.experience, emptyExperience()] }));
  }
  function removeExperience(id: string) {
    setData((d) => ({
      ...d,
      experience: d.experience.filter((e) => e.id !== id),
    }));
  }

  function updateEducation(id: string, patch: Partial<Education>) {
    setData((d) => ({
      ...d,
      education: d.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }
  function addEducation() {
    setData((d) => ({ ...d, education: [...d.education, emptyEducation()] }));
  }
  function removeEducation(id: string) {
    setData((d) => ({
      ...d,
      education: d.education.filter((e) => e.id !== id),
    }));
  }

  // -- actions --------------------------------------------------------------
  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  function handleClear() {
    if (
      typeof window !== "undefined" &&
      window.confirm(
        "Start over? This clears all the details you've entered on this page."
      )
    ) {
      setData(BLANK);
      setAiNote({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }

  // Optional AI improve. Never blocks the builder; degrades gracefully.
  async function improveWithAi(
    target: string,
    text: string,
    instruction: string,
    apply: (improved: string) => void
  ) {
    const clean = text.trim();
    if (!clean) {
      setAiNote((n) => ({
        ...n,
        [target]: "Write a little first, then let AI polish it.",
      }));
      return;
    }
    setAiBusy(target);
    setAiNote((n) => {
      const next = { ...n };
      delete next[target];
      return next;
    });
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `${instruction}\n\n${clean}` }],
        }),
      });
      const json = (await res.json()) as { reply?: string; error?: string };
      if (json.error) {
        setAiNote((n) => ({
          ...n,
          [target]:
            "AI assist isn't switched on yet — you can still edit manually.",
        }));
      } else if (json.reply) {
        apply(json.reply.trim());
        setAiNote((n) => ({ ...n, [target]: "Updated with AI ✨" }));
      } else {
        setAiNote((n) => ({
          ...n,
          [target]: "AI didn't return anything — try again in a moment.",
        }));
      }
    } catch {
      setAiNote((n) => ({
        ...n,
        [target]: "Network issue — please try again.",
      }));
    } finally {
      setAiBusy(null);
    }
  }

  const skillList = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const hasContact = [data.email, data.phone, data.location, data.website].some(
    (v) => v.trim()
  );

  return (
    <div className="resume-builder">
      {/* Print rules — only the preview is visible when printing. */}
      <style>{`
        @media print {
          @page { margin: 14mm; }
          html, body { background: #ffffff !important; }
          body * { visibility: hidden !important; }
          #resume-preview, #resume-preview * { visibility: visible !important; }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Action bar */}
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Download PDF
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft hover:border-forest hover:text-forest"
        >
          Clear / Start over
        </button>
        <p className="text-xs text-ink-faint">
          Your details stay in your browser — nothing is uploaded. Use your
          browser&apos;s &ldquo;Save as PDF&rdquo; option in the print dialog.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT — the form                                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="no-print space-y-6">
          {/* Basics */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-lg font-600 text-ink">
              Your details
            </h2>
            <div className="mt-5 grid gap-4">
              <Labeled label="Full name">
                <input
                  className={inputCls}
                  value={data.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                />
              </Labeled>
              <Labeled label="Professional title / headline">
                <input
                  className={inputCls}
                  value={data.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="e.g. Senior Product Designer"
                />
              </Labeled>
              <div className="grid sm:grid-cols-2 gap-4">
                <Labeled label="Email">
                  <input
                    type="email"
                    className={inputCls}
                    value={data.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="you@email.com"
                  />
                </Labeled>
                <Labeled label="Phone">
                  <input
                    className={inputCls}
                    value={data.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </Labeled>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Labeled label="Location">
                  <input
                    className={inputCls}
                    value={data.location}
                    onChange={(e) => setField("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </Labeled>
                <Labeled label="Website / LinkedIn (optional)">
                  <input
                    className={inputCls}
                    value={data.website}
                    onChange={(e) => setField("website", e.target.value)}
                    placeholder="linkedin.com/in/you"
                  />
                </Labeled>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-600 text-ink">
                Professional summary
              </h2>
              <button
                type="button"
                disabled={aiBusy === "summary"}
                onClick={() =>
                  improveWithAi(
                    "summary",
                    data.summary,
                    "Rewrite this resume professional summary to be concise, achievement-focused and ATS-friendly. Keep it 2-3 sentences in the first person, no buzzword filler. Return only the improved text, no preamble or quotes:",
                    (improved) => setField("summary", improved)
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-forest hover:border-forest disabled:opacity-50"
              >
                <IconSparkle className="h-3.5 w-3.5" />
                {aiBusy === "summary" ? "Improving…" : "Improve with AI"}
              </button>
            </div>
            <textarea
              rows={4}
              className={`${inputCls} mt-4 resize-y leading-relaxed`}
              value={data.summary}
              onChange={(e) => setField("summary", e.target.value)}
              placeholder="A short, punchy paragraph about who you are and the value you bring."
            />
            {aiNote.summary && (
              <p className="mt-2 text-xs text-ink-faint">{aiNote.summary}</p>
            )}
          </section>

          {/* Experience */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-600 text-ink">
                Work experience
              </h2>
              <button
                type="button"
                onClick={addExperience}
                className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-forest hover:text-forest"
              >
                + Add role
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {data.experience.map((exp, i) => {
                const target = `exp-${exp.id}`;
                return (
                  <div
                    key={exp.id}
                    className="rounded-xl border border-line bg-paper-2/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                        Role {i + 1}
                      </span>
                      {data.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-xs font-semibold text-ink-faint hover:text-berry"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="mt-3 grid gap-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Labeled label="Job title">
                          <input
                            className={inputCls}
                            value={exp.role}
                            onChange={(e) =>
                              updateExperience(exp.id, { role: e.target.value })
                            }
                            placeholder="e.g. Product Manager"
                          />
                        </Labeled>
                        <Labeled label="Company">
                          <input
                            className={inputCls}
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(exp.id, {
                                company: e.target.value,
                              })
                            }
                            placeholder="e.g. Acme Inc."
                          />
                        </Labeled>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Labeled label="Start">
                          <input
                            className={inputCls}
                            value={exp.start}
                            onChange={(e) =>
                              updateExperience(exp.id, {
                                start: e.target.value,
                              })
                            }
                            placeholder="Jan 2022"
                          />
                        </Labeled>
                        <Labeled label="End">
                          <input
                            className={inputCls}
                            value={exp.end}
                            onChange={(e) =>
                              updateExperience(exp.id, { end: e.target.value })
                            }
                            placeholder="Present"
                          />
                        </Labeled>
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className={labelCls}>
                            Achievements (one per line)
                          </span>
                          <button
                            type="button"
                            disabled={aiBusy === target}
                            onClick={() =>
                              improveWithAi(
                                target,
                                exp.bullets,
                                "Rewrite these resume bullet points to be concise and achievement-focused, each starting with a strong action verb and quantifying impact where possible. Keep them ATS-friendly. Return one bullet per line, plain text only, no dashes, numbering or preamble:",
                                (improved) =>
                                  updateExperience(exp.id, {
                                    bullets: improved
                                      .split("\n")
                                      .map((l) =>
                                        l.replace(/^\s*[-•*\d.]+\s*/, "").trim()
                                      )
                                      .filter(Boolean)
                                      .join("\n"),
                                  })
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-2.5 py-1 text-xs font-semibold text-forest hover:border-forest disabled:opacity-50"
                          >
                            <IconSparkle className="h-3 w-3" />
                            {aiBusy === target ? "Improving…" : "Improve with AI"}
                          </button>
                        </div>
                        <textarea
                          rows={4}
                          className={`${inputCls} mt-1.5 resize-y leading-relaxed`}
                          value={exp.bullets}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              bullets: e.target.value,
                            })
                          }
                          placeholder={
                            "Increased X by Y% through…\nLed a team of…\nLaunched…"
                          }
                        />
                        {aiNote[target] && (
                          <p className="mt-2 text-xs text-ink-faint">
                            {aiNote[target]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Education */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-600 text-ink">
                Education
              </h2>
              <button
                type="button"
                onClick={addEducation}
                className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-forest hover:text-forest"
              >
                + Add education
              </button>
            </div>
            <div className="mt-5 space-y-5">
              {data.education.map((ed, i) => (
                <div
                  key={ed.id}
                  className="rounded-xl border border-line bg-paper-2/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                      Education {i + 1}
                    </span>
                    {data.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(ed.id)}
                        className="text-xs font-semibold text-ink-faint hover:text-berry"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-3 grid gap-3">
                    <Labeled label="Degree / qualification">
                      <input
                        className={inputCls}
                        value={ed.degree}
                        onChange={(e) =>
                          updateEducation(ed.id, { degree: e.target.value })
                        }
                        placeholder="e.g. B.Tech in Computer Science"
                      />
                    </Labeled>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Labeled label="School / university">
                        <input
                          className={inputCls}
                          value={ed.school}
                          onChange={(e) =>
                            updateEducation(ed.id, { school: e.target.value })
                          }
                          placeholder="e.g. IIT Delhi"
                        />
                      </Labeled>
                      <Labeled label="Year">
                        <input
                          className={inputCls}
                          value={ed.year}
                          onChange={(e) =>
                            updateEducation(ed.id, { year: e.target.value })
                          }
                          placeholder="2023"
                        />
                      </Labeled>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-lg font-600 text-ink">Skills</h2>
            <p className="mt-1 text-sm text-ink-faint">
              Separate with commas — they show as tidy chips on your resume.
            </p>
            <textarea
              rows={2}
              className={`${inputCls} mt-4 resize-y`}
              value={data.skills}
              onChange={(e) => setField("skills", e.target.value)}
              placeholder="Project Management, Python, SQL, Leadership"
            />
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT — live preview                                             */}
        {/* ---------------------------------------------------------------- */}
        <div className="lg:sticky lg:top-6 self-start">
          <div
            id="resume-preview"
            className="resume-paper rounded-2xl border border-line bg-white p-8 sm:p-10 shadow-sm"
          >
            {/* Header */}
            <header className="border-b border-[#e5e7f2] pb-5">
              <h2 className="font-display text-[26px] leading-tight font-700 text-[#0f1424]">
                {data.name || "Your Name"}
              </h2>
              {data.title && (
                <p className="mt-1 text-[15px] font-semibold text-[#2563eb]">
                  {data.title}
                </p>
              )}
              {hasContact && (
                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-[#3f4661]">
                  {data.email && <span>{data.email}</span>}
                  {data.phone && (
                    <>
                      {data.email && <span className="text-[#d3d7e8]">•</span>}
                      <span>{data.phone}</span>
                    </>
                  )}
                  {data.location && (
                    <>
                      {(data.email || data.phone) && (
                        <span className="text-[#d3d7e8]">•</span>
                      )}
                      <span>{data.location}</span>
                    </>
                  )}
                  {data.website && (
                    <>
                      {(data.email || data.phone || data.location) && (
                        <span className="text-[#d3d7e8]">•</span>
                      )}
                      <span>{data.website}</span>
                    </>
                  )}
                </p>
              )}
            </header>

            {/* Summary */}
            {data.summary.trim() && (
              <Section title="Summary">
                <p className="text-[13px] leading-relaxed text-[#3f4661] whitespace-pre-line">
                  {data.summary}
                </p>
              </Section>
            )}

            {/* Experience */}
            {data.experience.some(
              (e) => e.role || e.company || e.bullets
            ) && (
              <Section title="Experience">
                <div className="space-y-4">
                  {data.experience
                    .filter((e) => e.role || e.company || e.bullets)
                    .map((exp) => {
                      const bullets = exp.bullets
                        .split("\n")
                        .map((b) => b.trim())
                        .filter(Boolean);
                      return (
                        <div key={exp.id}>
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="text-[14px] font-700 text-[#0f1424]">
                              {exp.role || "Role"}
                              {exp.company && (
                                <span className="font-500 text-[#3f4661]">
                                  {" "}
                                  · {exp.company}
                                </span>
                              )}
                            </p>
                            {(exp.start || exp.end) && (
                              <p className="shrink-0 text-[12px] font-medium text-[#6b7288]">
                                {exp.start}
                                {exp.start && exp.end ? " – " : ""}
                                {exp.end}
                              </p>
                            )}
                          </div>
                          {bullets.length > 0 && (
                            <ul className="mt-1.5 space-y-1">
                              {bullets.map((b, bi) => (
                                <li
                                  key={bi}
                                  className="relative pl-4 text-[13px] leading-relaxed text-[#3f4661]"
                                >
                                  <span className="absolute left-0 top-[7px] h-[5px] w-[5px] rounded-full bg-[#2563eb]" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                </div>
              </Section>
            )}

            {/* Education */}
            {data.education.some((e) => e.degree || e.school) && (
              <Section title="Education">
                <div className="space-y-2">
                  {data.education
                    .filter((e) => e.degree || e.school)
                    .map((ed) => (
                      <div
                        key={ed.id}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <p className="text-[13.5px] text-[#0f1424]">
                          <span className="font-700">
                            {ed.degree || "Degree"}
                          </span>
                          {ed.school && (
                            <span className="text-[#3f4661]">
                              {" "}
                              · {ed.school}
                            </span>
                          )}
                        </p>
                        {ed.year && (
                          <p className="shrink-0 text-[12px] font-medium text-[#6b7288]">
                            {ed.year}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </Section>
            )}

            {/* Skills */}
            {skillList.length > 0 && (
              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      className="rounded-md border border-[#d3d7e8] bg-[#f5f6fb] px-2.5 py-1 text-[12px] font-medium text-[#0f1424]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <p className="no-print mt-3 text-center text-xs text-ink-faint">
            Live preview — this is exactly what your PDF will look like.
          </p>
        </div>
      </div>
    </div>
  );
}

// Preview section heading with the forest accent, kept ATS-friendly (real text).
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 text-[11px] font-700 uppercase tracking-[0.14em] text-[#2563eb]">
        {title}
      </h3>
      {children}
    </section>
  );
}
