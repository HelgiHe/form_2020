import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { gsap, Draggable, InertiaPlugin, SplitText, CustomEase } from "gsap/all"
import Image from "gatsby-image"

import { slugify } from "../utils"
import "./slider.css"

// TODO: clean this component up
const Slider = ({ featured }) => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase)
    CustomEase.create(
      "letterBack",
      "M0,0 C0.128,0.572 0.209,0.962 0.464,1.036 0.624,1.082 0.838,1 1,1 "
    )
  }

  const slidesref = React.useRef(null)
  const containerRef = React.useRef(null)
  const [slides, setSlides] = React.useState(null)
  const container = containerRef.current
  let dots
  let iw
  if (typeof document !== "undefined") {
    dots = document.querySelector(".dots")
    iw = window.innerWidth
  }
  let dur = 0.5
  let offsets = []
  let oldSlide = 0
  let activeSlide = 0
  let dotAnim
  let navDots = []

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

      // arrow clicks
      if (this.id === "leftArrow" || this.id === "rightArrow") {
        activeSlide =
          this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1)
        if (activeSlide > slides.length - 1) {
          activeSlide = 0
        }
        if (activeSlide < 0) {
          activeSlide = slides.length - 1
        }
      } else if (this.className === "dot") {
        activeSlide = this.index
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
    if (this.id !== "dragger") {
      gsap.to(containerRef.current, {
        duration: dur,
        x: offsets[activeSlide],
        onUpdate: tweenDot,
      })
    }

    gsap.from(`.imageTextContainer${activeSlide}`, {
      x: 240,
      duration: 0.5,
      delay: 0.4,
      ease: "power2",
    })
    gsap.to(`.imageTextContainer${activeSlide}`, {
      opacity: 1,
    })
    const splitTitle = new SplitText(`#title${activeSlide}`)
    gsap.from(splitTitle.chars, {
      duration: 0.8,
      x: 240,
      stagger: 0.03,
      ease: "power2",
      delay: 0.6,
    })
  }

  React.useEffect(() => {
    if (slidesref.current) {
      setSlides(document.querySelectorAll("section"))
    }
  }, [containerRef, slidesref])

  if (slides && slides.length) {
    document.querySelector("#leftArrow").addEventListener("click", slideAnim)
    document.querySelector("#rightArrow").addEventListener("click", slideAnim)
    // set slides background colors and create the nav dots
    let allDots = document.querySelectorAll(".dot")
    if (allDots.length < slides.length) {
      for (let i = 0; i < slides.length; i++) {
        let newDot = document.createElement("div")
        newDot.className = "dot"
        newDot.index = i
        navDots.push(newDot)
        newDot.addEventListener("click", slideAnim)
        dots.appendChild(newDot)
      }
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
          scale: 1.5,
          rotation: 0.1,
          ease: "none",
        },
        0.5
      )

      dotAnim.time(1)
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
      window.addEventListener("resize", sizeIt)
    }
    gsap.from(`.imageTextContainer0`, {
      x: 240,
      duration: 0.5,
      delay: 0.6,
      ease: "power2",
    })
    gsap.to(`.imageTextContainer0`, {
      opacity: 1,
    })
    const splitTitle = new SplitText(`#title0`)
    gsap.from(splitTitle.chars, {
      duration: 0.8,
      x: 240,
      stagger: 0.03,
      ease: "expo",
      delay: 0.8,
    })
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
                    <StyledTitle id={`title${index}`}>{item.title}</StyledTitle>
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

const StyledTitle = styled.h2`
  font-family: Gilroy-Black;
  font-size: 1.3em;
`

const ImageText = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  height: 64px;
  width: 100vw;
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    width: 25%;
    min-width: 240px;
    padding: 24px;
  }
`

export default Slider
