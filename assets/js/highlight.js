document.addEventListener("DOMContentLoaded", () => {
  const toolItems = document.querySelectorAll(".stack [data-roles]");
  const toolRoleMap = buildMap(toolItems, "data-roles");

  const assignmentItems = document.querySelectorAll(
    ".assignments [data-roles]"
  );
  const assignmentRoleMap = buildMap(assignmentItems, "data-roles");

  const roleButtons = document.querySelectorAll("[data-role]");
  bindClickEvents(roleButtons, toolItems, toolRoleMap, "data-role");
  bindClickEvents(roleButtons, assignmentItems, assignmentRoleMap, "data-role");

  const assignments = document.querySelectorAll(".assignments [data-stack]");
  const assignmentToolMap = buildMap(assignments, "data-stack");

  const toolButtons = document.querySelectorAll(".stack [data-tool]");
  bindClickEvents(toolButtons, assignments, assignmentToolMap, "data-tool");
});

function buildMap(toolItems, attribute) {
  const map = {};
  toolItems.forEach((item) => {
    const references = item.getAttribute(attribute).split(/\s+/);
    references.forEach((reference) => {
      if (!map[reference]) {
        map[reference] = [];
      }
      map[reference].push(item);
    });
  });
  return map;
}

function bindClickEvents(buttons, items, map, attribute) {
  let active = null;
  buttons.forEach((button) => {
    button.setAttribute("role", "button");
    button.setAttribute("aria-role", "button");
    button.addEventListener("click", () => {
      const selected = button.getAttribute(attribute);
      const isSame = selected === active;
      items.forEach((item) => item.classList.remove("highlight"));
      buttons.forEach((btn) => btn.classList.remove("active"));
      if (isSame) {
        active = null;
      } else {
        active = selected;
        button.classList.add("active");
        (map[selected] || []).forEach((item) =>
          item.classList.add("highlight")
        );
      }
    });
  });
}
