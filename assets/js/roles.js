document.addEventListener("DOMContentLoaded", () => {
  const toolItems = document.querySelectorAll('.stack [data-roles]');
  const toolRoleMap = buildRoleMap(toolItems);

  const assignmentItems = document.querySelectorAll('.assignments [data-roles]');
  const assignmentRoleMap = buildRoleMap(assignmentItems);
  
  const roleButtons = document.querySelectorAll('[data-role]');
  bindRoleClickEvents(roleButtons, toolItems, toolRoleMap, assignmentItems, assignmentRoleMap);
});

function buildRoleMap(toolItems) {
  const map = {};
  toolItems.forEach(item => {
    const roles = item.getAttribute('data-roles').split(/\s+/);
    roles.forEach(role => {
      if (!map[role]) {
        map[role] = [];
      }
      map[role].push(item);
    });
  });
  return map;
}

function bindRoleClickEvents(roleButtons, toolItems, toolRoleMap, assignmentItems, assignmentRoleMap) {
  let activeRole = null;
  roleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedRole = button.getAttribute('data-role');
      const isSameRole = selectedRole === activeRole;
      toolItems.forEach(item => item.classList.remove('highlight'));
      assignmentItems.forEach(item => item.classList.remove('highlight'));
      roleButtons.forEach(btn => btn.classList.remove('active'));
      if (isSameRole) {
        activeRole = null;
      } else {
        activeRole = selectedRole;
        button.classList.add('active');
        (toolRoleMap[selectedRole] || []).forEach(item =>
          item.classList.add('highlight')
        );
        (assignmentRoleMap[selectedRole] || []).forEach(item =>
          item.classList.add('highlight')
        );
      }
    });
  });
}
