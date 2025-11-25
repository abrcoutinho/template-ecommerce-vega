

// Scroll event desk
window.addEventListener('scroll', function () {
	const topbar = document.getElementById('topbar');
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	const menu = document.querySelector('.store-menu');

	if (scrollTop > 0) {
		topbar.classList.add('scrolled');
		menu.classList.add('scrolled');
	} else {
		topbar.classList.remove('scrolled');
		menu.classList.remove('scrolled');
	}
});


// Scroll event mob
function isScrolledMob() {
	const container = document.getElementById('smooth-wrapper');
	const topbar = document.getElementById('topbar');

	if (!container || !topbar) return;

	const estilo = window.getComputedStyle(container);
	const overflowY = estilo.getPropertyValue('overflow-y');
	const scrollTop = container.scrollTop;

	const temScroll = scrollTop > 0;
	const overflowYAuto = overflowY === 'auto';

	if (temScroll && overflowYAuto) {
		topbar.classList.add('scrolled');
	} else {
		topbar.classList.remove('scrolled');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	isScrolledMob();
	const container = document.getElementById('smooth-wrapper');
	if (container) {
		container.addEventListener('scroll', isScrolledMob);
	}



	// Product details call
	const openProductDetails = document.querySelectorAll('.open-product-details');
	const prodDetailsPopup = document.getElementById('product-details');
	const closeProdDetBtn = document.getElementById('closeProdDetBtn');

	openProductDetails.forEach(button => {
		button.addEventListener('click', function() {
			if (button.id !== 'closeProdDetBtn') {
				prodDetailsPopup.classList.add("active");
			}
		});
	});

	closeProdDetBtn.addEventListener('click', function() {
		prodDetailsPopup.classList.remove('active');
	});

	// Close when clicking outside
	prodDetailsPopup.addEventListener('click', function(event) {
		if (event.target === prodDetailsPopup) {
			prodDetailsPopup.classList.remove('active');
		}
	});

});


// Menu
const menu_btn = document.getElementById('menubutton');
const menuContainer = document.querySelector('.store-menu');

menu_btn.addEventListener('click', () => {
	menuContainer.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  const isClickInside = menuContainer.contains(e.target) || menu_btn.contains(e.target);
  
  if (!isClickInside) {
    menuContainer.classList.remove('active');
  }
});


// Submenus
function getChain(id) {
    const chain = [id];
    let currentId = id;

    while (true) {
        const li = menuContainer.querySelector(`li[data-id="${currentId}"]`);
        if (!li) break;

        const submenuUl = li.closest('.submenu');
        if (!submenuUl || !submenuUl.dataset.parent) break;

        currentId = submenuUl.dataset.parent;
        chain.push(currentId);
    }
    return chain;
}

menuContainer.addEventListener('mouseenter', function (e) {

    // 👉 Agora só reage se o mouse entrou numa TAG <data>
    const dataTag = e.target.closest('data');
    if (!dataTag) return;

    // 👉 Encontra o LI dono desse <data>
    const item = dataTag.closest('li[data-id]');
    if (!item) return;

    const id = item.dataset.id;

    // Obter a cadeia completa de ancestrais
    const chain = getChain(id);

    // --- SUBMENUS ---
    menuContainer.querySelectorAll('.submenu').forEach(ul => {
        const parent = ul.dataset.parent;
        if (!chain.includes(parent)) {
            ul.classList.remove('active');
        }
    });

    chain.forEach(chainId => {
        const submenus = menuContainer.querySelectorAll(`.submenu[data-parent="${chainId}"]`);
        submenus.forEach(ul => ul.classList.add('active'));
    });

    // --- ACTIVE-ITEM ---
    menuContainer.querySelectorAll('li[data-id]').forEach(li => {
        li.classList.remove('active-item');
    });

    chain.forEach(chainId => {
        const li = menuContainer.querySelector(`li[data-id="${chainId}"]`);
        if (li) li.classList.add('active-item');
    });

}, true);

// Fechar tudo quando sai do menuContainer
menuContainer.addEventListener('mouseleave', () => {
    menuContainer.querySelectorAll('.submenu').forEach(ul => ul.classList.remove('active'));
    menuContainer.querySelectorAll('li[data-id]').forEach(li => li.classList.remove('active-item'));
});

















// function getChain(id) {
//     const chain = [id];
//     let currentId = id;

//     while (true) {
//         // Encontra o <li> com o id atual
//         const li = menuContainer.querySelector(`li[data-id="${currentId}"]`);
//         if (!li) break;

//         // O pai UL só existe se este li estiver dentro de um submenu
//         const submenuUl = li.closest('.submenu');
//         if (!submenuUl || !submenuUl.dataset.parent) break;

//         // O parent do submenu atual é o próximo na cadeia
//         currentId = submenuUl.dataset.parent;
//         chain.push(currentId);
//     }
//     return chain;
// }

// menuContainer.addEventListener('mouseenter', function (e) {
//     const item = e.target.closest('li[data-id]');
//     if (!item) return;

//     const id = item.dataset.id;

//     // Obter a cadeia completa de ancestrais
//     const chain = getChain(id);

//     // --- SUBMENUS ---
//     menuContainer.querySelectorAll('.submenu').forEach(ul => {
//         const parent = ul.dataset.parent;
//         if (!chain.includes(parent)) {
//             ul.classList.remove('active');
//         }
//     });

//     chain.forEach(chainId => {
//         const submenus = menuContainer.querySelectorAll(`.submenu[data-parent="${chainId}"]`);
//         submenus.forEach(ul => ul.classList.add('active'));
//     });

//     // --- ACTIVE-ITEM ---

//     // Remove dos que não devem estar destacados
//     menuContainer.querySelectorAll('li[data-id]').forEach(li => {
//         li.classList.remove('active-item');
//     });

//     // Adiciona active-item ao item apontado + ancestrais
//     chain.forEach(chainId => {
//         const li = menuContainer.querySelector(`li[data-id="${chainId}"]`);
//         if (li) li.classList.add('active-item');
//     });

// }, true);

// // Fechar tudo quando sai do menuContainer
// menuContainer.addEventListener('mouseleave', () => {
//     menuContainer.querySelectorAll('.submenu').forEach(ul => ul.classList.remove('active'));
//     menuContainer.querySelectorAll('li[data-id]').forEach(li => li.classList.remove('active-item'));
// });



// nav menu dragabble
const menuNav = document.querySelector('.store-menu nav');

let isDown = false;
let startX;
let scrollLeft;

menuNav.addEventListener('mousedown', (e) => {
  isDown = true;
  menuNav.classList.add('active');
  startX = e.pageX - menuNav.offsetLeft;
  scrollLeft = menuNav.scrollLeft;
});

menuNav.addEventListener('mouseleave', () => {
  isDown = false;
});

menuNav.addEventListener('mouseup', () => {
  isDown = false;
});

menuNav.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - menuNav.offsetLeft;
  const walk = (x - startX) * 1; // velocidade do drag
  menuNav.scrollLeft = scrollLeft - walk;
});







