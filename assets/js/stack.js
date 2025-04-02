document.addEventListener("DOMContentLoaded", () => {
  const assignments = document.querySelectorAll(".assignments [data-stack]");
  const assignmentToolMap = buildToolMap(assignments);

  const toolButtons = document.querySelectorAll(".stack [data-tool]");
  bindToolClickEvents(toolButtons, assignments, assignmentToolMap);
});

function buildToolMap(assignments) {
  const map = {};
  assignments.forEach((assignment) => {
    const stack = assignment.getAttribute("data-stack").split(/\s+/);
    stack.forEach((tool) => {
      if (!map[tool]) {
        map[tool] = [];
      }
      map[tool].push(assignment);
    });
  });
  return map;
}

function bindToolClickEvents(toolButtons, assignments, assignmentToolMap) {
  let activeTool = null;
  toolButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTool = button.getAttribute("data-tool");
      const isSameTool = selectedTool === activeTool;
      assignments.forEach((assignment) =>
        assignment.classList.remove("highlight"),
      );
      toolButtons.forEach((btn) => btn.classList.remove("active"));
      if (isSameTool) {
        activeTool = null;
      } else {
        activeTool = selectedTool;
        button.classList.add("active");
        (assignmentToolMap[selectedTool] || []).forEach((item) =>
          item.classList.add("highlight"),
        );
      }
    });
  });
}
