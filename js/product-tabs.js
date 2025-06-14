document.addEventListener('DOMContentLoaded', function() {
  initProductTabs();
});

function initProductTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabButtons.length === 0 || tabPanes.length === 0) {
    console.warn('Les éléments des onglets ne sont pas présents sur cette page');
    return;
  }

  tabPanes.forEach(pane => pane.classList.remove('active'));
  const activeButton = document.querySelector('.tab-btn.active');
  if (activeButton) {
    const tabId = activeButton.getAttribute('data-tab');
    const activePane = document.getElementById(tabId);
    if (activePane) {
      activePane.classList.add('active');
    }
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      const tabId = this.getAttribute('data-tab');
      this.classList.add('active');
      const activePane = document.getElementById(tabId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  console.log('Initialisation des onglets de produit terminée');
}
