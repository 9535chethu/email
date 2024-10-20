import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f0f0f0;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? "#0053b3" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#0053b3")};
  border: 1px solid #0053b3;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#004299" : "#e6e6e6")};
  }
`;

function EmailFilter({ onFilterChange }) {
  return (
    <FilterContainer>
      <FilterButton onClick={() => onFilterChange("all")}>All</FilterButton>
      <FilterButton onClick={() => onFilterChange("unread")}>
        Unread
      </FilterButton>
      <FilterButton onClick={() => onFilterChange("read")}>Read</FilterButton>
      <FilterButton onClick={() => onFilterChange("favorites")}>
        Favorites
      </FilterButton>
    </FilterContainer>
  );
}

export default EmailFilter;
