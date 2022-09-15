export function menuInit() {
    if (document.querySelector('.icon-menu')) {
        document.addEventListener('click', function (e) {
            if (bodyLockStatus && e.target.closest('.icon-menu')) {
                bodyLockToggle();
                document.documentElement.classList.toggle('menu-open');
            }
        });
    }
}
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
};
export let bodyUnlock = (delay = 500) => {
    let body = document.querySelector('body');
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll('[data-lp]');
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove('lock');
        }, delay);
        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
};
export let bodyLock = (delay = 500) => {
    let body = document.querySelector('body');
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll('[data-lp]');
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight =
                window.innerWidth -
                document.querySelector('.wrapper').offsetWidth +
                'px';
        }
        body.style.paddingRight =
            window.innerWidth -
            document.querySelector('.wrapper').offsetWidth +
            'px';
        document.documentElement.classList.add('lock');

        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
};

export let smoothScrolling = () => {
    document.querySelectorAll('a[href^="#"').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            // const topOffset = document.querySelector('.scrollto').offsetHeight;
            const topOffset = 0;
            // const topOffset = 0; // если не нужен отступ сверху
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth',
            });
        });
    });
};
