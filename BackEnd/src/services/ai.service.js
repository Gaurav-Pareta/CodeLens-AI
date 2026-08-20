import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();


const apiKey = process.env.GOOGLE_GEMINI_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_GEMINI_KEY in environment variables.");
}

const ai = new GoogleGenAI({
  apiKey,
});


export const languageMap = {
  javascript: {
    name: "JavaScript",
    prismLang: "javascript",
  },

  python: {
    name: "Python",
    prismLang: "python",
  },

  java: {
    name: "Java",
    prismLang: "java",
  },

  c: {
    name: "C",
    prismLang: "c",
  },

  cpp: {
    name: "C++",
    prismLang: "cpp",
  },

  html: {
    name: "HTML",
    prismLang: "html",
  },

  css: {
    name: "CSS",
    prismLang: "css",
  },
};


// Generate System Prompt


function createSystemPrompt(languageInfo) {
  const { name, prismLang } = languageInfo;

  return `
You are a Senior ${name} Code Review Analyst.

Your job is to professionally review the provided ${name} code.

LANGUAGE:
- Language: ${name}
- Code block language: ${prismLang}

REVIEW THE CODE FOR:
1. Correctness
2. Bugs and edge cases
3. ${name}-specific best practices
4. Performance
5. Time and space complexity
6. Readability
7. Maintainability
8. Security issues
9. Scalability
10. Code structure

IMPORTANT RULES:
- Analyze only the code provided by the user.
- Do not ask questions.
- Do not provide generic advice unrelated to the code.
- Do not provide multiple alternative implementations.
- Provide ONE improved implementation.
- Do not claim that code has an issue unless there is a reasonable technical basis.
- If something is already good, explicitly mention it.
- Be concise but technically useful.
- Do not write tutorial-style explanations.

OUTPUT FORMAT:

# 1. EXECUTIVE SUMMARY

Give one concise sentence describing what the code does and its overall quality.

# 2. SCORECARD

- OVERALL SCORE: X.X/10
- CODE QUALITY: X.X/10
- PERFORMANCE: X.X/10
- READABILITY: X.X/10
- MAINTAINABILITY: X.X/10
- SECURITY: X.X/10

# 3. STRENGTHS

- Strength 1
- Strength 2
- Strength 3

# 4. ISSUES & CONCERNS

## CRITICAL ISSUES
List only genuinely critical issues.
If none exist, write:
None found.

## IMPORTANT ISSUES
List important issues that should be fixed.

## MINOR SUGGESTIONS
List smaller improvements.

# 5. DETAILED ANALYSIS

For every significant issue, use this format:

### Issue N: [Short title]

**Location:** Lines X-Y

**WHAT IT DOES:**
Explain the current code.

**ISSUE:**
Explain the technical problem.

**RECOMMENDATION:**
Give one specific recommendation.

When showing code, ALWAYS use:

\`\`\`${prismLang}
code
\`\`\`

# 6. IMPROVED IMPLEMENTATION

Provide ONE complete improved version of the user's code.

Use:

\`\`\`${prismLang}
improved code
\`\`\`

Do not provide multiple implementations.

# 7. PERFORMANCE ANALYSIS

- TIME COMPLEXITY:
- SPACE COMPLEXITY:
- PERFORMANCE CONCERNS:
- ${name}-SPECIFIC OPTIMIZATIONS:

# 8. TESTING RECOMMENDATIONS

List important test cases that should be checked.

Include small code examples only when useful.

# 9. ACTION PLAN

## PRIORITY 1
Critical fixes.

## PRIORITY 2
Important improvements.

## PRIORITY 3
Optional improvements.

# 10. FINAL ASSESSMENT

Give a professional 2-3 sentence assessment.

FORMATTING RULES:
- Use Markdown.
- Use ${name}-specific terminology.
- Use ${prismLang} for ${name} code blocks.
- Do not use \`\`\`javascript unless the reviewed language is JavaScript.
- Do not invent issues.
`;
}

async function aiService(code, language) {
  if (!code || typeof code !== "string") {
    throw new Error("Code is required.");
  }

  if (!language || !languageMap[language]) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const languageInfo = languageMap[language];

  const systemInstruction = createSystemPrompt(languageInfo);

  const contents = `
Review the following ${languageInfo.name} code.

\`\`\`${languageInfo.prismLang}
${code}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",

      config: {
        systemInstruction,
        temperature: 0.2,
      },

      contents,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error("Failed to generate code review.");
  }
}

export default aiService;