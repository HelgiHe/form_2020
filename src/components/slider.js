import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { gsap, Draggable, InertiaPlugin, Expo, SplitText } from "gsap/all"
import Image from "gatsby-image"

import { slugify } from "../utils"
import "./slider.css"

// TODO: clean this component up
const Slider = ({ featured }) => {
  gsap.registerPlugin(Draggable, InertiaPlugin)
  const slidesref = React.useRef(null)
  const containerRef = React.useRef(null)
  const textRef = React.useRef(null)
  const [slides, setSlides] = React.useState(null)
  const container = containerRef.current
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)

  let dots = document.querySelector(".dots")

  let dur = 0.5
  let offsets = []
  let oldSlide = 0
  let activeSlide = 0
  let dotAnim
  let navDots = []
  let iw = window.innerWidth

  // const arrowAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 })
  let textAnim = gsap.timeline({})
  // update dot animation when dragger moves
  function tweenDot() {
    gsap.set(dotAnim, {
      time: Math.abs(gsap.getProperty(containerRef.current, "x") / iw) + 1,
    })
  }

  // main action check which of the 4 types of interaction called the function
  function slideAnim(e) {
    oldSlide = activeSlide
    // dragging the panels
    if (this.id === "dragger") {
      activeSlide = offsets.indexOf(this.endX)
    } else {
      if (gsap.isTweening(containerRef.current)) {
        return
      }
      textAnim.progress(0).reversed(true)

      if (activeSlide === 0) {
        textAnim.reversed(false)
      }

      // arrow clicks
      if (this.id === "leftArrow" || this.id === "rightArrow") {
        activeSlide =
          this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1)
        // click on a dot
      } else if (this.className === "dot") {
        activeSlide = this.index
        // scrollwheel
      }
    }
    // make sure we're not past the end or beginning slide
    activeSlide = activeSlide < 0 ? 0 : activeSlide
    activeSlide =
      activeSlide > (slides && slides.length) - 1
        ? (slides && slides.length) - 1
        : activeSlide
    if (oldSlide === activeSlide) {
      return
    }
    // if we're dragging we don't animate the container
    if (this.id != "dragger") {
      gsap.to(containerRef.current, dur, {
        x: offsets[activeSlide],
        onUpdate: tweenDot,
      })
    }
  }

  React.useEffect(() => {
    if (slidesref.current) {
      setSlides(document.querySelectorAll("section"))
    }
  }, [containerRef, slidesref])

  React.useEffect(() => {}, [activeSlideIndex])
  if (slides && slides.length) {
    document.querySelector("#leftArrow").addEventListener("click", slideAnim)
    document.querySelector("#rightArrow").addEventListener("click", slideAnim)
    // set slides background colors and create the nav dots
    textAnim = gsap
      .from(textRef.current, {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        delay: 0.5,
      })
      .reverse()

    for (let i = 0; i < slides.length; i++) {
      let newDot = document.createElement("div")
      newDot.className = "dot"
      newDot.index = i
      navDots.push(newDot)
      newDot.addEventListener("click", slideAnim)
      dots.appendChild(newDot)
    }
  }
  if (slides) {
    // get elements positioned
    gsap.set(".dots", { xPercent: -50 })
    gsap.set(".arrow", { yPercent: -50 })

    if (slides && slides.length) {
      dotAnim = gsap.timeline({ paused: true })
      dotAnim.to(
        ".dot",
        {
          stagger: { each: 1, yoyo: true, repeat: 1 },
          scale: 2.1,
          rotation: 0.1,
          ease: "none",
        },
        0.5
      )

      dotAnim.time(1)

      gsap.from(".imageTextContainer0", {
        x: 600,
        duration: 0.5,
        delay: 0.2,
        ease: Expo.easeOut,
      })
      gsap.to(".imageTextContainer0", {
        opacity: 1,
      })
      const splitTitle = new SplitText("#title0")
      gsap.from(splitTitle.chars, {
        duration: 0.4,
        x: 200,
        autoAlpha: 0,
        stagger: 0.02,
        ease: "expo",
        delay: 0.4,
      })
      const splitDescription = new SplitText("#description0")
      gsap.from(splitDescription.lines, {
        duration: 0.4,
        x: 200,
        autoAlpha: 0,
        stagger: 0.01,
        ease: "expo",
        delay: 0.5,
      })
    }

    // make the whole thing draggable
    if (containerRef.current) {
      let dragMe = new Draggable.create(containerRef.current, {
        type: "x",
        edgeResistance: 1,
        snap: offsets,
        inertia: true,
        bounds: "#masterWrap",
        onDrag: tweenDot,
        onThrowUpdate: tweenDot,
        onDragEnd: slideAnim,
        allowNativeTouchScrolling: false,
        zIndexBoost: false,
      })

      dragMe[0].id = "dragger"
      sizeIt()

      // update the draggable element snap points
      function sizeIt() {
        offsets = []
        iw = window.innerWidth
        gsap.set("#panelWrap", { width: (slides.length || 0) * iw })
        gsap.set(slides, { width: iw })
        for (let i = 0; i < slides.length; i++) {
          offsets.push(-slides[i].offsetLeft)
        }
        gsap.set(container, { x: offsets[activeSlide] })
        dragMe[0].vars.snap = offsets
      }
      gsap.from(".box", {
        opacity: 0,
        y: 100,
        duration: 1,
      })
      window.addEventListener("wheel", slideAnim)
      window.addEventListener("resize", sizeIt)
    }
  }

  return (
    <div>
      <svg
        id="leftArrow"
        className="arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g strokeLinejoin="round" strokeLinecap="round">
          <circle r="46" cx="50" cy="50" />
          <polyline points="60 25, 30 50, 60 75"></polyline>
        </g>
      </svg>

      <svg
        id="rightArrow"
        className="arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g strokeLinejoin="round" strokeLinecap="round">
          <circle r="46" cx="50" cy="50" />
          <polyline points="40 25, 70 50, 40 75"></polyline>
        </g>
      </svg>

      <div id="masterWrap">
        <div ref={containerRef} id="panelWrap">
          {featured.map((item, index) => {
            return (
              <ImageContainer
                key={item.title}
                ref={slidesref}
                className="section"
              >
                <StyledImage fluid={item.image} alt={item.title} />
                <Link to={`/projects/${slugify(item.title)}`}>
                  <ImageText className={`imageTextContainer${index}`}>
                    <h3 id={`title${index}`}>{item.title}</h3>
                    <p id={`description${index}`} ref={textRef}>
                      {item.description}
                    </p>
                  </ImageText>
                </Link>
              </ImageContainer>
            )
          })}
        </div>
      </div>
      <div className="dots"></div>
    </div>
  )
}

const ImageContainer = styled.section`
  width: 100vw;
  height: calc(100% - 80px);
  z-index: 0;
  background-color: var(--lightGrey);
`
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100vw;
  height: calc(100vh - 80px);
`

const ImageText = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  height: 116px;
  width: 100vw;
  @media (min-width: 768px) {
    height: 220px;
    width: 40%;
    min-width: 340px;
    padding: 24px;
  }
`

export default Slider
