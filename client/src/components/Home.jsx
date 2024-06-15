import React from 'react'
import { Link } from 'react-router-dom'


import '../css/home.css';

import design from "../images/group 18-1200w.png"


const Home = (props) => {
  return (
    <div className="home-container">
      <div className="home-hero hero-container section-container">
        <div className="home-max-width1 max-width">
          <div className="home-content">
            <span className="home-subtitle">Bus Tracking System</span>
            <animate-on-reveal
              animation="flash"
              duration="3000ms"
              delay="0ms"
              direction="normal"
              easing="ease-in"
              iteration="100"
            >
              <h1 data-thq-animate-on-reveal="true" className="home-title">
                <span>
                  Unlock the next generation tracking
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span className="home-text09">experience</span>
              </h1>
            </animate-on-reveal>
            <span className="home-description">
              This new tracking system puts real-time bus locations at your
              fingertips. No more endless waiting, just a quick glance at your
              phone to see when your ride arrives. Say goodbye to rushed
              mornings and missed connections. This project empowers you to plan
              your commute with confidence.
            </span>
            <div className="home-container01">
              <button className="button button-gradient">Get started</button>
              <animate-on-reveal
                animation="flash"
                duration="3000ms"
                delay="0ms"
                direction="normal"
                easing="ease-in"
                iteration="100"
              >
                <Link
                  to="/user/login"
                  data-thq-animate-on-reveal="true"
                  className="home-navlink1 button button-transparent"
                >
                  Log in
                </Link>
              </animate-on-reveal>
            </div>
          </div>
          <div className="home-image2">
            <img
              alt="pit"
              src="https://images.unsplash.com/photo-1534359265607-b9cdb5e0a81e?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDYzfHxidXN8ZW58MHx8fHwxNzEzMjYyODQxfDA&amp;ixlib=rb-4.0.3&amp;w=600"
              className="home-hero-image"
            />
            <img
              alt="pit"
              src={design}
              className="home-image3"
            />
          </div>
        </div>
      </div>
      <div className="home-section section-container">
        <div className="home-max-width2 max-width">
          <div className="home-image4"></div>
          <img
            alt="pit"
            src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDN8fGxvY2F0aW9ufGVufDB8fHx8MTcxMzI2MzA3Nnww&amp;ixlib=rb-4.0.3&amp;w=1200"
            className="home-hero-image1"
          />
          <div className="home-content1">
            <span className="home-text10 beforeHeading">how it works</span>
            <h1 className="home-text11">
              &quot;Stay informed, stay on track – our bus tracking system
              ensures your journey is as smooth as it can be.&quot;
            </h1>
            <div className="home-container02">
              <Link to="/user/map" className="home-link button-secondary button bg-transparent">
                Track Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section1 section-container">
        <div className="home-max-width3 max-width">
          <div className="home-content2">
            <span className="home-text12">S A V E   T I M E</span>
            <h1 className="home-text13">
              <span>
                Experience a hassle free
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="home-text15">journey</span>
            </h1>
            <span className="home-text16">
              <span className="home-text17">
                &quot;Efficiency meets safety: With our bus tracking system,
                we&apos;re redefining the way you travel to school or work.
              </span>
              <span>&quot;</span>
            </span>
          </div>
          <img
            alt="pit"
            src="https://images.unsplash.com/photo-1666890029742-e8139ef69694?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEzfHxidXMlMjB0cmFja2luZ3xlbnwwfHx8fDE3MTMzMzE2Mjl8MA&amp;ixlib=rb-4.0.3&amp;w=1200"
            className="home-hero-image2"
          />
          <div className="home-image5"></div>
        </div>
      </div>
      <div className="home-section2 section-container">
        <div className="home-max-width4 max-width">
          <div className="home-image6">
            <img
              alt="pit"
              src="https://images.unsplash.com/photo-1642480504730-3ba4bbfaa0ec?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE2fHxsb2dpbiUyMHBhZ2V8ZW58MHx8fHwxNzEzMjYzMjUxfDA&amp;ixlib=rb-4.0.3&amp;w=1200"
              className="home-hero-image3"
            />
          </div>
          <div className="home-content3">
            <span className="home-text19 beforeHeading">get started</span>
            <h1 className="home-text20">Open your account today</h1>
            <div className="home-step">
              <div className="home-number">
                <span className="home-text21">1</span>
              </div>
              <div className="home-container03">
                <span className="home-title1">Open our Website</span>
                <span className="home-text22">
                  Open your browser and search for our website and click on
                  register
                </span>
              </div>
            </div>
            <div className="home-step1">
              <div className="home-number1">
                <span className="home-text23">2</span>
              </div>
              <div className="home-container04">
                <span className="home-title2">Register/Signup</span>
                <span className="home-text24">
                  Give up your details and  use some good credentials.
                </span>
              </div>
            </div>
            <div className="home-step2">
              <div className="home-number2">
                <span className="home-text25">3</span>
              </div>
              <div className="home-container05">
                <span className="home-title3">Experience a new Transit </span>
                <span className="home-text26">
                  Use our website  to enjoy a hassle free journey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="home-max-width5 max-width">
          <span className="home-text27 beforeHeading">get started</span>
          <h1 className="home-text28">
            <span>No matter what you do,Btrack</span>
            <span> will save your time</span>
          </h1>
          <div className="home-cards-container">
            <div className="home-testimonial-card">
              <div className="home-testimonial">
                <svg viewBox="0 0 1024 1024" className="home-icon08">
                  <path d="M225 448c123.712 0 224 100.29 224 224 0 123.712-100.288 224-224 224s-224-100.288-224-224l-1-32c0-247.424 200.576-448 448-448v128c-85.474 0-165.834 33.286-226.274 93.726-11.634 11.636-22.252 24.016-31.83 37.020 11.438-1.8 23.16-2.746 35.104-2.746zM801 448c123.71 0 224 100.29 224 224 0 123.712-100.29 224-224 224s-224-100.288-224-224l-1-32c0-247.424 200.576-448 448-448v128c-85.474 0-165.834 33.286-226.274 93.726-11.636 11.636-22.254 24.016-31.832 37.020 11.44-1.8 23.16-2.746 35.106-2.746z"></path>
                </svg>
                <span className="home-text31">
                  &quot;Experience peace of mind with our school bus tracking
                  system—reliable, real-time updates, intuitive interface. A
                  safety revolution in student transportation.
                </span>
                <span className="home-text32">Rakesh Sharma</span>
              </div>
              <img
                alt="profile"
                src="https://images.unsplash.com/photo-1598096969068-7f52cac10c83?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDV8fGluZGlhbiUyMGJveXxlbnwwfHx8fDE3MTMzNDYyOTl8MA&amp;ixlib=rb-4.0.3&amp;w=200"
                className="home-image7"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="home-section4 section-container">
        <div className="home-max-width6 max-width">
          <div className="home-faq">
            <div className="home-questions">
              <span className="home-text33 beforeHeading">faq</span>
              <h1 className="home-text34">
                <span className="home-text35">
                  Frequently Asked
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span className="home-text37">Questions</span>
              </h1>
              <div data-role="Accordion" className="question">
                <div data-type="accordion-header" className="home-trigger">
                  <span className="home-text38">
                    Is this a Free or Paid service?
                  </span>
                  <svg viewBox="0 0 1024 1024" className="home-icon10">
                    <path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path>
                  </svg>
                </div>
                <div data-type="accordion-content" className="question-content">
                  <span className="home-text39">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </span>
                </div>
              </div>
              <div data-role="Accordion" className="question">
                <div data-type="accordion-header" className="home-trigger1">
                  <span className="home-text40">Do you operate in India?</span>
                  <svg viewBox="0 0 1024 1024" className="home-icon12">
                    <path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path>
                  </svg>
                </div>
                <div data-type="accordion-content" className="question-content">
                  <span className="home-text41">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </span>
                </div>
              </div>
              <div data-role="Accordion" className="question">
                <div data-type="accordion-header" className="home-trigger2">
                  <span className="home-text42">
                    Is this a globally available service?
                  </span>
                  <svg viewBox="0 0 1024 1024" className="home-icon14">
                    <path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path>
                  </svg>
                </div>
                <div data-type="accordion-content" className="question-content">
                  <span className="home-text43">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </span>
                </div>
              </div>
              <div data-role="Accordion" className="question">
                <div data-type="accordion-header" className="home-trigger3">
                  <span className="home-text44">
                    Do you have an iOS or Android app?
                  </span>
                  <svg viewBox="0 0 1024 1024" className="home-icon16">
                    <path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path>
                  </svg>
                </div>
                <div data-type="accordion-content" className="question-content">
                  <span className="home-text45">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </span>
                </div>
              </div>
            </div>
            <img
              alt="pit"
              src="https://images.unsplash.com/photo-1699999331334-d38ede118736?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDY0fHxxdWVzdGlvbiUyMG1hcmt8ZW58MHx8fHwxNzEzMjYzMzM3fDA&amp;ixlib=rb-4.0.3&amp;w=1200"
              className="home-image8"
            />
          </div>
          <div className="home-banner">
            <span className="home-text46 beforeHeading">get started</span>
            <h1 className="home-text47">
              <span>Push your journeys to</span>
              <br></br>
              <span>the next level.</span>
            </h1>
            <span className="home-text51">
              {' '}
              &quot;Never miss your bus again. Track it live!&quot;
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <div className="home-btns">
              <Link to="/user/login" className="home-button4 button button-transparent">
                Login
              </Link>
              <Link to="/user/signup" className="home-button5 button button-gradient">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="home-footer">
        <div className="home-links-container">
          <div className="home-container06">
            <div className="home-container07 footer-column">
              <span className="home-text52">Product</span>
              <span className="home-text53">Features</span>
              <span className="home-text54">Pricing</span>
              <span className="home-text55">Blog</span>
              <span>FAQ</span>
            </div>
            <div className="footer-column">
              <span className="home-text57">App</span>
              <span className="home-text58">Download iOS app</span>
              <span className="home-text59">Download Android app</span>
              <span className="home-text60">Log in to Portal</span>
              <span className="home-text61">Administrative</span>
            </div>
            <div className="footer-column">
              <span className="home-text62">Company</span>
              <span className="home-text63">About us</span>
              <span className="home-text64">Culture</span>
              <span className="home-text65">Code of conduct</span>
              <span className="home-text66">Careers</span>
              <span className="home-text67">News</span>
              <span>Contact</span>
            </div>
            <div className="footer-column">
              <span className="home-text69">Security</span>
              <span className="home-text70">Security status</span>
              <span className="home-text71">ISO</span>
              <span className="home-text72">System status</span>
              <span>Customer Help</span>
            </div>
            <div className="footer-column">
              <span className="home-text74">Follow</span>
              <span className="home-text75">Instagram</span>
              <span className="home-text76">Twitter</span>
              <span className="home-text77">Facebook</span>
              <span className="home-text78">Linkedln</span>
              <span>Youtube</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home