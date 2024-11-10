import React from "react";
// import config from "../config";

function About() {
  return (
    <div className="row">
      <div className="col-md-12">
        <p>
          Write and manage your daily work milestones, or use as a daily diary.
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
          </ul>
        </p>
      </div>
    </div>
  );
}

export default About;
