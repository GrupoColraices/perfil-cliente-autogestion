export const handleClickScroll = () => {
    const element = document.getElementById('result')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}