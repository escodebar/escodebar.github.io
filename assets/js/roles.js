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
  roleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedRole = button.getAttribute('data-role');
      toolItems.forEach(item => item.classList.remove('highlight'));
      (roleMap[selectedRole] || []).forEach(item =>
        item.classList.add('highlight')
      );
    });
  });
}