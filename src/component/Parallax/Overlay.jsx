import React, { forwardRef } from "react"

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div className="parallax">
    <div
      ref={ref}
      onScroll={(e) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
        caption.current.innerText = scroll.current.toFixed(2)
      }}
      class="scroll">
      <div style={{ height: "400vh" }}>
        <div class="dot">
          <h1>Project Showcases and Portfolios</h1>
          Hackerspace encourages members to showcase their projects and creations within the community
        </div>
      </div>
      <div style={{ height: "200vh" }}>
        <div class="dot">
          <h1>Collaborative Networking</h1>
          Hackerspace provides a platform for members to collaborate on projects, workshops, and events. 
        </div>
      </div>
      <div style={{ height: "200vh" }}>
        <div class="dot">
          <h1>Career Development Workshops</h1>Hackerspace offers career-focused workshops that cover topics like resume building, interview preparation, and personal branding.
        </div>
      </div>
      <div style={{ height: "200vh" }}>
        <div class="dot">
          <h1> Coding Competitions</h1>
          Hackerspace regularly organizes coding competitions that challenge members to solve real-world problems using technology. 
        </div>
      </div>
      <div style={{ height: "200vh" }}>
        <div class="dot">
          <h1>Alumni Network</h1> As members transition from being active participants to alumni of Hackerspace, they remain connected to the community.
        </div>
      </div>
      <div style={{ height: "200vh" }}>
        <div class="dot">
          <h1>Cross-Disciplinary Events</h1>Collaborating with professionals from different fields, such as designers, marketers, and business analysts, can lead to well-rounded projects and solutions. 
        </div>
      </div>
      <div style={{ height: "200vh" }}>
        <div class="dot">
          <p className="footer">Designed & Built by Shekhar Hans. <br /> &#169; Copyright; 2023</p>
        </div>
      </div>

    </div>
    </div>

))

export default Overlay
