// deklarasi tombol dan menu
const tombol = document.querySelector('.tombol');
const menu = document.querySelector('.menu');

// membuat event click
// pada saat tombol di click, tambahkan class aktif pada class menu
// saat diklik lagi, maka class aktif dihilangkan dari class menu (toggle)
tombol.addEventListener('click', () => {
		menu.classList.toggle('aktif');
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 25);
});