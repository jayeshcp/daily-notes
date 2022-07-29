import React from "react";

type ShowMoreButtonProps = {
  onShowMore: (event: any) => void;
}

function ShowMoreButton({
  onShowMore
}: ShowMoreButtonProps) {
  return (
    <div>
      <button
        className="btn btn-link btn-block"
        onClick={(e) => onShowMore(e)}
        data-marker="showMoreBtn"
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
