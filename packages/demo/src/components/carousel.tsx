import React, { useEffect, useState } from 'react';
import '../carousel.css';
const slideWidth = 40;

const _items = [
    {
        player: {
            title: 'step 1',
            desc:
                'Open setting App On the device.Go to System and scroll down to tap on About phone or About tablet',
            image: require('../images/settingPage.png')
        }
    },
    {
        player: {
            title: "step 2",
            desc:
                "Tap on the build number seven times",
            image: require('../images/aboutPhone.png')
        }
    },
    {
        player: {
            title: 'step 3',
            desc:
                'When you start tapping you will see a message showing how many times are left.',
            image: require('../images/aboutPhone2.png')
        }
    },
    {
        player: {
            title: 'step 4',
            desc:
                'When you are done  you will see a message saying you are now a developer.',
            image: require('../images/aboutPhone3.png')
        }
    },
    {
        player: {
            title: 'step 5',
            desc:
                'Tap back. You will now see Developer Options in the Systems menu. Tap it.',
            image: require('../images/developerOption.png')
        }
    },
    {
        player: {
            title: 'step 6',
            desc:
                'Scroll to USB debugging section. Toggle on USB Debugging.',
            image: require('../images/enableUsbDebugging.png')
        }
    },
    {
        player: {
            title: 'step 7',
            desc:
                'Your device is now set for installation.',
            image: require('../images/usbDebugging.png')
        }
    },


]

const length = _items.length
_items.push(..._items)


const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const createItem = (position: any, idx: any) => {
    const item = {
        styles: {
            transform: `translateX(${position * slideWidth}rem)`
        },
        player: _items[idx].player
    }

    switch (position) {
        case length - 1:
        case length + 1:
            item.styles = { ...item.styles }
            break
        case length:
            break
        default:
            item.styles = { ...item.styles }
            break
    }

    return item
}

const CarouselSlideItem = (props: any) => {
    const { pos, idx } = props;
    console.log(idx);
    const item = createItem(pos, idx)
    console.log(item);

    return (
        <li className='carousel__slide-item' style={item.styles}>
            <div className='carousel__slide-item-img-link'>
                <img src={item.player.image} alt={item.player.title} />
            </div>
            <div className='carousel-slide-item__body'>
                <h4>{item.player.title}</h4>
                <p>{item.player.desc}</p>
            </div>
        </li>
    )
}

const keys = Array.from(Array(_items.length).keys())

const Carousel = () => {
    const [items, setItems] = useState(keys)
    const [isTicking, setIsTicking] = useState(false)
    const [activeIdx, setActiveIdx] = useState(0)
    const bigLength = items.length

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => {
                return prev.map((_, i) => prev[(i + jump) % bigLength])
            })
        }
    }

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength]
                )
            })
        }
    }

    const handleDotClick = (idx: any) => {
        if (idx < activeIdx) prevClick(activeIdx - idx)
        if (idx > activeIdx) nextClick(idx - activeIdx)
    }

    useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false))
    }, [isTicking])

    useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items])

    return (
        <div className='carousel__wrap'>
            <div className='carousel__inner'>
                <button
                    className='carousel__btn carousel__btn--prev'
                    onClick={() => prevClick()}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--left' />
                </button>
                <div className='carousel__container'>
                    <ul className='carousel__slide-list'>
                        {items.map((pos, i) => (
                            <CarouselSlideItem
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        ))}
                    </ul>
                </div>
                <button
                    className='carousel__btn carousel__btn--next'
                    onClick={() => nextClick()}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--right' />
                </button>
                <div className='carousel__dots'>
                    {items.slice(0, length).map((pos, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={i === activeIdx ? 'dot active' : 'dot'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Carousel