import {
  CodeRunnerContext,
  CodeRunnerOutput,
  defineCodeRunnersSetup,
} from "@slidev/types";

async function executePythonCodeRemotely(
  code: string,
  ctx: CodeRunnerContext,
): Promise<CodeRunnerOutput> {
  const response = await fetch("http://localhost:3480/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: code, options: ctx.options }),
  });

  if (!response.ok) {
    return { error: `Python code execution failed: ${response.statusText}` };
  }

  const data = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");
  const scriptContent = doc.querySelector("python-runner-script")?.innerHTML;

  if (!scriptContent) {
    return { error: "Python code execution failed: no output" };
  }

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = scriptContent;

  return { element: script };
}

export default defineCodeRunnersSetup(() => {
  return {
    python: executePythonCodeRemotely,
  };
});
