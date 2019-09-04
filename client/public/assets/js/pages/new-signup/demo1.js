/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    const passwordInput = document.querySelector('#password');
    const passwordFeedback = document.querySelector('#strength-output');
    const strengthStr = {
        0: 'Worst',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong'
    }
    const canvasWrapper = document.querySelector('.canvas-wrap');
    const canvas = canvasWrapper.querySelector('canvas');
    const poster = document.querySelector('.poster');
    const posterImg = poster.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
    imagesLoaded(poster, { background: true }, () => {
        document.body.classList.remove('loading');
    });

    // The following code was taken and modified from http://jsfiddle.net/u6apxgfk/390/
    // (C) Ken Fyrstenberg, Epistemex, License: CC3.0-attr
    
    // and merged with https://codepen.io/bassta/pen/OPVzyB?editors=1010

	const ctx = canvas.getContext('2d');
    const img = new Image();
    let imgRatio;
    let wrapperRatio;
    let newWidth;
    let newHeight;
    let newX;
    let newY;

    let pxFactor = 1;

    img.src = posterImg;
    img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        imgRatio = imgWidth / imgHeight;
        setCanvasSize();
        render();
    };

    const setCanvasSize = () => {
        canvas.width = canvasWrapper.offsetWidth;
        canvas.height = canvasWrapper.offsetHeight;
    };

    const render = () => {
        const w = canvasWrapper.offsetWidth;
        const h = canvasWrapper.offsetHeight;

        newWidth = w;
        newHeight = h;
        newX = 0;
        newY = 0;
        wrapperRatio = newWidth / newHeight;

        if ( wrapperRatio > imgRatio ) {
            newHeight = Math.round(w / imgRatio);
            newY = (h - newHeight) / 2;
        } 
        else {
            newWidth = Math.round(h * imgRatio);
            newX = (w - newWidth) / 2;
        }

        // pxFactor will depend on the current typed password.
        // values will be in the range [1,100].
        const size = pxFactor * 0.01;

        // turn off image smoothing - this will give the pixelated effect
        ctx.mozImageSmoothingEnabled = size === 1 ? true : false;
        ctx.webkitImageSmoothingEnabled = size === 1 ? true : false;
        ctx.imageSmoothingEnabled = size === 1 ? true : false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw original image to the scaled size
        ctx.drawImage(img, 0, 0, w*size, h*size);
        // then draw that scaled image thumb back to fill canvas
        // As smoothing is off the result will be pixelated
        ctx.drawImage(canvas, 0, 0, w*size, h*size, newX, newY, newWidth+.05*w, newHeight+.05*h);
    };

    window.addEventListener('resize', () => {
        setCanvasSize();
        render();
    });

    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        const result = zxcvbn(val);
        // We want to reveal the image as the password gets stronger. Since the zxcvbn.score has
        // only 5 different values (0-4) we will use the zxcvbn.guesses_log10 output.
        // The guesses_log10 will be >= 11 when the password is considered strong,
        // so we want to map a factor of 1 (all pixelated) to 100 (clear image) to 
        // a value of 0 to 11 of guesses_log10.
        // This result will be used in the render function.
        pxFactor = 99/11*Math.min(11,Math.round(result.guesses_log10)) + 1;
        
        // so we see most of the time pixels rather than approaching a clear image sooner..
        if ( pxFactor != 1 && pxFactor != 100 ) {
            pxFactor -= pxFactor/100*50;
        }
        
        passwordFeedback.innerHTML = val !== '' ? `Password strength: ${strengthStr[result.score]}` : '';
        render();
    });
}
