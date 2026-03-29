# Skill Bundles

> Curated collections of Antigravity skills organized by role.
> All bundles are **100% complete** — every skill is installed and ready.

---

## How to Invoke Bundles (Step by Step)

### Step 1: Pick Your Bundle

| Bundle | Skills | Best For |
|--------|--------|----------|
| **Essentials** | 5 | Planning, quality, workflow basics |
| **Web Wizard** | 7 | React + Next.js + Tailwind web apps |
| **Web Designer** | 10 | Visual design, 3D, animations, scroll |
| **Full-Stack** | 13 | End-to-end app development |
| **Debugging & Quality** | 12 | Bug fixing, error analysis, testing |

### Step 2: Tell Oz Which Bundle to Use

In Warp, just tell Oz which bundle you want. Examples:

```
Use the Web Wizard bundle skills for this task
```

```
Apply the Essentials bundle — plan this feature, then lint and validate
```

```
Use the Full-Stack bundle to build this API endpoint
```

### Step 3: Call Specific Skills from a Bundle

You can also call individual skills directly:

```
Use the react-best-practices skill to review this component
```

```
Use seo-audit to check this page
```

```
Use scroll-experience to add parallax to the hero section
```

### Step 4: Combine Skills Across Bundles

Mix skills from different bundles for complex tasks:

```
Use react-best-practices and tailwind-patterns to build a responsive card component
```

```
Use form-cro and frontend-design to redesign the contact form
```

---

## Bundle Quick Reference

### Essentials (5 skills)
`concise-planning` · `lint-and-validate` · `git-pushing` · `kaizen` · `systematic-debugging`

### Web Wizard (7 skills)
`frontend-design` · `react-best-practices` · `react-patterns` · `nextjs-best-practices` · `tailwind-patterns` · `form-cro` · `seo-audit`

### Web Designer (10 skills)
`ui-ux-pro-max` · `frontend-design` · `antigravity-design-expert` · `threejs-skills` · `3d-web-experience` · `react-ui-patterns` · `tailwind-patterns` · `canvas-design` · `mobile-design` · `scroll-experience`

### Full-Stack (13 skills)
`senior-fullstack` · `frontend-developer` · `frontend-dev-guidelines` · `backend-dev-guidelines` · `nextjs-app-router-patterns` · `nextjs-supabase-auth` · `api-patterns` · `database-design` · `react-state-management` · `tanstack-query-expert` · `vercel-ai-sdk-expert` · `vercel-deployment` · `stripe-integration`

### Debugging & Quality (12 skills)
`systematic-debugging` · `debugger` · `bug-hunter` · `find-bugs` · `debugging-strategies` · `debugging-toolkit-smart-debug` · `error-debugging-error-analysis` · `error-debugging-error-trace` · `error-diagnostics-error-analysis` · `test-fixing` · `performance-optimizer` · `lint-and-validate`

---

## Total: 51 skills installed across 5 complete bundles

## Detailed Bundle Files

- [essentials.md](essentials.md)
- [web-wizard.md](web-wizard.md)
- [web-designer.md](web-designer.md)
- [full-stack.md](full-stack.md)
- [debugging-quality.md](debugging-quality.md)

---

## Adding More Skills Later

Download any skill from the Antigravity repo (1000+ available):

```powershell
# 1. Create folder
New-Item -ItemType Directory -Force -Path ".agent/skills/SKILL-NAME"

# 2. Download the SKILL.md
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/sickn33/antigravity-awesome-skills/main/skills/SKILL-NAME/SKILL.md" -OutFile ".agent/skills/SKILL-NAME/SKILL.md"
```

Browse all available skills: https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills
