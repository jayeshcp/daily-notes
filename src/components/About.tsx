import React from "react";
// import config from "../config";

function About() {
  return (
    <div className="row">
      <div className="col-md-12">
        <p>
          Stay organized and focused with Notes App, a simple and efficient web app for writing daily notes and tracking work milestones. 
          Whether you're logging daily stand-ups, capturing quick thoughts, or monitoring project progress, Notes App helps you keep everything in one place. 
          With clean formatting, powerful search, and customizable tags (coming soon), it's the perfect tool to build a consistent writing habit and stay aligned with your goals.
        </p>
        <p>
          <h6 className="text-success">New Features:</h6>
          <ul>
            <li>
              Workspaces: Manage notes in different workspaces
            </li>
          </ul>
        </p>
        <p>
          <h6 className="text-warning">Coming soon:</h6>
          <ul>
            <li>Supabase for data persistence!</li>
            <li>Customizable tags</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default About;
