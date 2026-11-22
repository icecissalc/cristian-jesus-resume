# Cristian Jesus — Online Resume

A lightweight, bilingual (English/Portuguese), responsive resume website built with semantic HTML, CSS and vanilla JavaScript. Designed for GitHub Pages, recruiter readability and print-to-PDF.

## Features
- English / Portuguese language switch
- Clean light visual theme and responsive mobile layout
- Skill groups and professional timeline rendered from JSON
- Share profile action (native share where supported, clipboard fallback)
- Print / Save as PDF with print stylesheet
- No build step or framework dependency

## Run locally
Because the page loads JSON with `fetch`, open it through a local HTTP server rather than double-clicking `index.html`.

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages
1. Create a GitHub repository named `cristian-jesus-resume` (or another name).
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. After GitHub Pages publishes, share the URL shown in the Pages settings.

For a user-site URL (`https://icecissalc.github.io/`), the repository must be named `icecissalc.github.io`. For a project-site URL, the expected pattern is `https://icecissalc.github.io/cristian-jesus-resume/`.

## Personalize before publishing
Edit both JSON files in `data/`:
- `resume-en.json`
- `resume-pt.json`

Replace `[ADD YOUR PROFESSIONAL EMAIL]` with your real professional email address in both files. Review the role descriptions and add verified responsibilities, project details and measurable achievements. Do not publish any placeholder text.

### Recommended facts to add
- Professional email
- English proficiency level (use an accurate description)
- Testing tools and practices, if applicable (e.g. JUnit, Mockito, integration testing)
- 2–3 concrete engineering achievements with measurable outcomes
- Certifications, if any

## Accuracy notes
- Current employer is shown as **Evertec (formerly Sinqia)**, with the role starting October 2022.
- Java experience is described as dating back to 2015; Java 21 is identified as the current project version based on the information supplied.
- React and Node.js are described conservatively; do not upgrade them to primary strengths without confirming depth.
- AI tools are described as AI-assisted engineering and prompt refinement, not AI/ML engineering.

## Suggested GitHub repository description
`Bilingual, responsive software engineering resume built with HTML, CSS and vanilla JavaScript; deployable on GitHub Pages.`

## License
MIT — see `LICENSE`.
