const pxToVw = (px) => {
    const viewportWidth = window.innerWidth; // 设置你的视口宽度
    return `${(px / viewportWidth) * 100}vw`;
};

export {
    pxToVw
}