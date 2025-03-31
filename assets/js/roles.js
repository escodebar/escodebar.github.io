document.addEventListener("DOMContentLoaded", () => {
  const toolItems = document.querySelectorAll('.stack [data-roles]');
  const roleMap = buildRoleMap(toolItems);
  
  const roleButtons = document.querySelectorAll('[data-role]');
  bindRoleClickEvents(roleButtons, toolItems, roleMap);
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

function bindRoleClickEvents(roleButtons, toolItems, roleMap) {
  let activeRole = null;
  roleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedRole = button.getAttribute('data-role');
      const isSameRole = selectedRole === activeRole;
      toolItems.forEach(item => item.classList.remove('highlight'));
      roleButtons.forEach(btn => btn.classList.remove('active'));
      if (isSameRole) {
        activeRole = null;
      } else {
        activeRole = selectedRole;
        button.classList.add('active');
        (roleMap[selectedRole] || []).forEach(item =>
          item.classList.add('highlight')
        );
      }
    });
  });
}
